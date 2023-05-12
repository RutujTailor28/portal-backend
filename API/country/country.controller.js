/**
 * @module countryController
 */
'use strict';

const { asyncHandler } = require('../../middleware');
const {Schemas} = require('../../Database');
const {Country, State, City} = Schemas;
const { advanceSearch, ErrorResponse } = require('../../utils');
const countryData = require('../../utils/countryWithState.json');

/**
 * @method createCountry
 * @description   Create Country
 * @route  POST /country
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return created country object
 * @example
 *       createCountry(req, res, next)
 */
exports.createCountry = asyncHandler(async (req, res, next) => {
    // console.log("body ==> ", req.body);
    // console.log("countryData ==> ", typeof countryData);
    // console.log("countryData Length ==> ",countryData.length);
    // res.status(201).json({ success: true, data: "Successfully Added" });
    // const newData = countryData.map(data => ({
    //     countryName: data.name
    // }));
    // res.status(201).json({ success: true, data: newData });
    // const result = await Country.insertMany(newData);
    // res.status(201).json({ success: true, data: result });
    // console.log("newData ==> ", newData);
    // res.status(201).json({ success: true, data: newData });
    // for (let i = 0; i < countryData.length; i++) {
    //     const country = await Country.create({countryName: });
    // }
    // const country = await Country.create(req.body);
    //
    // res.status(201).json({ success: true, data: country });
    // const countrys = await Country.find();
    // console.log("countryData ==> ", countryData)

    // Add state code

    // const newStateData = [];
    // for (let i = 0; i < countryData.length; i++) {
    //     const country = await Country.findOne({countryName: countryData[i].name});
    //     const stateData = countryData[i].stateProvinces && countryData[i].stateProvinces.map(data => ({
    //         stateName: data.name,
    //         countryId: country['_id'],
    //     }))
    //     if (stateData){
    //         newStateData.push(...stateData)
    //     }
    // }
    // const result = await State.insertMany(newStateData);
    // res.status(201).json({ success: true, data: result });

    // Add city code

    const city = City.create({cityName: "Bardoli", stateId: "63dcdcfb8497a92528afc42c"})
    res.status(201).json({ success: true, data: "City successfully added" });
});

/**
 * @method updateCountry
 * @description   Update Country
 * @route  PUT /country/:country_id
 * @param {Object} req  - The incoming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Array} - return updated country object
 * @example
 *       updateCountry(req, res, next)
 */
exports.updateCountry = asyncHandler(async (req, res, next) => {
    const country = await Country.findById(req.params.country_id);
    if (!country) {
        return next(
            new ErrorResponse(
                `Country is not found with id of ${req.params.country_id}`,
                404
            )
        );
    }

    const { countryName } = req.body;

    country.countryName = countryName;

    await country.save();

    res.status(200).json({ success: true, data: country });
});

/**
 * @method  deleteCountry
 * @description   delete country
 * @route  DELETE /country/:country_id
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return empty object
 * @example
 *       deleteCountry(req, res, next)
 */
exports.deleteCountry = asyncHandler(async (req, res, next) => {
    const country = await Country.findById(req.params.country_id);

    if (!country) {
        return next(
            new ErrorResponse(
                `Country is not found with id of ${req.params.country_id}`,
                404
            )
        );
    }

    await country.remove();

    res.status(200).json({ success: true, data: {} });
});

/**
 * @method getCountries
 * @description   Get all countries
 * @route  GET /country
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Array} - return all countries
 * @example
 *       getCountries(req, res, next)
 */
exports.getCountries = asyncHandler(async (req, res, next) => {
    // use of advanceSearch Utils
    const searchResult = await advanceSearch(req.query, Country, false);

    res.status(200).json(res.advancedResults);
});

/**
 * @method getCountryById
 * @description   Get Country by id
 * @route  GET /country/:country_id
 * @param {Object} req  - The incomming request object
 * @param {Object} res - The response object
 * @param {function} next - Function use to call next handler
 * @return {Object} - return country object
 * @example
 *       getCountryById(req, res, next)
 */
exports.getCountryById = asyncHandler(async (req, res, next) => {
    const country = await Country.findById(req.params.country_id);

    if (!country) {
        return next(
            new ErrorResponse(
                `Country is not found with id of ${req.params.country_id}`,
                404
            )
        );
    }

    res.status(200).json({ success: true, data: country });
});