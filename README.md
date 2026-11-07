# HUST Campus Trade – unified marketplace

Feat: One app, one server, one port. Every student can browse, bid, list items and manage their own listings from the same page. The old split into seller (3001), three consumer pages (3002–3004) and a common server (3000) is gone.

> **Rental is on standby.** Nothing in this build rents items out. The original design lives in `HUST Campus Trade – Prototype.html` for when we pick it up again.

## Run

Requires Node.js 18+. No `npm install` needed (zero dependencies).

```bash
npm start            # http://localhost:3000
npm test             # end-to-end smoke test on port 4100
```

To test with several people at once, open `http://localhost:3000` in different browser profiles or in private windows. Each browser keeps its own identity in `localStorage`, so one browser is one user. A user can bid on other people's listings and sell their own from the same window.

## Docker

```bash
docker compose up --build
```

Port 3000; listing data is kept in the `trade-data` volume. Or: `docker build -t campus-trade . && docker run -p 3000:3000 campus-trade`.

## What the user sees

| Tab | What it does |
|-----|--------------|
| **Market** | Browse and search active listings, open one to see photos and bids, place a bid. Your own listings are tagged **Yours** and cannot be bid on. |
| **Sell** | List an item with description, asking price and up to four photos. |
| **Listings** | Your own listings: live bids, **Suspend & ask next**, **Mark sold**, **Cancel listing**. |
| **My bids** | Every bid you placed, filterable by Ongoing / Suspended / Won / Ended; answer interest requests; cancel a bid. |

## Structure

```
campus-trade/
├── config.js            PORT, CORS, categories, data file (env-overridable)
├── server/
│   ├── server.js        static UI + REST + SSE on one port, validation, broadcasting
│   └── store.js         JSON-file persistence (swap for a DB later)
├── public/
│   ├── index.html       the single app shell (4-tab nav)
│   ├── app.js           unified client: market, sell, listings, my bids
│   ├── api.js           fetch helpers + EventSource (same origin)
│   └── styles.css
├── test/smoke.js
├── data/                db.json is created here at runtime
└── Dockerfile  docker-compose.yml  .dockerignore  .env.example  .gitignore  package.json
```

## API (unchanged)

| Method | Path | Purpose |
|--------|------|---------|
| GET  | `/api/items` | all listings, newest first (each includes its `bids`) |
| POST | `/api/items` | `{name, price, category, condition, description, seller, sellerId, photos?}` |
| POST | `/api/items/:id/sold` | `{sellerId}` – marks sold, records the front-runner as winner |
| POST | `/api/items/:id/cancel` | `{sellerId}` – cancels the listing and ends its active bids |
| POST | `/api/items/:id/bids` | `{bidder, bidderId, amount}` – any positive amount; **403 if `bidderId` is the listing's `sellerId`** |
| POST | `/api/items/:id/bids/:bidId/suspend` | `{sellerId}` – suspends the front-runner and asks the next bidder |
| POST | `/api/items/:id/bids/:bidId/cancel` | `{bidderId}` – buyer cancels their own bid |
| POST | `/api/items/:id/bids/:bidId/interest` | `{bidderId, interested}` – buyer answers an interest request |
| GET  | `/api/events` | SSE: `item:created`, `bid:placed`, `item:updated` |
| GET  | `/health` | liveness check |

## What changed in the merge

1. **One process and port** (`PORT`, default 3000) serves the UI and the API, so there is no cross-origin traffic and no `/config.js` hand-off.
2. **One identity per browser.** `ct.sellerId` and `ct.bidderId` became a single `ct.userId`; `ct.sellerName` and `ct.bidderName` became `ct.userName`. The server still receives `sellerId` and `bidderId` exactly as before, so `store.js` logic is untouched.
3. **New rule:** you cannot bid on your own listing (server returns 403, the UI hides the bid form). With separate apps this could not happen; with one identity it could.
4. **New toast:** a buyer is told when a seller's suspension asks them to confirm interest.
5. **CORS is off by default** because UI and API share an origin. Set `CORS_ORIGIN` only if the UI is hosted elsewhere.
6. Removed: `seller/`, `consumer/`, `shared/static-server.js`, `start-all.js`, and the `SELLER_PORT`, `CONSUMER*_PORT`, `SERVER_PORT` settings.

Existing `data/db.json` files load unchanged. Old listings carry the old `sellerId` values, so they stay owned by the browsers that created them and will not appear under **Listings** in a new browser.

## Rental, when we pick it back up

The prototype's rental model adds per-hour price, availability hours, rules and a deposit. A clean way to bring it in is a `type: 'sale' | 'rent'` field on items plus a rental request flow in `store.js`, with a Market toggle and a type picker on **Sell**. The unified identity and event stream already support it.

## Deployment notes

- Behind a reverse proxy, disable response buffering for `/api/events` (the server already sends `X-Accel-Buffering: no` for nginx).
- Identity is a random per-browser id plus a typed name. There is no login yet, and `sellerId` is not a secret, so this is trust-based until real auth is added.
- Photos are optional: up to four JPEG, PNG, WebP or GIF images of at most 1 MB each.

