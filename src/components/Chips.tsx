import { ScrollView, Text } from '@tarojs/components'

interface Props {
  options: Array<{ key: string; label: string }>
  value: string
  onChange: (key: string) => void
}

export default function Chips({ options, value, onChange }: Props) {
  return (
    <ScrollView scrollX enableFlex className='chips' showScrollbar={false}>
      {options.map((o) => (
        <Text key={o.key} className={`chip ${o.key === value ? 'on' : ''}`} onClick={() => onChange(o.key)}>
          {o.label}
        </Text>
      ))}
    </ScrollView>
  )
}
