const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 36,
  },
  passwordHash: String,
  trips: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Trip",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    const id = returnedObject._id.toString();
    delete returnedObject.passwordHash;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", userSchema);
