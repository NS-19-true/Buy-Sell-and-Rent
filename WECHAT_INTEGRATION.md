# Run your mini program on your phone: step by step

This guide takes you from **nothing running** to **your app working on your real phone**. It is written for **Ubuntu** and a free WeChat **test account** (no registration, no money).

Go in order. After each step there is a **✅ You should see** line. If you do not see it, stop and check the Troubleshooting section at the bottom before going on.

---

## The big picture (read this once)

Three things have to run at the same time:

```
   ┌────────────┐        ┌───────────────────┐        ┌──────────────┐
   │ 1. SERVER  │◄──────►│ 2. MINI PROGRAM   │◄──────►│ 3. WECHAT    │
   │ npm start  │  wifi  │ the code in src/, │        │ DEVTOOLS +   │
   │ (Ubuntu)   │        │ built into dist/  │        │ YOUR PHONE   │
   └────────────┘        └───────────────────┘        └──────────────┘
   stores the listings    what users see               shows the app so you can test it
```

- The **server** keeps the listings and bids.
- The **mini program** is the app. You write it in `src/`. A build step turns it into the `dist/` folder, which is what WeChat understands.
- **WeChat DevTools** opens `dist/` and shows it on a pretend phone. It also gives you a QR code so you can open it on your real phone.

You will use **two terminal windows** (Terminal 1 and Terminal 2) and leave both open.

---

## Step 1. Check that Node.js is installed

Open a terminal and type:

```bash
node --version
```

- ✅ You should see `v18.x`, `v20.x`, `v22.x` or higher.
- ❌ Command not found, or a number below 18? Install a current version:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  node --version
  ```

## Step 2. Download the project's dependencies

In the terminal, go into the project folder (the one that contains `package.json`) and run `npm install`:

```bash
cd ~/path/to/Buy-Sell-and-Rent
npm install
```

Replace `~/path/to/Buy-Sell-and-Rent` with where you actually put the folder. It may take a few minutes.

- ✅ You should see it finish with something like `added 1800 packages`, and a new `node_modules` folder appears. A few "deprecated" warnings are normal.
- ❌ Errors about `sass` or compiling? Run `sudo apt-get install -y build-essential` and try again.

---

## Step 3. Get your free test account

1. Open this page in your browser: **<https://mp.weixin.qq.com/wxamp/sandbox?doc=1>**
2. A QR code appears. **Scan it with WeChat on your phone** and confirm.
3. The page now shows your **test account**. Find the line called **AppID** (it looks like `wx1a2b3c4d5e6f7890`). **Copy it.**

> Keep using the **same WeChat account** for everything below. It owns this test account.

## Step 4. Put your AppID into the project

Open the file **`project.config.json`** in the project folder (the top-level one, **not** the one inside `dist/`). Find this line:

```json
"appid": "touristappid",
```

Replace `touristappid` with your own AppID:

```json
"appid": "wx1a2b3c4d5e6f7890",
```

Save the file.

- ✅ You should see your AppID on that line, inside quotes, with a comma at the end.
- ⚠️ `touristappid` is a "visitor" mode that **cannot** be opened on a real phone. That is why you swap it.

---

## Step 5. Start the server (Terminal 1)

In a terminal in the project folder:

```bash
npm start
```

- ✅ You should see: `[campus-trade] API on http://localhost:3000`

**Leave this terminal open.** The server stops if you close it.

Now open a **second** terminal tab or window and check that the server answers:

```bash
curl http://localhost:3000/health
```

- ✅ You should see: `{"ok":true}`

## Step 6. Find your computer's address on the Wi-Fi

Your phone cannot use `localhost`. For a phone, `localhost` means *the phone itself*. It needs your computer's Wi-Fi address instead. In the second terminal:

```bash
hostname -I
```

You will see one or more numbers like `192.168.1.20 172.17.0.1`. Write down the **first one that starts with `192.168.` or `10.`**. In this guide it is `192.168.1.20`. Use yours.

> ⚠️ Numbers starting with `172.17.` belong to Docker. Ignore them.

## Step 7. Tell the mini program where the server is

Open **`src/config.ts`**. Find this line:

```ts
const DEV_API_BASE = 'http://localhost:3000'
```

Change it to use **your** address from Step 6. Keep `http://` at the start and `:3000` at the end:

```ts
const DEV_API_BASE = 'http://192.168.1.20:3000'
```

Save the file.

- ✅ You should see your own numbers, with `http://` in front and `:3000` after.
- ❌ If you skip this step, the app shows "Connecting to … " forever.

## Step 8. Let your phone reach the server

Your phone and computer must be on the **same Wi-Fi**. Then check Ubuntu's firewall:

