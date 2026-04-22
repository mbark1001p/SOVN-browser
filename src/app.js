"use strict";
const VER  = '__VER__';
const REPO = '__REPO__';

/* ── SVG ICONS ────────────────────────────────────────────── */
const ICONS = {
  back:     `<svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`,
  fwd:      `<svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>`,
  reload:   `<svg viewBox="0 0 24 24"><path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>`,
  home:     `<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
  search:   `<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`,
  go:       `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`,
  update:   `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 9h-2v2c0 .55-.45 1-1 1s-1-.45-1-1v-2H9c-.55 0-1-.45-1-1s.45-1 1-1h2V7c0-.55.45-1 1-1s1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>`,
  wifi:     `<svg viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>`,
  edit:     `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
  trash:    `<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`,
  plus:     `<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
  lock:     `<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`,
  x:        `<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`,
  star:     `<svg viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>`,
  starFill: `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
};

function applyIcons() {
  document.querySelectorAll('[data-icon]').forEach(el => {
    const k = el.dataset.icon;
    if (ICONS[k]) el.innerHTML = ICONS[k];
  });
}

/* ── SEARCH ENGINES ───────────────────────────────────────── */
const SEARCH_ENGINES = {
  google: q => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  bing:   q => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
  ddg:    q => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
  brave:  q => `https://search.brave.com/search?q=${encodeURIComponent(q)}`,
};

let _seCache = null;

function getEngine() {
  if (_seCache) return _seCache;
  try { _seCache = localStorage.getItem('sovn_se') || 'google'; } catch { _seCache = 'google'; }
  return _seCache;
}
function setEngine(key) {
  _seCache = key;
  try { localStorage.setItem('sovn_se', key); } catch { /* silent */ }
  document.querySelectorAll('.se-opt').forEach(el => {
    el.classList.toggle('on', el.dataset.se === key);
  });
}

function searchQuery(q) {
  const engine = getEngine();
  const fn = SEARCH_ENGINES[engine] || SEARCH_ENGINES.google;
  return fn(q);
}

/* ── PROGRESS BAR ─────────────────────────────────────────── */
let _progTimer = null;
let _progVal   = 0;

function startProgress() {
  const bar = document.getElementById('prog');
  if (_progTimer) { clearInterval(_progTimer); _progTimer = null; }
  _progVal = 0;
  bar.style.transition = 'none';
  bar.style.width = '0%';
  bar.style.opacity = '1';

  /* quick initial jump then slow crawl */
  requestAnimationFrame(() => {
    bar.style.transition = 'width .25s ease';
    bar.style.width = '40%';
    _progTimer = setInterval(() => {
      if (_progVal < 85) {
        _progVal += Math.random() * 4;
        bar.style.width = Math.min(_progVal + 40, 85) + '%';
      }
    }, 400);
  });
}

function endProgress() {
  if (_progTimer) { clearInterval(_progTimer); _progTimer = null; }
  const bar = document.getElementById('prog');
  bar.style.transition = 'width .2s ease';
  bar.style.width = '100%';
  setTimeout(() => {
    bar.style.transition = 'opacity .3s ease';
    bar.style.opacity = '0';
    setTimeout(() => { bar.style.width = '0%'; bar.style.opacity = '1'; }, 320);
  }, 220);
}

/* ── SITES ────────────────────────────────────────────────── */
const SITES = [
  { name:'Google',    url:'https://www.google.com'      },
  { name:'YouTube',   url:'https://www.youtube.com'     },
  { name:'TikTok',    url:'https://www.tiktok.com'      },
  { name:'Twitter',   url:'https://twitter.com'         },
  { name:'Instagram', url:'https://www.instagram.com'   },
  { name:'Facebook',  url:'https://www.facebook.com'    },
  { name:'Reddit',    url:'https://www.reddit.com'      },
  { name:'WhatsApp',  url:'https://web.whatsapp.com'    },
  { name:'Telegram',  url:'https://web.telegram.org'    },
  { name:'GitHub',    url:'https://github.com'          },
  { name:'Netflix',   url:'https://www.netflix.com'     },
  { name:'Twitch',    url:'https://www.twitch.tv'       },
  { name:'Discord',   url:'https://discord.com/app'     },
  { name:'Spotify',   url:'https://open.spotify.com'    },
  { name:'Amazon',    url:'https://www.amazon.com'      },
  { name:'Wikipedia', url:'https://www.wikipedia.org'   },
];

