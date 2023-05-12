const express = require("express");
const routers = express.Router();

// Routers
const { AuthRoute } = require("./auth");
const { TodoRoute } = require("./todo");
const { UserRoute } = require("./user");
const { PermissionRoute } = require("./permission");
const { CountryRoute } = require("./country");
const { RoleRoute } = require("./role");
const { CarRoute } = require("./cars");
const { CandidateRoute } = require("./candidate");
const { CandidateCompanyRoute } = require("./company");

routers.get("/", (req, res, next) => {
  return res.send(`Server is working fine at ${new Date()}`);
});

routers.use("/permission", PermissionRoute);
routers.use("/role", RoleRoute);
routers.use("/country", CountryRoute);
routers.use("/user", UserRoute);
routers.use("/todos", TodoRoute);
routers.use("/auth", AuthRoute);
routers.use("/car", CarRoute);
routers.use("/candidate", CandidateRoute);
routers.use("/candidateCompany", CandidateCompanyRoute);

module.exports = routers;
