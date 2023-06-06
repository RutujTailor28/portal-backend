"use strict";
const express = require("express");
const router = express.Router();

const {
  createTechnologies,
  getTechnologies,
  deleteTechnologies,
} = require("./technologies.controller");

const { Schemas } = require("../../Database");
const { Technologies } = Schemas;

const { advancedResults, auth } = require("../../middleware");
const { protect, authorize, checkPermission } = auth;

router.use(protect);
router.use(authorize(["admin", "normal user", "cleaner"]));

router
  .route("/")
  .get(advancedResults(Technologies), getTechnologies)
  .post(createTechnologies);

router.route("/:technology_id").delete(deleteTechnologies);

module.exports = router;
