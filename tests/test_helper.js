const Trip = require("../models/trip");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../utils/config");

// intialUsers[0] is trip author in test database, initialUsers[1] is another user
const initialUsers = [
  {
    username: "testuser",
    password: "$tr0ngPassw0rd",
  },
  {
    username: "notowner",
    password: "#Hacker!2",
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

const getUsers = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const getUserId = async (index) => {
  const users = await User.find({});
  return users[index].id;
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

const initializeTrips = async () => {
  const promiseArray = initialTrips.map(
    async (trip) =>
      new Trip({
        ...trip,
        user: await getUserId(0),
      })
  );
  const tripObjects = await Promise.all(promiseArray);
  const saveTrips = tripObjects.map((trip) => trip.save());
  return Promise.all(saveTrips);
};

const getTrips = async () => {
  const trips = await Trip.find({});
  return trips.map((trip) => trip.toJSON());
};

const getTripId = async (index) => {
  const trips = await Trip.find({});
  return trips.map((trip) => trip.toJSON())[index].id;
};

const generateToken = (username, _id) => {
  const userForToken = {
    username: username,
    id: _id,
  };
  return jwt.sign(userForToken, JWT_KEY);
};

const generateAuthorToken = async () => {
  const authorId = await getUserId(0);
  return generateToken(initialUsers[0].username, authorId);
};

const generateNonExistingId = async () => {
  const trip = new Trip({
    country: "Java",
    startDate: "1970-01-01T00:00:00",
    endDate: "2000-01-01T00:00:00",
    user: await getUserId(0),
  });

  await trip.save();
  await trip.remove();

  return trip._id.toString();
};

module.exports = {
  initialUsers,
  initializeUsers,
  getUsers,
  getUserId,
  initialTrips,
  initializeTrips,
  getTrips,
  getTripId,
  generateToken,
  generateAuthorToken,
  generateNonExistingId,
};
