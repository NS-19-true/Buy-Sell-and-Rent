#!/usr/bin/env node
/**
 * Upload / preview the built WeChat mini program directly from Linux (or any OS)
 * using the official `miniprogram-ci` package — no WeChat DevTools GUI needed.
 *
 * Prerequisites:
 *   1. npm run build:weapp            (produces ./dist with project.config.json)
 *   2. A real AppID in project.config.json (set WEAPP_APPID below or edit the file)
 *   3. An "上传代码" CI private key downloaded from mp.weixin.qq.com
 *      (开发管理 → 开发设置 → 小程序代码上传), saved as ./private.key
 *      and the uploading machine's public IP added to the IP whitelist on the same page.
 *
 * Usage:
 *   node scripts/ci.js upload   [--version 0.3.0] [--desc "..."]
 *   node scripts/ci.js preview  [--version 0.3.0] [--desc "..."]
 *
 * Environment overrides:
 *   WEAPP_APPID          appid (default: read from dist/project.config.json)
 *   WEAPP_PRIVATE_KEY    path to private.key (default: ./private.key)
 *   WEAPP_DIST           build output dir  (default: ./dist)
 */
const fs = require('fs')
const path = require('path')

// miniprogram-ci is a devDependency; it ships pure JS + wasm, works on Linux x64/arm64.
let ci
try {
  ci = require('miniprogram-ci')
} catch {
  console.error('miniprogram-ci not installed. Run: npm i -D miniprogram-ci')
  process.exit(1)
}

const args = process.argv.slice(2)
const mode = args[0]
if (!['upload', 'preview'].includes(mode)) {
  console.error('Usage: node scripts/ci.js <upload|preview> [--version X.Y.Z] [--desc "..."]')
  process.exit(1)
}

function flag(name, fallback) {
  const i = args.indexOf(`--${name}`)
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback
}

const DIST = path.resolve(process.env.WEAPP_DIST || './dist')
const KEY_PATH = path.resolve(process.env.WEAPP_PRIVATE_KEY || './private.key')

if (!fs.existsSync(path.join(DIST, 'app.json'))) {
  console.error(`No build found in ${DIST}. Run "npm run build:weapp" first.`)
  process.exit(1)
}
if (!fs.existsSync(KEY_PATH)) {
  console.error(
    `Private key not found at ${KEY_PATH}.\n` +
      'Download the CI "上传代码" key from mp.weixin.qq.com → 开发管理 → 开发设置 → 小程序代码上传,\n' +
      'save it as private.key in the project root (it is git-ignored). Set WEAPP_PRIVATE_KEY to override.'
  )
  process.exit(1)
}

const projectConfig = JSON.parse(fs.readFileSync(path.join(DIST, 'project.config.json'), 'utf8'))
const appid = process.env.WEAPP_APPID || projectConfig.appid
if (!appid || appid === 'touristappid') {
  console.error(
    'AppID is still "touristappid". Replace it with your real AppID in project.config.json\n' +
      '(root — Taro copies it into dist/ at build time) or set WEAPP_APPID. Tourist appids cannot be uploaded.'
  )
  process.exit(1)
}

const version = flag('version', process.env.npm_package_version || '0.0.0')
const desc = flag('desc', `${mode} via miniprogram-ci`)

const project = new ci.Project({
  appid,
  type: 'miniProgram',
  projectPath: DIST,
  privateKeyPath: KEY_PATH,
  ignores: ['node_modules/**/*'],
})

;(async () => {
  if (mode === 'upload') {
    await ci.upload({
      project,
      version,
      desc,
      setting: { es6: false, minify: true },
      onProgressUpdate: (msg) => {
        if (typeof msg === 'object' && msg._msg) console.log(JSON.stringify(msg._msg))
      },
    })
    console.log(`✔ Uploaded v${version} — find it in mp.weixin.qq.com → 版本管理 → 开发版本.`)
  } else {
    const qrOutputPath = path.resolve('./preview.jpg')
    await ci.preview({
      project,
      version,
      desc,
      qrcodeFormat: 'image',
      qrcodeOutputDest: qrOutputPath,
      setting: { es6: false, minify: true },
    })
    console.log(`✔ Preview compiled. Scan the QR code saved to ${qrOutputPath} with WeChat (valid ~25 min).`)
  }
})().catch((err) => {
  console.error(`✖ ${mode} failed:`, err.message || err)
  process.exit(1)
})
