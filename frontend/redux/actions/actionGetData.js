import axios from "axios";

import { REQUEST_DATA, RECEIVE_DATA } from "./actionTypes";

export const requestData = (query) => ({
  type: REQUEST_DATA,
  query,
});
// This action will be called when request complete
export const receiveData = ({ status, payload }) => ({
  type: RECEIVE_DATA,
  status,
  payload,
});

export const getData = (API, query) => {
  return (dispatch) => {
    const localUrl = "http://localhost:9000";
    dispatch(requestData(query));
    return axios({
      method: "get",
      url: `${localUrl}${API}`,
    })
      .then((response) => {
        let data = response.data;

        let items = [];

        data.forEach((e) => {
          items = [...items, ...e.collection];
        });

        if (query) {
          items =
            items.filter((e) => {
              if (e.name.toLowerCase().includes(query)) {
                return true;
              }
            }) ?? [];
        }

        dispatch(
          receiveData({
            status: "success",
            payload: items,
          }),
        );

        //return data
      })
      .catch((error) => {
        dispatch(
          receiveData({
            status: "error",
            payload: error,
          }),
        );
      });
  };
};
