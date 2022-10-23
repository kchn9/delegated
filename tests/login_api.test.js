const app = require("../app");
const supertest = require("supertest");
const helper = require("./test_helper");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const user = new User((await helper.initialUsers())[0]);
  await user.save();
});

describe("when there is initially user in database", () => {
  test("user should login with valid username/password combination", async () => {
    const credentials = {
      username: "testuser",
      password: "Str0nGP@ssw0rD",
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
        username: "testuser",
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
        password: "Str0nGP@ssw0rD",
      };

      await api
        .post("/api/v1/login")
        .send(credentials)
        .expect(401)
        .expect("Content-Type", /json/);
    });
  });
});

afterAll(() => {});
