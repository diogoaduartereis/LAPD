const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    temperature: Number,
    humidity: Number
  },
  { timestamps: true }
);


module.exports = mongoose.model("Data", DataSchema);
