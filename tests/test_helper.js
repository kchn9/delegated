const Trip = require("../models/trip");

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

module.exports = {
  initialTrips,
  getTrips,
};
