const { contextBridge, ipcRenderer } = require('electron');

// Main process에서 Renderer 프로세스로 전달
// main.js에서 preload.js를 로드할 수 있도록 설정 필요
// `contextBridge` API를 통해서 `전역 객체`를 정의해서 데이터를 전달
// 아래 예시에서는 `versions` 전역 객체를 전달
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
});
