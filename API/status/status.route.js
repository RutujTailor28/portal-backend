"use strict";
const express = require("express");
const router = express.Router();

const {
  createStatus,
  deleteStatus,
  getStatus,
} = require("./status.controller");

const { Schemas } = require("../../Database");
const { Status } = Schemas;

const { advancedResults, auth } = require("../../middleware");
const { protect, authorize, checkPermission } = auth;

router.use(protect);
router.use(authorize(["admin", "normal user", "cleaner"]));

router
  .route("/")
  .get(checkPermission("list_status"), advancedResults(Status), getStatus)
  .post(checkPermission("create_status"), createStatus);

router
  .route("/:status_id")
  .delete(checkPermission("delete_status"), deleteStatus);

module.exports = router;
