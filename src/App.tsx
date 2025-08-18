import { PureComponent } from "react";
import Content from "./components/Content";
import Header from "./components/Header";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { NotesAction } from "@/type/enum/NotesAction";

interface Props {
    dispatch: Dispatch;
}

class App extends PureComponent<Props> {
    async componentDidMount() {
        const { notes } = await window.electronAPI.getData();
        this.props.dispatch({
            type: NotesAction.INIT,
            payload: notes,
        });
    }

    render() {
        return (
            <>
                <Header />
                <Content />
            </>
        );
    }
}

export default connect()(App);
