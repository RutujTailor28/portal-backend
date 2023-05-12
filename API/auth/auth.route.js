'use strict';
const express = require('express');
const routes = express.Router();

const {
  register,
  login,
  getMe,
  logout,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require('./auth.controller');

const { protect, authorize} = require('../../middleware/auth');

routes.post('/register', register);
routes.post('/login', login);
routes.post('/forgotpassword', forgotPassword);
routes.put('/resetpassword/:resettoken', resetPassword);

// Protected routes - login user can access only those routes
routes.use(protect);
routes.get('/logout', logout);
routes.get('/me', getMe);
routes.post('/updatedetails', updateDetails);
routes.post('/updatepassword', updatePassword);

module.exports = routes;
