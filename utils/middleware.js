const morgan = require("morgan");
const logger = require("./logger");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../utils/config");

const requestLogger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    "-",
    tokens["response-time"](req, res),
    "ms",
    Object.keys(req.body).length === 0
      ? ""
      : `| body: ${JSON.stringify(req.body)}`,
  ].join(" ");
});

const jwtDecoder = (req, res, next) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.decodedToken = jwt.verify(authorization.substring(7), JWT_KEY);
  }
  return next();
};

const unknownEndpointHandler = (req, res) => {
  return res.sendStatus(404);
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (
    error.name === "ValidationError" ||
    error.name === "ValidatorError" ||
    error.name === "CastError"
  ) {
    return res.sendStatus(400);
  }
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
  if (error.name === "JsonExpiredError") {
    return res.status(401).json({
      message: "Token expired",
    });
  }

  next(error);
};

module.exports = {
  requestLogger,
  jwtDecoder,
  unknownEndpointHandler,
  errorHandler,
};
