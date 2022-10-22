const app = require("../app");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const helper = require("./test_helper");

beforeEach(async () => {
  await User.deleteMany();
  const passwordHash = await bcrypt.hash("Str0nGP@ssw0rD", 10);
  const user = new User({ username: "testuser", passwordHash });
  await user.save();
});

describe("when there is initially one user in db", () => {
  test("returns users with properly parsed id", async () => {
    const users = await helper.getUsers();
    users.every((user) => expect(user.id).toBeDefined());
  });

  test("returns users without hashsed password", async () => {
    const users = await helper.getUsers();
    users.every((user) => expect(user.hashedPassword).not.toBeDefined());
  });
});

describe("user creation", () => {
  test("should create valid user", async () => {
    const beforeCreate = await helper.getUsers();
    const newUser = new User({
      username: "songoku",
      hashedPassword: await bcrypt.hash("C0rrectPassword", 10),
    });
    await newUser.save();
    const afterCreate = await helper.getUsers();
    expect(afterCreate).toHaveLength(beforeCreate.length + 1);
    const usernames = afterCreate.map((user) => user.username);
    expect(usernames).toContainEqual(newUser.username);
  });

  describe("validation", () => {});
});

afterAll(() => {
  mongoose.connection.close();
});
