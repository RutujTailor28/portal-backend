'use strict';
const express = require('express');
const router = express.Router();

const {
    createCountry,
    updateCountry,
    deleteCountry,
    getCountries,
    getCountryById
} = require('./country.controller');

const { Schemas } = require('../../Database');
const { Country } = Schemas;

const { advancedResults, auth } = require('../../middleware');
const { protect, authorize } = auth;

// router.use(protect);
// router.use(authorize('admin'));

router.route('/')
    .get(advancedResults(Country), getCountries)
    .post(createCountry);

router.route('/:country_id')
    .get(getCountryById)
    .put(updateCountry)
    .delete(deleteCountry);

module.exports = router;
