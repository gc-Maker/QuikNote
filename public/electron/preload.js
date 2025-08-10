const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    minimize: () => ipcRenderer.send("minimize-window"), // 最小化
    createWindow: () => ipcRenderer.send("create-window"), // 创建新窗口
});
