const tripsRouter = require("express").Router();
const mongoose = require("mongoose");
const Trip = require("../models/trip");

// GET /api/v1/trips
tripsRouter.get("/", (req, res, next) => {
  Trip.find({})
    .then((allTrips) => {
      res.json(allTrips);
    })
    .catch((error) => next(error));
});

// GET /api/v1/trips/:id
tripsRouter.get("/:id", (req, res, next) => {
  Trip.findById(req.params.id)
    .then((trip) => {
      if (trip === null) {
        res.sendStatus(404);
      } else {
        res.json(trip);
      }
    })
    .catch((error) => next(error));
});

// POST /api/v1/trips
tripsRouter.post("/", (req, res, next) => {
  const { country, startDate, endDate } = req.body;
  const newTrip = new Trip({
    country,
    startDate,
    endDate,
  });

  newTrip
    .save()
    .then((savedTrip) => {
      res.status(201).json(savedTrip);
    })
    .catch((err) => {
      next(err);
    });
});

// PUT /api/v1/trips/:id
tripsRouter.put("/:id", (req, res, next) => {
  const { title, country, startDate, endDate } = req.body;
  const id = req.params.id;

  const updateQuery = {
    title,
    country,
    startDate,
    endDate,
  };

  if (updateQuery.startDate || updateQuery.endDate) {
    Trip.findById(id)
      .then((currentTrip) => {
        const startDate = updateQuery.startDate
          ? new Date(updateQuery.startDate)
          : currentTrip.startDate;
        const endDate = updateQuery.endDate
          ? new Date(updateQuery.endDate)
          : currentTrip.endDate;

        if (endDate > startDate) {
          Trip.findByIdAndUpdate(
            id,
            {
              ...updateQuery,
              daysLength: (endDate - startDate) / (1000 * 60 * 60 * 24), // 1000ms in s, 60s in min, 60min in h, 24h in day
            },
            { new: true }
          )
            .then((updatedTrip) => {
              return res.status(200).json(updatedTrip);
            })
            .catch((err) => next(err));
        } else {
          throw new mongoose.Error.ValidatorError({
            path: "endDate",
            value: endDate,
          });
        }
      })
      .catch((err) => next(err));
  } else {
    Trip.findByIdAndUpdate(id, updateQuery, {
      runValidators: true,
      new: true,
    })
      .then((updatedTrip) => {
        res.status(200).json(updatedTrip);
      })
      .catch((err) => next(err));
  }
});

// DELETE /api/v1/trips/:id
tripsRouter.delete("/:id", (req, res, next) => {
  Trip.findByIdAndRemove(req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = tripsRouter;
