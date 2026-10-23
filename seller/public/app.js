const $ = (s) => document.querySelector(s);
const { esc, topBid, emoji, tint, time, toast } = util;

const sellerId = util.local('ct.sellerId', () => 'S' + Math.random().toString(36).slice(2, 10));
let sellerName = util.local('ct.sellerName', () => '');
let meta = { categories: ['Transport', 'Appliances', 'Electronics', 'Books', 'Furniture'], conditions: ['Like new', 'Good', 'Fair'] };
let items = [];
let view = 'list';
let flashId = null;

const mine = () => items.filter((i) => i.sellerId === sellerId);

function renderForm() {
  $('#main').innerHTML = `<div class="sec" style="margin:0"><h3>List an item for sale</h3>
    <label for="sn">Your name / dorm</label><input type="text" id="sn" maxlength="40" placeholder="e.g. Amir, Dorm 6" value="${esc(sellerName)}">
    <label for="pn">Item name</label><input type="text" id="pn" maxlength="80" placeholder="e.g. Electric kettle">
    <label for="pc">Category</label><select id="pc">${meta.categories.map((c) => `<option>${esc(c)}</option>`).join('')}</select>
    <label for="pk">Condition</label><select id="pk">${meta.conditions.map((c) => `<option>${esc(c)}</option>`).join('')}</select>
    <label for="pp">Original (asking) price (¥)</label><input type="number" id="pp" min="1" step="0.5" inputmode="decimal">
    <label for="pd">Description</label><textarea id="pd" rows="3" maxlength="500" placeholder="Age, any damage, what is included"></textarea>
    <button class="btn" id="go" style="margin-top:14px">Publish listing</button></div>`;

  $('#go').onclick = async () => {
    const name = $('#pn').value.trim(), price = Number($('#pp').value);
    if (!name || !(price > 0)) return toast('Add an item name and a price');
    sellerName = $('#sn').value.trim();
    util.save('ct.sellerName', sellerName);
    $('#go').disabled = true;
    try {
      await api.createItem({
        name, price, sellerId, seller: sellerName,
        category: $('#pc').value, condition: $('#pk').value, description: $('#pd').value
      });
      toast('Listing published');
      show('mine'); // the item itself arrives through the live event stream
    } catch (e) {
      toast(e.message);
    } finally {
      const b = $('#go'); if (b) b.disabled = false;
    }
  };
}

function renderMine() {
  const l = mine();
  $('#main').innerHTML = l.length
    ? l.map((i) => {
        const tb = topBid(i);
        return `<div class="sec ${i.id === flashId ? 'flash' : ''}" style="margin:0 0 10px">
          <div style="display:flex;gap:10px;align-items:center">
            <div class="pic" style="width:56px;height:56px;border-radius:10px;font-size:28px;background:${tint[i.category] || '#e7e5e4'}">${emoji[i.category] || '📦'}</div>
            <div style="flex:1;min-width:0"><div class="name" style="min-height:0">${esc(i.name)}</div>
              <div><span class="tag">${esc(i.condition)}</span><span class="dim">${esc(i.category)}</span></div></div>
          </div>
          <div class="row" style="margin-top:8px"><span>Asking price</span><b>¥${i.price}</b></div>
          <div class="row"><span>Top bid</span><b class="${tb ? '' : 'dim'}" style="${tb ? 'color:var(--green)' : ''}">${tb ? '¥' + tb : 'No bids yet'}</b></div>
          ${i.bids.length ? `<ul class="log">${i.bids.slice().reverse().map((b) => `<li><span>${esc(b.bidder)}</span><span><b>¥${b.amount}</b> <span class="dim">${time(b.at)}</span></span></li>`).join('')}</ul>` : ''}
        </div>`;
      }).join('')
    : `<div class="empty">You have not listed anything yet.<br>Use “List an item” to add your first one.</div>`;
  $('#badge').textContent = l.length ? `(${l.length})` : '';
}

function show(v) {
  view = v;
  document.querySelectorAll('nav button').forEach((b) => b.classList.toggle('on', b.dataset.v === v));
  v === 'list' ? renderForm() : renderMine();
}

function upsert(item) {
  const i = items.findIndex((x) => x.id === item.id);
  i >= 0 ? (items[i] = item) : items.unshift(item);
}

async function refresh() {
  try { items = await api.items(); $('#badge').textContent = mine().length ? `(${mine().length})` : ''; if (view === 'mine') renderMine(); } catch { /* retry on next reconnect */ }
}

document.querySelectorAll('nav button').forEach((b) => (b.onclick = () => show(b.dataset.v)));

api.meta().then((m) => { meta = m; if (view === 'list') renderForm(); }).catch(() => {});
show('list');

api.subscribe({
  status(on) { $('#live').classList.toggle('on', on); $('#livetxt').textContent = on ? 'Live · connected to server' : 'Reconnecting…'; },
  open: refresh, // re-sync after every (re)connect
  'item:created'(item) { upsert(item); if (view === 'mine') renderMine(); else $('#badge').textContent = mine().length ? `(${mine().length})` : ''; },
  'bid:placed'({ item, bid }) {
    upsert(item);
    if (item.sellerId !== sellerId) return;
    flashId = item.id;
    toast(`New bid: ¥${bid.amount} on ${item.name} from ${bid.bidder}`);
    if (view === 'mine') renderMine();
  }
});
