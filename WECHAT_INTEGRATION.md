# Finishing the WeChat integration

The code migration is done: `src/` is a Taro 4 + React + TypeScript mini program, it compiles to `dist/` with `npm run build:weapp`, and it talks to the Node API in `server/`. What is left cannot be done in code alone: it needs your WeChat account, a domain with HTTPS, and WeChat's review. This guide walks through it in order.

> Platform rules (categories, filing, privacy declarations, console menu names) change from time to time. Where this guide names a console menu it gives the English path followed by the Chinese label in brackets. Treat the official docs at <https://developers.weixin.qq.com/miniprogram/en/dev/framework/> and the notices in the admin console as the source of truth.

## At a glance

| # | Step | Where | Blocks |
|---|------|-------|--------|
| 1 | Install tools | your Ubuntu laptop | everything |
| 2 | Run it in WeChat DevTools | your Ubuntu laptop + DevTools (VM) | – |
| 3 | Try it on a real phone | Ubuntu laptop + phone | – |
| 4 | Register the mini program, get an AppID | mp.weixin.qq.com | 6 |
| 5 | Deploy the API behind HTTPS on a domain | your server | 6, 7 |
| 6 | Point the mini program at it | repo + admin console | 7 |
| 7 | Build, upload, test as a trial version | DevTools + admin console | 9 |
| 8 | Replace the trust-based identity with `wx.login` | repo + server | 9 (strongly advised) |
| 9 | Complete compliance items and submit for review | admin console | 10 |
| 10 | Release | admin console | – |

Steps 1 to 3 need nothing but a laptop. You can do them today.

> **Heads-up for Linux users:** this guide assumes your dev machine runs **Ubuntu**. The only piece that does not exist for Linux is **WeChat DevTools** itself (Windows/macOS only) — step 1 explains how to work around that with a small Windows VM while everything else stays on Ubuntu.

---

## 1. Install the tools

Everything below assumes **Ubuntu 22.04 or newer** on your laptop.

- Node.js 18 or newer — Ubuntu's `apt` nodejs is often too old, so use NodeSource:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  node --version    # v20.x
  ```
- Git and build essentials (used by npm packages that compile native code, e.g. some sass versions):
  ```bash
  sudo apt-get install -y git curl build-essential
  ```
- A personal WeChat account that you can scan QR codes with.
- **WeChat DevTools.** There is **no official Linux build** — only Windows and macOS. On Ubuntu you have three options, pick one:
  1. **Windows VM (recommended).** Install GNOME Boxes (`sudo apt-get install gnome-boxes`) or VirtualBox, run Windows in it, and install the stable DevTools build from <https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html>. Share the repo folder so the VM sees `/home/<you>/campus-trade`, or simply clone the repo inside the VM. The API and `npm run dev:weapp` keep running on Ubuntu; DevTools in the VM watches `dist/` through the shared folder and reloads when it changes (enable auto-refresh under **Settings → Project Settings** if it does not).
  2. **Wine.** Some community guides get DevTools running under Wine, but it is unsupported and flaky — use it only if the VM route is impossible for you.
  3. **A Windows/macOS machine borrowed for the few DevTools steps** (import, preview, upload). Everything else in this guide is done on Ubuntu.

```bash
npm install   # run in /home/<you>/campus-trade on Ubuntu
```

## 2. Run it in WeChat DevTools

Two terminals on Ubuntu:

```bash
npm start              # API on http://localhost:3000
npm run dev:weapp      # builds to dist/ and rebuilds on every save
```

Then, in DevTools (inside the Windows VM or on the other machine — see step 1):

1. Open WeChat DevTools, scan the login QR code.
2. **Import project** and pick the **`dist/`** folder (not the repo root). With a shared folder, that is the `campus-trade/dist` path as seen from the VM; with a cloned repo inside the VM, run `npm install && npm run dev:weapp` there instead of on Ubuntu.
3. AppID: choose **Test account** (or keep `touristappid`).
4. Open **Details (详情) → Local Settings (本地设置)** and tick **Do not verify valid domain names, web-view (business domains), TLS versions and HTTPS certificates (不校验合法域名…)**. Without this the simulator refuses to call `http://localhost:3000`.
5. If DevTools runs in a VM and the API runs on Ubuntu, use the Ubuntu host's address instead of `localhost`: put `TARO_APP_API_BASE=http://<ubuntu-ip>:3000` in `.env.development` (find the IP with `hostname -I`, first value). For VirtualBox NAT networking, `10.0.2.2` reaches the host; for bridged or Boxes networking use the LAN IP.

