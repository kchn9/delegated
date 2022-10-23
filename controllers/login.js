const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { SECRET_KEY } = require("../utils/config");
const User = require("../models/user");

loginRouter.post("/", async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && isPasswordCorrect)) {
    return res.status(401).json({
      message: "Invalid combination of username and password.",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, SECRET_KEY);

  res.status(200).json(token);
});

module.exports = loginRouter;
