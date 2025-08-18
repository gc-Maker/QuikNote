const { app, ipcMain } = require("electron");
const { bindIpcEvent } = require("./ipcMain");
const { autoSave } = require("./utils/autoSave");
const { createWindows, createDefaultWindow } = require("./utils/window");
const { store } = require("./models/Store");
const fs = require("fs");
const path = require("path");

const localDataPath = path.join(app.getPath("userData"), "app-data.json");
let windows = [];
let timer;
// 创建窗口函数
function main() {
    const handleDefault = () => {
        const defaultWindow = createDefaultWindow();
        windows = [defaultWindow];
        const bounds = defaultWindow.getBounds();
        const { customId } = defaultWindow;
        store.initData({
            windowDatas: [
                {
                    bounds,
                    customId,
                },
            ],
            noteDatas: [],
        });
    };

    try {
        const localData = fs.readFileSync(localDataPath, "utf8");
        if (localData) {
            store.initData(JSON.parse(localData));
            windows = createWindows(store.getWindows());
        } else {
            handleDefault();
        }
    } catch (error) {
        handleDefault();
    }

    bindIpcEvent(windows);
    timer = autoSave(windows, localDataPath);
}

// 应用就绪后创建窗口
app.whenReady().then(() => {
    main();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("will-quit", () => {
    clearInterval(timer);
});
