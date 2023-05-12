/**
 * @module authController
 */
'use strict';
const crypto = require('crypto');
const { ErrorResponse, getCustomStructureUserData, userCommonPopulateFields } = require('../../utils');
const { asyncHandler } = require('../../middleware');
const { Schemas } = require('../../Database');
const sendEmail = require('../../utils/sendEmail');
const { User, UserDevice, Role } = Schemas;

/**
 * @method register
 * @description   - Register user
 * @route  - POST /auth/register
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return user token
 * @example
 *       register(req, res, next)
 */
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  const findUser = await User.findById(user["_id"]).populate([...userCommonPopulateFields]);

  sendTokenResponse(findUser, 200, res);
});

//@desc   User Login
//@route  POST /auth/login
//@access Public
/**
 * @method login
 * @description   - Register login
 * @route  - POST /auth/login
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return authenticate user token
 * @example
 *       login(req, res, next)
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { username: emailOrPhone, password, deviceToken, isWeb = false } = req.body;

  //Validate email & password & deviceToken
  if (!emailOrPhone || !password) {
    return next(new ErrorResponse('Please provide all details', 400));
  }

  if (!isWeb && !deviceToken) {
    return next(new ErrorResponse('Please provide all details', 400));
  }

  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const phoneRegex = /^[0-9]{10}$/;

  let user = null;

  if (emailOrPhone.match(emailRegex)){
    user = await User.findOne({ email: emailOrPhone }).select('+password').populate([...userCommonPopulateFields]);
  }else if (emailOrPhone.match(phoneRegex)){
    user = await User.findOne({ phone: emailOrPhone }).select('+password').populate([...userCommonPopulateFields]);
  }

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  if (!isWeb){
    const isDeviceTokenExist = await UserDevice.findOne({userId: user['_id'], deviceToken});
    // check deviceToken exist or not and if not then add it
    if (!isDeviceTokenExist) {
      await UserDevice.create({userId: user['_id'], deviceToken})
    }
  }

  user.loginCount = (user.loginCount + 1)
  await user.save();
  sendTokenResponse(user, 200, res);
});

/**
 * @method getMe
 * @description   - Current login user detail
 * @route  - GET /auth/me
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return login user detail
 * @example
 *       getMe(req, res, next)
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate([...userCommonPopulateFields]);
  const updatedUserData = user.toObject();
  const structuredData = getCustomStructureUserData(updatedUserData);
  res.status(200).json({ success: true, data: {...structuredData} });
});

/**
 * @method forgotPassword
 * @description   - Forgot user password
 * @route  - POST /auth/forgotpassword
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return send password forgot token to email
 * @example
 *       forgotPassword(req, res, next)
 */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('there is no user with that email', 404));
  }

  // Get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }

  res.status(200).json({ success: true, data: user });
});

/**
 * @method resetPassword
 * @description   - reset user password from email token
 * @route  - PUT /auth/resetpassword/:resettoken
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return user token
 * @example
 *       resetPassword(req, res, next)
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  }).populate([...userCommonPopulateFields]);

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendTokenResponse(user, 200, res);
});

/**
 * @method updateDetails
 * @description   - Update login user detail
 * @route  - PUT /auth/updatedetails
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return updated user object
 * @example
 *       updateDetails(req, res, next)
 */
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  }).populate([...userCommonPopulateFields]);

  const updatedUserData = user.toObject();
  const structuredData = getCustomStructureUserData(updatedUserData);
  res.status(200).json({ success: true, data: {...structuredData} });
});

//@desc   Update password
//@route  PUT /auth/updatepassword
//@access Private
/**
 * @method updatePassword
 * @description   - Update login user password
 * @route  - PUT /auth/updatepassword
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return user token
 * @example
 *       updatePassword(req, res, next)
 */
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password').populate([...userCommonPopulateFields]);

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendTokenResponse(user, 200, res);
});

/**
 * @method logout
 * @description   - Logout if user cookie base login
 * @route  - GET /auth/logout
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return empty object
 * @example
 *       logout(req, res, next)
 */
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expire: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, data: {} });
});

//Get token from model, create cookie and send respose
/**
 * @method sendTokenResponse
 * @description   - Get token from model, create cookie and send respose
 * @param {Object} user  - User shehma object for generate token
 * @param {Object} statusCode - StatusCode for response
 * @param {Object} res - The response object for setting response token
 * @example
 *       sendTokenResponse(req, res, next)
 */
const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignedJwtToken();
  const options = {
    expire: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  const updatedUserData = user.toObject();
  const structuredData = getCustomStructureUserData(updatedUserData);
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: {...structuredData}
  });
};