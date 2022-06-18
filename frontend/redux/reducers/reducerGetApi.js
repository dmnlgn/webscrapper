import { GET_API } from "../actions/actionTypes";

const initalState = {
  stateApi: null,
};

export const currentApi = (state = initalState, action) => {
  switch (action.type) {
    case GET_API:
      return Object.assign({}, state, {
        stateApi: action.state,
      });
    default:
      return state;
  }
};
