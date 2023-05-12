"use strict";
const express = require("express");
const router = express.Router();

const {
  createCandidate,
  getCandidates,
  updateCandidate,
  deleteCandidate,
  getCandidateById,
} = require("./candidate.controller");

const { Schemas } = require("../../Database");
const { Candidate } = Schemas;

const { advancedResults, auth } = require("../../middleware");
const { protect, authorize, checkPermission } = auth;

router.use(protect);
router.use(authorize(["admin", "normal user", "cleaner"]));

router
  .route("/")
  .get(
    checkPermission("list_candidate"),
    advancedResults(Candidate),
    getCandidates
  )
  .post(checkPermission("create_candidate"), createCandidate);

router
  .route("/:candidate_id")
  .get(checkPermission("list_candidate"), getCandidateById)
  .put(checkPermission("update_candidate"), updateCandidate)
  .delete(checkPermission("delete_candidate"), deleteCandidate);

module.exports = router;
