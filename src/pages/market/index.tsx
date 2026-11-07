import { useMemo, useState } from 'react'
import Taro, { useDidShow, usePullDownRefresh } from '@tarojs/taro'
import { Input, Text, View } from '@tarojs/components'
import Chips from '../../components/Chips'
import Pic from '../../components/Pic'
import { isMine, refresh, updateTabBadges, useStore } from '../../store'
import { listingStatus, topBid } from '../../utils/format'
import { toast } from '../../utils/ui'

export default function Market() {
  const s = useStore()
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')

  useDidShow(() => updateTabBadges())
  usePullDownRefresh(() => {
    refresh().catch((e: Error) => toast(e.message)).finally(() => Taro.stopPullDownRefresh())
  })

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return s.items
      .filter((i) => listingStatus(i) === 'active')
      .filter((i) => (cat === 'All' || i.category === cat) && (i.name + i.category + i.description).toLowerCase().includes(needle))
  }, [s.items, cat, q])

  return (
    <View className='page'>
      <View className='live-row'>
        <View className={`live ${s.live ? 'on' : ''}`} />
        <Text className='dim'>{s.live ? 'Live · connected to server' : 'Connecting…'}</Text>
      </View>
      <Input
        className='search'
        type='text'
        confirmType='search'
        placeholder='Search bikes, fridges, books...'
        value={q}
        onInput={(e) => setQ(e.detail.value)}
      />
      <Chips
        options={['All', ...s.categories].map((c) => ({ key: c, label: c }))}
        value={cat}
        onChange={setCat}
      />
      {list.length ? (
        <View className='grid'>
          {list.map((i) => {
            const top = topBid(i)
            return (
              <View
                key={i.id}
                className='item'
                hoverClass='item-hover'
                onClick={() => Taro.navigateTo({ url: `/pages/detail/index?id=${i.id}` })}
              >
                <Pic photo={i.photos && i.photos[0]} category={i.category} size='card' />
                <View className='meta'>
                  <View className='name'>{i.name}</View>
                  <View>
                    <Text className='tag'>{i.condition}</Text>
                    {isMine(i) && <Text className='tag'>Yours</Text>}
                    {top !== null && <Text className='dim'>Top bid ¥{top}</Text>}
                  </View>
                  <View className='price'>¥{i.price}</View>
                </View>
              </View>
            )
          })}
        </View>
      ) : (
        <View className='empty'>
          {!s.loaded ? 'Loading…' : s.items.length ? 'No items match these filters.' : 'Nothing listed yet. New items appear here instantly.'}
        </View>
      )}
    </View>
  )
}
