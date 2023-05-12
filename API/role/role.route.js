'use strict';
const express = require('express');
const router = express.Router();

const {
    createRole,
    updateRole,
    deleteRole,
    getRoleById,
    getRoles
} = require('./role.controller');

const { Schemas } = require('../../Database');
const { Role } = Schemas;

const { advancedResults, auth } = require('../../middleware');
const { protect, authorize, checkPermission } = auth;

router.use(protect);
router.use(authorize(['admin']));

router.route('/')
    .get(checkPermission("list_role"),advancedResults(Role), getRoles)
    .post(checkPermission("create_role"),createRole);

router.route('/:role_id')
    .get(checkPermission("view_role"),getRoleById)
    .put(checkPermission("update_role"),updateRole)
    .delete(checkPermission("delete_role"),deleteRole);

module.exports = router;
