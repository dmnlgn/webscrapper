import { combineReducers } from "redux";
import { getData } from "./reducerGetData";
import { currentApi } from "./reducerGetApi";
import { getPagination } from "./reducerPagination";

export default combineReducers({
  getData,
  currentApi,
  getPagination,
});
