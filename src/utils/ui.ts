import Taro from '@tarojs/taro'

/** Short message at the bottom of the screen (replaces the web app's toast div). */
export function toast(title: string, duration = 2400) {
  Taro.showToast({ title, icon: 'none', duration })
}

/** Native confirm dialog; resolves true when the user taps OK. */
export async function confirm(title: string, content: string): Promise<boolean> {
  const res = await Taro.showModal({ title, content, confirmText: 'Yes', cancelText: 'No' })
  return !!res.confirm
}
