# Electron

## Preload Scripts

### What is a preload script?

- main process (ex. app)
  - 운영체제 환경에 접근할 수 있는 Node.js 프로세스
- renderer process (ex BrowserWindow)
  - 웹 페이지를 실행(렌더링)하며, 보안상의 이유로 Node.js를 실행하지 않는다.

Electron의 서로 다른 프로세스(main, renderer)를 연결(통신)하기 위해서 `preload`라고 불리는 특별한 스크립트를 사용한다.

### Augmenting the renderer with a preload script

`BrowserWindow`의 `preload` 스크립트는 HTML DOM에 모두 엑세스할 수 있는 컨텍스트에서 실행되며, Node.js 및 Electron API의 제한된 서브셋을 제공한다.

- 크롬 확장자의 `content scripts`와 비슷하게 Preload script는 `renderer`에 웹 페이지가 로드되기 전에 실행된다.

### Communicating between processes

- renderer 프로세스에서는 Node.js API에 접근할 수 없고, main 프로세스에서는 DOM에 접근할 수 없다.
- 이를 해결하기 위해서 Electron의 `ipcMain` / `ipcRenderer` 모듈을 사용한다.
  - inter-process communication (IPC)

웹 페이지에서 main 프로세스로 메시지를 보내기 위해서 main 프로세스에서 `ipcMain.handle`을 설정하고, `preload scripts`에서 `ipcRenderer.invoke`를 실행해서 이벤트를 발생
