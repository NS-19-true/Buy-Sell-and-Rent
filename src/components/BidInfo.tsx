import { Text, View } from '@tarojs/components'
import type { Item } from '../types'
import { formatTime, rankedForDisplay, topBid } from '../utils/format'

/** Asking price, current top bid and the 8 best bids (the detail page's live section). */
export default function BidInfo({ item }: { item: Item }) {
  const top = topBid(item)
  return (
    <View>
      <View className='row'><Text>Asking price</Text><Text className='bold'>¥{item.price}</Text></View>
      <View className='row'>
        <Text>Current top bid</Text>
        <Text className={`bold ${top !== null ? 'green' : ''}`}>{top !== null ? '¥' + top : 'No bids yet'}</Text>
      </View>
      {item.bids.length > 0 && (
        <View className='log'>
          {rankedForDisplay(item.bids).slice(0, 8).map((b) => (
            <View key={b.id} className='log-row'>
              <Text>{b.bidder}</Text>
              <Text className='log-end'>
                <Text className='bold'>¥{b.amount}</Text>{' '}
                <Text className='dim'>{b.status === 'suspended' ? 'suspended' : formatTime(b.at)}</Text>
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
