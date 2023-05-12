const AuthModule = require("./auth");
const TodoModule = require("./todo");
const UserModule = require("./user");
const CountryModule = require("./country");
const RoleModule = require("./role");
const CarModule = require("./cars");
const CandidateModule = require("./candidate");
const CandidateCompanyModule = require("./company");

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
  router,
};
