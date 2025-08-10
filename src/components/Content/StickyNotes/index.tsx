import { PureComponent } from "react";
import style from "./index.less";
import { connect } from "react-redux";
import { State } from "@/type/interface/State";
import { NoteItem } from "@/type/interface/NoteItem";
import classnames from "classnames";
import { getClassNameByStatus } from "./utils";
import { Dispatch } from "redux";
import { NotesAction } from "@/type/enum/NotesAction";
import { TaskStatus } from "@/type/enum/TaskStatus";

interface Props {
    notes: NoteItem[];
    dispatch: Dispatch;
}

class StickyNotes extends PureComponent<Props> {
    handleUpdate = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: string,
        status: TaskStatus
    ) => {
        const value = e.target.value;
        const payload = {
            id,
            content: value,
            status,
        };
        this.props.dispatch({
            type: NotesAction.UPDATE,
            payload,
        });
    };

    handleBlur = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: string,
        status: TaskStatus
    ) => {
        const value = e.target.value;
        const payload = {
            id,
            content: value,
            status,
        };
        window.electronAPI.modifyNotes(NotesAction.UPDATE, [payload]);
    };

    handleDelete = (id: string) => {
        this.props.dispatch({
            type: NotesAction.DELETE,
            payload: {
                id,
            },
        });
    };

    render() {
        const { notes } = this.props;
        console.log(notes, "notes");
        return (
            <div>
                {notes.map((note) => {
                    const { id, content, status } = note;
                    return (
                        <div
                            className={classnames(
                                style["sticky-note"],
                                style[getClassNameByStatus(status)]
                            )}
                            key={id}
                        >
                            <input
                                value={content}
                                onChange={(e) => {
                                    this.handleUpdate(e, id, status);
                                }}
                                onBlur={(e) => {
                                    this.handleBlur(e, id, status);
                                }}
                            />
                            <button
                                onClick={() => {
                                    this.handleDelete(id);
                                }}
                            >
                                删除
                            </button>
                        </div>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state: State) => {
    return { notes: state.notes };
};

export default connect(mapStateToProps)(StickyNotes);
