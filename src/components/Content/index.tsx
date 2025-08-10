import { PureComponent } from "react";
import style from "./index.less";
// import StatusBar from "./StatusBar";
import StickyNotes from "./StickyNotes";
import Taskmanagement from "./Taskmanagement";

class Content extends PureComponent {
    render() {
        return (
            <div className={style.container}>
                {/* <StatusBar /> */}
                <Taskmanagement />
                <StickyNotes />
            </div>
        );
    }
}

export default Content;