You should see the Market tab with a green “Live · connected to server” dot. Create a listing on the Sell tab, then open a second simulator window or the phone (step 3) to bid on it.

The API origin comes from `.env.development` (`TARO_APP_API_BASE`). Edit `src/` and DevTools reloads.

## 3. Try it on a real phone

`localhost` on a phone means the phone itself, so:

1. Put the phone and the laptop on the same Wi-Fi.
2. Find your laptop's LAN IP and set it in `.env.development`:
   ```bash
   hostname -I          # e.g. "192.168.1.20 172.17.0.1" — take the first address
   ```
   ```
   TARO_APP_API_BASE=http://192.168.1.20:3000
   ```
3. Allow port 3000 through Ubuntu's firewall if `ufw` is enabled. The API already listens on `0.0.0.0`, so nothing else is needed when `ufw` is inactive (check with `sudo ufw status`):
   ```bash
   sudo ufw allow from 192.168.1.0/24 to any port 3000 proto tcp
   ```
   Remove the rule later with `sudo ufw delete allow from 192.168.1.0/24 to any port 3000 proto tcp`.
4. Restart `npm run dev:weapp` (env values are read at build time).
5. In DevTools click **Preview (预览)** and scan the QR code with WeChat.
6. On the phone, open the `···` menu in the mini program and switch on **Enable debugging (打开调试)**. Plain-HTTP and unlisted domains work **only** in debug mode; a trial or released version will not allow them.

## 4. Register the mini program and get an AppID

1. Register at <https://mp.weixin.qq.com> (choose *Mini Program*, 小程序) and verify the email.
2. Pick the account type. A **personal** account is the quickest and is enough for a pilot, but some service categories are only open to organisations. If HUST has an official WeChat entity or a student organisation that can register, ask them; it avoids category limits later.
3. Under **Settings → Basic Settings (设置 → 基础设置)** choose a **service category (服务类目)** that fits a campus item-trading app and check what that category requires. Reviewers compare the app against the category you chose.
4. Copy your **AppID** from **Development → Development Settings (开发 → 开发设置)**. Keep the **AppSecret** private: it only ever goes on the server (step 8), never into the repo or the mini program bundle.
5. Put the AppID in `project.config.json` at the **repo root**:
   ```json
   "appid": "wx0123456789abcdef"
   ```
   Do not edit `dist/project.config.json`; Taro regenerates it on every build.
6. **Filing (备案).** WeChat currently requires mini programs operated from mainland China to complete a mini-program filing before release, and a domain served from a mainland-China server needs ICP filing. Start this early; it can take days to weeks. The admin console has a filing entry that shows the current requirements.

## 5. Deploy the API behind HTTPS

Released mini programs can call **only HTTPS domains** that you have registered, with a certificate from a trusted CA and TLS 1.2 or newer. No raw IP addresses, no `localhost`, and use the standard port 443.

1. Rent a Linux server (Ubuntu LTS is fine, or use a PaaS) and point a domain at it, for example `api.your-domain.example`. If the server is in mainland China, the domain needs ICP filing first.
2. Run the API. The repo already has a Dockerfile — on an Ubuntu server install Docker with:
   ```bash
   sudo apt-get update && sudo apt-get install -y docker.io docker-compose-v2
   ```
   then:
   ```bash
   git clone <your-repo> && cd campus-trade
   sudo docker compose up -d --build        # API on port 3000, data in the trade-data volume
   ```
   Or run it without Docker (`npm start`) under a process manager such as systemd or pm2 (`sudo npm i -g pm2 && pm2 start server/server.js`).
