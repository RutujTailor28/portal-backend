/**
 * @module Database/Schemas
 */
const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
  // userId is id from current loggedIn User.
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    required: [true, "Please add  status"],
    unique: true,
  },
  statusName: {
    type: String,
    required: [true, "Please add  status name"],
    unique: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Status", StatusSchema);
