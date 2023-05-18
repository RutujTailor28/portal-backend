/**
 * @module Database/Schemas
 */
const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema({
  // userId is id from current loggedIn User.
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Please add  name"],
  },
  paymentStatus: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Please add  paymentStatus"],
    ref: "Status",
  },
  paymentType: {
    type: String,
    required: [true, "Please add  paymentType"],
  },
  transferAmount: {
    type: String,
    required: [true, "Please add  transferAmount"],
  },
  month: {
    type: String,
    required: [true, "Please add  month"],
  },
  year: {
    type: String,
    required: [true, "Please add  year"],
  },
  companyId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Please add  Company"],
    ref: "Company",
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Salary", SalarySchema);
