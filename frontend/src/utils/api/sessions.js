import axios from "axios";

export default {
  login(username, password) {
    return axios
      .post("/api/v1/login", {
        username,
        password,
      })
      .then((res) => res.data);
  },
};
