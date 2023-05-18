/**
 * @module Database/Schemas
 */
const mongoose = require("mongoose");

const Technologies = new mongoose.Schema({
  // userId is id from current loggedIn User.
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Please add  name"],
    unique: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Technologies", Technologies);
