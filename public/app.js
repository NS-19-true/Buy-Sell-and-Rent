// Unified client: every user can browse, bid, sell and manage listings from one app.
const $ = (s) => document.querySelector(s);
const { esc, topBid, emoji, tint, time, toast } = util;

// One identity per browser, used for both selling (sellerId) and bidding (bidderId).
const userId = util.local('ct.userId', () => 'U' + Math.random().toString(36).slice(2, 12));
let userName = util.local('ct.userName', () => '');
let categories = ['Transport', 'Appliances', 'Electronics', 'Books', 'Furniture'];
let conditions = ['Like new', 'Good', 'Fair'];
let items = [];
let st = { cat: 'All', q: '' };
let view = 'market';
let openId = null;
let bidFilter = 'all';
let flashId = null;

const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const listingStatus = (item) => item.status || 'active';
const isMine = (item) => item.sellerId === userId;
const mine = () => items.filter(isMine);

function bidStatus(item, bid) {
  if (bid.status === 'won') return 'won';
  if (bid.status === 'suspended') return 'suspended';
  if (bid.status === 'cancelled' || bid.status === 'lost' || bid.status === 'listing_cancelled' ||
      bid.interest === 'declined' || listingStatus(item) !== 'active') return 'ended';
  return 'ongoing';
}

function myBids() {
  return items.flatMap((item) => item.bids
    .filter((bid) => bid.bidderId === userId)
    .map((bid) => ({ item, bid, status: bidStatus(item, bid) })));
}

function updateBadges() {
  $('#badge').textContent = mine().length ? `(${mine().length})` : '';
  $('#my-bid-badge').textContent = myBids().length ? `(${myBids().length})` : '';
}

/* ---------------------------------------------------------------- Market */
function market() {
  const q = st.q.toLowerCase();
  const l = items.filter((i) => listingStatus(i) === 'active').filter((i) =>
    (st.cat === 'All' || i.category === st.cat) &&
    (i.name + i.category + i.description).toLowerCase().includes(q));

  $('#main').innerHTML = `<div class="chips">${['All', ...categories].map((c) =>
      `<button class="chip ${c === st.cat ? 'on' : ''}" data-c="${esc(c)}">${esc(c)}</button>`).join('')}</div>
    ${l.length
      ? `<div class="grid">${l.map((i) => {
          const tb = topBid(i);
          return `<button class="item" data-id="${i.id}">
            ${i.photos && i.photos.length
              ? `<img class="pic" src="${esc(i.photos[0])}" alt="${esc(i.name)} photo">`
              : `<div class="pic" style="background:${tint[i.category] || '#e7e5e4'}">${emoji[i.category] || '📦'}</div>`}
            <div class="meta"><div class="name">${esc(i.name)}</div>
              <div><span class="tag">${esc(i.condition)}</span>${isMine(i) ? '<span class="tag">Yours</span>' : ''}${tb !== null ? `<span class="dim">Top bid ¥${tb}</span>` : ''}</div>
              <div class="price">¥${i.price}</div></div></button>`;
        }).join('')}</div>`
      : `<div class="empty">${items.length ? 'No items match these filters.' : 'Nothing listed yet.<br>New items appear here instantly.'}</div>`}`;
}

function bidInfo(i) {
  const tb = topBid(i);
  return `<div class="row"><span>Asking price</span><b>¥${i.price}</b></div>
    <div class="row"><span>Current top bid</span><b style="${tb !== null ? 'color:var(--green)' : ''}">${tb !== null ? '¥' + tb : 'No bids yet'}</b></div>
    ${i.bids.length ? `<ul class="log">${i.bids.slice().sort((a, b) => b.amount - a.amount || b.at - a.at).slice(0, 8).map((b) =>
        `<li><span>${esc(b.bidder)}</span><span><b>¥${b.amount}</b> <span class="dim">${b.status === 'suspended' ? 'suspended' : time(b.at)}</span></span></li>`).join('')}</ul>` : ''}`;
}

