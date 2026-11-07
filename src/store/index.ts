// Tiny app-wide store (no extra dependency) + the live-sync loop.
//
// Web version                      -> Mini program version
//   module-level `items`, `userId`    this store, read through useStore()
//   localStorage                      Taro.getStorageSync / setStorageSync
//   EventSource (SSE)                 long-poll loop below (GET /api/poll)
//   nav badges "(n)"                  native tab-bar badges (updateTabBadges)
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import type { Bid, Item, LiveEvent } from '../types'
import { toast } from '../utils/ui'

export interface AppState {
  items: Item[]
  categories: string[]
  conditions: string[]
  userId: string
  userName: string
  /** true while the long-poll connection to the server is healthy */
  live: boolean
  loaded: boolean
  /** listing that just received a bid on the Listings tab (drives the highlight) */
  flashId: number | null
}

/* ------------------------------------------------------------- identity */
const KEY_ID = 'ct.userId'
const KEY_NAME = 'ct.userName'

function readStorage(key: string): string {
  try { return String(Taro.getStorageSync(key) || '') } catch { return '' }
}
function writeStorage(key: string, value: string) {
  try { Taro.setStorageSync(key, value) } catch { /* storage unavailable */ }
}

// One identity per device, used for both selling (sellerId) and bidding (bidderId).
// Trust-based, like the web version. WECHAT_INTEGRATION.md explains how to replace it with wx.login.
function loadUserId(): string {
  let id = readStorage(KEY_ID)
  if (!id) {
    id = 'U' + Math.random().toString(36).slice(2, 12)
    writeStorage(KEY_ID, id)
  }
  return id
}

/* ---------------------------------------------------------------- state */
let state: AppState = {
  items: [],
  categories: ['Transport', 'Appliances', 'Electronics', 'Books', 'Furniture'],
  conditions: ['Like new', 'Good', 'Fair'],
  userId: loadUserId(),
  userName: readStorage(KEY_NAME),
  live: false,
  loaded: false,
  flashId: null
}
const listeners = new Set<() => void>()

function setState(patch: Partial<AppState>) {
  state = { ...state, ...patch }
  listeners.forEach((fn) => fn())
}

export const getState = () => state

/** Subscribe a component to the store. Returns the whole state; derive what you need with the selectors below. */
export function useStore(): AppState {
  const [snapshot, setSnapshot] = useState(state)
  useEffect(() => {
    const onChange = () => setSnapshot(state)
    listeners.add(onChange)
    onChange() // catch anything that changed between render and effect
    return () => { listeners.delete(onChange) }
  }, [])
  return snapshot
}

/* ------------------------------------------------------------ selectors */
export const isMine = (item: Item, userId = state.userId) => item.sellerId === userId
export const myListings = (s: AppState) => s.items.filter((i) => isMine(i, s.userId))
export const myBids = (s: AppState): Array<{ item: Item; bid: Bid }> =>
  s.items.reduce<Array<{ item: Item; bid: Bid }>>((all, item) => {
    item.bids.forEach((bid) => { if (bid.bidderId === s.userId) all.push({ item, bid }) })
    return all
  }, [])

/* -------------------------------------------------------------- actions */
export function setUserName(name: string) {
  const trimmed = name.trim()
  writeStorage(KEY_NAME, trimmed)
  setState({ userName: trimmed })
}

/**
 * Insert or replace a listing. Live updates leave `photos` out; keep the ones we already have.
 * Returns false when a photo-less update arrived for a listing we have never seen (caller should resync).
 */
export function upsert(incoming: Item): boolean {
  const index = state.items.findIndex((x) => x.id === incoming.id)
  const prev = index >= 0 ? state.items[index] : undefined
  const item = prev && incoming.photos === undefined ? { ...incoming, photos: prev.photos } : incoming
  commitItems(addOrReplace(item, index))
  return !(!prev && incoming.photos === undefined)
}

