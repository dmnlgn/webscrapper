import axios from "axios";
const localUrl = "http://localhost:9000";

export const getScrapes = async (API, callback) => {
  await axios({
    method: "get",
    url: `${localUrl}${API}`,
  })
    .then((res) => callback(res))
    .catch((err) => console.log(err));
};