function detail(id) {
  const i = items.find((x) => x.id === id);
  if (!i) return;
  openId = id;
  const own = isMine(i);
  const active = listingStatus(i) === 'active';
  const hero = i.photos && i.photos.length
    ? `<div class="photo-gallery">${i.photos.map((photo) => `<img src="${esc(photo)}" alt="${esc(i.name)} photo">`).join('')}</div>`
    : `<div class="hero" style="background:${tint[i.category] || '#e7e5e4'}">${emoji[i.category] || '📦'}</div>`;
  $('#sbody').innerHTML = `${hero}
    ${!active ? `<div class="note listing-notice">This listing is ${listingStatus(i)}.</div>` : ''}
    <div class="sec"><div style="font-weight:700;font-size:16px">${esc(i.name)}</div><div class="dim">Posted by ${own ? 'you' : esc(i.seller)}</div></div>
    <div class="sec"><h3>Condition</h3><div class="row"><span>State</span><b>${esc(i.condition)}</b></div><div class="row"><span>Category</span><span>${esc(i.category)}</span></div>
      <p style="margin:6px 0 0">${esc(i.description)}</p></div>
    <div class="sec"><h3>${own ? 'Bids on your listing' : 'Bid instead of chatting'}</h3><div id="bidinfo">${bidInfo(i)}</div>
      ${own && active ? '<div class="note">This is your listing. Manage bids from the Listings tab.</div>' : ''}
      ${!own && active ? `
      <label for="bn">Your name</label><input type="text" id="bn" maxlength="40" placeholder="e.g. Linh, Friendship Apt" value="${esc(userName)}">
      <div class="inl"><input type="number" id="bv" min="0.01" step="0.5" inputmode="decimal" placeholder="Your bid in ¥" aria-label="Your bid"><button class="btn" id="bgo">Place bid</button></div>
      <div id="bmsg"></div>` : ''}</div>`;
  $('#sheet').classList.add('open');

  if (own || !active) return;
  $('#bgo').onclick = async () => {
    const cur = items.find((x) => x.id === id);
    const v = Number($('#bv').value);
    const msg = (cls, t) => ($('#bmsg').innerHTML = `<div class="${cls}">${esc(t)}</div>`);
    if (!(v > 0)) return msg('note', 'Enter a valid bid amount first.');
    userName = $('#bn').value.trim();
    util.save('ct.userName', userName);
    $('#bgo').disabled = true;
    try {
      await api.placeBid(id, { bidder: userName, bidderId: userId, amount: v });
      msg('ok', `Bid of ¥${v} sent. ${cur.seller} can see it right now.`);
      $('#bv').value = '';
    } catch (e) {
      msg('note', e.message);
    } finally {
      const b = $('#bgo'); if (b) b.disabled = false;
    }
  };
}

/* ------------------------------------------------------------------ Sell */
function renderForm() {
  $('#main').innerHTML = `<div class="sec" style="margin:0"><h3>List an item for sale</h3>
    <label for="sn">Your name / dorm</label><input type="text" id="sn" maxlength="40" placeholder="e.g. Amir, Dorm 6" value="${esc(userName)}">
    <label for="pn">Item name</label><input type="text" id="pn" maxlength="80" placeholder="e.g. Electric kettle">
    <label for="pc">Category</label><select id="pc">${categories.map((c) => `<option>${esc(c)}</option>`).join('')}</select>
    <label for="pk">Condition</label><select id="pk">${conditions.map((c) => `<option>${esc(c)}</option>`).join('')}</select>
    <label for="pp">Original (asking) price (¥)</label><input type="number" id="pp" min="1" step="0.5" inputmode="decimal">
    <label for="pd">Description</label><textarea id="pd" rows="3" maxlength="500" placeholder="Age, any damage, what is included"></textarea>
    <label for="photos">Photos (up to 4, 1 MB each)</label><input type="file" id="photos" accept="${PHOTO_TYPES.join(',')}" multiple>
    <div class="photo-preview" id="photo-preview"></div>
    <button class="btn" id="go" style="margin-top:14px">Publish listing</button></div>`;

  $('#photos').onchange = () => {
    const files = Array.from($('#photos').files || []);
    $('#photo-preview').innerHTML = files.map((file) => `<span>${esc(file.name)}</span>`).join('');
  };
  $('#go').onclick = async () => {
    const name = $('#pn').value.trim(), price = Number($('#pp').value);
    if (!name || !(price > 0)) return toast('Add an item name and a price');
    const files = Array.from($('#photos').files || []);
    if (files.length > 4) return toast('Choose no more than 4 photos');
    if (files.some((file) => !PHOTO_TYPES.includes(file.type) || file.size > 1_000_000))
      return toast('Photos must be JPEG, PNG, WebP, or GIF images under 1 MB each');
    userName = $('#sn').value.trim();
    util.save('ct.userName', userName);
    $('#go').disabled = true;
    try {
      const photos = await Promise.all(files.map((file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
        reader.readAsDataURL(file);
      })));
      const created = await api.createItem({
        name, price, sellerId: userId, seller: userName,
        category: $('#pc').value, condition: $('#pk').value, description: $('#pd').value, photos
      });
      upsert(created);
      toast('Listing published');
      show('mine');
    } catch (e) {
      toast(e.message);
    } finally {
      const b = $('#go'); if (b) b.disabled = false;
    }
  };
}

