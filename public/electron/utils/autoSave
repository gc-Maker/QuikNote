const { store } = require("../store");

function autoSave(windows, path) {
    const timer = setInterval(() => {
        const windowdatas = windows.map((window) => {
            const bounds = window.getBounds();
            const { customId } = window;
            return {
                bounds,
                customId,
            };
        });
        store.updateData("windowDatas", windowdatas);
        store.save(path);
    }, 10000);
    return timer;
}

module.exports = {
    autoSave,
};
