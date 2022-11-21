const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    minLength: 6,
    maxLength: 36,
    validate: function (v) {
      return /^[a-zA-Z0-9]{6,36}$/.test(v);
    },
  },
  passwordHash: {
    type: String,
    required: true,
  },
  trips: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Trip",
    },
  ],
});
userSchema.plugin(uniqueValidator, {
  message: `has to be unique.`,
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.passwordHash;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", userSchema);
