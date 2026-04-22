@echo off
chcp 65001 >nul
title SOVN Browser — Build System

echo.
echo  ╔══════════════════════════════════════════╗
echo  ║        SOVN Browser  Build System        ║
echo  ╚══════════════════════════════════════════╝
echo.

:: ─── التحقق من Python ───────────────────────────────────
python --version >nul 2>&1
if errorlevel 1 (
    echo  [ERROR] Python not found. Install Python 3.10+ first.
    pause & exit /b 1
)

:: ─── تثبيت PyInstaller إذا ما كان ─────────────────────
pip show pyinstaller >nul 2>&1
if errorlevel 1 (
    echo  [STEP] Installing PyInstaller...
    pip install pyinstaller
    if errorlevel 1 (
        echo  [ERROR] Failed to install PyInstaller.
        pause & exit /b 1
    )
)

:: ─── تثبيت pywebview إذا ما كان ───────────────────────
pip show pywebview >nul 2>&1
if errorlevel 1 (
    echo  [STEP] Installing pywebview...
    pip install pywebview
)

:: ─── التحقق من icon.ico ────────────────────────────────
if not exist "icon.ico" (
    echo  [WARN] icon.ico not found — building without icon.
    set ICON_FLAG=
    set ICON_DATA=
) else (
    set ICON_FLAG=--icon "icon.ico"
    set ICON_DATA=--add-data "icon.ico;."
)

:: ─── مسح البناء القديم ─────────────────────────────────
echo  [STEP] Cleaning old build...
if exist "dist\SOVN"  rmdir /s /q "dist\SOVN"
if exist "build"      rmdir /s /q "build"
if exist "SOVN.spec"  del /q "SOVN.spec"

:: ─── بناء الـ EXE بـ PyInstaller ──────────────────────
echo  [STEP] Building EXE with PyInstaller...
echo.

pyinstaller ^
  --noconfirm ^
  --name "SOVN" ^
  --windowed ^
  %ICON_FLAG% ^
  --add-data "src;src" ^
  %ICON_DATA% ^
  --collect-all webview ^
  --hidden-import "clr" ^
  --hidden-import "System" ^
  --hidden-import "System.Windows.Forms" ^
  --hidden-import "System.Drawing" ^
  browser.py

if errorlevel 1 (
    echo.
    echo  [ERROR] PyInstaller build failed!
    pause & exit /b 1
)

echo.
echo  [OK] EXE built at dist\SOVN\SOVN.exe

:: ─── بحث عن Inno Setup ────────────────────────────────
set ISCC=
if exist "C:\Program Files (x86)\Inno Setup 6\ISCC.exe" (
    set "ISCC=C:\Program Files (x86)\Inno Setup 6\ISCC.exe"
)
if exist "C:\Program Files\Inno Setup 6\ISCC.exe" (
    set "ISCC=C:\Program Files\Inno Setup 6\ISCC.exe"
)
if exist "C:\Program Files (x86)\Inno Setup 5\ISCC.exe" (
    set "ISCC=C:\Program Files (x86)\Inno Setup 5\ISCC.exe"
)

if "%ISCC%"=="" (
    echo.
    echo  ╔══════════════════════════════════════════════════════╗
    echo  ║  Inno Setup not found — EXE only build complete.    ║
    echo  ║                                                      ║
    echo  ║  To build the installer (.exe setup):               ║
    echo  ║  1. Download: https://jrsoftware.org/isinfo.php     ║
    echo  ║  2. Install Inno Setup 6                            ║
    echo  ║  3. Run build.bat again                             ║
    echo  ╚══════════════════════════════════════════════════════╝
    echo.
    echo  App folder: dist\SOVN\
    pause & exit /b 0
)

:: ─── بناء الإنستولر بـ Inno Setup ─────────────────────
echo  [STEP] Building installer with Inno Setup...
echo.

if not exist "installer" mkdir installer

"%ISCC%" installer.iss

if errorlevel 1 (
    echo.
    echo  [ERROR] Inno Setup build failed!
    pause & exit /b 1
)

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║                                                          ║
echo  ║   Build complete!                                        ║
echo  ║                                                          ║
echo  ║   Installer :  installer\SOVN_Setup_v1.0.0.exe          ║
echo  ║   App folder :  dist\SOVN\SOVN.exe                      ║
echo  ║                                                          ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.

:: فتح مجلد الإنستولر تلقائياً
explorer installer

pause
