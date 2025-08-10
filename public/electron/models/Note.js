class Note {
    #id = "";
    #content = "";
    #status = "";

    constructor(params) {
        const { id, content, status } = params;
        this.#id = id;
        this.#content = content;
        this.#status = status;
    }

    getStatus() {
        return this.#status;
    }

    getId() {
        return this.#id;
    }

    getContent() {
        return this.#content;
    }

    setContent(value) {
        this.#content = value;
    }
}

const parseNoteDatas = (noteDatas) => {
    return noteDatas.map(parseNoteData);
};

const parseNoteData = (noteData) => {
    return new Note(noteData);
};

const serialNotes = (notes) => {
    return notes.map(serialNote);
};

const serialNote = (note) => {
    const id = note.getId();
    const content = note.getContent();
    const status = note.getStatus();
    return {
        id,
        content,
        status,
    };
};

module.exports = {
    Note,
    parseNoteDatas,
    serialNotes,
};
