'use strict';
const express = require('express');
const router = express.Router();

const {
    createPermission,
    updatePermission,
    deletePermission,
    getPermissions,
    getPermissionById
} = require('./permission.controller');

const { Schemas } = require('../../Database');
const { Permission } = Schemas;

const { advancedResults, auth } = require('../../middleware');
const { protect, authorize, checkPermission } = auth;

router.use(protect);
router.use(authorize(['admin','supervisor']));

router.route('/')
    .get(checkPermission("list_permission"),advancedResults(Permission), getPermissions)
    .post(checkPermission("create_permission"),createPermission);

router.route('/:permission_id')
    .get(checkPermission("view_permission"),getPermissionById)
    .put(checkPermission("update_permission"),updatePermission)
    .delete(checkPermission("delete_permission"),deletePermission);

module.exports = router;
