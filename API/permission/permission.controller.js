/**
 * @module permissionController
 */
'use strict';

const { asyncHandler } = require('../../middleware');
const {Schemas} = require('../../Database');
const {Permission} = Schemas;
const { advanceSearch, ErrorResponse } = require('../../utils');

/**
 * @method createPermission
 * @description   Create Permission
 * @route  POST /permission
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return created permission object
 * @example
 *       createPermission(req, res, next)
 */
exports.createPermission = asyncHandler(async (req, res, next) => {
    const permission = await Permission.create(req.body);

    res.status(201).json({ success: true, data: permission });
});

/**
 * @method updatePermission
 * @description   Update Permission
 * @route  PUT /permission/:permission_id
 * @param {Object} req  - The incoming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Array} - return updated permission object
 * @example
 *       updatePermission(req, res, next)
 */
exports.updatePermission = asyncHandler(async (req, res, next) => {
    const permission = await Permission.findById(req.params.permission_id);
    if (!permission) {
        return next(
            new ErrorResponse(
                `Permission is not found with id of ${req.params.permission_id}`,
                404
            )
        );
    }

    const { permissionName, permissionDisplayName } = req.body;

    permission.permissionName = permissionName;
    permission.permissionDisplayName = permissionName;

    await permission.save();

    res.status(200).json({ success: true, data: permission });
});

/**
 * @method  deletePermission
 * @description   delete Permission
 * @route  DELETE /permission/:permission_id
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return empty object
 * @example
 *       deletePermission(req, res, next)
 */
exports.deletePermission = asyncHandler(async (req, res, next) => {
    const permission = await Permission.findById(req.params.permission_id);

    if (!permission) {
        return next(
            new ErrorResponse(
                `Permission is not found with id of ${req.params.permission_id}`,
                404
            )
        );
    }

    await permission.remove();

    res.status(200).json({ success: true, data: {} });
});

/**
 * @method getPermissions
 * @description   Get all Permissions
 * @route  GET /permission
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Array} - return all permissions
 * @example
 *       getPermissions(req, res, next)
 */
exports.getPermissions = asyncHandler(async (req, res, next) => {
    // use of advanceSearch Utils
    const searchResult = await advanceSearch(req.query, Permission, false);

    res.status(200).json(res.advancedResults);
});

/**
 * @method getPermissionById
 * @description   Get Permission by id
 * @route  GET /permission/:permission_id
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return Permission object
 * @example
 *       getPermissionById(req, res, next)
 */
exports.getPermissionById = asyncHandler(async (req, res, next) => {
    const permission = await Permission.findById(req.params.permission_id);

    if (!permission) {
        return next(
            new ErrorResponse(
                `Permission is not found with id of ${req.params.permission_id}`,
                404
            )
        );
    }

    res.status(200).json({ success: true, data: permission });
});