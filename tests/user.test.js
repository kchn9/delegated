const app = require("../app");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});
  await helper.initializeUsers();
});

describe("when there is initially one user in db", () => {
  test("returns users with properly parsed id", async () => {
    const users = await helper.getUsers();
    users.every((user) => expect(user.id).toBeDefined());
  });

  test("returns users without hashsed password", async () => {
    const users = await helper.getUsers();
    users.every((user) => expect(user.passwordHash).not.toBeDefined());
  });
});

describe("user creation", () => {
  test("should create valid user", async () => {
    const beforeCreate = await helper.getUsers();
    const newUser = new User({
      username: "songoku",
      passwordHash: await bcrypt.hash("aA0!qwer", 10),
    });
    await newUser.save();
    const afterCreate = await helper.getUsers();
    expect(afterCreate).toHaveLength(beforeCreate.length + 1);
    const usernames = afterCreate.map((user) => user.username);
    expect(usernames).toContainEqual(newUser.username);
  });

  describe("validation", () => {
    test("should not validate with too short username", async () => {
      const user = new User({
        username: "a",
        hashedPassword: await bcrypt.hash("aA0!qwer", 10),
      });
      await expect(user.validate()).rejects.toThrow(
        mongoose.Error.ValidationError
      );
    });
    test("should not validate with too long username", async () => {
      const user = new User({
        username: "a".repeat(37),
        hashedPassword: await bcrypt.hash("aA0!qwer", 10),
      });
      await expect(user.validate()).rejects.toThrow(
        mongoose.Error.ValidationError
      );
    });
    test("should not validate if username contains special characters", async () => {
      const user = new User({
        username: "u$ername",
        hashedPassword: await bcrypt.hash("aA0!qwer", 10),
      });
      await expect(user.validate()).rejects.toThrow(
        mongoose.Error.ValidationError
      );
    });
    test("should not validate if username is not unique", async () => {
      const user = new User({
        username: helper.initialUsers[0].username,
        hashedPassword: await bcrypt.hash("aA0!qwer", 10),
      });
      await expect(user.validate()).rejects.toThrow(
        mongoose.Error.ValidationError
      );
    });
    test("should not validate if username is not present", async () => {
      const user = new User({
        hashedPassword: await bcrypt.hash("aA0!qwer", 10),
      });
      await expect(user.validate()).rejects.toThrow(
        mongoose.Error.ValidationError
      );
    });
    test("should not validate if passwordHash is not present", async () => {
      const user = new User({
        username: "konnichiwa",
      });
      await expect(user.validate()).rejects.toThrow(
        mongoose.Error.ValidationError
      );
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
