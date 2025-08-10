const { ipcMain, Tray, Menu } = require("electron");
const path = require("path");
const { createDefaultWindow } = require("./utils/window");
const { NoteAction } = require("./type/NoteAction");
const { store } = require("./models/Store");
const { Note } = require("./models/Note");
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

    ipcMain.on("modify-notes", (e, type, payloads) => {
        const customId = e.sender.customId;
        switch (type) {
            case NoteAction.ADD:
                const window = store.getWindows().find((window) => {
                    return window.customId === customId;
                });
                if (window) {
                    const newNotes = store.getNotes().concat(
                        payloads.map((payload) => {
                            return new Note(payload);
                        })
                    );
                    store.updateData("notes", newNotes);
                    window.setNoteIds(newNotes.map((item) => item.getId()));
                }
                break;
            case NoteAction.UPDATE:
                const notes = store.getNotes();
                notes.forEach((note) => {
                    const payload = payloads.find((payload) => {
                        return payload.id === note.getId();
                    });
                    if (payload) {
                        const { content } = payload;
                        note.setContent(content);
                    }
                });
                break;
            default:
                return;
        }
    });
}

module.exports = {
    bindIpcEvent,
};
