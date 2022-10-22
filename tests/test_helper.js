const Trip = require("../models/trip");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const initialUsers = async () => {
  return [
    {
      username: "testuser",
      passwordHash: await bcrypt.hash("Str0nGP@ssw0rD", 10),
    },
  ];
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
  const trip = new Trip({
    country: "Java",
    startDate: "1970-01-01T00:00:00",
    endDate: "2000-01-01T00:00:00",
  });

  await trip.save();
  await trip.remove();

  return trip._id.toString();
};

module.exports = {
  initialTrips,
  initialUsers,
  getTrips,
  getUsers,
  generateNonExistingId,
};
