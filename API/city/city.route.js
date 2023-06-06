"use strict";
const express = require("express");
const router = express.Router();

const { getCities } = require("./city.controller");

const { Schemas } = require("../../Database");
const { City } = Schemas;

const { advancedResults, auth } = require("../../middleware");
const { protect, authorize, checkPermission } = auth;

router.use(protect);
router.use(authorize(["admin", "normal user", "cleaner"]));

router
  .route("/")
  .get(checkPermission("list_cities"), advancedResults(City), getCities);
module.exports = router;
