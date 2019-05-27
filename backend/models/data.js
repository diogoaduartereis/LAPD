const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    temperature: Number,
    humidity: Number
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
});


module.exports = mongoose.model("Data", DataSchema);
