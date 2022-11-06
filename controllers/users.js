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
    .populate(
      "trips",
      {
        country: 1,
        startDate: 1,
        endDate: 1,
        title: 1,
        daysLength: 1,
        created: 1,
      },
      null,
      {
        sort: {
          created: "desc",
        },
      }
    )
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/v1/users/:id
usersRouter.get("/:id", (req, res, next) => {
  if (!req.decodedToken || !req.decodedToken.id || !req.decodedToken.username) {
    return res.status(401).json({
      message: "Token invalid",
    });
  }

  const id = req.params.id;
  User.findById(id)
    .populate(
      "trips",
      {
        country: 1,
        startDate: 1,
        endDate: 1,
        title: 1,
        daysLength: 1,
        created: 1,
      },
      null,
      {
        sort: {
          created: "desc",
        },
      }
    )
    .then((user) => {
      if (!user) {
        return res.sendStatus(404);
      } else if (!user._id.equals(req.decodedToken.id)) {
        return res.sendStatus(401);
      } else {
        res.json(user);
      }
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
      message:
        "User password has to fulfill follwing conditions:\n8 char long or longer,\nat least 1 lower case,\nat least 1 capital,\nat least 1 digit,\nat least 1 special character.",
    });
  }
});

module.exports = usersRouter;
