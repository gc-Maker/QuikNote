import { PureComponent } from "react";
import style from "./index.less";
import classnames from "classnames";
import { TaskStatus } from "@/type/enum/TaskStatus";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { StatusAction } from "@/type/enum/StatusAction";

interface Props {
    dispatch: Dispatch;
}

class StatusBar extends PureComponent<Props> {
    state = {
        activeStatus: TaskStatus.PROCESSING,
    };

    onChangeStatus = (status: TaskStatus) => {
        this.props.dispatch({
            type: StatusAction.ChangeStatus,
            payload: status,
        });
        this.setState({
            activeStatus: status,
        });
    };

    render() {
        const { activeStatus } = this.state;

        return (
            <div className={style["status-bar"]}>
                {/* <div className={style["status-item"]}>全部(100)</div> */}
                <div
                    className={classnames(
                        style["status-item"],
                        style["processing-bar"],
                        {
                            [style["active"]]:
                                activeStatus === TaskStatus.PROCESSING,
                        }
                    )}
                    onClick={() => {
                        this.onChangeStatus(TaskStatus.PROCESSING);
                    }}
                >
                    在办
                </div>
                {/* <div
                    className={classnames(
                        style["status-item"],
                        style["todo-bar"]
                    )}
                    onClick={() => {
                        this.onChangeStatus(TaskStatus.PROCESSING)
                    }}
                >
                    待办
                </div> */}
                <div
                    className={classnames(
                        style["status-item"],
                        style["done-bar"],
                        {
                            [style["active"]]: activeStatus === TaskStatus.DONE,
                        }
                    )}
                    onClick={() => {
                        this.onChangeStatus(TaskStatus.DONE);
                    }}
                >
                    已办
                </div>
                <div
                    className={classnames(
                        style["status-item"],
                        style["overdue-bar"],
                        {
                            [style["active"]]:
                                activeStatus === TaskStatus.ABONDON,
                        }
                    )}
                    onClick={() => {
                        this.onChangeStatus(TaskStatus.ABONDON);
                    }}
                >
                    放弃
                </div>
            </div>
        );
    }
}

export default connect()(StatusBar);
