/**
 * @module Database/Schemas
 */
const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {getCustomStructureUserData} = require("../../utils");

/**
 * A UserSchema
 * @typedef {Object} UserSchema
 * @property {string} name - user name
 * @property {string} email - user email
 * @property {string} password - user encrpted password
 * @property {string<Array>} role - user role value must be ['admnin', 'user']
 * @property {string} resetPasswordToken - user password reset token
 * @property {date} resetPasswordExpire - user password reset expire date
 * @property {date} role - user register date
 */
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add first name']
  },
  middleName: {
    type: String,
    required: [true, 'Please add middle name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please add last name']
  },
  phone: {
    type: String,
    required: [true, 'Please add phone'],
    index: true,
    unique: true,
    maxlength: 11
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add password'],
    minlength: 6,
    select: false,
  },
  pinCode: {
    type: String,
    required: [true, 'Please add pincode'],
    maxlength: 6,
    minlength: 6,
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: [true, 'Please add city']
  },
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
    required: [true, 'Please add state']
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: [true, 'Please add country']
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: [true, 'Please add role']
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  loginCount: {
    type: Number,
    default: 0
  },
  otherPermission: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Permission',
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: Number,
    default: 1
  }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  // console.log("this ==> ", this);
  // const updatedUserData = this.toObject();
  // const structuredData = getCustomStructureUserData(updatedUserData);
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user password to hashed password into database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getResetPasswordToken = function () {
  // Generate random token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // set token expire time
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
