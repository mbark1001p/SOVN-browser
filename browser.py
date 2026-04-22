import sys, webview, json, time
from pathlib import Path

VERSION     = "1.0.0"
GITHUB_REPO = "mbark1001p/SOVN-browser"
ICON        = "icon.ico"

# مسار الملفات يختلف بين وضع التطوير ووضع الـ EXE
BASE_DIR = Path(sys._MEIPASS) if getattr(sys, "frozen", False) else Path(__file__).parent
SRC      = BASE_DIR / "src"
DATA_DIR = Path.home() / ".sovn"
BM_FILE   = DATA_DIR / "bookmarks.json"
HIST_FILE = DATA_DIR / "history.json"
PROF_FILE = DATA_DIR / "profiles.json"
PID_FILE  = DATA_DIR / "pid.txt"

def _load(path):
    try:
        if path.exists(): return json.loads(path.read_text("utf-8"))
    except: pass
    return []

def _save(path, data):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), "utf-8")

def smart_url(text: str) -> str:
    t = text.strip()
    if not t: return ""
    if t.startswith(("http://", "https://", "file://")): return t
    if "." in t and " " not in t: return "https://" + t
    return "https://www.google.com/search?q=" + t.replace(" ", "+")

def bundle() -> str:
    html = (SRC / "index.html").read_text("utf-8")
    css  = (SRC / "style.css" ).read_text("utf-8")
    js   = (SRC / "app.js"    ).read_text("utf-8")
    game = (SRC / "game.js"   ).read_text("utf-8")
    return (html
        .replace("SOVN_CSS_PLACEHOLDER", css)
        .replace("SOVN_APP_PLACEHOLDER", js + "\n" + game)
        .replace("'__VER__'",  f"'{VERSION}'")
        .replace("'__REPO__'", f"'{GITHUB_REPO}'"))

class API:
    _w    = None
    _html = ""

    # ── navigation ──────────────────────────────────────
    def go_back(self):      self._w.evaluate_js("history.back()")
    def go_forward(self):   self._w.evaluate_js("history.forward()")
    def go_home(self):      self._w.load_html(self._html)
    def reload_page(self):  self._w.evaluate_js("location.reload()")

    def navigate(self, url: str):
        u = smart_url(url.strip())
        if u: self._w.load_url(u)

    def set_title(self, title: str):
        t = (title or "").strip()
        self._w.set_title(f"SOVN — {t}" if t else "SOVN")

    # ── bookmarks ───────────────────────────────────────
    def get_bookmarks(self):
        return _load(BM_FILE)

    def add_bookmark(self, url: str, title: str = ""):
        bm = [b for b in _load(BM_FILE) if b.get("url") != url]
        bm.insert(0, {"url": url, "title": (title or url).strip(), "ts": int(time.time())})
        _save(BM_FILE, bm[:500])
        return True

    def remove_bookmark(self, url: str):
        _save(BM_FILE, [b for b in _load(BM_FILE) if b.get("url") != url])
        return True

    def is_bookmarked(self, url: str) -> bool:
        return any(b.get("url") == url for b in _load(BM_FILE))

    def clear_bookmarks(self):
        _save(BM_FILE, [])

    # ── history ─────────────────────────────────────────
    def get_history(self):
        return _load(HIST_FILE)[:100]

    def add_history(self, url: str, title: str = ""):
        if not url or url.startswith("data:"): return
        hist = [h for h in _load(HIST_FILE) if h.get("url") != url]
        hist.insert(0, {"url": url, "title": (title or url).strip(), "ts": int(time.time())})
        _save(HIST_FILE, hist[:500])

    def clear_history(self):
        _save(HIST_FILE, [])

    # ── profiles ────────────────────────────────────────
    def get_profiles(self):
        return _load(PROF_FILE)

    def save_profiles(self, data):
        try:
            _save(PROF_FILE, data if isinstance(data, list) else [])
        except: pass

    def get_pid(self):
        try:
            if PID_FILE.exists(): return PID_FILE.read_text("utf-8").strip()
        except: pass
        return ""

    def save_pid(self, pid: str):
        try:
            DATA_DIR.mkdir(parents=True, exist_ok=True)
            PID_FILE.write_text(str(pid or ""), "utf-8")
        except: pass


if __name__ == "__main__":
    html   = bundle()
    inject = (SRC / "inject.js").read_text("utf-8")
    api    = API()
    api._html = html

    win = webview.create_window(
        "SOVN", html=html, js_api=api,
        width=1360, height=880, min_size=(900, 600),
        text_select=True,
    )
    api._w = win

    def on_loaded():
        url = win.get_current_url() or ""
        if not url or url.startswith("data:") or url == "about:blank":
            return
        try:
            win.evaluate_js(inject)
        except Exception:
            pass

    win.events.loaded += on_loaded

    icon_path = BASE_DIR / ICON
    webview.start(
        user_agent=(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0"
        ),
        icon=str(icon_path) if icon_path.exists() else None,
        debug=False,
    )
