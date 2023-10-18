// CommonJS module 문법으로 2개의 Electron 모듈 추가
// app: 애플리케이션의 event lifecyle 관리
// BrowserWindow: 앱의 화면(윈도우)를 생성하고 관리
// ipcMain: renderer 프로세스에서 발생한 이벤트 처리
//          main / renderer 프로세스간 통신을 위한 모듈(IPC)
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

// `createWindow()` 함수는 새로운 BrowserWindow 인스턴스에 웹 페이지를 로드
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // 아래 설정으로 renderer는 `preload.js`에서 설정한 `versions` 전역 객체에 접근 권한이 생김
    // 전역 객체는 `window.versions` 또는 `versions`로 접근 가능
    webPreferences: {
      // Node.js
      // `__dirname`: 현재 스크립트가 실행되고 있는 폴더(여기서는 프로젝트 루트)
      // `path.join`: 여러 경로를 결합
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile(`index.html`);
};

// `BrowserWindows` 인스턴스는 app 모듈이 `ready` 이벤트를 만들었을 때에만 호출할 수 있다.
// app 모듈의 `ready` 이벤트는 `app.whenReady()` API로 기다릴 수 있다.
app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong');
  createWindow();

  // macOS
  // `activate` 이벤트
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0) {
      createWindow();
    }
  });
});

// 화면을 닫을 때 앱 종료
// macOS(`darwin`) 제외
// NodeJS의 `process.platform` 변수는 특정 플랫폼을 대상으로 조건 동작을 수행할 때
// 도움이 된다.
//   win32(Windows), linux(Linux), darwin(macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
