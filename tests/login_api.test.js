const app = require("../app");
const supertest = require("supertest");
const helper = require("./test_helper");
const User = require("../models/user");
const mongoose = require("mongoose");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await helper.initializeUsers();
});

describe("when there is initially user in database", () => {
  test("user should login with valid username/password combination", async () => {
    const credentials = {
      username: helper.initialUsers[0].username,
      password: helper.initialUsers[0].password,
    };

    await api
      .post("/api/v1/login")
      .send(credentials)
      .expect(200)
      .expect("Content-Type", /json/);
  });
  describe("validation", () => {
    test("should not validate if wrong password given", async () => {
      const credentials = {
        username: helper.initialUsers[0].username,
        password: "wrongpassword",
      };

      await api
        .post("/api/v1/login")
        .send(credentials)
        .expect(401)
        .expect("Content-Type", /json/);
    });
    test("should not validate if username is not found", async () => {
      const credentials = {
        username: "notexistinguser",
        password: helper.initialUsers[0].password,
      };

      await api
        .post("/api/v1/login")
        .send(credentials)
        .expect(401)
        .expect("Content-Type", /json/);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
