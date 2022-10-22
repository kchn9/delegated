const helper = require("./test_helper");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany();
  const passwordHash = await bcrypt.hash("Str0nGP@ssw0rD", 10);
  const user = new User({ username: "testuser", passwordHash });
  await user.save();
});

describe("when there is initially one user in db", () => {
  test("should return all users as json", async () => {
    const response = await api
      .get("/api/v1/users")
      .expect(200)
      .expect("Content-Type", /json/);
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
        username: "testuser",
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
