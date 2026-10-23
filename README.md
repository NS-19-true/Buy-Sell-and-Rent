# HUST Campus Trade – iterative marketplace

This was the first iteration of our work we made using the protoype as the reference.

Three processes on three localhost ports. Seller and consumer never talk to each other directly; everything goes through the common server.

| Process  | Port | Role |
|----------|------|------|
| `server`   | 3000 | Common channel: REST API + live event stream (SSE), JSON-file storage |
| `seller`   | 3001 | **User 1** – lists items with description and original price, sees bids live |
| `consumer` | 3002 | **User 2** – browses listings, places bids, sees new items and rival bids live |

## Run

Requires Node.js 18+. No `npm install` needed (zero dependencies).

```bash
npm start            # starts all three
# or individually, in three terminals:
npm run server
npm run seller
npm run consumer
```

Open http://localhost:3001 (seller) and http://localhost:3002 (consumer) side by side.
Publish an item on the seller side → it appears on the consumer side instantly → bid on it → the bid shows up on the seller side instantly.

```bash
npm test             # end-to-end smoke test on ports 4100-4102
```

## Docker

```bash
docker compose up --build
```

Same three ports; listing data is kept in the `trade-data` volume. Or run all three in one container:
`docker build -t campus-trade . && docker run -p 3000-3002:3000-3002 campus-trade`.

## Structure

```
campus-trade/
├── config.js                 ports, CORS, categories, data file (env-overridable)
├── start-all.js              launches the three processes
├── server/
│   ├── server.js             REST + SSE endpoints, validation, broadcasting
│   └── store.js              JSON-file persistence (swap for a DB later)
├── seller/
│   ├── server.js             serves the seller UI on :3001
│   └── public/{index.html,app.js}
├── consumer/
│   ├── server.js             serves the consumer UI on :3002
│   └── public/{index.html,app.js}
├── shared/
│   ├── static-server.js      tiny static file server used by both UIs
│   ├── api.js                browser client: fetch helpers + EventSource
│   └── styles.css            look & feel from the prototype
├── test/smoke.js
├── data/                     db.json is created here at runtime
├── Dockerfile  docker-compose.yml  .dockerignore  .env.example  .gitignore
└── package.json
```

## API

| Method | Path | Purpose |
|--------|------|---------|
| GET  | `/api/items` | all listings, newest first (each includes its `bids`) |
| POST | `/api/items` | `{name, price, category, condition, description, seller, sellerId}` |
| POST | `/api/items/:id/bids` | `{bidder, amount}` – must beat the current top bid (409 otherwise) |
| GET  | `/api/events` | SSE stream: `item:created`, `bid:placed` |
| GET  | `/health` | liveness check |

## Deployment notes

- Set `CORS_ORIGIN` to the real seller/consumer origins (comma-separated) instead of `*`.
- The UIs reach the server at `<same hostname>:SERVER_PORT`. Behind a reverse proxy, either expose port 3000 or change the `base` line in `shared/api.js` to a path like `/api`.
- If a proxy sits in front of the server, disable response buffering for `/api/events` (the server already sends `X-Accel-Buffering: no` for nginx).
- Identity is a random per-browser id plus a typed name. There is no login yet.


## Apparent Issues Found During Unit Testing

1. A user cannot bid lower then highest bid amount.
2. User cannot see own biddings.
3. Seller cannot upload photos.

