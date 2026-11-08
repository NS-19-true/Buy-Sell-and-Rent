import Taro from '@tarojs/taro'
import { API_BASE, IS_PROD } from '../config'

export { API_BASE }

export async function request<T>(
  path: string,
  options: { method?: 'GET' | 'POST'; data?: object; timeout?: number } = {}
): Promise<T> {
  let res: Taro.request.SuccessCallbackResult
  try {
    res = await Taro.request({
      url: API_BASE + path,
      method: options.method || 'GET',
      data: options.data,
      header: { 'content-type': 'application/json' },
      timeout: options.timeout ?? 15000
    })
  } catch (e) {
    console.warn('[request failed]', API_BASE + path, e)
    // While developing, say exactly which address failed: it is almost always the address in src/config.ts.
    throw new Error(IS_PROD ? 'Network problem. Check your connection and try again.' : `Cannot reach ${API_BASE}. Is the server running, and is this address right?`)
  }
  if (res.statusCode < 200 || res.statusCode >= 300) {
    const message = res.data && (res.data as { error?: string }).error
    throw new Error(message || `Request failed (${res.statusCode})`)
  }
  return res.data as T
}

export const post = <T>(path: string, data: object) => request<T>(path, { method: 'POST', data })
