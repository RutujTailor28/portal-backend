const { asyncHandler } = require("../../middleware");
const { Schemas } = require("../../Database");
const { City } = Schemas;
const { advanceSearch, ErrorResponse } = require("../../utils");

// exports.createSalary = asyncHandler(async (req, res, next) => {
//   req.body["userId"] = req.user["_id"];
//   const salary = await Salary.create(req.body);
//   res.status(201).json({ success: true, data: salary });
// });

exports.getCities = asyncHandler(async (req, res, next) => {
  // use of advanceSearch Utils
  const searchResult = await advanceSearch(req.query, City);
  res.status(200).json({
    ...searchResult,
  });
});
