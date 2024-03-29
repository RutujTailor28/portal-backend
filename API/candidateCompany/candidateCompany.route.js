"use strict";
const express = require("express");
const router = express.Router();

const {
  createCandidateCompany,
  deleteCandidateCompany,
  getCandidateCompanyById,
  getCandidatesCompany,
  updateCandidateCompany,
} = require("./candidateCompany.controller");

const { Schemas } = require("../../Database");
const { CandidateCompany } = Schemas;

const { advancedResults, auth } = require("../../middleware");
const { protect, authorize, checkPermission } = auth;

router.use(protect);
router.use(authorize(["admin", "normal user", "cleaner"]));

router
  .route("/")
  .get(
    checkPermission("list_candidateCompany"),
    advancedResults(CandidateCompany),
    getCandidatesCompany
  )
  .post(checkPermission("create_candidateCompany"), createCandidateCompany);

router
  .route("/:candidateCompany_id")
  .get(checkPermission("view_candidateCompany"), getCandidateCompanyById)
  .put(checkPermission("update_candidateCompany"), updateCandidateCompany)
  .post(checkPermission("delete_candidateCompany"), deleteCandidateCompany);

module.exports = router;
