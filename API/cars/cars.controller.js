/**
 * @module carController
 */
'use strict';

const { asyncHandler } = require('../../middleware');
const {Schemas} = require('../../Database');
const {Car} = Schemas;
const { advanceSearch, ErrorResponse} = require('../../utils');

/**
 * @method createCar
 * @description   Create Car
 * @route  POST /car
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return created car object
 * @example
 *       createCar(req, res, next)
 */
exports.createCar = asyncHandler(async (req, res, next) => {
    req.body["userId"] = req.user["_id"]
    const car = await Car.create(req.body);
    const findCar = await Car.findById(car["_id"]).populate({path: "userId", select: ["firstName", "middleName", "lastName"]});
    res.status(201).json({ success: true, data: findCar });
});

/**
 * @method updateCar
 * @description   Update Car
 * @route  PUT /car/:car_id
 * @param {Object} req  - The incoming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Array} - return updated car object
 * @example
 *       updateCar(req, res, next)
 */
exports.updateCar = asyncHandler(async (req, res, next) => {
    const car = await Car.findById(req.params.car_id).populate({path: "userId", select: ["firstName", "middleName", "lastName"]});
    if (!car) {
        return next(
            new ErrorResponse(
                `Car is not found with id of ${req.params.car_id}`,
                404
            )
        );
    }

    const { carName, carNumber, carColor } = req.body;

    car.carName = carName;
    car.carNumber = carNumber;
    car.carColor = carColor;

    await car.save();

    res.status(200).json({ success: true, data: car });
});

/**
 * @method  deleteCar
 * @description   delete Car
 * @route  DELETE /car/:car_id
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return empty object
 * @example
 *       deleteCar(req, res, next)
 */
exports.deleteCar = asyncHandler(async (req, res, next) => {
    const car = await Car.findById(req.params.car_id);

    if (!car) {
        return next(
            new ErrorResponse(
                `Car is not found with id of ${req.params.car_id}`,
                404
            )
        );
    }

    await car.remove();

    res.status(200).json({ success: true, data: {} });
});

/**
 * @method getCars
 * @description   Get all Cars
 * @route  GET /car
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Array} - return all cars
 * @example
 *       getCars(req, res, next)
 */
exports.getCars = asyncHandler(async (req, res, next) => {
    // use of advanceSearch Utils
    const searchResult = await advanceSearch(req.query, Car, {path: "userId", select: ["firstName", "middleName", "lastName"]});
    res.status(200).json({
        ...searchResult
    });
});

/**
 * @method getCarById
 * @description   Get car by id
 * @route  GET /car/:car_id
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return Car object
 * @example
 *       getCarById(req, res, next)
 */
exports.getCarById = asyncHandler(async (req, res, next) => {
    const car = await Car.findById(req.params.car_id).populate({path: "userId", select: ["firstName", "middleName", "lastName"]});

    if (!car) {
        return next(
            new ErrorResponse(
                `Car is not found with id of ${req.params.car_id}`,
                404
            )
        );
    }

    res.status(200).json({ success: true, data: car });
});