import { REQUEST_DATA, RECEIVE_DATA } from "../actions/actionTypes";
const initalState = {
  query: "",
  isFetching: false,
  dataTest: [],
  error: "",
};

export const getData = (state = initalState, action) => {
  switch (action.type) {
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        query: action.query,
      });
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        dataTest: action.status === "success" ? action.payload : initalState.dataTest,
        error: action.status === "error" ? action.payload : initalState.error,
      });
    default:
      return state;
  }
};
