export default {
  hasToken() {
    return localStorage.getItem("jwt") ? true : false;
  },
};
