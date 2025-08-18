import { NotesAction } from "./type/enum/NotesAction";
import { NoteItem } from "./type/interface/NoteItem";

declare global {
    interface Window {
        electronAPI: {
            minimize: () => void;
            createWindow: () => void;
            modifyNotes: (type: NotesAction, payloads: NoteItem[]) => void;
            getData: () => {
                notes: NoteItem[];
            };
        };
    }
}

export {};
