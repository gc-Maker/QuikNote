import { NoteItem } from "@/type/interface/NoteItem";
import { NotesAction } from "@/type/enum/NotesAction";
import { TaskStatus } from "@/type/enum/TaskStatus";
import { StatusAction } from "@/type/enum/StatusAction";

function notesReducer(
    state: NoteItem[] = [],
    action: {
        type: NotesAction;
        payload: Record<string, any>;
    }
) {
    const { type, payload } = action;
    switch (type) {
        case NotesAction.ADD:
            return state.concat(payload as NoteItem);
        case NotesAction.DELETE:
            return state.filter((note) => note.id !== payload.id);
        case NotesAction.UPDATE:
            return state.map((note) => {
                if (note.id === payload.id) {
                    return { ...note, ...payload };
                } else {
                    return note;
                }
            });
        case NotesAction.INIT:
            return payload;
        default:
            return state;
    }
}

function statusReducer(
    state: TaskStatus = TaskStatus.PROCESSING,
    action: {
        type: StatusAction;
        payload: TaskStatus;
    }
) {
    const { type, payload } = action;
    switch (type) {
        case StatusAction.ChangeStatus:
            return payload;
        default:
            return state;
    }
}

export { notesReducer, statusReducer };
