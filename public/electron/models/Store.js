const fs = require("fs");
const { parseWidnowDatas, serializeWindows } = require("./Window");
const { parseNoteDatas, serialNotes } = require("./Note");

class Store {
    #data = {
        windows: [],
        notes: [],
    };

    constructor() {
        if (Store.instance) {
            throw Error("store已经存在");
        }
    }

    static getInstance() {
        if (!Store.instance) {
            Store.instance = new Store();
        }
        return Store.instance;
    }

    initData(localData) {
        try {
            this.#data = parseStoreData(localData);
        } catch (error) {
            throw Error("本地数据获取失败");
        }
    }

    getData() {
        return this.#data;
    }

    updateData(key, value) {
        this.#data[key] = value;
    }

    save(path) {
        try {
            const storeData = serializeStoreData(this.#data);
            fs.writeFileSync(path, JSON.stringify(storeData));
        } catch (error) {
            throw Error("数据保存失败");
        }
    }

    getWindows() {
        return this.#data.windows;
    }

    setWindows(windows) {
        this.#data.windows = windows;
    }

    getNotes() {
        return this.#data.notes;
    }

    setNotes(notes) {
        this.#data.notes = notes;
    }
}

const store = Store.getInstance();

const parseStoreData = (localData) => {
    if (!localData) {
        return {
            windows: [],
            notes: [],
        };
    }
    const { windowDatas, noteDatas } = localData;
    return {
        windows: parseWidnowDatas(windowDatas),
        notes: parseNoteDatas(noteDatas),
    };
};

const serializeStoreData = (data) => {
    const { windows, notes } = data;
    return {
        windowDatas: serializeWindows(windows),
        noteDatas: serialNotes(notes),
    };
};

module.exports = {
    store,
};
