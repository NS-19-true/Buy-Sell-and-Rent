import { View } from '@tarojs/components'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'amber'
  small?: boolean
  disabled?: boolean
  className?: string
  onClick?: () => void
}

// A View-based button: <button> is styled by the WeChat runtime and fights custom CSS.
export default function Btn({ children, variant = 'primary', small, disabled, className = '', onClick }: Props) {
  const cls = `btn btn-${variant}${small ? ' btn-small' : ''}${disabled ? ' is-disabled' : ''} ${className}`
  return (
    <View className={cls} hoverClass={disabled ? 'none' : 'btn-hover'} onClick={disabled ? undefined : onClick}>
      {children}
    </View>
  )
}