function faviconUrl(siteUrl) {
  try {
    const domain = new URL(siteUrl).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch { return ''; }
}

function makeFallback(name, imgEl) {
  const colors = ['#1e90ff','#e53935','#43a047','#fb8c00','#8e24aa','#00897b','#d81b60','#3949ab'];
  const color  = colors[name.charCodeAt(0) % colors.length];
  const tile   = document.createElement('div');
  Object.assign(tile.style, {
    width:'38px', height:'38px', borderRadius:'8px',
    background: color, display:'flex', alignItems:'center',
    justifyContent:'center', fontSize:'20px', fontWeight:'700',
    color:'#fff', flexShrink:'0',
  });
  tile.textContent = name[0].toUpperCase();
  imgEl.replaceWith(tile);
}

function renderSites() {
  const body = document.getElementById('sitesBody');
  const frag = document.createDocumentFragment();
  SITES.forEach(s => {
    const a = document.createElement('a');
    a.className = 'site-card';
    a.href = '#';
    a.dataset.url = s.url;

    const img = document.createElement('img');
    img.src     = faviconUrl(s.url);
    img.alt     = s.name;
    img.loading = 'lazy';
    img.width   = 38;
    img.height  = 38;
    img.style.borderRadius = '8px';
    img.addEventListener('error', () => makeFallback(s.name, img));

    const label = document.createElement('span');
    label.textContent = s.name;

    a.append(img, label);
    a.addEventListener('click', e => { e.preventDefault(); nav(s.url); });
    frag.appendChild(a);
  });
  body.innerHTML = '';
  body.appendChild(frag);
}

/* ── PROFILES ─────────────────────────────────────────────── */
const MAX_PROFILES = 6;

/* gradient palette — indexed by last char code */
const AVATAR_GRADS = [
  ['#1e90ff','#0d47a1'],['#e040fb','#7b1fa2'],['#00c853','#1b5e20'],
  ['#ff5722','#bf360c'],['#00bcd4','#00838f'],['#ffc107','#e65100'],
  ['#f44336','#b71c1c'],['#2196f3','#1565c0'],['#4caf50','#2e7d32'],
  ['#ff9800','#e65100'],['#9c27b0','#4a148c'],['#009688','#00695c'],
  ['#3f51b5','#1a237e'],['#e91e63','#880e4f'],['#00acc1','#006064'],
  ['#f57c00','#bf360c'],['#7c4dff','#4527a0'],['#69f0ae','#00695c'],
];

function avatarLetter(name) {
  const n = (name || '').trim();
  return n ? n[n.length - 1].toUpperCase() : '?';
}
function avatarGrad(name) {
  const n = (name || '').trim();
  const code = n ? n.charCodeAt(n.length - 1) : 0;
  const [c1, c2] = AVATAR_GRADS[code % AVATAR_GRADS.length];
  return `linear-gradient(135deg,${c1},${c2})`;
}
function applyAvatar(el, name) {
  el.textContent = avatarLetter(name);
  el.style.background = (name || '').trim() ? avatarGrad(name) : '';
}

/* in-memory caches — guard against SecurityError on data: URL origin */
let _profsCache = null;
let _pidCache   = null;

const profLoad = () => {
  if (_profsCache !== null) return _profsCache;
  try { _profsCache = JSON.parse(localStorage.getItem('sovn_p') || '[]'); }
  catch { _profsCache = []; }
  return _profsCache;
};
const profSave = p => {
  _profsCache = p;
  try { localStorage.setItem('sovn_p', JSON.stringify(p)); } catch { /* silent */ }
  window.pywebview?.api?.save_profiles(p);
};
const pidLoad = () => {
  if (_pidCache !== null) return _pidCache;
  try { _pidCache = localStorage.getItem('sovn_pid') || null; } catch { _pidCache = null; }
  return _pidCache;
};
const pidSave = id => {
  _pidCache = id;
  try { localStorage.setItem('sovn_pid', id); } catch { /* silent */ }
  window.pywebview?.api?.save_pid(id);
};

function profRender() {
  const profs = profLoad();
  const pid   = pidLoad();
  const grid  = document.getElementById('prof-grid');
  grid.innerHTML = '';

  profs.forEach(p => {
    const isActive = p.id === pid;
    const card = document.createElement('div');
    card.className = 'p-card' + (isActive ? ' active' : '');

    const check = document.createElement('div');
    check.className = 'p-check';
    check.innerHTML = `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;

    const av = document.createElement('div');
    av.className = 'p-av';
    av.textContent = avatarLetter(p.name);
    av.style.background = avatarGrad(p.name);

    const nm = document.createElement('div');
    nm.className = 'p-name';
    nm.textContent = p.name;

    const acts = document.createElement('div');
    acts.className = 'p-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'p-act';
    editBtn.title = 'Edit';
    editBtn.innerHTML = ICONS.edit;
    editBtn.addEventListener('click', e => { e.stopPropagation(); openModal('edit', p.id); });

    const delBtn = document.createElement('button');
    delBtn.className = 'p-act del';
    delBtn.title = 'Delete';
    delBtn.innerHTML = ICONS.trash;
    delBtn.addEventListener('click', e => { e.stopPropagation(); confirmDelete(card, p.id, profs.length); });

    acts.append(editBtn, delBtn);
    card.append(check, av, nm, acts);
    card.addEventListener('click', () => selectProfile(p.id));
    grid.appendChild(card);
  });

  if (profs.length < MAX_PROFILES) {
    const add = document.createElement('div');
    add.className = 'p-card p-add';
    const addAv = document.createElement('div');
    addAv.className = 'p-av';
    addAv.innerHTML = ICONS.plus;
    const addNm = document.createElement('div');
    addNm.className = 'p-name';
    addNm.textContent = 'New Profile';
    add.append(addAv, addNm);
    add.addEventListener('click', () => openModal('new'));
    grid.appendChild(add);
  }

  const cur = profs.find(p => p.id === pid);
  const mini = document.getElementById('profMini');
  mini.textContent = cur ? avatarLetter(cur.name) : '?';
  if (cur) mini.style.background = avatarGrad(cur.name);
}

function confirmDelete(card, id, total) {
  if (total <= 1) return;
  card.innerHTML = `
    <div class="p-del-confirm">
      <span>Delete profile?</span>
      <div class="p-del-btns">
        <button class="p-del-yes">Delete</button>
        <button class="p-del-no">Cancel</button>
      </div>
    </div>`;
  card.querySelector('.p-del-yes').addEventListener('click', e => {
    e.stopPropagation(); deleteProfile(id);
  });
  card.querySelector('.p-del-no').addEventListener('click', e => {
    e.stopPropagation(); profRender();
  });
}

function deleteProfile(id) {
  let profs = profLoad();
  profs = profs.filter(p => p.id !== id);
  profSave(profs);
  if (pidLoad() === id) {
    const next = profs[0];
    pidSave(next?.id || '');
    if (next) {
      document.getElementById('heroName').textContent = `Hey, ${next.name}`;
      const mini = document.getElementById('profMini');
      mini.textContent = avatarLetter(next.name);
      mini.style.background = avatarGrad(next.name);
    }
  }
  profRender();
}

function selectProfile(id) {
  pidSave(id);
  const cur = profLoad().find(p => p.id === id);
  document.getElementById('heroName').textContent = cur ? `Hey, ${cur.name}` : 'SOVN';
  const mini = document.getElementById('profMini');
  mini.textContent = cur ? avatarLetter(cur.name) : '?';
  if (cur) mini.style.background = avatarGrad(cur.name);
  hideProfOv();
}

let _modalMode = 'new', _modalId = null;

function openModal(mode, id) {
  _modalMode = mode;
  _modalId   = id || null;

  const av      = document.getElementById('cm-av');
  const inp     = document.getElementById('cm-inp');
  const isEdit  = (mode === 'edit' && id);

  if (isEdit) {
    const p = profLoad().find(x => x.id === id);
    if (!p) return;
    document.getElementById('cm-title').textContent = 'Edit Profile';
    document.getElementById('cm-save' ).textContent = 'Save Changes';
    document.getElementById('cm-canc' ).style.display = '';
    inp.value = p.name;
    applyAvatar(av, p.name);
  } else {
    inp.value = '';
    applyAvatar(av, '');
    if (mode === 'welcome') {
      document.getElementById('cm-title').textContent = 'Welcome to SOVN';
      document.getElementById('cm-save' ).textContent = 'Get Started';
      document.getElementById('cm-canc' ).style.display = 'none';
    } else {
      document.getElementById('cm-title').textContent = 'New Profile';
      document.getElementById('cm-save' ).textContent = 'Create';
      document.getElementById('cm-canc' ).style.display = '';
    }
  }

  document.getElementById('cm').classList.add('on');
  setTimeout(() => inp.focus(), 80);
}

function closeModal() {
  document.getElementById('cm').classList.remove('on');
  document.getElementById('cm-canc').style.display = '';
}

function saveModal() {
  const name = document.getElementById('cm-inp').value.trim();
  if (!name) {
    document.getElementById('cm-inp').focus();
    document.getElementById('cm-inp').style.borderColor = '#ff6b6b';
    setTimeout(() => document.getElementById('cm-inp').style.borderColor = '', 1200);
    return;
  }

  const profs = profLoad();
  if (_modalMode === 'edit' && _modalId) {
    const p = profs.find(x => x.id === _modalId);
    if (p) p.name = name;
  } else {
    profs.push({ id: Date.now().toString(36), name });
  }
  profSave(profs);
  closeModal();

  const newId = (_modalMode !== 'edit') ? profs[profs.length - 1].id : _modalId;
  selectProfile(newId);
  profRender();
}

function showProfOv() {
  profRender();
  document.getElementById('prof-ov').classList.add('on');
}
function hideProfOv() {
  document.getElementById('prof-ov').classList.remove('on');
}

/* ── BOOKMARKS ────────────────────────────────────────────── */
async function updateBmBtn(url) {
  const btn = document.getElementById('btn-bm');
  if (!url || url.startsWith('data:')) { btn.classList.remove('on'); return; }
  try {
    const yes = await window.pywebview.api.is_bookmarked(url);
    btn.classList.toggle('on', !!yes);
    btn.innerHTML = yes ? ICONS.starFill : ICONS.star;
  } catch {
    btn.innerHTML = ICONS.star;
  }
}

async function bmToggle() {
  const url = document.getElementById('uBar').value.trim();
  if (!url || url.startsWith('data:')) return;
  const btn = document.getElementById('btn-bm');
  try {
    const already = await window.pywebview.api.is_bookmarked(url);
    if (already) {
      await window.pywebview.api.remove_bookmark(url);
      btn.classList.remove('on');
      btn.innerHTML = ICONS.star;
    } else {
      await window.pywebview.api.add_bookmark(url, document.title || url);
      btn.classList.add('on');
      btn.innerHTML = ICONS.starFill;
      /* star pop animation */
      btn.style.animation = 'none';
      requestAnimationFrame(() => {
        btn.style.animation = 'starPop .35s cubic-bezier(.34,1.56,.64,1) both';
      });
    }
    if (document.getElementById('sp').classList.contains('on')) renderBmList();
  } catch (err) { console.error('bookmark toggle', err); }
}

async function renderBmList() {
  const list  = document.getElementById('sp-bm');
  const badge = document.getElementById('bm-cnt');
  try {
    const bms = await window.pywebview.api.get_bookmarks();
    badge.textContent = bms.length;
    list.innerHTML = '';
    if (!bms.length) {
      list.innerHTML = '<div class="sp-empty">No bookmarks yet</div>';
      return;
    }
    bms.forEach(b => {
      const row = document.createElement('div');
      row.className = 'sp-item';

      const ico = document.createElement('img');
      ico.className = 'sp-item-ico';
      ico.src = faviconUrl(b.url);
      ico.width = 16; ico.height = 16;
      ico.addEventListener('error', () => { ico.style.display = 'none'; });

      const lbl = document.createElement('span');
      lbl.className = 'sp-item-lbl';
      lbl.textContent = b.title || b.url;
      lbl.title = b.url;

      const del = document.createElement('button');
      del.className = 'sp-item-del';
      del.innerHTML = ICONS.x;
      del.title = 'Remove';
      del.addEventListener('click', async e => {
        e.stopPropagation();
        await window.pywebview.api.remove_bookmark(b.url);
        renderBmList();
        const curUrl = document.getElementById('uBar').value.trim();
        if (curUrl === b.url) {
          document.getElementById('btn-bm').classList.remove('on');
          document.getElementById('btn-bm').innerHTML = ICONS.star;
        }
      });

      row.append(ico, lbl, del);
      row.addEventListener('click', () => { nav(b.url); hideSettings(); });
      list.appendChild(row);
    });
  } catch { list.innerHTML = '<div class="sp-empty">No bookmarks yet</div>'; }
}

/* ── HISTORY ──────────────────────────────────────────────── */
async function renderHistList() {
  const list  = document.getElementById('sp-hist');
  const badge = document.getElementById('hist-cnt');
  try {
    const hist = await window.pywebview.api.get_history();
    badge.textContent = hist.length;
    list.innerHTML = '';
    if (!hist.length) {
      list.innerHTML = '<div class="sp-empty">No history yet</div>';
      return;
    }
    hist.slice(0, 50).forEach(h => {
      const row = document.createElement('div');
      row.className = 'sp-item';

      const ico = document.createElement('img');
      ico.className = 'sp-item-ico';
      ico.src = faviconUrl(h.url);
      ico.width = 16; ico.height = 16;
      ico.addEventListener('error', () => { ico.style.display = 'none'; });

      const lbl = document.createElement('span');
      lbl.className = 'sp-item-lbl';
      lbl.textContent = h.title || h.url;
      lbl.title = h.url;

      const ts = document.createElement('span');
      ts.className = 'sp-item-ts';
      if (h.ts) {
        const d = new Date(h.ts * 1000);
        ts.textContent = d.toLocaleDateString([], { month:'short', day:'numeric' });
      }

      row.append(ico, lbl, ts);
      row.addEventListener('click', () => { nav(h.url); hideSettings(); });
      list.appendChild(row);
    });
  } catch { list.innerHTML = '<div class="sp-empty">No history yet</div>'; }
}

/* ── SETTINGS PANEL ───────────────────────────────────────── */
function showSettings() {
  document.getElementById('sp').classList.add('on');
  document.getElementById('sp-bd').classList.add('on');
  setEngine(getEngine()); /* refresh active state */
  renderBmList();
  renderHistList();
  /* about */
  document.getElementById('sp-ver-txt').textContent = `v${VER}`;
  if (REPO) {
    const ghBtn = document.getElementById('sp-gh');
    ghBtn.style.display = '';
    ghBtn.onclick = () => nav(`https://github.com/${REPO}`);
  }
}

function hideSettings() {
  document.getElementById('sp').classList.remove('on');
  document.getElementById('sp-bd').classList.remove('on');
}

/* ── NAVIGATION ───────────────────────────────────────────── */
const api = () => window.pywebview?.api;

function nav(url) {
  startProgress();
  api()?.navigate(url);
  setTimeout(endProgress, 2000);
}

function goBack()   { api()?.go_back(); }
function goFwd()    { api()?.go_forward(); }
function goHome()   { api()?.go_home(); }

function doReload() {
  const btn = document.getElementById('btn-reload');
  btn.classList.add('loading');
  startProgress();
  api()?.reload_page();
  setTimeout(() => { btn.classList.remove('loading'); endProgress(); }, 1500);
}

function submit(val) {
  const raw = (val ?? document.getElementById('uBar').value).trim();
  if (!raw) return;
  const isUrl = /^https?:\/\//.test(raw) || (/\./.test(raw) && !/\s/.test(raw));
  const url = isUrl ? (raw.startsWith('http') ? raw : 'https://' + raw) : searchQuery(raw);
  nav(url);
}

function syncClearBtn() {
  const v = document.getElementById('uBar').value.length > 0;
  document.getElementById('btn-clr').classList.toggle('on', v);
}

/* ── CONNECTIVITY ─────────────────────────────────────────── */
let _online = true;

function setOnline(v) {
  if (_online === v) return;
  _online = v;
  const off = document.getElementById('offline');
  const hm  = document.getElementById('home');
  if (v) {
    off.classList.remove('on');
    if (typeof stopGame === 'function') stopGame();
    hm.classList.add('on');
  } else {
    off.classList.add('on');
    hm.classList.remove('on');
    if (typeof initGame === 'function') initGame();
  }
}

function probe() {
  fetch('https://connectivitycheck.gstatic.com/generate_204',
    { mode: 'no-cors', cache: 'no-store' })
    .then(() => setOnline(true))
    .catch(() =>
      fetch('https://www.cloudflare.com/cdn-cgi/trace',
        { mode: 'no-cors', cache: 'no-store' })
        .then(() => setOnline(true))
        .catch(() => setOnline(false))
    );
}

/* ── GITHUB UPDATE SYSTEM ─────────────────────────────────── */
function semverGt(a, b) {
  const pa = String(a).split('.').map(Number);
  const pb = String(b).split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    const na = pa[i] || 0, nb = pb[i] || 0;
    if (na > nb) return true;
    if (na < nb) return false;
  }
  return false;
}

let _updateUrl = '';

function showUpdateToast(version, url) {
  _updateUrl = url;
  const dismissed = localStorage.getItem('sovn_upd_dismissed');
  if (dismissed === version) return;

  const tBtn = document.getElementById('upd-btn');
  document.getElementById('upd-ver').textContent = `v${version}`;
  tBtn.classList.add('on');
  tBtn.onclick = () => nav(url);

  const toast = document.getElementById('upd-toast');
  document.getElementById('ut-sub').textContent = `Version ${version} is ready to install`;
  toast.classList.add('on');

  const autoTimer = setTimeout(() => hideUpdateToast(false), 10000);
  toast.addEventListener('mouseenter', () => clearTimeout(autoTimer), { once: true });

  document.getElementById('ut-get').onclick = () => { nav(url); hideUpdateToast(false); };
  document.getElementById('ut-x'  ).onclick = () => hideUpdateToast(true, version);
}

function hideUpdateToast(dismiss, version) {
  document.getElementById('upd-toast').classList.remove('on');
  if (dismiss && version) localStorage.setItem('sovn_upd_dismissed', version);
}

async function checkUpdate() {
  if (!REPO) return;
  try {
    const r = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`,
      { headers: { Accept: 'application/vnd.github+json' }, cache: 'no-store' });
    if (!r.ok) return;
    const data = await r.json();
    const latest = (data.tag_name || '').replace(/^v/i, '').trim();
    if (!latest) return;
    if (semverGt(latest, VER)) {
      const releaseUrl = data.html_url || `https://github.com/${REPO}/releases/latest`;
      showUpdateToast(latest, releaseUrl);
    }
  } catch { /* silent */ }
}