3. Put a TLS reverse proxy in front. On Ubuntu, nginx comes from `apt` and Let's Encrypt certificates from `certbot`:
   ```bash
   sudo apt-get install -y nginx certbot python3-certbot-nginx
   sudo certbot --nginx -d api.your-domain.example   # issues the cert and edits the nginx site
   ```
   Then make sure the nginx site (e.g. `/etc/nginx/sites-available/api`) contains at least:
   ```nginx
   server {
     listen 443 ssl http2;
     server_name api.your-domain.example;

     # certbot fills these paths in for you:
     ssl_certificate     /etc/letsencrypt/live/api.your-domain.example/fullchain.pem;
     ssl_certificate_key /etc/letsencrypt/live/api.your-domain.example/privkey.pem;
     ssl_protocols       TLSv1.2 TLSv1.3;

     # Listing photos travel as base64 inside the JSON body (up to ~5.4 MB for 4 photos).
     # nginx's default of 1m would answer "413" when publishing with photos.
     client_max_body_size 6m;

     location / {
       proxy_pass         http://127.0.0.1:3000;
       proxy_set_header   Host $host;
       proxy_set_header   X-Forwarded-For $remote_addr;
       # The live-update long-poll holds a request for ~25 s (POLL_HOLD_MS). Keep this larger.
       proxy_read_timeout 60s;
     }
   }
   ```
   Apply with `sudo nginx -t && sudo systemctl reload nginx`. Open the firewall: `sudo ufw allow 'Nginx Full'` (and close 3000 to the outside if it was opened: `sudo ufw deny 3000`).
4. Check it from outside:
   ```bash
   curl https://api.your-domain.example/health        # {"ok":true}
   curl https://api.your-domain.example/api/meta
   ```
5. Back up `data/db.json` (the Docker volume). It is the only copy of your listings.

## 6. Point the mini program at the server

1. Edit `.env.production`:
   ```
   TARO_APP_API_BASE=https://api.your-domain.example
   ```
   No trailing slash.
2. In the admin console go to **Development → Development Settings → Server Domain (开发 → 开发设置 → 服务器域名)** and add `https://api.your-domain.example` under **request legal domain (request 合法域名)**.
   - Nothing else needs listing. Photos are sent and shown as `data:` URIs, so the app uses no `uploadFile`, `downloadFile` or `socket` domain today.
   - Domain changes may be limited to a few edits per month. Double-check the spelling.

## 7. Build, upload and test as a trial version

Build on Ubuntu:

```bash
npm run build:weapp         # production build to dist/ (uses .env.production)
```

Then in DevTools (the Windows VM or the other machine — it needs access to the freshly built `dist/`; if you built on Ubuntu with a shared folder, use that path; if you cloned the repo inside the VM, run the build there instead):

1. In DevTools open `dist/` (importing it again is fine after changing the AppID).
2. Untick **Do not verify valid domain names** to see what a real user will see. Every request must still work.
3. Click **Upload (上传)**, give it a version number (`0.3.0`) and a note.
4. In the admin console open **Management → Version Management (管理 → 版本管理)**. Your upload appears under *Development version*. Set it as the **trial version (体验版)**.
5. Add testers under **Management → Member Management (管理 → 成员管理)** and send them the trial QR code.

Test list for the trial build, on at least one iPhone and one Android phone:

- [ ] Market loads and shows the green “Live” dot; pull down refreshes.
- [ ] Sell: pick photos from the album and camera, publish, listing shows up on **Listings**.
- [ ] Second phone: new listing appears on Market within a couple of seconds and shows the “New listing” toast.
- [ ] Place a bid from phone B; phone A gets the “New bid” toast.
- [ ] Suspend & ask next, confirm interest, mark sold, cancel listing, cancel bid.
- [ ] Put the mini program in the background for a minute, reopen it: it resyncs.
- [ ] A listing with four photos publishes without an error (proves the proxy body limit).

