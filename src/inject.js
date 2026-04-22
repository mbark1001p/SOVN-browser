(function () {
  if (document.getElementById('__sovn_bar')) return;

  const BAR_H = 44;
  const C1    = '#1e90ff';

  const ICONS = {
    back:     `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`,
    fwd:      `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>`,
    reload:   `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>`,
    home:     `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
    lock:     `<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`,
    go:       `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M8 5v14l11-7z"/></svg>`,
    star:     `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>`,
    starFill: `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
  };

  /* ── TRIGGER ZONE (invisible top strip) ── */
  const trigger = document.createElement('div');
  trigger.id = '__sovn_trigger';
  Object.assign(trigger.style, {
    position:'fixed', top:'0', left:'0', right:'0',
    height:'6px', zIndex:'2147483646', cursor:'default',
  });

  /* ── BAR ── */
  const bar = document.createElement('div');
  bar.id = '__sovn_bar';
  Object.assign(bar.style, {
    position:'fixed', top:'0', left:'0', right:'0',
    height: BAR_H + 'px', display:'flex', alignItems:'center', gap:'4px',
    padding:'0 10px',
    background:'rgba(6,11,20,.97)',
    borderBottom:'1px solid rgba(30,144,255,.25)',
    backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
    boxShadow:'0 4px 24px rgba(0,0,0,.55)',
    fontFamily:"'Segoe UI',system-ui,sans-serif",
    zIndex:'2147483647',
    transform:'translateY(-100%)',
    transition:'transform .2s cubic-bezier(.4,0,.2,1)',
    willChange:'transform',
  });

  function showBar() {
    bar.style.transform = 'translateY(0)';
    trigger.style.height = BAR_H + 'px';
  }
  function hideBar() {
    bar.style.transform = 'translateY(-100%)';
    trigger.style.height = '6px';
  }

  let hideTimer;
  trigger.addEventListener('mouseenter', () => { clearTimeout(hideTimer); showBar(); });
  bar.addEventListener('mouseenter',     () => clearTimeout(hideTimer));
  bar.addEventListener('mouseleave',     () => { hideTimer = setTimeout(hideBar, 600); });
  trigger.addEventListener('mouseleave', () => { hideTimer = setTimeout(hideBar, 600); });

  /* ── HELPERS ── */
  function mkBtn(iconHtml, title, fn) {
    const b = document.createElement('button');
    b.innerHTML = iconHtml;
    b.title = title;
    Object.assign(b.style, {
      background:'none', border:'none', cursor:'pointer', color:'#8ab4d4',
      width:'30px', height:'30px', borderRadius:'6px', display:'flex',
      alignItems:'center', justifyContent:'center', padding:'0',
      transition:'background .15s,color .15s', flexShrink:'0',
    });
    b.onmouseenter = () => { b.style.background='rgba(30,144,255,.14)'; b.style.color=C1; };
    b.onmouseleave = () => { b.style.background='none'; b.style.color='#8ab4d4'; };
    b.onclick = fn;
    return b;
  }

  function sep() {
    const d = document.createElement('div');
    Object.assign(d.style, {
      width:'1px', height:'22px', background:'rgba(30,144,255,.18)',
      margin:'0 2px', flexShrink:'0',
    });
    return d;
  }

  /* logo */
  const logo = document.createElement('span');
  logo.textContent = 'SOVN';
  Object.assign(logo.style, {
    fontSize:'13px', fontWeight:'900', letterSpacing:'3px', color:C1,
    padding:'0 4px', whiteSpace:'nowrap', userSelect:'none',
  });

  /* URL wrap */
  const urlWrap = document.createElement('div');
  Object.assign(urlWrap.style, {
    flex:'1', display:'flex', alignItems:'center', gap:'5px',
    background:'rgba(26,47,74,.9)', border:'1px solid rgba(30,144,255,.22)',
    borderRadius:'18px', padding:'0 10px', height:'28px', minWidth:'0',
    transition:'border-color .2s,box-shadow .2s',
  });

  const isHttps = location.protocol === 'https:';
  const secure  = document.createElement('span');
  secure.innerHTML = ICONS.lock;
  Object.assign(secure.style, {
    display: isHttps ? 'flex' : 'none',
    color:'#4caf84', flexShrink:'0', alignItems:'center',
  });

  const urlIn = document.createElement('input');
  urlIn.value    = location.href;
  urlIn.spellcheck = false;
  Object.assign(urlIn.style, {
    flex:'1', background:'none', border:'none', outline:'none',
    color:'#e8f4fd', fontSize:'12px', minWidth:'0', caretColor:C1,
  });

  urlWrap.addEventListener('focusin',  () => {
    urlWrap.style.borderColor = C1;
    urlWrap.style.boxShadow   = '0 0 0 3px rgba(30,144,255,.14)';
  });
  urlWrap.addEventListener('focusout', () => {
    urlWrap.style.borderColor = 'rgba(30,144,255,.22)';
    urlWrap.style.boxShadow   = 'none';
  });

  urlIn.addEventListener('focus',   () => urlIn.select());
  urlIn.addEventListener('keydown', e => {
    if (e.key === 'Enter')  { e.preventDefault(); window.pywebview?.api?.navigate(urlIn.value.trim()); }
    if (e.key === 'Escape') { urlIn.blur(); hideBar(); }
  });

  const goBtn = document.createElement('button');
  goBtn.innerHTML = ICONS.go;
  Object.assign(goBtn.style, {
    background:'none', border:'none', cursor:'pointer', color:'#8ab4d4',
    display:'flex', alignItems:'center', padding:'0', transition:'color .15s',
  });
  goBtn.onmouseenter = () => goBtn.style.color = C1;
  goBtn.onmouseleave = () => goBtn.style.color = '#8ab4d4';
  goBtn.onclick = () => window.pywebview?.api?.navigate(urlIn.value.trim());

  urlWrap.append(secure, urlIn, goBtn);

  /* ── BOOKMARK ── */
  let _starred = false;
  const starBtn = mkBtn(ICONS.star, 'Bookmark (Ctrl+D)', async () => {
    const api = window.pywebview?.api;
    if (!api) return;
    if (_starred) {
      await api.remove_bookmark(location.href);
      _starred = false;
      starBtn.innerHTML  = ICONS.star;
      starBtn.style.color = '#8ab4d4';
    } else {
      await api.add_bookmark(location.href, document.title || location.href);
      _starred = true;
      starBtn.innerHTML  = ICONS.starFill;
      starBtn.style.color = '#ffd700';
    }
  });

  /* ── ASSEMBLE ── */
  bar.append(
    logo, sep(),
    mkBtn(ICONS.back,   'Back (Alt+←)',    () => window.pywebview?.api?.go_back()),
    mkBtn(ICONS.fwd,    'Forward (Alt+→)', () => window.pywebview?.api?.go_forward()),
    mkBtn(ICONS.reload, 'Reload (F5)',      () => window.pywebview?.api?.reload_page()),
    mkBtn(ICONS.home,   'Home (Ctrl+H)',    () => window.pywebview?.api?.go_home()),
    sep(), urlWrap, sep(), starBtn
  );

  document.documentElement.appendChild(trigger);
  document.documentElement.appendChild(bar);
  /* NO margin-top — bar auto-hides so websites render unaffected */

  /* ── TITLE SYNC ── */
  function syncTitle() {
    const t = document.title;
    if (t && window.pywebview?.api?.set_title)
      window.pywebview.api.set_title(t).catch(() => {});
  }
  syncTitle();
  const titleEl = document.querySelector('title');
  if (titleEl)
    new MutationObserver(syncTitle).observe(titleEl,
      { childList:true, subtree:true, characterData:true });

  /* ── HISTORY ── */
  (async () => {
    try { await window.pywebview?.api?.add_history(location.href, document.title || location.href); }
    catch {}
  })();

  /* ── BOOKMARK STATE ── */
  (async () => {
    try {
      const yes = await window.pywebview?.api?.is_bookmarked(location.href);
      if (yes) { _starred = true; starBtn.innerHTML = ICONS.starFill; starBtn.style.color = '#ffd700'; }
    } catch {}
  })();

  /* ── KEYBOARD SHORTCUTS ── */
  document.addEventListener('keydown', e => {
    if (e.altKey  && e.key === 'ArrowLeft')  { e.preventDefault(); window.pywebview?.api?.go_back(); }
    if (e.altKey  && e.key === 'ArrowRight') { e.preventDefault(); window.pywebview?.api?.go_forward(); }
    if (e.ctrlKey && e.key === 'r')          { e.preventDefault(); window.pywebview?.api?.reload_page(); }
    if (e.key === 'F5')                      { e.preventDefault(); window.pywebview?.api?.reload_page(); }
    if (e.ctrlKey && e.key === 'h')          { e.preventDefault(); window.pywebview?.api?.go_home(); }
    if (e.ctrlKey && e.key === 'd')          { e.preventDefault(); starBtn.click(); }
    if (e.ctrlKey && e.key === 'l')          {
      e.preventDefault();
      showBar();
      clearTimeout(hideTimer);
      setTimeout(() => { urlIn.select(); urlIn.focus(); }, 50);
    }
  });

  /* ── URL SYNC on SPA navigation ── */
  const origPush    = history.pushState.bind(history);
  const origReplace = history.replaceState.bind(history);
  function onNavChange() {
    urlIn.value = location.href;
    secure.style.display = location.protocol === 'https:' ? 'flex' : 'none';
  }
  history.pushState    = (...a) => { origPush(...a);    onNavChange(); };
  history.replaceState = (...a) => { origReplace(...a); onNavChange(); };
  window.addEventListener('popstate', onNavChange);
})();
