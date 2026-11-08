# HUST Campus Trade – WeChat mini program (Taro)

One app where every student can browse, bid, list items and manage their own listings. The client is now a **Taro 4 + React + TypeScript** project that compiles to a **WeChat mini program**; the Node API behind it is unchanged apart from one new endpoint.
> **Rental is on standby.** Nothing in this build rents items out. The original design lives in `HUST Campus Trade – Prototype.html` for when we pick it up again.

**Finishing the WeChat side (AppID, HTTPS domain, review, release) is in [`WECHAT_INTEGRATION.md`](./WECHAT_INTEGRATION.md).**

## Quick start

Requires Node.js 18+ (Linux/macOS/Windows). WeChat DevTools is **optional** — it has no Linux build, but this repo ships `miniprogram-ci` integration (`npm run ci:preview`, `npm run ci:upload`) so phone testing and uploads work straight from Ubuntu. See [`WECHAT_INTEGRATION.md`](./WECHAT_INTEGRATION.md) step 1 for the one-time CI key setup.

```bash
npm install
npm start                # API on http://localhost:3000   (terminal 1)
npm run dev:weapp        # compiles the mini program to dist/ and watches   (terminal 2)
```

To see it running: use WeChat DevTools on a Windows/macOS machine (**Import project → the `dist/` folder**, test AppID `touristappid` is preset, tick **Details → Local Settings → Do not verify valid domain names**), or once you have a real AppID + CI key skip the simulator entirely and scan a device preview from Ubuntu: `npm run ci:preview -- --desc "phone test"`, then open `preview.jpg` in WeChat with debug mode on.

| Command | What it does |
|---------|--------------|
| `npm start` | API server (REST + long-poll live updates) |
| `npm run dev:weapp` | Taro dev build, rebuilds on save, reads `.env.development` |
| `npm run build:weapp` | Production build into `dist/`, reads `.env.production` |
| `npm run ci:preview` | Build + generate a scannable phone-preview QR (`preview.jpg`) via miniprogram-ci |
| `npm run ci:upload` | Build + upload the dev version to mp.weixin.qq.com via miniprogram-ci |
| `npm run typecheck` | Strict TypeScript check of the mini program |
| `npm test` | End-to-end API smoke test (port 4100) |

## What the user sees

| Tab | What it does |
|-----|--------------|
| **Market** | Browse and search active listings (pull down to refresh). Tap one to open the **Item** page with photos and bids, and place a bid. Your own listings are tagged **Yours** and cannot be bid on. |
| **Sell** | List an item with description, asking price and up to four photos from the album or camera. |
| **Listings** | Your own listings: live bids, **Suspend & ask next**, **Mark sold**, **Cancel listing**. |
| **My bids** | Every bid you placed, filterable by Ongoing / Suspended / Won / Ended; answer interest requests; cancel a bid. |

Tab-bar badges show how many listings and bids you have.

## Structure

```
campus-trade/
├── src/                          ← the mini program (Taro + React + TypeScript)
│   ├── app.ts  app.config.ts     app lifecycle (live sync on/off), pages + tab bar
│   ├── app.scss                  all styles (ported from the old styles.css)
│   ├── pages/
│   │   ├── market/  sell/  mine/  bids/    the four tabs
│   │   └── detail/                         item page (was the slide-up sheet)
│   ├── components/               Btn, Pic, Chips, BidInfo
│   ├── store/index.ts            app state, identity, live-sync loop, tab badges
│   ├── services/                 http.ts (Taro.request), api.ts (all endpoints)
│   ├── utils/                    format.ts, ui.ts (toast/confirm), photos.ts (chooseMedia → data URI)
│   ├── types.ts                  Item / Bid / events
│   └── assets/tab/               tab-bar icons
├── config/                       Taro build config (px → rpx, env)
├── scripts/ci.js                 miniprogram-ci upload/preview wrapper (works on Linux)
├── .env.development  .env.production    TARO_APP_API_BASE (API origin)
├── project.config.json           mini program project config (set your real appid here)
├── server/
│   ├── server.js                 REST + long-poll (+ SSE) on one port
│   ├── store.js                  JSON-file persistence (swap for a DB later)
│   └── config.js                 PORT, categories, poll hold time (env-overridable)
├── test/smoke.js
├── data/                         db.json is created here at runtime
├── WECHAT_INTEGRATION.md         ← remaining steps to ship on WeChat
└── Dockerfile  docker-compose.yml  .dockerignore  .env.example  .gitignore  package.json
```