/* -------------------------------------------------------------- Listings */
function renderMine() {
  const l = mine();
  $('#main').innerHTML = l.length
    ? l.map((i) => {
        const tb = topBid(i);
        return `<div class="sec ${i.id === flashId ? 'flash' : ''}" data-item-id="${i.id}" style="margin:0 0 10px">
          <div style="display:flex;gap:10px;align-items:center">
            ${i.photos && i.photos.length
              ? `<img class="thumb" src="${esc(i.photos[0])}" alt="${esc(i.name)} photo">`
              : `<div class="pic" style="width:56px;height:56px;border-radius:10px;font-size:28px;background:${tint[i.category] || '#e7e5e4'}">${emoji[i.category] || '📦'}</div>`}
            <div style="flex:1;min-width:0"><div class="name" style="min-height:0">${esc(i.name)}</div>
              <div><span class="tag">${esc(i.condition)}</span><span class="dim">${esc(i.category)}</span></div></div>
          </div>
          <div class="row" style="margin-top:8px"><span>Asking price</span><b>¥${i.price}</b></div>
          <div class="row"><span>Listing status</span><b>${esc(i.status || 'active')}</b></div>
          <div class="row"><span>Top bid</span><b class="${tb ? '' : 'dim'}" style="${tb ? 'color:var(--green)' : ''}">${tb ? '¥' + tb : 'No bids yet'}</b></div>
          ${i.pendingBidId ? `<div class="note">Waiting for ${esc((i.bids.find((b) => b.id === i.pendingBidId) || {}).bidder || 'a bidder')} to confirm interest.</div>` : ''}
          ${i.bids.length ? `<ul class="log">${i.bids.slice().sort((a, b) => b.amount - a.amount || b.at - a.at).map((b) => {
            const front = i.frontRunnerBidId ? i.frontRunnerBidId === b.id : b.amount === tb && b.status === 'active';
            return `<li><span>${esc(b.bidder)} ${front ? '<b class="dim">· front-runner</b>' : ''}<br><span class="dim">${esc(b.status || 'active')}${b.interest === 'requested' ? ' · awaiting interest' : b.interest === 'declined' ? ' · not interested' : b.interest === 'interested' ? ' · interested' : ''}</span></span><span><b>¥${b.amount}</b> <span class="dim">${time(b.at)}</span>${i.status !== 'sold' && i.status !== 'cancelled' && front && !i.pendingBidId ? `<button class="small-btn" data-suspend="${esc(b.id)}">Suspend & ask next</button>` : ''}</span></li>`;
          }).join('')}</ul>` : ''}
          ${(!i.status || i.status === 'active') ? `<div class="listing-actions"><button class="btn" data-mark-sold="${i.id}">Mark sold</button><button class="secondary-btn" data-cancel-listing="${i.id}">Cancel listing</button></div>` : ''}
        </div>`;
      }).join('')
    : `<div class="empty">You have not listed anything yet.<br>Use “Sell” to add your first one.</div>`;
}

