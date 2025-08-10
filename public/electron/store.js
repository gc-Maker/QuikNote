const fs = require("fs");

class Store {
    #data = {};

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

    initData(path) {
        try {
            console.log(path, "path");
            this.#data = JSON.parse(fs.readFileSync(path, "utf8"));
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
            fs.writeFileSync(path, JSON.stringify(this.#data));
        } catch (error) {
            throw Error("数据保存失败");
        }
    }
}

const store = Store.getInstance();

module.exports = {
    store,
};
