'use strict';
const express = require('express');
const router = express.Router();

const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  createUser,
} = require('./user.controller');

const User = require('../../Database/Schemas/User');
const { advancedResults, auth } = require('../../middleware');
const {checkPermission} = require("../../middleware/auth");

const { protect, authorize } = auth;

router.use(protect);
router.use(authorize(['admin', 'supervisor']));
router.route('/').get(checkPermission("list_user"),advancedResults(User), getUsers)
    .post(checkPermission("create_user"),createUser);
router.route('/:id').get(checkPermission("view_user"),getUser)
    .put(checkPermission("update_user"),updateUser)
    .delete(checkPermission("delete_user"),deleteUser);

module.exports = router;
