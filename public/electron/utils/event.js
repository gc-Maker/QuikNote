const bindEvent = (windows) => {
    windows.forEach((win) => {
        win.on("moved", () => {
            const position = win.getPosition();
            console.log(position, "position");
            if (position[1] < 10) {
                win.hide();
            }
        });
    });
};

module.exports = {
    bindEvent,
};
