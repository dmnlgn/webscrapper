import { GET_API } from "./actionTypes";

export const currentApi = (state) => ({
  type: GET_API,
  state,
});
