const mongoose = require("mongoose");

function computeLength(startDate, endDate) {
  return (endDate - startDate) / (1000 * 60 * 60 * 24); // 1000ms in s, 60s in min, 60min in h, 24h in day
}

const tripSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 56,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: function (value) {
      return value > this.startDate;
    },
  },
  name: {
    type: String,
    default: `Delegation in ${this.country} from ${this.startDate} to ${this.endDate}`,
  },
  length: {
    type: Number,
    default: computeLength(this.startDate, this.endDate),
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

tripSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Trip", tripSchema);
