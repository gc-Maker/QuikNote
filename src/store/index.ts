import { createStore, combineReducers } from "redux";
import { notesReducer, statusReducer } from "./reducer";

const store = createStore(
    combineReducers({
        notes: notesReducer,
        status: statusReducer,
    })
);

export default store;
