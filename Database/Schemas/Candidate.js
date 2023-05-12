/**
 * @module Database/Schemas
 */
const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Please add  name"],
  },
  mobile: {
    type: String,
    required: [true, "Please add  mobile"],
  },
  technology: {
    type: String,
    required: [true, "Please add technology"],
  },
  experience: {
    type: String,
    required: [true, "Please add experience"],
  },
  lastSalaryMonth: {
    type: String,
    required: [true, "Please add lastSalaryMont"],
  },
  availableIn: {
    type: String,
    required: [true, "Please add availableIn"],
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Candidate", CandidateSchema);
