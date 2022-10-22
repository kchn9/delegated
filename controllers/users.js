const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

function validatePassword(password) {
  return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
    password
  );
}

// GET /api/v1/users
usersRouter.get("/", (req, res, next) => {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      next(err);
    });
});

// POST /api/v1/users
usersRouter.post("/", (req, res, next) => {
  const { username, password } = req.body;

  if (validatePassword(password)) {
    const saltRounds = 10;
    bcrypt
      .hash(password, saltRounds)
      .then((passwordHash) => {
        const user = new User({
          username,
          passwordHash,
        });
        return user.save();
      })
      .then((savedUser) => {
        res.status(201).json(savedUser);
      })
      .catch((err) => next(err));
  } else {
    res.status(400).json({
      message: "User password validation failed.",
    });
  }
});

module.exports = usersRouter;
