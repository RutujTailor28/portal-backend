const AuthModule = require("./auth");
const TodoModule = require("./todo");
const UserModule = require("./user");
const CountryModule = require("./country");
const RoleModule = require("./role");
const CarModule = require("./cars");
const CandidateModule = require("./candidate");
const CandidateCompanyModule = require("./candidateCompany");
const CompanyModule = require("./company");
const TechnologiesModule = require("./Technologies");
const SalaryModule = require("./salary");
const StatusModule = require("./status");

const router = require("./routers");

module.exports = {
  AuthModule,
  TodoModule,
  UserModule,
  CountryModule,
  RoleModule,
  CarModule,
  CandidateModule,
  CandidateCompanyModule,
  CompanyModule,
  TechnologiesModule,
  SalaryModule,
  StatusModule,
  router,
};
