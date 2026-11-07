// Shapes returned by the Campus Trade API (see server/store.js).
export type ListingStatus = 'active' | 'sold' | 'cancelled'
export type BidStatus = 'active' | 'suspended' | 'won' | 'lost' | 'cancelled' | 'listing_cancelled'
export type Interest = 'unasked' | 'requested' | 'interested' | 'declined'

export interface Bid {
  id: string
  bidder: string
  bidderId: string
  amount: number
  at: number
  status?: BidStatus
  interest?: Interest
}

export interface Item {
  id: number
  name: string
  price: number
  category: string
  condition: string
  description: string
  seller: string
  sellerId: string
  /** data: URIs. Omitted by live updates (photos never change after creation). */
  photos?: string[]
  status?: ListingStatus
  bids: Bid[]
  pendingBidId: string | null
  frontRunnerBidId: string | null
  createdAt: number
  soldAt?: number
  cancelledAt?: number
}

export interface Meta {
  categories: string[]
  conditions: string[]
}

export interface NewItem {
  name: string
  price: number
  category: string
  condition: string
  description: string
  seller: string
  sellerId: string
  photos: string[]
}

export type LiveEventName = 'item:created' | 'bid:placed' | 'item:updated'
export interface LiveEvent {
  rev: number
  event: LiveEventName
  data: any
}
export interface PollResult {
  rev: number
  events: LiveEvent[]
  reset?: boolean
}
