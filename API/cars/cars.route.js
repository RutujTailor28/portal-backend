'use strict';
const express = require('express');
const router = express.Router();

const {
    createCar,
    updateCar,
    deleteCar,
    getCarById,
    getCars
} = require('./cars.controller');

const { Schemas } = require('../../Database');
const { Car } = Schemas;

const { advancedResults, auth } = require('../../middleware');
const { protect, authorize, checkPermission } = auth;

router.use(protect);
router.use(authorize(['admin','normal user']));

router.route('/')
    .get(checkPermission("list_car"),advancedResults(Car), getCars)
    .post(checkPermission("create_car"),createCar);

router.route('/:car_id')
    .get(checkPermission("view_car"),getCarById)
    .put(checkPermission("update_car"),updateCar)
    .delete(checkPermission("delete_car"),deleteCar);

module.exports = router;
