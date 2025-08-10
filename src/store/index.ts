import { createStore, combineReducers } from "redux";
import { notesReducer } from "./reducer";

const store = createStore(
    combineReducers({
        notes: notesReducer,
    })
);

export default store;
