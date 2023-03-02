const { Schema, model } = require("mongoose");

const countrySchema = new Schema(
  {
    name: String,
    capital: String,
    alpha2Code: String,
    flag: String,
    region: String,
    languages: [String],
    currency: [Object]
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const Country = model("Country", countrySchema);

module.exports = Country;