function scheduleUpdateChecks() {
  setTimeout(checkUpdate, 6000);
  setInterval(checkUpdate, 6 * 60 * 60 * 1000);
}

/* ── SPLASH ───────────────────────────────────────────────── */
function hideSplash() {
  const sp = document.getElementById('splash');
  sp.style.animation = 'splashKill .5s ease both';
  setTimeout(() => sp.classList.add('gone'), 520);
  document.getElementById('home').classList.add('on');
}

/* ── KEYBOARD SHORTCUTS ───────────────────────────────────── */
function setupKeys() {
  document.addEventListener('keydown', e => {
    if (e.altKey  && e.key === 'ArrowLeft')  { e.preventDefault(); goBack(); return; }
    if (e.altKey  && e.key === 'ArrowRight') { e.preventDefault(); goFwd(); return; }
    if (e.ctrlKey && e.key === 'r')          { e.preventDefault(); doReload(); return; }
    if (e.key === 'F5')                      { e.preventDefault(); doReload(); return; }
    if (e.ctrlKey && e.key === 'h')          { e.preventDefault(); goHome(); return; }
    if (e.ctrlKey && e.key === 'd')          { e.preventDefault(); bmToggle(); return; }
    if (e.ctrlKey && e.key === ',')          {
      e.preventDefault();
      document.getElementById('sp').classList.contains('on') ? hideSettings() : showSettings();
      return;
    }
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      const bar = document.getElementById('uBar');
      bar.select(); bar.focus();
      return;
    }
    if (e.key === 'Escape') {
      if (document.getElementById('sp').classList.contains('on'))       { hideSettings(); return; }
      if (document.getElementById('cm').classList.contains('on'))       { closeModal();   return; }
      if (document.getElementById('prof-ov').classList.contains('on')) { hideProfOv();   return; }
      document.getElementById('uBar').blur();
    }
  });
}

