/**
 * @module Database/Schemas
 */
const mongoose = require("mongoose");

const CandidateCompanySchema = new mongoose.Schema({
  // userId is id from current loggedIn User.
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  companyId: {
    type: mongoose.Schema.ObjectId,
    ref: "Company",
  },
  candidateId: {
    type: String,
  },
  joinDate: {
    type: Date,
    required: [true, "Please add  joining date"],
  },
  position: {
    type: String,
    required: [true, "Please add position"],
  },
  salary: {
    type: String,
    required: [true, "Please add salary"],
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CandidateCompany", CandidateCompanySchema);
