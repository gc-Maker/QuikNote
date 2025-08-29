const { store } = require("../models/Store");

function autoSave(windows, path) {
    const timer = setInterval(() => {
        const oldWindows = store.getWindows();
        const newWindows = oldWindows.map((oldWin) => {
            const customId = oldWin.getCustomId();
            const win = windows.find((win) => {
                return win.customId === customId;
            });
            const newBounds = win.getBounds();
            oldWin.setBounds(newBounds);
            return oldWin;
        });
        store.setWindows(newWindows);
        store.save(path);
    }, 10000);
    return timer;
}

module.exports = {
    autoSave,
};