function addOrReplace(item: Item, index: number): Item[] {
  const items = state.items.slice()
  if (index >= 0) items[index] = item
  else items.unshift(item)
  return items
}

function commitItems(items: Item[]) {
  setState({ items })
  updateTabBadges()
}

export async function refresh() {
  commitItems(await api.items())
  setState({ loaded: true })
}

/* ------------------------------------------------------------ tab badges */
const badgeShown: Record<number, number> = {}
function setBadge(index: number, count: number) {
  if ((badgeShown[index] || 0) === count) return
  const task = count ? Taro.setTabBarBadge({ index, text: String(count) }) : Taro.removeTabBarBadge({ index })
  // Fails harmlessly while a non-tab page (the item detail page) is on top; retried on the next tab show.
  task.then(() => { badgeShown[index] = count }).catch(() => undefined)
}
/** Tab order in app.config.ts: 0 Market, 1 Sell, 2 Listings, 3 My bids. */
export function updateTabBadges() {
  setBadge(2, myListings(state).length)
  setBadge(3, myBids(state).length)
}

/* ----------------------------------------------------------- live events */
function flash(id: number) {
  setState({ flashId: id })
  setTimeout(() => { if (state.flashId === id) setState({ flashId: null }) }, 1500)
}

// Did this update just ask *me* to confirm interest?
function newlyAskedMe(prev: Item | undefined, item: Item): boolean {
  const pending = item.bids.find((b) => b.id === item.pendingBidId)
  if (!pending || pending.bidderId !== state.userId || pending.interest !== 'requested') return false
  const before = prev && prev.bids.find((b) => b.id === pending.id)
  return !before || before.interest !== 'requested'
}

function handleEvent(e: LiveEvent): boolean {
  let known = true
  if (e.event === 'item:created') {
    const item = e.data as Item
    known = upsert(item)
    if (!isMine(item)) toast(`New listing: ${item.name}`)
  } else if (e.event === 'bid:placed') {
    const { item, bid } = e.data as { item: Item; bid: Bid }
    known = upsert(item)
    if (isMine(item)) {
      flash(item.id)
      toast(`New bid: ¥${bid.amount} on ${item.name} from ${bid.bidder}`)
    }
  } else if (e.event === 'item:updated') {
    const item = e.data as Item
    const prev = state.items.find((x) => x.id === item.id)
    known = upsert(item)
    if (newlyAskedMe(prev, item)) toast(`The seller of ${item.name} asks if you are still interested. Check My bids.`)
  }
  return known
}

/* ------------------------------------------------------------- sync loop */
let syncGeneration = 0
let syncing = false
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

/**
 * Keeps `items` current. Safe to call repeatedly. Call stopSync() when the app goes to the background:
 * WeChat suspends network activity there, and the next startSync() does a full resync.
 */
export function startSync() {
  if (syncing) return
  syncing = true
  const generation = ++syncGeneration
  const active = () => syncing && generation === syncGeneration

  api.meta()
    .then((m) => { if (active()) setState({ categories: m.categories, conditions: m.conditions }) })
    .catch(() => undefined)

  ;(async () => {
    let since: number | null = null
    let failures = 0
    while (active()) {
      try {
        if (since === null) {            // (re)sync: note the revision first, then load, then listen
          const { rev } = await api.rev()
          const items = await api.items()
          if (!active()) return
          commitItems(items)
          setState({ loaded: true, live: true })
          since = rev
        }
        const result = await api.poll(since)
        if (!active()) return
        failures = 0
        setState({ live: true })
        if (result.reset) { since = null; continue }
        let needsResync = false
        for (const e of result.events) if (!handleEvent(e)) needsResync = true
        since = needsResync ? null : result.rev
      } catch {
        if (!active()) return
        setState({ live: false })
        since = null                     // like the web app: full re-sync after every reconnect
        failures += 1
        await sleep(Math.min(1500 * failures, 10000))
      }
    }
  })()
}

export function stopSync() {
  syncing = false
  syncGeneration += 1
  setState({ live: false })
}
