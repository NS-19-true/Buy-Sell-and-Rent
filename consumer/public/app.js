const $ = (s) => document.querySelector(s);
const { esc, topBid, emoji, tint, time, toast } = util;

let bidderName = util.local('ct.bidderName', () => '');
let categories = ['Transport', 'Appliances', 'Electronics', 'Books', 'Furniture'];
let items = [];
let st = { cat: 'All', q: '' };
let openId = null; // item currently shown in the detail sheet

function market() {
  const q = st.q.toLowerCase();
  const l = items.filter((i) =>
    (st.cat === 'All' || i.category === st.cat) &&
    (i.name + i.category + i.description).toLowerCase().includes(q));

  $('#main').innerHTML = `<div class="chips">${['All', ...categories].map((c) =>
      `<button class="chip ${c === st.cat ? 'on' : ''}" data-c="${esc(c)}">${esc(c)}</button>`).join('')}</div>
    ${l.length
      ? `<div class="grid">${l.map((i) => {
          const tb = topBid(i);
          return `<button class="item" data-id="${i.id}">
            <div class="pic" style="background:${tint[i.category] || '#e7e5e4'}">${emoji[i.category] || '📦'}</div>
            <div class="meta"><div class="name">${esc(i.name)}</div>
              <div><span class="tag">${esc(i.condition)}</span>${tb ? `<span class="dim">Top bid ¥${tb}</span>` : ''}</div>
              <div class="price">¥${i.price}</div></div></button>`;
        }).join('')}</div>`
      : `<div class="empty">${items.length ? 'No items match these filters.' : 'Nothing listed yet.<br>New items from sellers appear here instantly.'}</div>`}`;
}

// The part of the detail sheet that changes when bids arrive.
function bidInfo(i) {
  const tb = topBid(i);
  return `<div class="row"><span>Asking price</span><b>¥${i.price}</b></div>
    <div class="row"><span>Current top bid</span><b style="${tb ? 'color:var(--green)' : ''}">${tb ? '¥' + tb : 'No bids yet'}</b></div>
    ${i.bids.length ? `<ul class="log">${i.bids.slice().reverse().slice(0, 8).map((b) =>
        `<li><span>${esc(b.bidder)}</span><span><b>¥${b.amount}</b> <span class="dim">${time(b.at)}</span></span></li>`).join('')}</ul>` : ''}`;
}

function detail(id) {
  const i = items.find((x) => x.id === id);
  if (!i) return;
  openId = id;
  $('#sbody').innerHTML = `<div class="hero" style="background:${tint[i.category] || '#e7e5e4'}">${emoji[i.category] || '📦'}</div>
    <div class="sec"><div style="font-weight:700;font-size:16px">${esc(i.name)}</div><div class="dim">Posted by ${esc(i.seller)}</div></div>
    <div class="sec"><h3>Condition</h3><div class="row"><span>State</span><b>${esc(i.condition)}</b></div><div class="row"><span>Category</span><span>${esc(i.category)}</span></div>
      <p style="margin:6px 0 0">${esc(i.description)}</p></div>
    <div class="sec"><h3>Bid instead of chatting</h3><div id="bidinfo">${bidInfo(i)}</div>
      <label for="bn">Your name</label><input type="text" id="bn" maxlength="40" placeholder="e.g. Linh, Friendship Apt" value="${esc(bidderName)}">
      <div class="inl"><input type="number" id="bv" min="1" step="0.5" inputmode="decimal" placeholder="Your bid in ¥" aria-label="Your bid"><button class="btn" id="bgo">Place bid</button></div>
      <div id="bmsg"></div></div>`;
  $('#sheet').classList.add('open');

  $('#bgo').onclick = async () => {
    const cur = items.find((x) => x.id === id);
    const v = Number($('#bv').value), tb = topBid(cur);
    const msg = (cls, t) => ($('#bmsg').innerHTML = `<div class="${cls}">${esc(t)}</div>`);
    if (!(v > 0)) return msg('note', 'Enter a bid amount first.');
    if (tb && v <= tb) return msg('note', `Your bid must be higher than ¥${tb}.`);
    bidderName = $('#bn').value.trim();
    util.save('ct.bidderName', bidderName);
    $('#bgo').disabled = true;
    try {
      await api.placeBid(id, { bidder: bidderName, amount: v });
      msg('ok', `Bid of ¥${v} sent. ${cur.seller} can see it right now.`);
      $('#bv').value = '';
    } catch (e) {
      msg('note', e.message); // e.g. someone outbid you a moment ago
    } finally {
      const b = $('#bgo'); if (b) b.disabled = false;
    }
  };
}

function upsert(item) {
  const i = items.findIndex((x) => x.id === item.id);
  i >= 0 ? (items[i] = item) : items.unshift(item);
}

$('#main').addEventListener('click', (e) => {
  const c = e.target.closest('.chip'), i = e.target.closest('.item');
  if (c) { st.cat = c.dataset.c; market(); } else if (i) detail(+i.dataset.id);
});
$('#q').oninput = (e) => { st.q = e.target.value; market(); };
$('#back').onclick = () => { openId = null; $('#sheet').classList.remove('open'); };

api.meta().then((m) => { categories = m.categories; market(); }).catch(() => {});
market();

api.subscribe({
  status(on) { $('#live').classList.toggle('on', on); $('#livetxt').textContent = on ? 'Live · connected to server' : 'Reconnecting…'; },
  async open() { try { items = await api.items(); market(); } catch { /* retry on reconnect */ } },
  'item:created'(item) { upsert(item); market(); toast(`New listing: ${item.name}`); },
  'bid:placed'({ item }) {
    upsert(item);
    market();
    if (openId === item.id) { $('#bidinfo').innerHTML = bidInfo(item); } // keep typed input untouched
  }
});
