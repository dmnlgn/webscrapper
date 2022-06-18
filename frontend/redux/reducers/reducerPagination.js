import { GET_PAGINATION } from "../actions/actionTypes";

const initialValue = {
  paginationState: {
    currentPage: 1,
  },
};

export const getPagination = (state = initialValue, action) => {
  switch (action.type) {
    case GET_PAGINATION:
      return Object.assign({}, state, action.state);
    default:
      return state;
  }
};
