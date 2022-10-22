const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Trip = require("../models/trip");

const api = supertest(app);

beforeEach(async () => {
  await Trip.deleteMany({});
  const tripObjects = helper.initialTrips.map((trip) => new Trip(trip));
  const promiseArray = tripObjects.map((trip) => trip.save());
  await Promise.all(promiseArray);
});

describe("Trip API", () => {
  // GET /api/v1/trips
  test("trips are returned as json", async () => {
    await api.get("/api/v1/trips").expect(200).expect("Content-Type", /json/);
  });

  // GET /api/v1/trips/:id
  test("specific trip can be viewed", async () => {
    const selectedTrip = (await helper.getTrips())[0];
    const expected = JSON.parse(JSON.stringify(selectedTrip));

    const response = await api
      .get(`/api/v1/trips/${selectedTrip.id}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toMatchObject(expected);
  }, 10000);

  test("all trips are returned", async () => {
    const response = await api.get("/api/v1/trips");
    expect(response.body).toHaveLength(helper.initialTrips.length);
  });

  // POST /api/v1/trips
  test("a valid trip can be added", async () => {
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

  // POST /api/v1/trips
  test("a trip without country is not added", async () => {
    const newTrip = {
      startDate: "2022-05-01T14:22:00",
      endDate: "2023-01-01T00:01:00",
    };

    await api.post("/api/v1/trips").send(newTrip).expect(400);
    const response = await api.get("/api/v1/trips");
    expect(response.body).toHaveLength(helper.initialTrips.length);
  });

  // DELETE /api/v1/trips/:id
  test("a trip can be deleted", async () => {
    const selectedTrip = (await helper.getTrips())[0];
    await api.delete(`/api/v1/trips/${selectedTrip.id}`).expect(200);

    const afterDelete = await helper.getTrips();
    expect(afterDelete).toHaveLength(helper.initialTrips.length - 1);
    const countries = afterDelete.map((trip) => trip.country);
    expect(countries).not.toContainEqual(selectedTrip.country);
  });

  // PUT /api/v1/trips/:id
  test("trip can be edited with valid query", async () => {
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
