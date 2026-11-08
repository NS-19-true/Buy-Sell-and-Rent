/**
 * ============================================================
 *  THE ONE FILE YOU EDIT to tell the mini program where the
 *  server (the thing started by `npm start`) lives.
 * ============================================================
 */

// Used by `npm run dev:weapp` (what you run while testing).
//   - Testing only inside the DevTools simulator on the SAME computer: http://localhost:3000 works.
//   - Testing on your phone: use your computer's address on the Wi-Fi, e.g. http://192.168.1.20:3000
//     (find it with:  hostname -I   -> use the first number, like 192.168.1.20)
const DEV_API_BASE = 'http://10.11.173.85:3000'

// Used by `npm run build:weapp` (the version you upload to WeChat). WeChat only allows
// https:// addresses here, and the domain must be registered in the WeChat admin console.
const PROD_API_BASE = 'https://api.your-domain.example'

export const IS_PROD = process.env.NODE_ENV === 'production'

// An optional TARO_APP_API_BASE in a .env file still wins, but you do not need one.
export const API_BASE = (process.env.TARO_APP_API_BASE || (IS_PROD ? PROD_API_BASE : DEV_API_BASE)).replace(/\/+$/, '')
