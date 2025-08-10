import { TaskStatus } from "../enum/TaskStatus";

export interface NoteItem {
    id: string;
    status: TaskStatus;
    content: string;
}
