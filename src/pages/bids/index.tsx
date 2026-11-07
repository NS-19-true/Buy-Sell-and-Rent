import { useState } from 'react'
import { useDidShow } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import Btn from '../../components/Btn'
import Chips from '../../components/Chips'
import { api } from '../../services/api'
import { myBids, updateTabBadges, upsert, useStore } from '../../store'
import type { Bid, Item } from '../../types'
import { bidState, formatTime, listingStatus } from '../../utils/format'
import { confirm, toast } from '../../utils/ui'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'suspended', label: 'Suspended' },
  { key: 'won', label: 'Won' },
  { key: 'ended', label: 'Ended' }
]

function statusText(item: Item, bid: Bid, isPending: boolean): string {
  const state = bidState(item, bid)
  if (state === 'won') return 'Won'
  if (state === 'suspended') return 'Suspended by seller'
  if (state === 'ended') {
    return listingStatus(item) === 'sold' ? 'Listing sold'
      : listingStatus(item) === 'cancelled' ? 'Listing cancelled'
        : bid.status === 'lost' ? 'Seller sold to another bidder'
          : bid.status === 'cancelled' ? 'Bid cancelled' : 'No longer active'
  }
  if (bid.interest === 'declined') return 'You declined'
  if (isPending) return 'Seller wants to know if you are still interested'
  return item.frontRunnerBidId === bid.id ? 'Front-runner' : 'Bid placed'
}

export default function Bids() {
  const s = useStore()
  const [filter, setFilter] = useState('all')
  const [busy, setBusy] = useState(false)
  useDidShow(() => updateTabBadges())

  const all = myBids(s)
    .map(({ item, bid }) => ({ item, bid, state: bidState(item, bid) }))
    .sort((a, b) => b.bid.at - a.bid.at)
  const shown = filter === 'all' ? all : all.filter((e) => e.state === filter)

  async function run(call: () => Promise<Item>, done: string, ask?: [string, string]) {
    if (busy) return
    if (ask && !(await confirm(ask[0], ask[1]))) return
    setBusy(true)
    try {
      upsert(await call())
      toast(done)
    } catch (e) {
      toast((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <View className='page'>
      <Chips options={FILTERS} value={filter} onChange={setFilter} />
      {shown.length ? shown.map(({ item, bid, state }) => {
        const isPending = item.pendingBidId === bid.id && bid.interest === 'requested'
        return (
          <View key={bid.id} className='sec flush spaced'>
            <View className='row'><Text className='bold'>{item.name}</Text><Text className='bold'>¥{bid.amount}</Text></View>
            <View className='dim'>{item.seller} · {formatTime(bid.at)}</View>
            <View className='row'><Text>Status</Text><Text className='dim'>{statusText(item, bid, isPending)}</Text></View>
            {isPending && (
              <View className='actions'>
                <Btn small disabled={busy} className='grow'
                  onClick={() => run(() => api.respondToInterest(item.id, bid.id, s.userId, true), 'You confirmed your interest.')}
                >I’m still interested</Btn>
                <Btn small variant='secondary' disabled={busy} className='grow gap-l'
                  onClick={() => run(() => api.respondToInterest(item.id, bid.id, s.userId, false), 'Your response was sent.')}
                >No, thank you</Btn>
              </View>
            )}
            {(state === 'ongoing' || state === 'suspended') && (
              <Btn small variant='secondary' disabled={busy} className='cancel-bid'
                onClick={() => run(() => api.cancelBid(item.id, bid.id, s.userId), 'Your bid was cancelled.', ['Cancel bid', 'Cancel this bid?'])}
              >Cancel my bid</Btn>
            )}
          </View>
        )
      }) : (
        <View className='empty'>
          {all.length ? 'No bids match this filter.' : 'You have not bid on any items yet.\nBrowse the market and place your first bid.'}
        </View>
      )}
    </View>
  )
}
