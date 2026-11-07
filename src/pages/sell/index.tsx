import { useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { Image, Input, Picker, Text, Textarea, View } from '@tarojs/components'
import Btn from '../../components/Btn'
import { api } from '../../services/api'
import { setUserName, updateTabBadges, upsert, useStore } from '../../store'
import { MAX_PHOTOS, toDataUrl } from '../../utils/photos'
import { toast } from '../../utils/ui'

interface Photo { path: string; dataUrl: string }

export default function Sell() {
  const s = useStore()
  const [name, setName] = useState(s.userName)
  const [title, setTitle] = useState('')
  const [catIndex, setCatIndex] = useState(0)
  const [condIndex, setCondIndex] = useState(0)
  const [price, setPrice] = useState('')
  const [desc, setDesc] = useState('')
  const [photos, setPhotos] = useState<Photo[]>([])
  const [busy, setBusy] = useState(false)

  useDidShow(() => updateTabBadges())

  async function addPhotos() {
    let chosen
    try {
      chosen = await Taro.chooseMedia({
        count: MAX_PHOTOS - photos.length,
        mediaType: ['image'],
        sizeType: ['compressed'],
        sourceType: ['album', 'camera']
      })
    } catch {
      return // user cancelled the picker
    }
    Taro.showLoading({ title: 'Preparing…', mask: true })
    try {
      const added: Photo[] = []
      for (const file of chosen.tempFiles) added.push({ path: file.tempFilePath, dataUrl: await toDataUrl(file.tempFilePath) })
      setPhotos((prev) => prev.concat(added).slice(0, MAX_PHOTOS))
    } catch (e) {
      toast((e as Error).message)
    } finally {
      Taro.hideLoading()
    }
  }

  async function publish() {
    const trimmed = title.trim()
    const value = Number(price)
    if (!trimmed || !(value > 0)) return toast('Add an item name and a price')
    setUserName(name)
    setBusy(true)
    try {
      const created = await api.createItem({
        name: trimmed,
        price: value,
        sellerId: s.userId,
        seller: name.trim(),
        category: s.categories[catIndex],
        condition: s.conditions[condIndex],
        description: desc,
        photos: photos.map((p) => p.dataUrl)
      })
      upsert(created)
      setTitle(''); setPrice(''); setDesc(''); setPhotos([]); setCatIndex(0); setCondIndex(0)
      toast('Listing published')
      Taro.switchTab({ url: '/pages/mine/index' })
    } catch (e) {
      toast((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <View className='page'>
      <View className='sec flush'>
        <View className='h3'>List an item for sale</View>

        <View className='label'>Your name / dorm</View>
        <Input className='field' type='text' maxlength={40} placeholder='e.g. Amir, Dorm 6' value={name} onInput={(e) => setName(e.detail.value)} />

        <View className='label'>Item name</View>
        <Input className='field' type='text' maxlength={80} placeholder='e.g. Electric kettle' value={title} onInput={(e) => setTitle(e.detail.value)} />

        <View className='label'>Category</View>
        <Picker mode='selector' range={s.categories} value={catIndex} onChange={(e) => setCatIndex(Number(e.detail.value))}>
          <View className='field picker'><Text>{s.categories[catIndex]}</Text><Text className='dim'>▾</Text></View>
        </Picker>

        <View className='label'>Condition</View>
        <Picker mode='selector' range={s.conditions} value={condIndex} onChange={(e) => setCondIndex(Number(e.detail.value))}>
          <View className='field picker'><Text>{s.conditions[condIndex]}</Text><Text className='dim'>▾</Text></View>
        </Picker>

        <View className='label'>Original (asking) price (¥)</View>
        <Input className='field' type='digit' value={price} onInput={(e) => setPrice(e.detail.value)} />

        <View className='label'>Description</View>
        <Textarea className='field area' maxlength={500} placeholder='Age, any damage, what is included' value={desc} onInput={(e) => setDesc(e.detail.value)} />

        <View className='label'>Photos (up to {MAX_PHOTOS}, 1 MB each)</View>
        <View className='photo-preview'>
          {photos.map((p, n) => (
            <View key={p.path} className='photo-tile'>
              <Image className='photo-img' src={p.path} mode='aspectFill' />
              <Text className='photo-x' onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== n))}>×</Text>
            </View>
          ))}
          {photos.length < MAX_PHOTOS && (
            <View className='photo-add' hoverClass='item-hover' onClick={addPhotos}><Text>＋</Text></View>
          )}
        </View>

        <Btn disabled={busy} onClick={publish} className='publish'>Publish listing</Btn>
      </View>
    </View>
  )
}
