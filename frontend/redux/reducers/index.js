import { combineReducers } from "redux";
import { getData } from "./reducerGetData";
import { currentApi } from "./reducerGetApi";

export default combineReducers({
    getData,
    currentApi
});
