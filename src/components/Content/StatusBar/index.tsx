import { PureComponent } from "react";
import style from "./index.less";
import classnames from "classnames";

class StatusBar extends PureComponent {
    render() {
        return (
            <div className={style["status-bar"]}>
                <div className={style["status-item"]}>全部(100)</div>
                <div
                    className={classnames(
                        style["status-item"],
                        style["processing-bar"]
                    )}
                >
                    在办(100)
                </div>
                <div
                    className={classnames(
                        style["status-item"],
                        style["todo-bar"]
                    )}
                >
                    待办(100)
                </div>
                <div
                    className={classnames(
                        style["status-item"],
                        style["done-bar"]
                    )}
                >
                    已办(100)
                </div>
                <div
                    className={classnames(
                        style["status-item"],
                        style["overdue-bar"]
                    )}
                >
                    逾期(100)
                </div>
            </div>
        );
    }
}

export default StatusBar;