/* --------------------------------------------------------------- My bids */
function renderBids() {
  const allBids = myBids().sort((a, b) => b.bid.at - a.bid.at);
  const bids = bidFilter === 'all' ? allBids : allBids.filter((entry) => entry.status === bidFilter);
  $('#main').innerHTML = `<h3 class="page-title">My bids</h3>
    <div class="chips bid-filters">${[['all', 'All'], ['ongoing', 'Ongoing'], ['suspended', 'Suspended'], ['won', 'Won'], ['ended', 'Ended']].map(([key, label]) =>
      `<button class="chip ${bidFilter === key ? 'on' : ''}" data-bid-filter="${key}">${label}</button>`).join('')}</div>
    ${bids.length
    ? bids.map(({ item, bid }) => {
      const isPending = item.pendingBidId === bid.id && bid.interest === 'requested';
      const state = bidStatus(item, bid);
      const status = state === 'won' ? 'Won'
        : state === 'suspended' ? 'Suspended by seller'
        : state === 'ended' ? (listingStatus(item) === 'sold' ? 'Listing sold' : listingStatus(item) === 'cancelled' ? 'Listing cancelled' : bid.status === 'lost' ? 'Seller sold to another bidder' : bid.status === 'cancelled' ? 'Bid cancelled' : 'No longer active')
        : bid.interest === 'declined' ? 'You declined'
          : isPending ? 'Seller wants to know if you are still interested'
            : item.frontRunnerBidId === bid.id ? 'Front-runner'
              : 'Bid placed';
      return `<div class="sec">
        <div class="row"><b>${esc(item.name)}</b><b>¥${bid.amount}</b></div>
        <div class="dim">${esc(item.seller)} · ${time(bid.at)}</div>
        <div class="row"><span>Status</span><span class="dim">${status}</span></div>
        ${isPending ? `<div class="interest-actions"><button class="btn" data-interest="yes" data-item="${item.id}" data-bid="${esc(bid.id)}">I’m still interested</button><button class="secondary-btn" data-interest="no" data-item="${item.id}" data-bid="${esc(bid.id)}">No, thank you</button></div>` : ''}
        ${state === 'ongoing' || state === 'suspended' ? `<button class="secondary-btn cancel-bid" data-cancel-bid="${esc(bid.id)}" data-item="${item.id}">Cancel my bid</button>` : ''}
      </div>`;
    }).join('')
    : `<div class="empty">${allBids.length ? 'No bids match this filter.' : 'You have not bid on any items yet.<br>Browse the market and place your first bid.'}</div>`}`;
}

/* ------------------------------------------------------------ Navigation */
function render() {           // re-render the current view (never the Sell form: it would wipe input)
  if (view === 'market') market();
  else if (view === 'mine') renderMine();
  else if (view === 'bids') renderBids();
  updateBadges();
}

function show(next) {
  view = next;
  document.querySelectorAll('nav button').forEach((b) => b.classList.toggle('on', b.dataset.view === view));
  $('#q').hidden = view !== 'market';
  if (view === 'sell') { renderForm(); updateBadges(); } else render();
}

function upsert(item) {
  const i = items.findIndex((x) => x.id === item.id);
  i >= 0 ? (items[i] = item) : items.unshift(item);
}

