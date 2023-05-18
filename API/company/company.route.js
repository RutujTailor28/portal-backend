"use strict";
const express = require("express");
const router = express.Router();

const {
  createCompany,
  getCompany,
  deleteCompany,
  getCompanyById,
  updateCompany,
} = require("./company.controller");

const { Schemas } = require("../../Database");
const { Company } = Schemas;

const { advancedResults, auth } = require("../../middleware");
const { protect, authorize, checkPermission } = auth;

router.use(protect);
router.use(authorize(["admin", "normal user", "cleaner"]));

router
  .route("/")
  .get(checkPermission("list_company"), advancedResults(Company), getCompany)
  .post(checkPermission("create_company"), createCompany);

router
  .route("/:company_id")
  .get(checkPermission("view_candidateCompany"), getCompanyById)
  .put(checkPermission("update_candidateCompany"), updateCompany)
  .delete(checkPermission("delete_candidateCompany"), deleteCompany);

module.exports = router;