```bash
sudo ufw status
```

- If it says `Status: inactive`, you are fine. Skip to the check below.
- If it says `Status: active`, run: `sudo ufw allow 3000/tcp`

**Check from your phone:** open the browser on your phone and go to `http://192.168.1.20:3000/health` (with **your** address).

- ✅ You should see `{"ok":true}` on the phone.
- ❌ Page never loads? Some campus or guest Wi-Fi networks stop devices from talking to each other. Turn on the **hotspot on your phone**, connect your laptop to it, and redo Step 6 and Step 7 (the address changes).

## Step 9. Build the mini program (Terminal 2)

In the **second** terminal, in the project folder:

```bash
npm run dev:weapp
```

- ✅ You should see lines about compiling pages, and finally `Watching...`
- ✅ A new folder called **`dist`** appears in the project. **This is the mini program.**

**Leave this terminal open too.** It rebuilds `dist/` every time you save a file in `src/`.

> You now have both terminals running: Terminal 1 is the server, Terminal 2 is the builder.

---

## Step 10. Get WeChat DevTools

WeChat only makes the official DevTools for **Windows and macOS**, not Ubuntu. You have two ways.

### Option A. The community Ubuntu version (try this first)

A volunteer project makes a Linux port: **<https://github.com/msojocs/wechat-web-devtools-linux>**

1. Open its **Releases** page (a link on the right side of that repo page).
2. Download the package for your computer and unpack it. The file names change with each version, so follow the instructions on that page and in the project's README.
3. Start it with the `wechat-devtools` program that comes inside (in the `bin` folder).