## 8. Replace the trust-based identity with `wx.login` (strongly advised)

Today the client invents a random `userId` and sends it as `sellerId` / `bidderId`. Anyone who learns another user's id can act as them, and reinstalling the mini program loses your listings. Before a public launch, derive the identity from WeChat.

How it works:

1. The mini program calls `Taro.login()` and gets a one-time `code`.
2. It sends the code to **your server** (`POST /api/auth/login`).
3. The server exchanges it with WeChat (`jscode2session`) using the AppID and **AppSecret** and gets the user's `openid`.
4. The server returns a signed token. From then on the client sends `Authorization: Bearer <token>`, and the server takes `sellerId` / `bidderId` from the **token**, ignoring whatever the body says.

Sketch of the server side (not included in the repo; adapt and test it):

```js
// server/auth.js
const crypto = require('crypto');
const SECRET = process.env.AUTH_SECRET;            // long random string
const hmac = (s) => crypto.createHmac('sha256', SECRET).update(s).digest('base64url');

// Never expose the raw openid: ids are visible to every client through /api/items.
exports.userIdFor = (openid) => hmac('uid:' + openid).slice(0, 24);
exports.issue = (userId) => { const p = Buffer.from(JSON.stringify({ sub: userId })).toString('base64url'); return `${p}.${hmac(p)}`; };
exports.verify = (token) => {
  const [p, sig] = String(token || '').split('.');
  if (!p || !sig) return null;
  const a = Buffer.from(sig), b = Buffer.from(hmac(p));
  return a.length === b.length && crypto.timingSafeEqual(a, b) ? JSON.parse(Buffer.from(p, 'base64url')).sub : null;
};

// in server.js:  POST /api/auth/login  { code }
//   const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.WX_APPID}`
//             + `&secret=${process.env.WX_APPSECRET}&js_code=${encodeURIComponent(code)}&grant_type=authorization_code`;
//   const { openid, errcode, errmsg } = await (await fetch(url)).json();
//   if (!openid) return json(res, 401, { error: errmsg || 'Login failed' });
//   const userId = auth.userIdFor(openid);
//   return json(res, 200, { userId, token: auth.issue(userId) });
```

Client side changes (all in two files):

- `src/services/http.ts`: add `Authorization: Bearer ${Taro.getStorageSync('ct.token')}` to the `header`.
- `src/store/index.ts`: replace `loadUserId()` with a call to `Taro.login()` + `/api/auth/login`, and store the returned `userId` and `token` in storage. Call it from `startSync()` before the first request.

Also remember:

- Set `WX_APPID`, `WX_APPSECRET` and `AUTH_SECRET` as environment variables on the server only.
- WeChat no longer hands out real nicknames to mini programs. Use `<Input type='nickname' />` (and `<Button openType='chooseAvatar'>` if you add avatars) so users can pick their WeChat nickname in one tap; the current free-text name field can stay as a fallback.
- Old web-era listings keep their old `sellerId`, so no mini-program user will own them.

## 9. Compliance items and review

Submit from **Version Management → Submit for Review (提交审核)**. Prepare these first:

- **Privacy protection guidelines (用户隐私保护指引).** In **Settings → Service Content Declaration (设置 → 服务内容声明)** declare what the app collects and why. For this app that is: the display name the user types, a device or WeChat-derived user id, the photos the user picks from the album or camera, and the listing/bid content they create. Add a privacy-policy contact. Reviewers reject builds whose declarations do not match the APIs they use.
- **User-generated content.** Anyone can post text and photos, so you need moderation. WeChat provides server-side content-security APIs for text (`msgSecCheck`) and images (`mediaCheckAsync`); call them from `POST /api/items` before saving. Add a way to report a listing and a person who can take it down. Reviewers of trading and community apps ask about this.
- **What may be traded.** State in the app description what is not allowed (for example weapons, counterfeits, exam answers, anything the category forbids).
- **No payments.** The app only lets people bid and agree a price off-platform. Keep it that way for the first release: taking payment needs a WeChat Pay merchant account and further review.
- **Review notes.** Give the reviewer a short test script and, if they need it, two test accounts or instructions to create listings. Describe the bid flow, because it is not obvious from the UI alone.
- **Screenshots / description / icon.** Prepare a 144×144 icon, a short description, and screenshots of the four tabs.

Reviews usually take from a few hours to a few days. If it is rejected, the reason is shown in Version Management; fix it and resubmit.

## 10. Release

When the review passes, click **Publish (发布)** in Version Management. Users can then find it by search or QR code (**Settings → Basic Settings → mini program code**). To roll back, publish an earlier version from the same page.

---

## After launch: hardening list

None of these block a campus pilot, but each is worth scheduling.

1. **Move photos out of `db.json`.** They are stored as base64 and `GET /api/items` returns every photo of every listing, which grows quickly. Upload to object storage (Tencent COS, Aliyun OSS, or WeChat Cloud Hosting storage) and store URLs instead. In the client, replace `utils/photos.ts` with `Taro.uploadFile`; the upload host must be added under **uploadFile legal domain (uploadFile 合法域名)** in step 6.
2. **Paginate** `GET /api/items` (cursor + page size) and add thumbnails for the Market grid.
3. **Swap `server/store.js` for a database** (MySQL, PostgreSQL, MongoDB). The server only depends on the functions that file exports.
4. **Notify users when the app is closed.** Live updates stop in the background. Use WeChat **subscribe messages (订阅消息)**: ask with `Taro.requestSubscribeMessage` when a user bids or lists, and send from the server when they are outbid or asked to confirm interest.
5. **WebSocket instead of long-poll** (`Taro.connectSocket`, needs a `wss://` socket domain) if concurrency grows. The store's `startSync()` is the only place to change.
6. **Rate limiting and abuse controls** on the API (per user, per IP), and request logging.
7. **Dark mode.** The web version had it; the mini program is light only. WeChat supports it through `darkmode` in `app.json` plus `theme.json` if you want it back.
8. **Rental.** The prototype's rental model can come back as a `type: 'sale' | 'rent'` field on items plus a request flow in `server/store.js`, a Market toggle, and a type picker on Sell. The identity and live-sync pieces already support it.

