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
import _ from "lodash";

interface Props {
    notes: NoteItem[];
    dispatch: Dispatch;
    status: TaskStatus;
}

class StickyNotes extends PureComponent<Props> {
    state = {
        renderNotes: [] as NoteItem[],
    };

    static getDerivedStateFromProps(nextProps: Props) {
        const { notes, status } = nextProps;
        return {
            renderNotes: notes.filter((note) => {
                return note.status === status;
            }),
        };
    }

    handleUpdate = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        note: NoteItem
    ) => {
        const value = e.target.value;
        const { id, status } = note;
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
        e: React.ChangeEvent<HTMLTextAreaElement>,
        note: NoteItem
    ) => {
        const value = e.target.value;
        const { id, status } = note;
        const payload = {
            id,
            content: value,
            status,
        };
        window.electronAPI.modifyNotes(NotesAction.UPDATE, [payload]);
    };

    handleDelete = (note: NoteItem) => {
        this.props.dispatch({
            type: NotesAction.DELETE,
            payload: {
                id: note.id,
            },
        });
        window.electronAPI.modifyNotes(NotesAction.DELETE, [note]);
    };

    render() {
        const { renderNotes } = this.state;
        return (
            <div className={style["notes-container"]}>
                {renderNotes.map((note) => {
                    const { id, content, status } = note;
                    return (
                        <div
                            className={classnames(
                                style["sticky-note"],
                                style[getClassNameByStatus(status)]
                            )}
                            key={id}
                            data-content={content.replace(/\n/g, "\n\u200B")}
                        >
                            <textarea
                                value={content}
                                onChange={(e) => {
                                    this.handleUpdate(e, note);
                                }}
                                onBlur={(e) => {
                                    this.handleBlur(e, note);
                                }}
                            />
                            {/* <button
                                onClick={() => {
                                    this.handleDelete(note);
                                }}
                            >
                                删除
                            </button> */}
                        </div>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state: State) => {
    return { notes: state.notes, status: state.status };
};

export default connect(mapStateToProps)(StickyNotes);
