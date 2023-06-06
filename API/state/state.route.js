"use strict";
const express = require("express");
const router = express.Router();

const { getStates } = require("./state.controller");

const { Schemas } = require("../../Database");
const { State } = Schemas;

const { advancedResults, auth } = require("../../middleware");
const { protect, authorize, checkPermission } = auth;

router.use(protect);
router.use(authorize(["admin", "normal user", "cleaner"]));

router.route("/").get(advancedResults(State), getStates);
module.exports = router;
