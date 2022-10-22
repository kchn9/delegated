const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Trip = require("../models/trip");

const api = supertest(app);

beforeEach(async () => {
  await Trip.deleteMany({});
  const user = new User((await helper.initialUsers)[0]);
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
  test("succeds with valid id", async () => {
    const selectedTrip = (await helper.getTrips())[0];
    const expected = JSON.parse(JSON.stringify(selectedTrip));

    const response = await api
      .get(`/api/v1/trips/${selectedTrip.id}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toMatchObject(expected);
  });

  test("fails with statuscode 404 if trip does not exist", async () => {
    const nonExistingId = await helper.generateNonExistingId();
    await api.get(`/api/v1/trips/${nonExistingId}`).expect(404);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "a123dsad123";
    await api.get(`/api/v1/trips/${invalidId}`).expect(400);
  });
});

describe("addition of new trip", () => {
  test("succeds with valid data", async () => {
    const newTrip = {
      country: "Moldavia",
      startDate: "2022-05-01T14:22:00",
      endDate: "2023-01-01T00:01:00",
    };

    await api
      .post("/api/v1/trips")
      .send(newTrip)
      .expect(201)
      .expect("Content-Type", /json/);

    const response = await api.get("/api/v1/trips");
    expect(response.body).toHaveLength(helper.initialTrips.length + 1);

    const countries = response.body.map((trip) => trip.country);
    expect(countries).toContainEqual(newTrip.country);
  });

  test("fails with status code 400 if data is invalid", async () => {
    const newTrip = {
      // missing country
      startDate: "2022-05-01T14:22:00",
      endDate: "2023-01-01T00:01:00",
    };

    await api.post("/api/v1/trips").send(newTrip).expect(400);
    const response = await api.get("/api/v1/trips");
    expect(response.body).toHaveLength(helper.initialTrips.length);
  });
});

describe("deletion of trip", () => {
  test("succeds with status code 200 if id is valid", async () => {
    const selectedTrip = (await helper.getTrips())[0];
    await api.delete(`/api/v1/trips/${selectedTrip.id}`).expect(200);

    const afterDelete = await helper.getTrips();
    expect(afterDelete).toHaveLength(helper.initialTrips.length - 1);
    const countries = afterDelete.map((trip) => trip.country);
    expect(countries).not.toContainEqual(selectedTrip.country);
  });
});

describe("update of trip", () => {
  test("succeds with status code 200 if query is valid", async () => {
    const selectedTrip = (await helper.getTrips())[0];
    const updateQuery = {
      country: "Georgia",
      startDate: "2022-01-12T15:42:00",
    };

    await api
      .put(`/api/v1/trips/${selectedTrip.id}`)
      .send(updateQuery)
      .expect(200);

    const afterUpdate = await helper.getTrips();
    const countries = afterUpdate.map((trip) => trip.country);
    expect(countries).toContainEqual(updateQuery.country);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
