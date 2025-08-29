import { PureComponent } from "react";
import style from "./index.less";
import ToolBar from "./ToolBar";

class Header extends PureComponent {
    render() {
        return (
            <div className={style.container}>
                <div className={style.main}>QuikNote</div>
                <ToolBar />
            </div>
        );
    }
}

export default Header;
