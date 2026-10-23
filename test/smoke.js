// Starts all three processes on test ports and checks the seller -> server -> consumer loop.
// Run: npm test
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const assert = require('assert');

const ports = { SERVER_PORT: 4100, SELLER_PORT: 4101, CONSUMER_PORT: 4102 };
const env = { ...process.env, ...Object.fromEntries(Object.entries(ports).map(([k, v]) => [k, String(v)])),
  DATA_FILE: path.join(os.tmpdir(), `ct-test-${Date.now()}.json`) };
const procs = ['server/server.js', 'seller/server.js', 'consumer/server.js']
  .map((f) => spawn(process.execPath, [path.join(__dirname, '..', f)], { env, stdio: 'ignore' }));

const api = (p, opts) => fetch(`http://localhost:${ports.SERVER_PORT}${p}`, opts);
const post = (p, body) => api(p, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Listen to the live stream like the seller UI would.
async function collectEvents(out, signal) {
  const r = await api('/api/events', { signal });
  const reader = r.body.getReader(); const dec = new TextDecoder(); let buf = '';
  try {
    for (;;) {
      const { value, done } = await reader.read(); if (done) return;
      buf += dec.decode(value);
      let idx;
      while ((idx = buf.indexOf('\n\n')) >= 0) {
        const chunk = buf.slice(0, idx); buf = buf.slice(idx + 2);
        const ev = /event: (.+)/.exec(chunk), data = /data: (.+)/.exec(chunk);
        if (ev && data) out.push({ event: ev[1], data: JSON.parse(data[1]) });
      }
    }
  } catch { /* aborted */ }
}

(async () => {
  let failed = false;
  const ac = new AbortController();
  try {
    await sleep(800);
    assert.strictEqual((await api('/health')).status, 200, 'server health');
    for (const [name, port] of [['seller', ports.SELLER_PORT], ['consumer', ports.CONSUMER_PORT]]) {
      const html = await (await fetch(`http://localhost:${port}/`)).text();
      assert(html.includes('Campus Trade'), `${name} page served`);
      assert((await fetch(`http://localhost:${port}/shared/api.js`)).ok, `${name} shared assets`);
      assert((await fetch(`http://localhost:${port}/shared/static-server.js`)).status === 404, `${name} hides server code`);
      assert((await fetch(`http://localhost:${port}/..%2f..%2fconfig.js`)).status === 404, `${name} blocks path traversal`);
    }

    const events = []; collectEvents(events, ac.signal); await sleep(200);

    const created = await (await post('/api/items', { name: 'Giant city bike', price: 180, category: 'Transport', condition: 'Like new', description: 'Serviced', seller: 'Amir', sellerId: 'S1' })).json();
    assert(created.id, 'item created');
    assert.strictEqual((await post('/api/items', { name: '', price: 5, category: 'Books', condition: 'Good' })).status, 400, 'rejects empty name');

    assert.strictEqual((await post(`/api/items/${created.id}/bids`, { bidder: 'Linh', amount: 150 })).status, 201, 'first bid');
    assert.strictEqual((await post(`/api/items/${created.id}/bids`, { bidder: 'Kofi', amount: 150 })).status, 409, 'equal bid rejected');
    assert.strictEqual((await post(`/api/items/${created.id}/bids`, { bidder: 'Kofi', amount: 165 })).status, 201, 'higher bid');
    assert.strictEqual((await post('/api/items/999/bids', { amount: 10 })).status, 404, 'unknown item');

    await sleep(300);
    const names = events.map((e) => e.event);
    assert.deepStrictEqual(names, ['item:created', 'bid:placed', 'bid:placed'], 'live events delivered');
    const list = await (await api('/api/items')).json();
    assert.strictEqual(list[0].bids.length, 2, 'bids stored');
    console.log('All smoke checks passed.');
  } catch (e) {
    failed = true; console.error('FAILED:', e.message);
  } finally {
    ac.abort(); procs.forEach((p) => p.kill()); process.exit(failed ? 1 : 0);
  }
})();
