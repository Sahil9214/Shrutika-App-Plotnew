import { legacy_createStore } from "redux";
import { reducer } from "./redux/reducer";

export const store = legacy_createStore(reducer);
