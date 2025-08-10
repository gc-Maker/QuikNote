const { app } = require("electron");
const { bindIpcEvent } = require("./ipcMain");
const { autoSave } = require("./utils/autoSave");
const { createWindows, createDefaultWindow } = require("./utils/window");
const { store } = require("./store");
const path = require("path");

const localDataPath = path.join(app.getPath("userData"), "app-data.json");
let windows = [];
let timer;
// 创建窗口函数
function main() {
    try {
        store.initData(localDataPath);
        const localData = store.getData();
        windows = createWindows(localData);
    } catch (error) {
        console.log(error, "error");
        windows = [createDefaultWindow()];
    }

    // win.setSkipTaskbar(false);
    bindIpcEvent(windows);
    timer = autoSave(windows, localDataPath);
}

// 应用就绪后创建窗口
app.whenReady().then(() => {
    main();
    // globalShortcut.register("CommandOrControl+Shift+I", () => {
    //     mainWindow.webContents.openDevTools();
    // });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("will-quit", () => {
    clearInterval(timer);
});
