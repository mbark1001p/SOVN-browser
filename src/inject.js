(function () {
  if (document.getElementById('__sovn_wrap')) return;

  const TAB_H  = 36;
  const NAV_H  = 44;
  const TOTAL  = TAB_H + NAV_H;
  const C1     = '#1e90ff';
  const BG_TAB = 'rgba(5,10,20,.98)';
  const BG_NAV = 'rgba(8,15,28,.98)';
  const BORDER = 'rgba(30,144,255,.2)';
  const FONT   = "'Segoe UI',system-ui,sans-serif";

  /* ── SVGs ─────────────────────────────────────────────────── */
  const IC = {
    back:   `<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`,
    fwd:    `<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>`,
    reload: `<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>`,
    home:   `<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
    lock:   `<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`,
    go:     `<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
    star:   `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>`,
    starF:  `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
    close:  `<svg viewBox="0 0 24 24" width="9" height="9" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`,
    plus:   `<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
  };

  /* ── STATE ────────────────────────────────────────────────── */
  let _tabs    = [];
  let _atid    = window.name && window.name.startsWith('st_') ? window.name : null;
  let _starred = false;
  let _hideTimer;

  /* ── WRAPPER ──────────────────────────────────────────────── */
  const wrap = document.createElement('div');
  wrap.id = '__sovn_wrap';
  Object.assign(wrap.style, {
    position:'fixed', top:'0', left:'0', right:'0', zIndex:'2147483647',
    display:'flex', flexDirection:'column',
    transform:'translateY(-100%)',
    transition:'transform .2s cubic-bezier(.4,0,.2,1)',
    willChange:'transform',
    boxShadow:'0 6px 32px rgba(0,0,0,.65)',
    fontFamily: FONT,
  });

  /* ── TRIGGER ZONE ─────────────────────────────────────────── */
  const trigger = document.createElement('div');
  trigger.id = '__sovn_trigger';
  Object.assign(trigger.style, {
    position:'fixed', top:'0', left:'0', right:'0',
    height:'6px', zIndex:'2147483646',
  });

  const showWrap = () => {
    clearTimeout(_hideTimer);
    wrap.style.transform = 'translateY(0)';
    trigger.style.height  = TOTAL + 'px';
  };
  const hideWrap = () => {
    _hideTimer = setTimeout(() => {
      wrap.style.transform = 'translateY(-100%)';
      trigger.style.height = '6px';
    }, 700);
  };

  trigger.addEventListener('mouseenter', showWrap);
  wrap.addEventListener('mouseenter', () => clearTimeout(_hideTimer));
  wrap.addEventListener('mouseleave', hideWrap);
  trigger.addEventListener('mouseleave', hideWrap);

  /* ── TAB STRIP ────────────────────────────────────────────── */
  const tabStrip = document.createElement('div');
  Object.assign(tabStrip.style, {
    height: TAB_H + 'px', display:'flex', alignItems:'center', gap:'2px',
    background: BG_TAB, borderBottom:'1px solid ' + BORDER,
    padding:'0 6px', overflowX:'auto', overflowY:'hidden',
    scrollbarWidth:'none',
  });

  function favUrl(url) {
    try { return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=16`; }
    catch { return ''; }
  }

  function mkTabEl(tab) {
    const isActive = tab.id === _atid;
    const el = document.createElement('div');
    Object.assign(el.style, {
      display:'flex', alignItems:'center', gap:'5px',
      height:'26px', padding:'0 7px 0 6px',
      borderRadius:'7px 7px 0 0',
      background: isActive ? 'rgba(30,144,255,.15)' : 'transparent',
      border: '1px solid ' + (isActive ? 'rgba(30,144,255,.28)' : 'transparent'),
      borderBottom: '2px solid ' + (isActive ? C1 : 'transparent'),
      cursor:'pointer', maxWidth:'190px', minWidth:'80px', flexShrink:'0',
      userSelect:'none', transition:'background .15s',
    });

    const fav = favUrl(tab.url);
    if (fav) {
      const img = document.createElement('img');
      img.src = fav;
      Object.assign(img.style, { width:'13px', height:'13px', borderRadius:'3px', flexShrink:'0' });
      img.onerror = () => img.remove();
      el.appendChild(img);
    }

    const ttl = document.createElement('span');
    ttl.textContent = tab.title || tab.url || 'New Tab';
    Object.assign(ttl.style, {
      fontSize:'12px', fontWeight: isActive ? '600' : '400',
      color: isActive ? '#e8f4fd' : '#8ab4d4',
      flex:'1', overflow:'hidden', textOverflow:'ellipsis',
      whiteSpace:'nowrap', minWidth:'0',
    });
    el.appendChild(ttl);

    const cls = document.createElement('button');
    cls.innerHTML = IC.close;
    Object.assign(cls.style, {
      background:'none', border:'none', cursor:'pointer', color:'#8ab4d4',
      display:'flex', alignItems:'center', padding:'2px',
      borderRadius:'4px', flexShrink:'0',
      opacity: isActive ? '1' : '0',
      transition:'opacity .15s,background .15s,color .15s',
    });
    el.addEventListener('mouseenter', () => { cls.style.opacity = '1'; if (!isActive) el.style.background = 'rgba(30,144,255,.08)'; });
    el.addEventListener('mouseleave', () => { if (!isActive) { cls.style.opacity = '0'; el.style.background = 'transparent'; } });
    cls.addEventListener('mouseenter', () => { cls.style.background = 'rgba(255,80,80,.2)'; cls.style.color = '#ff6b6b'; });
    cls.addEventListener('mouseleave', () => { cls.style.background = 'none'; cls.style.color = '#8ab4d4'; });
    cls.onclick = async e => {
      e.stopPropagation();
      const api = window.pywebview?.api;
      if (!api) return;
      const nextUrl = await api.close_tab(tab.id);
      if (!nextUrl || nextUrl === '__home__') { window.name = ''; api.go_home(); }
      else {
        const d2 = await api.get_tabs();
        _atid = d2.active || '';
        window.name = _atid;
        api.navigate(nextUrl);
      }
    };
    el.appendChild(cls);

    el.addEventListener('click', async e => {
      if (e.target === cls || cls.contains(e.target)) return;
      if (tab.id === _atid) return;
      const api = window.pywebview?.api;
      if (!api) return;
      const url = await api.switch_tab(tab.id);
      window.name = tab.id;
      _atid = tab.id;
      if (!url || url === '__home__') api.go_home();
      else api.navigate(url);
    });

    return el;
  }

  function renderTabs() {
    tabStrip.innerHTML = '';
    _tabs.forEach(tab => tabStrip.appendChild(mkTabEl(tab)));

    const addBtn = document.createElement('button');
    addBtn.innerHTML = IC.plus;
    addBtn.title = 'New Tab (Ctrl+T)';
    Object.assign(addBtn.style, {
      background:'none', border:'none', cursor:'pointer', color:'#8ab4d4',
      display:'flex', alignItems:'center', justifyContent:'center',
      width:'26px', height:'26px', borderRadius:'7px', flexShrink:'0',
      transition:'background .15s,color .15s',
    });
    addBtn.addEventListener('mouseenter', () => { addBtn.style.background = 'rgba(30,144,255,.14)'; addBtn.style.color = C1; });
    addBtn.addEventListener('mouseleave', () => { addBtn.style.background = 'none'; addBtn.style.color = '#8ab4d4'; });
    addBtn.onclick = async () => {
      const api = window.pywebview?.api;
      if (!api) return;
      const newId = await api.new_tab('', 'New Tab');
      window.name = newId;
      _atid = newId;
      api.go_home();
    };
    tabStrip.appendChild(addBtn);
  }

  /* ── NAV BAR ──────────────────────────────────────────────── */
  const navBar = document.createElement('div');
  Object.assign(navBar.style, {
    height: NAV_H + 'px', display:'flex', alignItems:'center', gap:'4px',
    background: BG_NAV, borderBottom:'1px solid ' + BORDER,
    padding:'0 10px', backdropFilter:'blur(20px)',
  });

  function mkBtn(icon, title, fn) {
    const b = document.createElement('button');
    b.innerHTML = icon; b.title = title;
    Object.assign(b.style, {
      background:'none', border:'none', cursor:'pointer', color:'#8ab4d4',
      width:'30px', height:'30px', borderRadius:'7px', display:'flex',
      alignItems:'center', justifyContent:'center', padding:'0', flexShrink:'0',
      transition:'background .15s,color .15s',
    });
    b.addEventListener('mouseenter', () => { b.style.background = 'rgba(30,144,255,.14)'; b.style.color = C1; });
    b.addEventListener('mouseleave', () => { b.style.background = 'none'; b.style.color = '#8ab4d4'; });
    b.onclick = fn;
    return b;
  }

  function sep() {
    const d = document.createElement('div');
    Object.assign(d.style, { width:'1px', height:'22px', background:BORDER, margin:'0 2px', flexShrink:'0' });
    return d;
  }

  const logo = document.createElement('span');
  logo.textContent = 'SOVN';
  Object.assign(logo.style, { fontSize:'13px', fontWeight:'900', letterSpacing:'3px', color:C1, padding:'0 4px', userSelect:'none' });

  /* URL wrap */
  const urlWrap = document.createElement('div');
  Object.assign(urlWrap.style, {
    flex:'1', display:'flex', alignItems:'center', gap:'5px',
    background:'rgba(20,34,64,.9)', border:'1px solid ' + BORDER,
    borderRadius:'18px', padding:'0 10px', height:'28px', minWidth:'0',
    transition:'border-color .2s,box-shadow .2s',
  });

  const secure = document.createElement('span');
  secure.innerHTML = IC.lock;
  Object.assign(secure.style, {
    display: location.protocol === 'https:' ? 'flex' : 'none',
    color:'#4caf84', flexShrink:'0', alignItems:'center',
  });

  const urlIn = document.createElement('input');
  urlIn.value = location.href; urlIn.spellcheck = false;
  Object.assign(urlIn.style, {
    flex:'1', background:'none', border:'none', outline:'none',
    color:'#e8f4fd', fontSize:'12px', minWidth:'0', caretColor:C1,
  });

  urlWrap.addEventListener('focusin',  () => { urlWrap.style.borderColor = C1; urlWrap.style.boxShadow = '0 0 0 3px rgba(30,144,255,.14)'; });
  urlWrap.addEventListener('focusout', () => { urlWrap.style.borderColor = BORDER; urlWrap.style.boxShadow = 'none'; });
  urlIn.addEventListener('focus',   () => urlIn.select());
  urlIn.addEventListener('keydown', e => {
    if (e.key === 'Enter')  { e.preventDefault(); window.pywebview?.api?.navigate(urlIn.value.trim()); }
    if (e.key === 'Escape') { urlIn.blur(); hideWrap(); }
  });

  const goBtn = document.createElement('button');
  goBtn.innerHTML = IC.go;
  Object.assign(goBtn.style, { background:'none', border:'none', cursor:'pointer', color:'#8ab4d4', display:'flex', alignItems:'center', padding:'0', transition:'color .15s' });
  goBtn.addEventListener('mouseenter', () => goBtn.style.color = C1);
  goBtn.addEventListener('mouseleave', () => goBtn.style.color = '#8ab4d4');
  goBtn.onclick = () => window.pywebview?.api?.navigate(urlIn.value.trim());
  urlWrap.append(secure, urlIn, goBtn);

  /* Bookmark btn */
  const starBtn = mkBtn(IC.star, 'Bookmark (Ctrl+D)', async () => {
    const api = window.pywebview?.api;
    if (!api) return;
    if (_starred) {
      await api.remove_bookmark(location.href);
      _starred = false; starBtn.innerHTML = IC.star; starBtn.style.color = '#8ab4d4';
    } else {
      await api.add_bookmark(location.href, document.title || location.href);
      _starred = true; starBtn.innerHTML = IC.starF; starBtn.style.color = '#ffd700';
    }
  });

  navBar.append(
    logo, sep(),
    mkBtn(IC.back,   'Back (Alt+←)',    () => window.pywebview?.api?.go_back()),
    mkBtn(IC.fwd,    'Forward (Alt+→)', () => window.pywebview?.api?.go_forward()),
    mkBtn(IC.reload, 'Reload (F5)',      () => window.pywebview?.api?.reload_page()),
    mkBtn(IC.home,   'Home (Ctrl+H)',    () => window.pywebview?.api?.go_home()),
    sep(), urlWrap, sep(), starBtn
  );

  /* ── ASSEMBLE ─────────────────────────────────────────────── */
  wrap.append(tabStrip, navBar);
  document.documentElement.appendChild(trigger);
  document.documentElement.appendChild(wrap);

  /* ── INIT TABS ────────────────────────────────────────────── */
  async function initTabs() {
    await new Promise(r => setTimeout(r, 350));
    const api = window.pywebview?.api;
    if (!api?.get_tabs) return;

    let data = await api.get_tabs();
    _tabs = data.tabs || [];

    if (_atid && _tabs.find(t => t.id === _atid)) {
      await api.update_tab(_atid, location.href, document.title || location.href);
    } else {
      _atid = await api.new_tab(location.href, document.title || location.href);
      window.name = _atid;
    }

    data  = await api.get_tabs();
    _tabs = data.tabs || [];
    renderTabs();
  }
  initTabs();

  /* ── TITLE SYNC ───────────────────────────────────────────── */
  function syncTitle() {
    const t = document.title;
    if (t && window.pywebview?.api?.set_title) window.pywebview.api.set_title(t).catch(() => {});
    if (_atid && window.pywebview?.api?.update_tab)
      window.pywebview.api.update_tab(_atid, location.href, t || location.href);
    document.querySelectorAll('.__sovn_wrap .__sovn_tab_title[data-tid="' + _atid + '"]').forEach(el => el.textContent = t || location.href);
  }
  syncTitle();
  const titleEl = document.querySelector('title');
  if (titleEl) new MutationObserver(syncTitle).observe(titleEl, { childList:true, subtree:true, characterData:true });

  /* ── HISTORY ──────────────────────────────────────────────── */
  (async () => {
    try { await window.pywebview?.api?.add_history(location.href, document.title || location.href); } catch {}
  })();

  /* ── BOOKMARK STATE ───────────────────────────────────────── */
  (async () => {
    try {
      if (await window.pywebview?.api?.is_bookmarked(location.href)) {
        _starred = true; starBtn.innerHTML = IC.starF; starBtn.style.color = '#ffd700';
      }
    } catch {}
  })();

  /* ── KEYBOARD ─────────────────────────────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.altKey  && e.key === 'ArrowLeft')  { e.preventDefault(); window.pywebview?.api?.go_back(); }
    if (e.altKey  && e.key === 'ArrowRight') { e.preventDefault(); window.pywebview?.api?.go_forward(); }
    if (e.ctrlKey && e.key === 'r')          { e.preventDefault(); window.pywebview?.api?.reload_page(); }
    if (e.key === 'F5')                      { e.preventDefault(); window.pywebview?.api?.reload_page(); }
    if (e.ctrlKey && e.key === 'h')          { e.preventDefault(); window.pywebview?.api?.go_home(); }
    if (e.ctrlKey && e.key === 'd')          { e.preventDefault(); starBtn.click(); }
    if (e.ctrlKey && e.key === 't') {
      e.preventDefault();
      (async () => {
        const api = window.pywebview?.api;
        if (!api) return;
        const newId = await api.new_tab('', 'New Tab');
        window.name = newId; _atid = newId;
        api.go_home();
      })();
    }
    if (e.ctrlKey && e.key === 'w') {
      e.preventDefault();
      (async () => {
        const api = window.pywebview?.api;
        if (!api || !_atid) return;
        const nextUrl = await api.close_tab(_atid);
        if (!nextUrl || nextUrl === '__home__') { window.name = ''; api.go_home(); }
        else { const d = await api.get_tabs(); _atid = d.active || ''; window.name = _atid; api.navigate(nextUrl); }
      })();
    }
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      showWrap(); clearTimeout(_hideTimer);
      setTimeout(() => { urlIn.select(); urlIn.focus(); }, 50);
    }
  });

  /* ── URL SYNC on SPA navigation ──────────────────────────── */
  const origPush    = history.pushState.bind(history);
  const origReplace = history.replaceState.bind(history);
  function onNav() {
    urlIn.value = location.href;
    secure.style.display = location.protocol === 'https:' ? 'flex' : 'none';
    if (_atid && window.pywebview?.api?.update_tab)
      window.pywebview.api.update_tab(_atid, location.href, document.title || location.href);
  }
  history.pushState    = (...a) => { origPush(...a);    onNav(); };
  history.replaceState = (...a) => { origReplace(...a); onNav(); };
  window.addEventListener('popstate', onNav);
})();
