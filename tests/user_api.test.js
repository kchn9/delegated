const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Trip = require("../models/trip");
const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await helper.initializeUsers();
});

describe("when there is initially one user in db", () => {
  test("should return all users as json", async () => {
    await api.get("/api/v1/users").expect(200).expect("Content-Type", /json/);
  });

  test("should return user with trip object", async () => {
    const user = await User.findById(await helper.getUserId(0));
    const newTrip = new Trip({
      country: "Austria",
      startDate: "2020-01-02T14:11:00",
      endDate: "2020-04-02T14:11:00",
      user: user._id,
    });

    const expectedProperties = [
      "country",
      "startDate",
      "endDate",
      "title",
      "daysLength",
    ];
    user.trips.push(newTrip._id);
    await user.save();
    await newTrip.save();

    const response = await api
      .get("/api/v1/users")
      .expect(200)
      .expect("Content-Type", /json/);

    const [trips] = response.body.map((user) => user.trips);

    for (const trip of trips) {
      for (const property of expectedProperties) {
        expect(trip).toHaveProperty(property);
      }
    }
  });

  describe("viewing user", () => {
    test("succeeds with valid id", async () => {
      const token = await helper.generateAuthorToken();
      const selectedUserId = (await helper.getUserId(0)).toString(); // request for author

      await api
        .get(`/api/v1/users/${selectedUserId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /json/);
    });
    test("fails with status code 400 if id is invalid", async () => {
      const token = await helper.generateAuthorToken();
      const invalidId = "q1321";

      await api
        .get(`/api/v1/users/${invalidId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
    });
    test("fails with status code 401 if user is not signed in", async () => {
      const selectedUserId = (await helper.getUserId(0)).toString();

      await api
        .get(`/api/v1/users/${selectedUserId}`)
        .expect(401)
        .expect("Content-Type", /json/);
    });
    test("fails with status code 401 if user is not requesting for himself", async () => {
      const anotherUser = new User({
        username: "anyotheruser",
        passwordHash: await bcrypt.hash("$tr0nGPa$$worD", 10),
      });
      const token = helper.generateToken(anotherUser.username, anotherUser._id);
      const selectedUserId = (await helper.getUserId(0)).toString(); // request for author

      await api
        .get(`/api/v1/users/${selectedUserId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(401);
    });
    test("fails with status code 404 if user does not exist", async () => {
      const notExistingId = await helper.generateNonExistingId();
      const token = await helper.generateAuthorToken();

      await api
        .get(`/api/v1/users/${notExistingId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });
  });

  describe("user creation", () => {
    test("succeeds with a fresh username and strong password", async () => {
      const beforeCreation = await helper.getUsers();
      const user = {
        username: "notOccupiedUsername",
        password: "mySw33t$ecret",
      };

      await api
        .post("/api/v1/users")
        .send(user)
        .expect(201)
        .expect("Content-Type", /json/);

      const afterCreation = await helper.getUsers();
      expect(afterCreation).toHaveLength(beforeCreation.length + 1);

      const usernames = afterCreation.map((user) => user.username);
      expect(usernames).toContain(user.username);
    });

    test("fails with status code 400 when password is weak", async () => {
      const beforeCreation = await helper.getUsers();
      const user = {
        username: "notOccupiedUsername",
        password: "weak",
      };

      await api.post("/api/v1/users").send(user).expect(400);

      const expected = await helper.getUsers();
      expect(beforeCreation).toEqual(expected);
    });

    test("fails with status code 400 when username is already taken", async () => {
      const beforeCreation = await helper.getUsers();
      const user = {
        username: helper.initialUsers[0].username,
        password: "mySw33t$ecret",
      };

      await api.post("/api/v1/users").send(user).expect(400);

      const expected = await helper.getUsers();
      expect(beforeCreation).toEqual(expected);
    });

    test("fails with status code 400 when username contains special characters", async () => {
      const beforeCreation = await helper.getUsers();
      const user = {
        username: "u$ern@me",
        password: "mySw33t$ecret",
      };

      await api.post("/api/v1/users").send(user).expect(400);

      const expected = await helper.getUsers();
      expect(beforeCreation).toEqual(expected);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
