const config = require("./config");

const info = (...props) => {
  if (config.NODE_ENV !== "test") {
    console.log(...props);
  }
};

const error = (...props) => {
  if (config.NODE_ENV !== "test") {
    console.error(...props);
  }
};

module.exports = {
  info,
  error,
};
