const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const tripsRouter = require("./controllers/trips");

logger.info(`Connecting to MongoDB@:${config.MONGODB_URI}`);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connection established succesfully.");
  })
  .catch((err) => {
    logger.error("Connection failed - following error has been caught: ", err);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/v1/trips", tripsRouter);

app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

module.exports = app;