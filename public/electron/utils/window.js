const { BrowserWindow } = require("electron");
const path = require("path");
const { v4 } = require("uuid");
const url = require("url");

const isDevelopment = process.env.NODE_ENV === "development";

const defaultParams = {
    width: 300,
    minWidth: 300,
    height: 400,
    minHeight: 400,
    frame: false,
    fullscreenable: false,
    maximizable: false,
    transparent: true,
    webPreferences: {
        contextIsolation: true,
        enableRemoteModule: false,
        devTools: true,
        preload: path.join(__dirname, "../preload.js"),
    },
};

function createWindows(windows) {
    if (!windows.length) {
        return [createDefaultWindow()];
    } else {
        return windows.map(createWindow);
    }
}

function createWindow(window) {
    const bounds = window.getBounds();
    const customId = window.getCustomId();
    const browserWindow = new BrowserWindow({
        ...defaultParams,
        ...bounds,
    });
    browserWindow.customId = customId;
    console.log(browserWindow.customId, "customId");
    loadHTML(browserWindow);
    return browserWindow;
}

function createDefaultWindow() {
    const customId = v4();
    const browserWindow = new BrowserWindow(defaultParams);
    browserWindow.customId = customId;
    loadHTML(browserWindow);
    return browserWindow;
}

function loadHTML(win) {
    if (isDevelopment) {
        win.loadURL("http://localhost:3000");
        win.webContents.openDevTools();
    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, "../build/index.html"),
                protocol: "file:",
                slashes: true,
            })
        );
    }
}

module.exports = {
    createWindows,
    createDefaultWindow,
};
