import { Image, Text, View } from '@tarojs/components'
import { emojiFor, tintFor } from '../utils/format'

interface Props {
  photo?: string
  category: string
  /** card (market grid) | thumb (listings tab) | hero (detail page) */
  size: 'card' | 'thumb' | 'hero'
}

/** A listing photo, or a tinted emoji tile when the seller added none. */
export default function Pic({ photo, category, size }: Props) {
  if (photo) return <Image className={`pic pic-${size}`} src={photo} mode='aspectFill' lazyLoad />
  return (
    <View className={`pic pic-${size}`} style={{ background: tintFor(category) }}>
      <Text>{emojiFor(category)}</Text>
    </View>
  )
}