## Troubleshooting

| Symptom | Likely cause and fix |
|---------|----------------------|
| `request:fail url not in domain list` | The domain is not in **request legal domain** (step 6). In DevTools only, tick “Do not verify valid domain names”. |
| Works in the simulator, “Connecting…” forever on the phone | The phone cannot reach the API: it is using `localhost` (step 3), Ubuntu's `ufw` blocks port 3000 (`sudo ufw status`, then allow it as in step 3), or debugging is off in a preview build. |
| Publishing a listing with photos fails with 413 | The reverse proxy body limit. Set nginx `client_max_body_size 6m;`. |
| Live dot flickers between “Live” and “Connecting…” | A proxy or CDN is cutting the idle long-poll. Raise its read timeout above 40 s, or lower `POLL_HOLD_MS` (default 25000 ms, must stay below the client timeout of 40 s). |
| Everything works on Wi-Fi but not on mobile data | HTTPS certificate chain incomplete. Serve `fullchain.pem`, not just the leaf certificate. Verify with an SSL checker. |
| `Cannot find module '@babel/preset-react'` | Run `npm install` (it is listed in `devDependencies`). |
| Tab icons missing | Rebuild; icons are copied from `src/assets/tab/` to `dist/assets/tab/`. |
| “Main package size exceeds 2 MB” | Not an issue today (the build is about 0.5 MB). If it appears after adding assets, host images remotely instead of bundling them. |
| AppID changes keep reverting | You edited `dist/project.config.json`. Edit the one in the repo root. |
| `getFileSystemManager is not a function` | You built for a non-WeChat target. This app targets `weapp`; other platforms need their own `utils/photos.ts`. |
