import { TaskStatus } from "../enum/TaskStatus";
import { NoteItem } from "./NoteItem";

export interface State {
    notes: NoteItem[];
    status: TaskStatus;
}
