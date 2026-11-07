import { useState } from 'react'
import { useDidShow } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import Btn from '../../components/Btn'
import Pic from '../../components/Pic'
import { api } from '../../services/api'
import { myListings, updateTabBadges, upsert, useStore } from '../../store'
import type { Item } from '../../types'
import { formatTime, rankedForDisplay, topBid } from '../../utils/format'
import { confirm, toast } from '../../utils/ui'

const interestNote = (interest?: string) =>
  interest === 'requested' ? ' · awaiting interest'
    : interest === 'declined' ? ' · not interested'
      : interest === 'interested' ? ' · interested' : ''

export default function Mine() {
  const s = useStore()
  const [busy, setBusy] = useState<string | null>(null)
  useDidShow(() => updateTabBadges())

  const listings = myListings(s)

  // Confirm (optional) -> call the API -> store the fresh listing -> toast.
  async function run(key: string, ask: [string, string] | null, call: () => Promise<Item>, done: string) {
    if (busy) return
    if (ask && !(await confirm(ask[0], ask[1]))) return
    setBusy(key)
    try {
      upsert(await call())
      toast(done)
    } catch (e) {
      toast((e as Error).message)
    } finally {
      setBusy(null)
    }
  }

  if (!listings.length) {
    return <View className='empty'>You have not listed anything yet.{'\n'}Use “Sell” to add your first one.</View>
  }

  return (
    <View className='page'>
      {listings.map((i) => {
        const top = topBid(i)
        const open = !i.status || i.status === 'active'
        const pending = i.bids.find((b) => b.id === i.pendingBidId)
        return (
          <View key={i.id} className={`sec flush spaced ${i.id === s.flashId ? 'flash' : ''}`}>
            <View className='listing-head'>
              <Pic photo={i.photos && i.photos[0]} category={i.category} size='thumb' />
              <View className='grow'>
                <View className='name tight'>{i.name}</View>
                <View><Text className='tag'>{i.condition}</Text><Text className='dim'>{i.category}</Text></View>
              </View>
            </View>
            <View className='row top-gap'><Text>Asking price</Text><Text className='bold'>¥{i.price}</Text></View>
            <View className='row'><Text>Listing status</Text><Text className='bold'>{i.status || 'active'}</Text></View>
            <View className='row'>
              <Text>Top bid</Text>
              <Text className={`bold ${top ? 'green' : 'dim'}`}>{top ? '¥' + top : 'No bids yet'}</Text>
            </View>
            {i.pendingBidId && <View className='note'>Waiting for {pending ? pending.bidder : 'a bidder'} to confirm interest.</View>}

            {i.bids.length > 0 && (
              <View className='log'>
                {rankedForDisplay(i.bids).map((b) => {
                  const front = i.frontRunnerBidId ? i.frontRunnerBidId === b.id : b.amount === top && b.status === 'active'
                  const canSuspend = open && front && !i.pendingBidId
                  return (
                    <View key={b.id} className='log-row'>
                      <View className='grow'>
                        <Text>{b.bidder} </Text>
                        {front && <Text className='bold dim'>· front-runner</Text>}
                        <View className='dim'>{b.status || 'active'}{interestNote(b.interest)}</View>
                      </View>
                      <View className='right log-end'>
                        <View><Text className='bold'>¥{b.amount}</Text> <Text className='dim'>{formatTime(b.at)}</Text></View>
                        {canSuspend && (
                          <Btn
                            variant='amber' small className='suspend'
                            disabled={busy !== null}
                            onClick={() => run(`s${b.id}`, null, () => api.suspendBid(i.id, b.id, s.userId),
                              'Bid suspended; the next bidder has been asked to confirm.')}
                          >Suspend &amp; ask next</Btn>
                        )}
                      </View>
                    </View>
                  )
                })}
              </View>
            )}

            {open && (
              <View className='actions'>
                <Btn
                  small disabled={busy !== null} className='grow'
                  onClick={() => run(`m${i.id}`, ['Mark sold', 'Mark this listing as sold? The current front-runner will be marked as the winner.'],
                    () => api.markSold(i.id, s.userId), 'Listing marked sold.')}
                >Mark sold</Btn>
                <Btn
                  small variant='secondary' disabled={busy !== null} className='grow gap-l'
                  onClick={() => run(`c${i.id}`, ['Cancel listing', 'Cancel this listing?'],
                    () => api.cancelListing(i.id, s.userId), 'Listing cancelled.')}
                >Cancel listing</Btn>
              </View>
            )}
          </View>
        )
      })}
    </View>
  )
}