## What changed in the migration

A mini program is not a browser, so each web-only piece was replaced with its mini-program equivalent. Business rules and API payloads did not change.

| Web version | Mini program version |
|-------------|----------------------|
| `index.html` + `app.js` string templates + `document.querySelector` | React function components on Taro (`View`, `Text`, `Input`, `Picker`, …) |
| One page with a 4-button nav | Native **tab bar** with 4 tab pages |
| Slide-up detail `sheet` | Separate **Item page** (`/pages/detail/index?id=`), native back button |
| `fetch` | `Taro.request` (`services/http.ts`) |
| `EventSource` (SSE) | **Long-poll** `GET /api/poll?since=<rev>` driven by `store/index.ts` |
| `localStorage` | `Taro.getStorageSync` / `setStorageSync` |
| `<input type=file>` + `FileReader` | `Taro.chooseMedia` + `getFileSystemManager().readFile`, auto-recompressed to fit 1 MB |
| `window.confirm` / toast `<div>` | `Taro.showModal` / `Taro.showToast` |
| Nav badge “(3)” | Native tab-bar badge |
| `styles.css` (px, 390px phone frame) | `app.scss`; Taro converts px → rpx with `designWidth: 390`, so the sizes carry over 1:1 |
| `<select>` | `Picker` |
| Time via `toLocaleTimeString` | Hand-rolled `HH:mm` (Intl is not reliable in every mini-program runtime) |

Small additions that suit the platform: pull-to-refresh on Market, removable photo thumbnails on Sell, and live sync that pauses when the mini program is in the background and fully resyncs when it returns.

Dropped: the dark-mode media query and the desktop “phone frame” (the mini program already is a phone). `public/` and the static-file server were removed; **the server no longer serves any UI**.

## API

Unchanged endpoints, plus two for the mini program:

| Method | Path | Purpose |
|--------|------|---------|
| GET  | `/api/items` | all listings, newest first (each includes its `bids`) |
| POST | `/api/items` | `{name, price, category, condition, description, seller, sellerId, photos?}` |
| POST | `/api/items/:id/sold` | `{sellerId}` – marks sold, records the front-runner as winner |
| POST | `/api/items/:id/cancel` | `{sellerId}` – cancels the listing and ends its active bids |
| POST | `/api/items/:id/bids` | `{bidder, bidderId, amount}` – **403 if `bidderId` is the listing's `sellerId`** |
| POST | `/api/items/:id/bids/:bidId/suspend` | `{sellerId}` – suspends the front-runner and asks the next bidder |
| POST | `/api/items/:id/bids/:bidId/cancel` | `{bidderId}` – buyer cancels their own bid |
| POST | `/api/items/:id/bids/:bidId/interest` | `{bidderId, interested}` – buyer answers an interest request |
| GET  | `/api/meta` | categories and conditions |
| GET  | **`/api/rev`** | `{rev}` – current event revision (start of a sync) |
| GET  | **`/api/poll?since=N`** | long-poll: returns `{rev, events[]}` as soon as events newer than `N` exist, or empty after `POLL_HOLD_MS` (25 s). `{reset: true}` means “you are out of date, reload `/api/items`” (server restarted or backlog overflowed). `bid:placed` / `item:updated` payloads omit `photos`; `item:created` includes them. |
| GET  | `/api/events` | SSE with the same events (kept for browser clients; the mini program cannot use it) |
| GET  | `/health` | liveness check |

## Docker (API only)

```bash
docker compose up --build
```

Port 3000; listing data is kept in the `trade-data` volume. WeChat requires HTTPS, so put a TLS reverse proxy in front for real use (nginx example in `WECHAT_INTEGRATION.md`).

## Notes

- Identity is a random per-device id plus a typed name. There is no login yet and `sellerId` is not a secret, so this is trust-based. `WECHAT_INTEGRATION.md` (step 8) shows how to move to `wx.login`.
- Photos are optional: up to four images of at most 1 MB each. They are still stored as base64 inside `db.json`; fine for a pilot, see the hardening list before a wide release.
- Existing `data/db.json` files load unchanged. Old listings carry `sellerId` values from web browsers, so no mini-program user owns them.
- `npm run build:weapp` output is about 0.5 MB, comfortably under WeChat's 2 MB main-package limit.
