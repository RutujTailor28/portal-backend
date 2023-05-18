"use strict";
const express = require("express");
const router = express.Router();

const {
  createSalary,
  updateSalary,
  getSalary,
  deleteSalary,
  getSalaryById,
} = require("./salary.controller");

const { Schemas } = require("../../Database");
const { Salary } = Schemas;

const { advancedResults, auth } = require("../../middleware");
const { protect, authorize, checkPermission } = auth;

router.use(protect);
router.use(authorize(["admin", "normal user", "cleaner"]));

router
  .route("/")
  .get(checkPermission("list_salary"), advancedResults(Salary), getSalary)
  .post(checkPermission("create_salary"), createSalary);

router
  .route("/:salary_id")
  .delete(checkPermission("delete_salary"), deleteSalary)
  .put(checkPermission("update_salary"), updateSalary)
  .get(checkPermission("view_salary"), getSalaryById);

module.exports = router;
