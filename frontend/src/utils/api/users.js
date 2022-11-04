import axios from "axios";

export default {
  createUser(username, password) {
    return axios
      .post("/api/v1/users", {
        username,
        password,
      })
      .then((res) => res.data);
  },
};
