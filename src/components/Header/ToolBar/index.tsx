import { PureComponent } from "react";
import style from "./index.less";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
class ToolBar extends PureComponent {
    handleMinimize = () => {
        window.electronAPI.minimize();
    };

    handleCreate = () => {
        window.electronAPI.createWindow();
    };

    render() {
        return (
            <div className={style.toolbar}>
                <MinusOutlined
                    onClick={this.handleMinimize}
                    className={style.icon}
                />
                <PlusOutlined
                    onClick={this.handleCreate}
                    className={style.icon}
                />
            </div>
        );
    }
}

export default ToolBar;
