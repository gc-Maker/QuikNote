class Window {
    #bounds = {};
    #customId = "";
    #noteIds = [];

    constructor(params) {
        const { bounds, customId } = params;
        this.#bounds = bounds;
        this.#customId = customId;
    }

    getBounds() {
        return this.#bounds;
    }

    setBounds(bounds) {
        this.#bounds = bounds;
    }

    getCustomId() {
        return this.#customId;
    }

    setNoteIds(ids) {
        this.#noteIds = ids;
    }

    getNoteIds() {
        return this.#noteIds;
    }
}

const parseWindowData = (windowData) => {
    return new Window(windowData);
};

const parseWidnowDatas = (windowDatas) => {
    if (!windowDatas) {
        return [];
    }
    return windowDatas.map(parseWindowData);
};

const serializeWindows = (windows) => {
    return windows.map(serializeWindow);
};

const serializeWindow = (window) => {
    const bounds = window.getBounds();
    const customId = window.getCustomId();
    const noteIds = window.getNoteIds();
    return {
        bounds,
        customId,
        noteIds,
    };
};

module.exports = {
    Window,
    parseWidnowDatas,
    serializeWindows,
};
