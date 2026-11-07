import type { Item, Meta, NewItem, PollResult } from '../types'
import { post, request } from './http'

const enc = encodeURIComponent

// Same endpoints as the web version's public/api.js.
export const api = {
  meta: () => request<Meta>('/api/meta'),
  items: () => request<Item[]>('/api/items', { timeout: 30000 }),
  createItem: (data: NewItem) => post<Item>('/api/items', data),
  placeBid: (id: number, data: { bidder: string; bidderId: string; amount: number }) =>
    post<Item>(`/api/items/${id}/bids`, data),
  respondToInterest: (id: number, bidId: string, bidderId: string, interested: boolean) =>
    post<Item>(`/api/items/${id}/bids/${enc(bidId)}/interest`, { bidderId, interested }),
  suspendBid: (id: number, bidId: string, sellerId: string) =>
    post<Item>(`/api/items/${id}/bids/${enc(bidId)}/suspend`, { sellerId }),
  cancelBid: (id: number, bidId: string, bidderId: string) =>
    post<Item>(`/api/items/${id}/bids/${enc(bidId)}/cancel`, { bidderId }),
  markSold: (id: number, sellerId: string) => post<Item>(`/api/items/${id}/sold`, { sellerId }),
  cancelListing: (id: number, sellerId: string) => post<Item>(`/api/items/${id}/cancel`, { sellerId }),

  // Live updates. Mini programs have no EventSource, so we long-poll instead of SSE.
  rev: () => request<{ rev: number }>('/api/rev'),
  /** Resolves as soon as events newer than `since` exist, or after ~25 s with none. */
  poll: (since: number) => request<PollResult>(`/api/poll?since=${since}`, { timeout: 40000 })
}
