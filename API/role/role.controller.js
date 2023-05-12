/**
 * @module roleController
 */
'use strict';

const { asyncHandler } = require('../../middleware');
const {Schemas} = require('../../Database');
const {Role} = Schemas;
const { advanceSearch, ErrorResponse } = require('../../utils');

/**
 * @method createRole
 * @description   Create Role
 * @route  POST /role
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return created role object
 * @example
 *       createRole(req, res, next)
 */
exports.createRole = asyncHandler(async (req, res, next) => {
    const role = await Role.create(req.body);

    res.status(201).json({ success: true, data: role });
});

/**
 * @method updateRole
 * @description   Update Role
 * @route  PUT /role/:role_id
 * @param {Object} req  - The incoming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Array} - return updated role object
 * @example
 *       updateRole(req, res, next)
 */
exports.updateRole = asyncHandler(async (req, res, next) => {
    const role = await Role.findById(req.params.role_id);
    if (!role) {
        return next(
            new ErrorResponse(
                `Role is not found with id of ${req.params.role_id}`,
                404
            )
        );
    }

    const { roleName, permissions } = req.body;

    role.roleName = roleName;
    role.permissions = permissions;

    await role.save();

    res.status(200).json({ success: true, data: role });
});

/**
 * @method  deleteRole
 * @description   delete Role
 * @route  DELETE /role/:role_id
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return empty object
 * @example
 *       deleteRole(req, res, next)
 */
exports.deleteRole = asyncHandler(async (req, res, next) => {
    const role = await Role.findById(req.params.role_id);

    if (!role) {
        return next(
            new ErrorResponse(
                `Role is not found with id of ${req.params.role_id}`,
                404
            )
        );
    }

    await role.remove();

    res.status(200).json({ success: true, data: {} });
});

/**
 * @method getRoles
 * @description   Get all Roles
 * @route  GET /role
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Array} - return all roles
 * @example
 *       getRoles(req, res, next)
 */
exports.getRoles = asyncHandler(async (req, res, next) => {
    // use of advanceSearch Utils
    const searchResult = await advanceSearch(req.query, Role, false);

    res.status(200).json(res.advancedResults);
});

/**
 * @method getRoleById
 * @description   Get role by id
 * @route  GET /role/:role_id
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return Role object
 * @example
 *       getRoleById(req, res, next)
 */
exports.getRoleById = asyncHandler(async (req, res, next) => {
    const role = await Role.findById(req.params.role_id);

    if (!role) {
        return next(
            new ErrorResponse(
                `Role is not found with id of ${req.params.role_id}`,
                404
            )
        );
    }

    res.status(200).json({ success: true, data: role });
});