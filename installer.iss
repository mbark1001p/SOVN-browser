#define AppName      "SOVN Browser"
#define AppVersion   "1.0.0"
#define AppPublisher "SOVN"
#define AppExe       "SOVN.exe"
#define AppURL       "https://github.com/"

[Setup]
AppId={{A3F8C2D1-4B7E-4A9F-8C1D-2E5F6A8B9C0D}
AppName={#AppName}
AppVersion={#AppVersion}
AppVerName={#AppName} v{#AppVersion}
AppPublisher={#AppPublisher}
AppPublisherURL={#AppURL}
AppSupportURL={#AppURL}
AppUpdatesURL={#AppURL}

; مسار التثبيت الافتراضي
DefaultDirName={autopf}\SOVN
DefaultGroupName={#AppName}
AllowNoIcons=yes

; الأيقونة والضغط
SetupIconFile=icon.ico
Compression=lzma2/ultra64
SolidCompression=yes
InternalCompressLevel=ultra64

; مظهر الإنستولر
WizardStyle=modern
WizardResizable=no
DisableWelcomePage=no

; الإخراج
OutputDir=installer
OutputBaseFilename=SOVN_Setup_v{#AppVersion}

; صلاحيات - يشتغل بدون Admin لو ما احتاج
PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=dialog

; معلومات الملف
VersionInfoVersion={#AppVersion}
VersionInfoCompany={#AppPublisher}
VersionInfoDescription={#AppName} — Fast, Clean, Yours
VersionInfoProductName={#AppName}
VersionInfoProductVersion={#AppVersion}
VersionInfoCopyright=Copyright (C) 2025 {#AppPublisher}

; يشترط Windows 10 64-bit (لأن Edge WebView2 يحتاجه)
MinVersion=10.0
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible

; الأنيستولر
UninstallDisplayIcon={app}\{#AppExe}
UninstallDisplayName={#AppName}
UninstallFilesDir={app}

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[CustomMessages]
english.WelcomeLabel2=This will install [name/ver] on your computer.%n%nSOVN is a fast, clean, and private browser built for you.%n%nClick Next to continue.
english.FinishedHeadingLabel=SOVN is ready!
english.FinishedLabel=Installation complete. Click Finish to launch SOVN Browser.

[Tasks]
Name: "desktopicon";   Description: "Create a &desktop shortcut";    GroupDescription: "Shortcuts:"
Name: "startmenuicon"; Description: "Create a &Start Menu shortcut"; GroupDescription: "Shortcuts:"
Name: "startup";       Description: "Launch SOVN at &startup";       GroupDescription: "Windows startup:"; Flags: unchecked

[Files]
Source: "dist\SOVN\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
; Start Menu
Name: "{group}\{#AppName}";         Filename: "{app}\{#AppExe}"; Tasks: startmenuicon
Name: "{group}\Uninstall {#AppName}"; Filename: "{uninstallexe}"; Tasks: startmenuicon

; Desktop
Name: "{commondesktop}\{#AppName}"; Filename: "{app}\{#AppExe}"; Tasks: desktopicon

[Registry]
; تشغيل مع ويندوز (اختياري)
Root: HKCU; Subkey: "SOFTWARE\Microsoft\Windows\CurrentVersion\Run"; \
  ValueType: string; ValueName: "SOVN Browser"; \
  ValueData: """{app}\{#AppExe}"""; \
  Flags: uninsdeletevalue; Tasks: startup

[Run]
Filename: "{app}\{#AppExe}"; \
  Description: "Launch {#AppName} now"; \
  Flags: nowait postinstall skipifsilent shellexec

[UninstallRun]
Filename: "taskkill.exe"; Parameters: "/f /im {#AppExe}"; Flags: runhidden; RunOnceId: "KillSOVN"

[UninstallDelete]
Type: filesandordirs; Name: "{app}"

[Code]
{ ── تحقق من Edge WebView2 عند بداية التثبيت ── }
function IsWebView2Installed(): Boolean;
var
  Ver: String;
begin
  Result := RegQueryStringValue(
    HKLM,
    'SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}',
    'pv', Ver) or
  RegQueryStringValue(
    HKCU,
    'SOFTWARE\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}',
    'pv', Ver);
end;

function InitializeSetup(): Boolean;
begin
  Result := True;

  { Windows 10+ مطلوب }
  if not IsWin64 then begin
    MsgBox('SOVN Browser requires a 64-bit version of Windows 10 or later.',
           mbError, MB_OK);
    Result := False;
    Exit;
  end;

  { تحذير لو WebView2 مش موجود }
  if not IsWebView2Installed() then begin
    if MsgBox(
      'Microsoft Edge WebView2 Runtime was not detected.'#13#10#13#10 +
      'SOVN Browser requires it to work.'#13#10 +
      'It is usually pre-installed on Windows 10/11.'#13#10#13#10 +
      'Continue installation anyway?',
      mbConfirmation, MB_YESNO) = IDNO then begin
      Result := False;
    end;
  end;
end;
