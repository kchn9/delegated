const Trip = require("../models/trip");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../utils/config");

const initialUsers = [
  {
    username: "testuser",
    password: "$tr0ngPassw0rd",
  },
];

const initializeUsers = async () => {
  const hashUsers = Promise.all(
    initialUsers.map(async (user) => {
      return {
        username: user.username,
        passwordHash: await bcrypt.hash(user.password, 10),
      };
    })
  );
  const hashedUsers = await hashUsers;
  const usersObj = hashedUsers.map((user) => new User(user));
  const promiseArray = usersObj.map((user) => user.save());
  return Promise.all(promiseArray);
};

const generateToken = async (credentials) => {
  const { username, password } = credentials;
  const user = await User.findOne({ username });
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (user && isValid) {
    const userForToken = {
      username: user.username,
      id: user._id,
    };
    return jwt.sign(userForToken, JWT_KEY);
  }
  return null;
};

const initialTrips = [
  {
    country: "Germany",
    startDate: "2022-02-12T15:42:00",
    endDate: "2022-04-16T01:38:00",
  },
  {
    country: "Latvia",
    startDate: "2022-05-12T15:42:00",
    endDate: "2022-08-01T01:38:00",
  },
];

const getTrips = async () => {
  const trips = await Trip.find({});
  return trips.map((trip) => trip.toJSON());
};

const getUsers = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const generateNonExistingId = async () => {
  const user = new User(initialUsers[0]);
  const trip = new Trip({
    country: "Java",
    startDate: "1970-01-01T00:00:00",
    endDate: "2000-01-01T00:00:00",
    user: user._id,
  });

  await trip.save();
  await trip.remove();

  return trip._id.toString();
};

module.exports = {
  initialTrips,
  initializeUsers,
  initialUsers,
  generateToken,
  getTrips,
  getUsers,
  generateNonExistingId,
};
