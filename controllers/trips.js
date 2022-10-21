const tripsRouter = require("express").Router();
const Trip = require("../models/trip");

tripsRouter.get("/", (req, res, next) => {
  Trip.find({})
    .then((allTrips) => {
      res.json(allTrips);
    })
    .catch((error) => next(error));
});

module.exports = tripsRouter;
