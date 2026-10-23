// Tiny JSON-file store. Swap this module for a real database later;
// server.js only depends on the functions exported here.
const fs = require('fs');
const path = require('path');
const { DATA_FILE } = require('../config');

let db = { nextId: 1, items: [] };

function load() {
  try {
    db = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    if (e.code !== 'ENOENT') console.error('[store] could not read data file, starting empty:', e.message);
  }
}

function save() {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    const tmp = DATA_FILE + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
    fs.renameSync(tmp, DATA_FILE); // atomic replace
  } catch (e) {
    console.error('[store] save failed:', e.message);
  }
}

const topBid = (item) => (item.bids.length ? Math.max(...item.bids.map((b) => b.amount)) : null);

function listItems() {
  return db.items.slice().sort((a, b) => b.createdAt - a.createdAt);
}

function getItem(id) {
  return db.items.find((i) => i.id === id);
}

function addItem(data) {
  const item = { id: db.nextId++, ...data, bids: [], createdAt: Date.now() };
  db.items.push(item);
  save();
  return item;
}

function addBid(id, { bidder, amount }) {
  const item = getItem(id);
  if (!item) return { error: 'Item not found', status: 404 };
  const tb = topBid(item);
  if (tb !== null && amount <= tb) return { error: `Your bid must be higher than ¥${tb}`, status: 409 };
  const bid = { id: `${id}-${item.bids.length + 1}`, bidder, amount, at: Date.now() };
  item.bids.push(bid);
  save();
  return { item, bid };
}

load();
module.exports = { listItems, getItem, addItem, addBid, topBid };
