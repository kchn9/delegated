const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Trip = require("../models/trip");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await Trip.deleteMany({});
  await User.deleteMany({});
  await helper.initializeUsers();
  await helper.initializeTrips();
});

describe("when there is initially some trips saved", () => {
  test("trips are returned as json", async () => {
    await api.get("/api/v1/trips").expect(200).expect("Content-Type", /json/);
  });

  test("all trips are returned", async () => {
    const response = await api.get("/api/v1/trips");
    expect(response.body).toHaveLength(helper.initialTrips.length);
  });

  test("specific trip is in returned", async () => {
    const response = await api.get("/api/v1/trips");
    const countries = response.body.map((trip) => trip.country);
    expect(countries).toContainEqual(helper.initialTrips[0].country);
  });
});

describe("viewing a specific trip", () => {
  test("succeeds with valid id", async () => {
    const token = await helper.generateAuthorToken();
    const selectedTrip = (await helper.getTrips())[0];
    const expected = JSON.parse(JSON.stringify(selectedTrip));

    const response = await api
      .get(`/api/v1/trips/${selectedTrip.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toMatchObject(expected);
  });

  test("fails with status code 400 if id is invalid", async () => {
    const token = await helper.generateAuthorToken();
    const invalidId = "a123dsad123";

    await api
      .get(`/api/v1/trips/${invalidId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });

  test("fails with status code 401 if user is not signed in", async () => {
    const selectedTripId = await helper.getTripId(0);

    await api
      .get(`/api/v1/trips/${selectedTripId}`)
      .expect(401)
      .expect("Content-Type", /json/);
  });

  test("fails with status code 401 if user is not trip author", async () => {
    const anotherUser = new User({
      username: "anyotheruser",
      passwordHash: await bcrypt.hash("st0n#0vGA!@", 10),
    });
    const token = helper.generateToken(anotherUser.username, anotherUser._id);
    const selectedTripId = await helper.getTripId(0);

    await api
      .get(`/api/v1/trips/${selectedTripId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401);
  });

  test("fails with status code 404 if trip does not exist", async () => {
    const token = await helper.generateAuthorToken();
    const nonExistingId = await helper.generateNonExistingId();

    await api
      .get(`/api/v1/trips/${nonExistingId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

describe("addition of new trip", () => {
  test("succeeds with valid data", async () => {
    const token = await helper.generateAuthorToken();
    const newTrip = {
      country: "Moldavia",
      startDate: "2022-05-01T14:22:00",
      endDate: "2023-01-01T00:01:00",
      userId: await helper.getUserId(0),
    };

    await api
      .post("/api/v1/trips")
      .set("Authorization", `Bearer ${token}`)
      .send(newTrip)
      .expect(201)
      .expect("Content-Type", /json/);

    const afterCreate = await helper.getTrips();
    expect(afterCreate).toHaveLength(helper.initialTrips.length + 1);
    const countries = afterCreate.map((trip) => trip.country);
    expect(countries).toContainEqual(newTrip.country);
  });

  test("fails with status code 401 if user is not signed in", async () => {
    const newTrip = {
      startDate: "2022-05-01T14:22:00",
      endDate: "2023-01-01T00:01:00",
      userId: await helper.getUserId(0),
    };

    await api.post("/api/v1/trips").send(newTrip).expect(401);
    const response = await api.get("/api/v1/trips");
    expect(response.body).toHaveLength(helper.initialTrips.length);
  });

  test("fails with status code 400 if data is invalid", async () => {
    const token = await helper.generateAuthorToken();
    const newTrip = {
      startDate: "2022-05-01T14:22:00",
      endDate: "2023-01-01T00:01:00",
      userId: await helper.getUserId(0),
    };

    await api
      .post("/api/v1/trips")
      .set("Authorization", `Bearer ${token}`)
      .send(newTrip)
      .expect(400);

    const response = await api.get("/api/v1/trips");
    expect(response.body).toHaveLength(helper.initialTrips.length);
  });
});

describe("deletion of trip", () => {
  test("succeeds with valid id", async () => {
    const token = await helper.generateAuthorToken();
    const selectedTrip = (await helper.getTrips())[0];
    await api
      .delete(`/api/v1/trips/${selectedTrip.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const afterDelete = await helper.getTrips();
    expect(afterDelete).toHaveLength(helper.initialTrips.length - 1);
    const countries = afterDelete.map((trip) => trip.country);
    expect(countries).not.toContainEqual(selectedTrip.country);
  });

  test("fails with status code 401 if user is not signed in", async () => {
    const selectedTripId = await helper.getTripId(0);

    await api
      .delete(`/api/v1/trips/${selectedTripId}`)
      .expect(401)
      .expect("Content-Type", /json/);
  });

  test("fails with status code 401 if user is not trip author", async () => {
    const anotherUser = new User({
      username: "anyotheruser",
      passwordHash: await bcrypt.hash("st0n#0vGA!@", 10),
    });
    const token = helper.generateToken(anotherUser.username, anotherUser._id);
    const selectedTripId = await helper.getTripId(0);

    await api
      .delete(`/api/v1/trips/${selectedTripId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401);
  });
});

describe("update of trip", () => {
  test("succeeds with valid query", async () => {
    const token = await helper.generateAuthorToken();
    const selectedTripId = await helper.getTripId(0);
    const updateQuery = {
      country: "Georgia",
      startDate: "2022-01-12T15:42:00",
    };

    await api
      .put(`/api/v1/trips/${selectedTripId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateQuery)
      .expect(200)
      .expect("Content-Type", /json/);

    const afterUpdate = await helper.getTrips();
    const countries = afterUpdate.map((trip) => trip.country);
    expect(countries).toContainEqual(updateQuery.country);
  });

  test("fails with status code 401 if user is not signed in", async () => {
    const selectedTripId = await helper.getTripId(0);
    const updateQuery = {
      country: "Georgia",
      startDate: "2022-01-12T15:42:00",
    };

    await api
      .put(`/api/v1/trips/${selectedTripId}`)
      .send(updateQuery)
      .expect(401)
      .expect("Content-Type", /json/);
  });

  test("fails with status code 401 if user is not trip author", async () => {
    const anotherUser = new User({
      username: "anyotheruser",
      passwordHash: await bcrypt.hash("st0n#0vGA!@", 10),
    });
    const token = helper.generateToken(anotherUser.username, anotherUser._id);
    const selectedTripId = await helper.getTripId(0);

    const updateQuery = {
      country: "Georgia",
      startDate: "2022-01-12T15:42:00",
    };

    await api
      .put(`/api/v1/trips/${selectedTripId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateQuery)
      .expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
