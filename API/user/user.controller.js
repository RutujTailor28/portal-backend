/**
 * @module userController
 */
'use strict';
const { userCommonPopulateFields, getCustomStructureUserData} = require('../../utils');
const asyncHandler = require('../../middleware/async');
const User = require('../../Database/Schemas/User');
const {advanceSearch} = require("../../utils");

/**
 * @method getUsers
 * @description   Get all users
 * @route  GET /user
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Array} - return all users
 * @example
 *       getUsers(req, res, next)
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
  const searchResult = await advanceSearch(req.query, User, [...userCommonPopulateFields]);
  const structuredData = getCustomStructureUserData(searchResult.data, true);
  res.status(200).json({
    ...searchResult,
    data: [...structuredData]
  })
});

/**
 * @method getUser
 * @description   Get user by id
 * @route  GET /user/:id
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return user object
 * @example
 *       getUser(req, res, next)
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate([...userCommonPopulateFields]);
  const updatedUserData = user.toObject();
  const structuredData = getCustomStructureUserData(updatedUserData);
  res.status(200).json({
    success: true,
    data: structuredData,
  });
});

/**
 * @method createUser
 * @description   Create user
 * @route  POST /user
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return new created user object
 * @example
 *       createUser(req, res, next)
 */
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  const findUser = await User.findById(user["_id"]).populate([...userCommonPopulateFields]);
  const updatedUserData = findUser.toObject();
  const structuredData = getCustomStructureUserData(updatedUserData);
  res.status(201).json({
    success: true,
    data: structuredData,
  });
});

/**
 * @method updateUser
 * @description   Update user
 * @route  PUT /user/:id
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return updated user object
 * @example
 *       updateUser(req, res, next)
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email
  };
  const user = await User.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  }).populate([...userCommonPopulateFields]);

  const updatedUserData = user.toObject();
  const structuredData = getCustomStructureUserData(updatedUserData);
  res.status(201).json({
    success: true,
    data: structuredData,
  });
});

/**
 * @method deleteUser
 * @description   Delete user by id
 * @route  DELETE /user/:id
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return empty object
 * @example
 *       deleteUser(req, res, next)
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndRemove(req.params.id);

  res.status(201).json({
    success: true,
    data: {},
  });
});
