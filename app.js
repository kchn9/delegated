const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const usersRouter = require("./controllers/users");
const tripsRouter = require("./controllers/trips");
const loginRouter = require("./controllers/login");

logger.info(`Connecting to MongoDB@:${config.MONGODB_URI}`);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connection established succesfully.");
  })
  .catch((err) => {
    logger.error("Connection failed - following error has been caught: ", err);
  });

app.use(express.static("dist"));
app.use("/home", express.static("dist"));
app.use("/register", express.static("dist"));
app.use("/login", express.static("dist"));
app.use("/dashboard", express.static("dist"));
app.use("/dashboard/trips", express.static("dist"));
app.use("/dashboard/trips/new", express.static("dist"));
app.use("/dashboard/map", express.static("dist"));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.jwtDecoder);

app.use("/api/v1/login", loginRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/trips", tripsRouter);

app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

module.exports = app;