/* -------------------------------------------------------------- Handlers */
$('#main').addEventListener('click', async (e) => {
  const chip = e.target.closest('.chip'), itemButton = e.target.closest('.item');
  const interestButton = e.target.closest('[data-interest]');
  const cancelBidButton = e.target.closest('[data-cancel-bid]');
  const filterButton = e.target.closest('[data-bid-filter]');
  const listingButton = e.target.closest('[data-suspend], [data-mark-sold], [data-cancel-listing]');

  if (filterButton) {
    bidFilter = filterButton.dataset.bidFilter;
    renderBids();
  } else if (listingButton) {
    const itemId = Number(listingButton.dataset.markSold || listingButton.dataset.cancelListing || listingButton.closest('.sec')?.dataset.itemId);
    const action = listingButton.hasAttribute('data-suspend') ? 'suspend'
      : listingButton.hasAttribute('data-mark-sold') ? 'sold' : 'cancel';
    if (action === 'cancel' && !window.confirm('Cancel this listing?')) return;
    if (action === 'sold' && !window.confirm('Mark this listing as sold? The current front-runner will be marked as the winner.')) return;
    listingButton.disabled = true;
    try {
      let updated;
      if (action === 'suspend') updated = await api.suspendBid(itemId, listingButton.dataset.suspend, userId);
      else if (action === 'sold') updated = await api.markSold(itemId, userId);
      else updated = await api.cancelListing(itemId, userId);
      upsert(updated);
      render();
      toast(action === 'suspend' ? 'Bid suspended; the next bidder has been asked to confirm.'
        : action === 'sold' ? 'Listing marked sold.' : 'Listing cancelled.');
    } catch (error) {
      toast(error.message);
      listingButton.disabled = false;
    }
  } else if (cancelBidButton) {
    if (!window.confirm('Cancel this bid?')) return;
    cancelBidButton.disabled = true;
    try {
      const item = await api.cancelBid(Number(cancelBidButton.dataset.item), cancelBidButton.dataset.cancelBid, userId);
      upsert(item);
      render();
      toast('Your bid was cancelled.');
    } catch (error) {
      toast(error.message);
    }
  } else if (interestButton) {
    interestButton.disabled = true;
    try {
      const item = await api.respondToInterest(
        Number(interestButton.dataset.item), interestButton.dataset.bid, userId, interestButton.dataset.interest === 'yes'
      );
      upsert(item);
      render();
      toast(interestButton.dataset.interest === 'yes' ? 'You confirmed your interest.' : 'Your response was sent.');
    } catch (error) {
      toast(error.message);
    }
  } else if (chip && chip.dataset.c) {
    st.cat = chip.dataset.c;
    market();
  } else if (itemButton) detail(Number(itemButton.dataset.id));
});

document.querySelectorAll('nav button').forEach((button) => (button.onclick = () => show(button.dataset.view)));
$('#q').oninput = (e) => { st.q = e.target.value; if (view === 'market') market(); };
$('#back').onclick = () => { openId = null; $('#sheet').classList.remove('open'); };

api.meta().then((m) => {
  categories = m.categories; conditions = m.conditions;
  if (view === 'market') market();
}).catch(() => {});
show('market');

// Did this update just ask *me* to confirm interest?
function newlyAskedMe(prev, item) {
  const pend = item.bids.find((b) => b.id === item.pendingBidId);
  if (!pend || pend.bidderId !== userId || pend.interest !== 'requested') return false;
  const before = prev && prev.bids.find((b) => b.id === pend.id);
  return !before || before.interest !== 'requested';
}

api.subscribe({
  status(on) { $('#live').classList.toggle('on', on); $('#livetxt').textContent = on ? 'Live · connected to server' : 'Reconnecting…'; },
  async open() {                // re-sync after every (re)connect
    try {
      items = await api.items();
      if (view !== 'sell') render(); else updateBadges();
      if (openId !== null && $('#sheet').classList.contains('open')) {
        const item = items.find((candidate) => candidate.id === openId);
        if (item) $('#bidinfo').innerHTML = bidInfo(item);
      }
    } catch { /* retry on reconnect */ }
  },
  'item:created'(item) {
    upsert(item);
    if (view !== 'sell') render(); else updateBadges();
    if (!isMine(item)) toast(`New listing: ${item.name}`);
  },
  'bid:placed'({ item, bid }) {
    upsert(item);
    if (isMine(item)) {
      flashId = item.id;
      toast(`New bid: ¥${bid.amount} on ${item.name} from ${bid.bidder}`);
    }
    if (view !== 'sell') render(); else updateBadges();
    if (openId === item.id) $('#bidinfo').innerHTML = bidInfo(item);
  },
  'item:updated'(item) {
    const prev = items.find((x) => x.id === item.id);
    upsert(item);
    if (newlyAskedMe(prev, item)) toast(`The seller of ${item.name} asks if you are still interested. Check My bids.`);
    if (view !== 'sell') render(); else updateBadges();
    if (openId === item.id) {
      if (listingStatus(item) !== 'active') detail(item.id);
      else $('#bidinfo').innerHTML = bidInfo(item);
    }
  }
});
