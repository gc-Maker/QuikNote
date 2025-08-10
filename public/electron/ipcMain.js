const { ipcMain, Tray, Menu } = require("electron");
const path = require("path");
const { createDefaultWindow } = require("./utils/window");

function bindIpcEvent(windows) {
    ipcMain.on("minimize-window", (e) => {
        const curWin = e.sender;
        if (curWin) {
            curWin.hide();
            curWin.setSkipTaskbar(true);
            const iconPath = path.join(__dirname, "icon.jpg");
            const tray = new Tray(iconPath);
            tray.setToolTip("QuikNote");
            const contextMenu = Menu.buildFromTemplate([
                {
                    label: "恢复",
                    click: () => {
                        curWin.show();
                        curWin.setSkipTaskbar(true);
                        tray.destroy();
                    },
                },
            ]);
            tray.setContextMenu(contextMenu);
        }
    });

    ipcMain.on("create-window", () => {
        windows.push(createDefaultWindow());
    });
}

module.exports = {
    bindIpcEvent,
};
