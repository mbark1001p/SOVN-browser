$ErrorActionPreference = "Stop"
$Host.UI.RawUI.WindowTitle = "SOVN Browser - Build System"

Write-Host ""
Write-Host " =========================================" -ForegroundColor Cyan
Write-Host "   SOVN Browser  Build System" -ForegroundColor Cyan
Write-Host " =========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $PSScriptRoot

# ── Find real Python ──────────────────────────────────────
function Find-Python {
    $candidates = @(
        "$env:LOCALAPPDATA\Programs\Python\Python313\python.exe",
        "$env:LOCALAPPDATA\Programs\Python\Python312\python.exe",
        "$env:LOCALAPPDATA\Programs\Python\Python311\python.exe",
        "$env:LOCALAPPDATA\Programs\Python\Python310\python.exe",
        "C:\Python313\python.exe",
        "C:\Python312\python.exe",
        "C:\Python311\python.exe",
        "C:\Python310\python.exe",
        "C:\Program Files\Python313\python.exe",
        "C:\Program Files\Python312\python.exe",
        "C:\Program Files\Python311\python.exe",
        "C:\Program Files\Python310\python.exe"
    )
    foreach ($p in $candidates) {
        if (Test-Path $p) { return $p }
    }
    return $null
}

$PYTHON = Find-Python

# ── Auto-install Python if missing ────────────────────────
if (-not $PYTHON) {
    Write-Host "[STEP] Python not found - downloading Python 3.12..." -ForegroundColor Yellow
    $pyUrl = "https://www.python.org/ftp/python/3.12.8/python-3.12.8-amd64.exe"
    $pySetup = "$env:TEMP\python_setup.exe"
    try {
        Invoke-WebRequest -Uri $pyUrl -OutFile $pySetup -UseBasicParsing
    } catch {
        Write-Host "[ERROR] Failed to download Python: $_" -ForegroundColor Red
        exit 1
    }
    Write-Host "[STEP] Installing Python 3.12 silently..." -ForegroundColor Yellow
    Start-Process $pySetup -ArgumentList "/quiet InstallAllUsers=0 PrependPath=1 Include_test=0 Include_doc=0" -Wait
    Remove-Item $pySetup -Force -ErrorAction SilentlyContinue

    $PYTHON = "$env:LOCALAPPDATA\Programs\Python\Python312\python.exe"
    if (-not (Test-Path $PYTHON)) {
        Write-Host "[ERROR] Python install failed. Install manually from python.org" -ForegroundColor Red
        exit 1
    }
    Write-Host "[OK] Python installed." -ForegroundColor Green
}

Write-Host "[OK] Python: $PYTHON" -ForegroundColor Green

# ── Install PyInstaller ───────────────────────────────────
Write-Host "[STEP] Checking PyInstaller..." -ForegroundColor Yellow
$pipCheck = & $PYTHON -m pip show pyinstaller 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[STEP] Installing PyInstaller..." -ForegroundColor Yellow
    & $PYTHON -m pip install pyinstaller
    if ($LASTEXITCODE -ne 0) { Write-Host "[ERROR] Failed to install PyInstaller." -ForegroundColor Red; exit 1 }
}

# ── Install pywebview ─────────────────────────────────────
$wvCheck = & $PYTHON -m pip show pywebview 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[STEP] Installing pywebview..." -ForegroundColor Yellow
    & $PYTHON -m pip install pywebview
}

# ── Clean old build ───────────────────────────────────────
Write-Host "[STEP] Cleaning old build..." -ForegroundColor Yellow
if (Test-Path "dist\SOVN")  { Remove-Item "dist\SOVN"  -Recurse -Force }
if (Test-Path "build")      { Remove-Item "build"      -Recurse -Force }
if (Test-Path "SOVN.spec")  { Remove-Item "SOVN.spec"  -Force }

# ── Build EXE ─────────────────────────────────────────────
Write-Host "[STEP] Building EXE with PyInstaller..." -ForegroundColor Yellow
Write-Host ""

$args = @(
    "-m", "PyInstaller",
    "--noconfirm",
    "--name", "SOVN",
    "--windowed",
    "--add-data", "src;src",
    "--collect-all", "webview",
    "--hidden-import", "clr",
    "--hidden-import", "System",
    "--hidden-import", "System.Windows.Forms",
    "--hidden-import", "System.Drawing",
    "browser.py"
)

if (Test-Path "icon.ico") {
    $args += "--icon"
    $args += "icon.ico"
    $args += "--add-data"
    $args += "icon.ico;."
}

& $PYTHON @args
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[ERROR] PyInstaller build failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[OK] EXE ready: dist\SOVN\SOVN.exe" -ForegroundColor Green

# ── Find or Auto-Install Inno Setup ───────────────────────
$ISCC = $null
$isccPaths = @(
    "C:\Program Files (x86)\Inno Setup 6\ISCC.exe",
    "C:\Program Files\Inno Setup 6\ISCC.exe"
)
foreach ($p in $isccPaths) {
    if (Test-Path $p) { $ISCC = $p; break }
}

if (-not $ISCC) {
    Write-Host "[STEP] Downloading Inno Setup..." -ForegroundColor Yellow
    $isSetup = "$env:TEMP\innosetup.exe"

    # Try to get latest version URL from jrsoftware.org
    try {
        Invoke-WebRequest -Uri "https://jrsoftware.org/download.php/is.exe" -OutFile $isSetup -UseBasicParsing
    } catch {
        Write-Host "[ERROR] Failed to download Inno Setup: $_" -ForegroundColor Red
        exit 1
    }

    Write-Host "[STEP] Installing Inno Setup silently..." -ForegroundColor Yellow
    Start-Process $isSetup -ArgumentList "/VERYSILENT /SUPPRESSMSGBOXES /NORESTART /ALLUSERS" -Wait
    Remove-Item $isSetup -Force -ErrorAction SilentlyContinue

    foreach ($p in $isccPaths) {
        if (Test-Path $p) { $ISCC = $p; break }
    }

    if (-not $ISCC) {
        Write-Host "[ERROR] Inno Setup install failed." -ForegroundColor Red
        exit 1
    }
    Write-Host "[OK] Inno Setup installed." -ForegroundColor Green
}

Write-Host "[OK] Inno Setup: $ISCC" -ForegroundColor Green

# ── Build Installer ───────────────────────────────────────
Write-Host ""
Write-Host "[STEP] Building installer..." -ForegroundColor Yellow
Write-Host ""

if (-not (Test-Path "installer")) { New-Item -ItemType Directory "installer" | Out-Null }

& $ISCC "installer.iss"
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[ERROR] Installer build failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host " =====================================================" -ForegroundColor Green
Write-Host "   Build complete!" -ForegroundColor Green
Write-Host ""
Write-Host "   Installer : installer\SOVN_Setup_v1.0.0.exe" -ForegroundColor White
Write-Host "   App folder: dist\SOVN\SOVN.exe" -ForegroundColor White
Write-Host " =====================================================" -ForegroundColor Green
Write-Host ""

Start-Process "explorer.exe" "installer"