/* ── INIT ─────────────────────────────────────────────────── */
(function init() {
  applyIcons();
  renderSites();

  /* set star icon */
  document.getElementById('btn-bm').innerHTML = ICONS.star;
  document.getElementById('btn-settings').innerHTML = ICONS.settings;

  setTimeout(hideSplash, 2000);

  /* profiles — load from Python file storage (reliable across sessions) */
  setTimeout(async () => {
    try {
      const pApi = window.pywebview?.api;
      let profs, pid;

      if (pApi?.get_profiles) {
        [profs, pid] = await Promise.all([pApi.get_profiles(), pApi.get_pid()]);
      }

      /* fall back to localStorage if Python API unavailable */
      if (!Array.isArray(profs) || !profs.length) {
        profs = profLoad();
        pid   = pidLoad();
      }

      _profsCache = Array.isArray(profs) ? profs : [];
      _pidCache   = (pid || null);

      if (_profsCache.length) {
        const cur = _profsCache.find(p => p.id === pid) || _profsCache[0];
        pidSave(cur.id);
        document.getElementById('heroName').textContent = `Hey, ${cur.name}`;
        const mini = document.getElementById('profMini');
        mini.textContent = avatarLetter(cur.name);
        mini.style.background = avatarGrad(cur.name);
      } else {
        /* first run — open welcome modal after splash */
        setTimeout(() => openModal('welcome'), Math.max(0, 2200 - 350));
      }
    } catch (err) {
      console.error('profile init', err);
      setTimeout(() => openModal('welcome'), 2000);
    }
  }, 350); /* slight delay so pywebview API is injected */

  /* connectivity */
  setTimeout(probe, 3200);
  setInterval(probe, 30000);
  window.addEventListener('online',  () => setOnline(true));
  window.addEventListener('offline', () => probe());

  scheduleUpdateChecks();
  setupKeys();

  /* URL bar */
  const uBar = document.getElementById('uBar');
  uBar.addEventListener('input',   syncClearBtn);
  uBar.addEventListener('focus',   () => uBar.select());
  uBar.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
  document.getElementById('btn-go' ).addEventListener('click', () => submit());
  document.getElementById('btn-clr').addEventListener('click', () => {
    uBar.value = ''; uBar.focus(); syncClearBtn();
  });

  uBar.addEventListener('input', () => {
    const secure = document.getElementById('b-secure');
    const isHttps = uBar.value.startsWith('https://');
    secure.classList.toggle('on', isHttps);
  });

  /* nav buttons */
  document.getElementById('btn-back'  ).addEventListener('click', goBack);
  document.getElementById('btn-fwd'   ).addEventListener('click', goFwd);
  document.getElementById('btn-reload').addEventListener('click', doReload);
  document.getElementById('btn-home'  ).addEventListener('click', goHome);

  /* bookmark button */
  document.getElementById('btn-bm').addEventListener('click', bmToggle);

  /* settings button */
  document.getElementById('btn-settings').addEventListener('click', () => {
    document.getElementById('sp').classList.contains('on') ? hideSettings() : showSettings();
  });
  document.getElementById('sp-close').addEventListener('click', hideSettings);
  document.getElementById('sp-bd'   ).addEventListener('click', hideSettings);

  /* search engine options */
  document.querySelectorAll('.se-opt').forEach(el => {
    el.addEventListener('click', () => setEngine(el.dataset.se));
  });
  setEngine(getEngine());

  /* clear bookmarks / history */
  document.getElementById('sp-clr-bm').addEventListener('click', async () => {
    await window.pywebview?.api?.clear_bookmarks();
    renderBmList();
    document.getElementById('btn-bm').classList.remove('on');
    document.getElementById('btn-bm').innerHTML = ICONS.star;
  });
  document.getElementById('sp-clr-hist').addEventListener('click', async () => {
    await window.pywebview?.api?.clear_history();
    renderHistList();
  });

  /* profile */
  document.getElementById('profBtn').addEventListener('click', () => {
    document.getElementById('prof-ov').classList.contains('on') ? hideProfOv() : showProfOv();
  });

  /* modal */
  document.getElementById('cm-save').addEventListener('click', saveModal);
  document.getElementById('cm-canc').addEventListener('click', closeModal);

  const cmInp = document.getElementById('cm-inp');
  const cmAv  = document.getElementById('cm-av');

  /* English-only input + Enter key */
  cmInp.addEventListener('keydown', e => {
    if (e.key === 'Enter') { saveModal(); return; }
    const passthrough = ['Backspace','Delete','Tab','Escape',
      'ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'];
    if (passthrough.includes(e.key) || e.ctrlKey || e.metaKey) return;
    if (!/^[a-zA-Z0-9 '\-.]$/.test(e.key)) e.preventDefault();
  });

  /* live avatar update as user types */
  cmInp.addEventListener('input', () => applyAvatar(cmAv, cmInp.value));

  /* home search */
  document.getElementById('searchForm').addEventListener('submit', e => {
    e.preventDefault();
    const q = document.getElementById('heroQ').value.trim();
    if (!q) return;
    const isUrl = /^https?:\/\//.test(q) || (/\./.test(q) && !/\s/.test(q));
    nav(isUrl ? (q.startsWith('http') ? q : 'https://' + q) : searchQuery(q));
  });

  /* retry offline */
  document.getElementById('btn-retry').addEventListener('click', probe);

  /* profile overlay close */
  document.getElementById('pov-close').addEventListener('click', hideProfOv);
  document.getElementById('prof-ov').addEventListener('click', e => {
    if (e.target === document.getElementById('prof-ov')) hideProfOv();
  });
})();
