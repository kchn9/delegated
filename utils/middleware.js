const morgan = require("morgan");
const logger = require("./logger");

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

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpointHandler,
  errorHandler,
};
