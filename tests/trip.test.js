const app = require("../app");
const mongoose = require("mongoose");
const Trip = require("../models/trip");
const User = require("../models/user");

const helper = require("./test_helper");

beforeEach(async () => {
  await Trip.deleteMany({});
  const user = new User((await helper.initialUsers())[0]);
  const tripObjects = helper.initialTrips.map(
    (trip) =>
      new Trip({
        ...trip,
        user: user._id,
      })
  );
  const promiseArray = tripObjects.map((trip) => trip.save());
  await Promise.all(promiseArray);
});

describe("when there is initially some trips saved", () => {
  test("returns trips with properly parsed id", async () => {
    const trips = await helper.getTrips();
    trips.every((trip) => expect(trip.id).toBeDefined());
  });

  test("trips have default titles", async () => {
    const trips = await helper.getTrips();
    trips.every((trip) => expect(trip.title).toBeDefined());
  });

  test("trips have properly calculated daysLength", async () => {
    const selectedTrip = (await helper.getTrips())[0];
    const start = new Date(selectedTrip.startDate);
    const end = new Date(selectedTrip.endDate);
    const expected = (end - start) / (1000 * 60 * 60 * 24);
    expect(selectedTrip.daysLength).toBe(expected);
  });
});

describe("trip creation", () => {
  test("should create valid trip", async () => {
    const newTrip = new Trip({
      country: "Belgium",
      startDate: "2021-06-18T06:44:00",
      endDate: "2022-07-21T11:24:00",
      user: (await helper.getUsers())[0].id,
    });
    await newTrip.save();
    const afterCreate = await helper.getTrips();
    expect(afterCreate).toHaveLength(helper.initialTrips.length + 1);
    const countries = afterCreate.map((trip) => trip.country);
    expect(countries).toContainEqual(newTrip.country);
  });

  describe("validation", () => {
    test("should not validate without country", async () => {
      const trip = new Trip({
        startDate: "2024-01-02T12:44:00",
        endDate: "2025-10-21T15:18:00",
        user: (await helper.getUsers())[0].id,
      });
      await expect(trip.validate()).rejects.toThrow(
        mongoose.Error.ValidationError
      );
    });

    test("should not validate with startDate exceeding endDate", async () => {
      const trip = new Trip({
        country: "Sweeden",
        startDate: "2021-01-04T02:13:00",
        endDate: "2020-10-11T13:46:00",
        user: (await helper.getUsers())[0].id,
      });
      await expect(trip.validate()).rejects.toThrow(
        mongoose.Error.ValidationError
      );
    });

    test("should not validate if user is not present", async () => {
      const trip = new Trip({
        country: "Sweeden",
        startDate: "2024-01-02T12:44:00",
        endDate: "2025-10-21T15:18:00",
      });
      await expect(trip.validate()).rejects.toThrow(
        mongoose.Error.ValidationError
      );
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
