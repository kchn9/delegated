const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 56,
  },
  title: {
    type: String,
    minLength: 4,
    maxLength: 96,
    default: function () {
      return `${this.country} from ${this.startDate.toLocaleDateString(
        "pl-PL"
      )} to ${this.endDate.toLocaleDateString("pl-PL")}`;
    },
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: function (value) {
      return new Date(value) > new Date(this.startDate);
    },
  },
  daysLength: {
    type: Number,
    required: true,
    default: function () {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      return (end - start) / (1000 * 60 * 60 * 24); // 1000ms in s, 60s in min, 60min in h, 24h in day
    },
    validate: function (v) {
      return v > 0;
    },
  },
  created: {
    type: Date,
    required: true,
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
