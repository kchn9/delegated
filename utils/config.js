// this module may be changed to node-config package
require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV;
const JWT_KEY = process.env.JWT_KEY;

module.exports = {
  PORT,
  MONGODB_URI,
  NODE_ENV,
  JWT_KEY,
};