Things to know:
- It is **unofficial**. It is made for the **GNOME** desktop (Ubuntu's default). It can be a bit buggy. I could not run it here myself, so treat this as a best effort.
- If it does not start or crashes, use Option B. You lose nothing.

### Option B. Borrow a Windows or Mac computer (always works)

1. On that computer, install the official DevTools from **<https://developers.weixin.qq.com/miniprogram/en/dev/devtools/download.html>**
2. Copy your **`dist`** folder from Ubuntu to that computer (USB stick, or `scp`).
3. Keep the **server running on Ubuntu**. Both computers must be on the **same Wi-Fi**. The address in `src/config.ts` (Step 7) already points at the Ubuntu machine, so it works from there too.

> ⚠️ Copy `dist` **while `npm run dev:weapp` is your build**. Do **not** use `npm run build:weapp` for this. That one is for the final release and uses a different server address.

---

## Step 11. Open the project in DevTools

1. Start DevTools. It shows a QR code. **Scan it with the same WeChat account** as in Step 3 and confirm.
2. Click **Import** (the "+" or "Import project" button).
3. Fill in the form:
   - **Directory:** choose the **`dist`** folder. ⚠️ Not the project root. It must be `dist`.
   - **AppID:** pick your test account from the dropdown (called **Test account**, or 测试号). It should show your `wx...` number from Step 3.
   - **Project name:** anything you like.
4. Click **Confirm / Import**.
5. Click **Details** (详情) in the top right, then **Local Settings** (本地设置). Make sure this box is ticked:
   **"Do not verify valid domain names, web-view (business domain names), TLS versions and HTTPS certificates"**
   (不校验合法域名、web-view(业务域名)、TLS 版本以及 HTTPS 证书)

   It is usually ticked for you. The box matters because the test server uses plain `http://`.

- ✅ You should see a pretend phone with the **Market** tab, a search box, and a **green dot** with the text **"Live · connected to server"**.
- ❌ A **red dot** and `Connecting to http://… …`? The app cannot reach the server. Go to Troubleshooting.

## Step 12. Try the app in the simulator

1. Tap **Sell** at the bottom.
2. Fill in your name, an item name, a price. Tap **＋** to add a photo if you want.
3. Tap **Publish listing**.

- ✅ You should be taken to **Listings**, and your item appears there.
- ✅ Tap **Market**. Your item is there too, tagged **Yours**.
- ✅ Also check the file `data/db.json` in the project. Your item is saved in it.

---

## Step 13. Open it on your real phone

1. In DevTools, click **Preview** (预览) in the top toolbar.
2. A QR code appears. **Scan it with WeChat on your phone** (the same WeChat account).
3. The mini program opens on your phone.
4. **Important.** On the phone, tap the **`···`** at the top right of the mini program, then switch on **Enable debugging** (打开调试). The mini program restarts.

   Why: until you do this, the phone refuses to talk to `http://` addresses. Debug mode allows it. This is normal for testing.

- ✅ You should see the Market with the **green "Live" dot**, and the item you created in Step 12.

### Test it with "two people"

A test account usually only works for **you**, so use two devices that are both you:

1. On the **phone**, open an item that you made in the simulator.
   ⚠️ You cannot bid on your own items, and the phone and simulator count as two different people, so this works.
2. Type a name, enter a bid such as `50`, and tap **Place bid**.
3. Look at the **simulator**. Within a few seconds a message pops up: **"New bid: ¥50 on …"**, and the item on **Listings** shows the bid.

If that works, **the whole app works end to end.** 🎉

---

## Your everyday routine

Every time you want to work on the app:

1. Terminal 1: `npm start`
2. Terminal 2: `npm run dev:weapp`
3. Open DevTools and your project. It reloads by itself when you save a file in `src/`. If it does not, click **Compile**.

To stop: press `Ctrl + C` in each terminal.

If your Wi-Fi changes (a new network), your computer's address changes. Repeat Step 6 and Step 7.

---

## Troubleshooting

Find your symptom, then try the fix.

| What you see | What to do |
|--------------|------------|
| Red dot and **"Connecting to http://… …"** in the simulator | 1. Is Terminal 1 (`npm start`) still running? 2. Does `curl http://localhost:3000/health` print `{"ok":true}`? 3. Is the address in `src/config.ts` exactly right, with `http://` and `:3000`? 4. Wait a few seconds after saving `src/config.ts`, because Terminal 2 rebuilds. |
| The simulator works, but the **phone** shows the red dot | 1. Did you switch on **Enable debugging** (Step 13)? 2. Does `http://YOUR-ADDRESS:3000/health` open in the phone's browser (Step 8)? 3. Same Wi-Fi? If the campus Wi-Fi blocks it, use your phone's hotspot. |
| Scanning the Preview QR says the app cannot be opened or "no permission" | Scan with the **same WeChat account** that owns the test account. Make sure you replaced `touristappid` in the **top-level** `project.config.json` (Step 4) and re-imported `dist`. |
| DevTools keeps going back to `touristappid` | You edited `dist/project.config.json`. Every build overwrites it. Edit the **top-level** `project.config.json` (Step 4) instead. |
| `request:fail url not in domain list` | Tick the "Do not verify valid domain names…" box (Step 11, part 5). |
| Publishing an item says **"Network problem"** or fails | Check the server terminal for a red error. Photos must be 1 MB or smaller. The app tries to shrink them automatically. |
| `npm start` says `EADDRINUSE` (port already in use) | Another server is still running. Close the old terminal, or run `PORT=3005 npm start` and change `:3000` to `:3005` in `src/config.ts`. |
| `npm run dev:weapp` fails with `Cannot find module …` | Run `npm install` again (Step 2). |
| The community DevTools will not start | Use Option B in Step 10. |
| The tab bar icons are missing | Stop Terminal 2 with `Ctrl + C`, run `npm run dev:weapp` again. |
| I changed code but the app did not change | Look at Terminal 2 for red errors. Then click **Compile** in DevTools. |

Still stuck? Open the **Console** tab at the bottom of DevTools (or the vConsole on your phone) and look for red text. The app prints `[request failed]` or `[sync]` lines that say which address failed.

---

## ⚠️ What a test account is (and is not) for

WeChat describes the test account as a way to **develop, test, and preview on your own phone**. It is **for you only**. As far as I know it has no upload or release feature, so you cannot hand the app to other students with it. That means:

- The `npm run ci:upload` and `npm run ci:preview` commands in this project **will not work** with it. They need the upload key of a real registered mini program, and a test account's page has no such key.
- To let friends or the public use the app, you need a real account.

When you are ready for real users, continue with the next section.

---
---

# Later: putting it in front of real users

Do this **only after** Steps 1 to 13 work. The platform rules, filing requirements and menu names change from time to time, so treat the admin console and the official docs (<https://developers.weixin.qq.com/miniprogram/en/dev/framework/>) as the final word.

## L1. Register a real mini program

1. Register at **<https://mp.weixin.qq.com>** and choose *Mini Program* (小程序). A personal account is fine for a pilot.
2. Under **Settings → Basic Settings** (设置 → 基础设置), choose a **service category** (服务类目) that fits an item-trading app. Some categories are not open to personal accounts, so check what yours requires.
3. Under **Development → Development Settings** (开发 → 开发设置), copy your real **AppID**.
4. Put it in the top-level `project.config.json`, replacing the test AppID.
5. Mini programs run from mainland China must complete a **filing** (备案) before release. Start early: it can take days or weeks. The console has an entry that shows today's rules.

## L2. Put the server on the internet with HTTPS

Real users' phones will **only** talk to **HTTPS** addresses on a domain you have registered. No IP addresses, no `localhost`, port 443.

1. Rent a server and point a domain at it, for example `api.your-domain.example`.
2. Copy the project there and start the server (`npm start`, or `docker compose up -d --build`).
3. Put an HTTPS proxy in front. nginx example:
   ```nginx
   server {
     listen 443 ssl http2;
     server_name api.your-domain.example;
     ssl_certificate     /etc/ssl/your-domain/fullchain.pem;
     ssl_certificate_key /etc/ssl/your-domain/privkey.pem;
     ssl_protocols       TLSv1.2 TLSv1.3;

     # Photos travel inside the request (up to about 5.4 MB). nginx's default of 1 MB
     # would reject listings with photos with a "413" error.
     client_max_body_size 6m;

     location / {
       proxy_pass         http://127.0.0.1:3000;
       proxy_set_header   Host $host;
       proxy_set_header   X-Forwarded-For $remote_addr;
       proxy_read_timeout 60s;     # live updates wait about 25 s; keep this larger
     }
   }
   ```
4. Check from outside: `curl https://api.your-domain.example/health` should print `{"ok":true}`.
5. Back up `data/db.json`. It is the only copy of your listings.

## L3. Point the mini program at it

1. In **`src/config.ts`**, set the second address:
   ```ts
   const PROD_API_BASE = 'https://api.your-domain.example'
   ```
2. In the admin console go to **Development → Development Settings → Server Domain** (开发 → 开发设置 → 服务器域名) and add `https://api.your-domain.example` under **request legal domain** (request 合法域名).

## L4. Upload and test as a trial version

Build with the production address:

```bash
npm run build:weapp
```

Then upload in **one** of two ways:

- **With DevTools** (Windows/macOS): open `dist/`, untick "Do not verify valid domain names", and click **Upload**.
- **From Ubuntu, no DevTools:**
  1. In the admin console: **Development → Development Settings → Mini Program Code Upload** (开发设置 → 小程序代码上传). Generate the upload key and download it. Save it in the project root as **`private.key`**. (Git ignores it; never share it.)
  2. On the same page, add your computer's public IP to the **IP whitelist**. Find it with `curl -4 ifconfig.me`.
  3. Run `npm run ci:upload`. It builds and uploads.

  (`npm run ci:preview` makes a phone QR code the same way, but it also builds with the **production** address, so only use it once Step L3 is done.)

Next, in the admin console open **Management → Version Management** (管理 → 版本管理). Your upload appears under *Development version*. Set it as the **trial version** (体验版). Add friends as testers under **Management → Member Management** (管理 → 成员管理), and send them the trial QR code. **Turn "Enable debugging" off** when testing the trial version, because it must work with HTTPS only.

## L5. Before you submit for review

Reviewers check these. Prepare them first:

- **Privacy guidelines (用户隐私保护指引):** under **Settings → Service Content Declaration**, say what you collect: the name users type, a user ID, and the photos they pick.
- **Content moderation:** anyone can post text and photos, so WeChat expects you to check them. WeChat offers text (`msgSecCheck`) and image (`mediaCheckAsync`) checking APIs to call from the server before saving. Add a way to report a listing.
- **What may be sold:** say what is not allowed (weapons, fakes, exam answers, and so on).
- **No payments:** the app only lets people bid and agree on a price in person. Keep it that way for the first release.
- **Review notes:** give the reviewer a short test script: how to list an item, how to bid.

Submit under **Version Management → Submit for Review** (提交审核). It takes from hours to a few days. When it is approved, click **Publish** (发布).

## L6. Replace the made-up user ID with WeChat login (strongly advised)

Today each phone invents a random ID and the server trusts it. Anyone who learns someone else's ID could act as them. Before a public launch, derive the ID from WeChat:

1. The app calls `Taro.login()` and gets a one-time `code`.
2. It sends the code to **your server**.
3. The server asks WeChat (`jscode2session`, using your AppID and **AppSecret**) who the user is, then returns a signed token.
4. From then on the server takes `sellerId` and `bidderId` from the token and ignores whatever the app sends.

The AppSecret stays on the server only. It must never go into the mini program code or into git. Ask me and I can write this part for you.

## L7. Nice things to do after launch

- Move photos out of `db.json` into cloud storage (they are base64 text now).
- Paginate `GET /api/items` and use thumbnails on the Market grid.
- Replace `server/store.js` with a real database (MySQL, PostgreSQL, MongoDB).
- Use WeChat **subscribe messages** (订阅消息) to tell people about new bids when the app is closed. Live updates stop in the background.
- Add rate limiting and logging on the server.
