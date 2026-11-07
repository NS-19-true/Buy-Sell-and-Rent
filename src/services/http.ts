import Taro from '@tarojs/taro'

/**
 * API origin, injected at build time from .env.development / .env.production.
 * In a released mini program this MUST be an https:// domain listed under
 * "request legal domain" in the WeChat admin console.
 */
export const API_BASE = (process.env.TARO_APP_API_BASE || '').replace(/\/+$/, '')

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
    throw new Error('Network problem. Check your connection and try again.')
  }
  if (res.statusCode < 200 || res.statusCode >= 300) {
    const message = res.data && (res.data as { error?: string }).error
    throw new Error(message || `Request failed (${res.statusCode})`)
  }
  return res.data as T
}

export const post = <T>(path: string, data: object) => request<T>(path, { method: 'POST', data })
