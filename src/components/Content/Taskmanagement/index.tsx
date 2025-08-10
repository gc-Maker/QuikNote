import { PureComponent } from "react";
import style from "./index.less";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { TaskStatus } from "@/type/enum/TaskStatus";
import { v4 } from "uuid";
import { NotesAction } from "@/type/enum/NotesAction";

interface Props {
    dispatch: Dispatch;
}

class TaskManagement extends PureComponent<Props> {
    handleAdd = () => {
        const payload = {
            id: v4(),
            content: "",
            status: TaskStatus.TODO,
        };
        this.props.dispatch({
            type: NotesAction.ADD,
            payload,
        });
        window.electronAPI.modifyNotes(NotesAction.ADD, [payload]);
    };

    render() {
        return (
            <div className={style["task-control"]}>
                <button className={style.button} onClick={this.handleAdd}>
                    +
                </button>
                <select className={style.select}>
                    <option value={TaskStatus.ALL} className={style.option}>
                        全部
                    </option>
                    <option
                        value={TaskStatus.PROCESSING}
                        className={style.option}
                    >
                        在办
                    </option>
                    <option value={TaskStatus.TODO} className={style.option}>
                        待办
                    </option>
                    <option value={TaskStatus.DONE} className={style.option}>
                        已办
                    </option>
                    <option value={TaskStatus.OVERDUE} className={style.option}>
                        逾期
                    </option>
                </select>
                <input placeholder="搜索" className={style.input} />
            </div>
        );
    }
}

export default connect()(TaskManagement);
