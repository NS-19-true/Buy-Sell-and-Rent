/// <reference types="@tarojs/taro" />

declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.scss'

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'h5' | 'swan' | 'alipay' | 'tt' | 'qq' | 'jd'
    /** Base URL of the Campus Trade API, no trailing slash. Set in .env.development / .env.production. */
    TARO_APP_API_BASE: string
  }
}
