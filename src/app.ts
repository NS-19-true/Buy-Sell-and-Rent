import type { PropsWithChildren } from 'react'
import { useDidHide, useDidShow } from '@tarojs/taro'
import { startSync, stopSync } from './store'
import './app.scss'

function App({ children }: PropsWithChildren) {
  // Live updates run only while the mini program is in the foreground.
  useDidShow(() => startSync())
  useDidHide(() => stopSync())
  return children
}

export default App
