import { useEffect, useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { Image, Input, ScrollView, Text, View } from '@tarojs/components'
import BidInfo from '../../components/BidInfo'
import Btn from '../../components/Btn'
import Pic from '../../components/Pic'
import { api } from '../../services/api'
import { isMine, setUserName, upsert, useStore } from '../../store'
import { listingStatus } from '../../utils/format'

export default function Detail() {
  const { params } = useRouter()
  const id = Number(params.id)
  const s = useStore()
  const item = s.items.find((x) => x.id === id)

  const [name, setName] = useState(s.userName)
  const [amount, setAmount] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const itemName = item ? item.name : ''
  useEffect(() => {
    if (itemName) Taro.setNavigationBarTitle({ title: itemName })
  }, [itemName])

  if (!item) {
    return <View className='empty'>{s.loaded ? 'This listing no longer exists.' : 'Loading…'}</View>
  }

  const own = isMine(item, s.userId)
  const active = listingStatus(item) === 'active'
  const photos = item.photos || []

  async function placeBid() {
    if (!item) return
    const value = Number(amount)
    if (!(value > 0)) return setMsg({ ok: false, text: 'Enter a valid bid amount first.' })
    setUserName(name)
    setBusy(true)
    try {
      upsert(await api.placeBid(item.id, { bidder: name.trim(), bidderId: s.userId, amount: value }))
      setMsg({ ok: true, text: `Bid of ¥${value} sent. ${item.seller} can see it right now.` })
      setAmount('')
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <View className='detail'>
      {photos.length ? (
        <ScrollView scrollX enableFlex className='photo-gallery' showScrollbar={false}>
          {photos.map((p, n) => (
            <Image key={n} className='gallery-img' src={p} mode='aspectFill' />
          ))}
        </ScrollView>
      ) : (
        <Pic category={item.category} size='hero' />
      )}

      {!active && <View className='note sheet-margin'>This listing is {listingStatus(item)}.</View>}

      <View className='sec'>
        <View className='title'>{item.name}</View>
        <View className='dim'>Posted by {own ? 'you' : item.seller}</View>
      </View>

      <View className='sec'>
        <View className='h3'>Condition</View>
        <View className='row'><Text>State</Text><Text className='bold'>{item.condition}</Text></View>
        <View className='row'><Text>Category</Text><Text>{item.category}</Text></View>
        <View className='desc'>{item.description}</View>
      </View>

      <View className='sec'>
        <View className='h3'>{own ? 'Bids on your listing' : 'Bid instead of chatting'}</View>
        <BidInfo item={item} />
        {own && active && <View className='note'>This is your listing. Manage bids from the Listings tab.</View>}
        {!own && active && (
          <View>
            <View className='label'>Your name</View>
            <Input className='field' type='text' maxlength={40} placeholder='e.g. Linh, Friendship Apt' value={name} onInput={(e) => setName(e.detail.value)} />
            <View className='inl'>
              <Input className='field grow' type='digit' placeholder='Your bid in ¥' value={amount} onInput={(e) => setAmount(e.detail.value)} />
              <Btn disabled={busy} onClick={placeBid} className='inl-btn'>Place bid</Btn>
            </View>
            {msg && <View className={msg.ok ? 'ok' : 'note'}>{msg.text}</View>}
          </View>
        )}
      </View>
      <View className='detail-end' />
    </View>
  )
}
