import type { Bid, Item } from '../types'

export const emoji: Record<string, string> = {
  Transport: '🚲', Appliances: '🧊', Electronics: '🖥️', Books: '📚', Furniture: '💡'
}
export const tint: Record<string, string> = {
  Transport: '#dbeafe', Appliances: '#e0f2fe', Electronics: '#ede9fe', Books: '#fef3c7', Furniture: '#fef9c3'
}
export const emojiFor = (category: string) => emoji[category] || '📦'
export const tintFor = (category: string) => tint[category] || '#e7e5e4'

export const listingStatus = (item: Item) => item.status || 'active'

/** Highest bid that still counts (active or won, not declined). null if there is none. */
export function topBid(item: Item): number | null {
  const bids = item.bids.filter(
    (b) => (b.status === undefined || b.status === 'active' || b.status === 'won') && b.interest !== 'declined'
  )
  return bids.length ? Math.max(...bids.map((b) => b.amount)) : null
}

export type BidState = 'won' | 'suspended' | 'ended' | 'ongoing'
export function bidState(item: Item, bid: Bid): BidState {
  if (bid.status === 'won') return 'won'
  if (bid.status === 'suspended') return 'suspended'
  if (
    bid.status === 'cancelled' || bid.status === 'lost' || bid.status === 'listing_cancelled' ||
    bid.interest === 'declined' || listingStatus(item) !== 'active'
  ) return 'ended'
  return 'ongoing'
}

/** Bids sorted best-first (highest amount, then earliest). */
export const rankedForDisplay = (bids: Bid[]) => bids.slice().sort((a, b) => b.amount - a.amount || b.at - a.at)

const pad = (n: number) => (n < 10 ? '0' + n : String(n))
/** HH:mm. Written by hand because Intl / toLocaleTimeString is not reliable in every mini program runtime. */
export function formatTime(t: number): string {
  const d = new Date(t)
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}
