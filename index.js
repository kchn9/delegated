const config = require("./utils/config");
const http = require("http");
const app = require("./app");
const logger = require("./utils/logger");

http.createServer(app).listen(() => {
  logger.info(`Server is running on PORT: ${config.PORT}`);
});
