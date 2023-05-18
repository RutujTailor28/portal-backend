const { asyncHandler } = require("../../middleware");
const { Schemas } = require("../../Database");
const { Technologies } = Schemas;
const { advanceSearch, ErrorResponse } = require("../../utils");

exports.createTechnologies = asyncHandler(async (req, res, next) => {
  req.body["userId"] = req.user["_id"];
  const technologies = await Technologies.create(req.body);
  res.status(201).json({ success: true, data: technologies });
});

exports.getTechnologies = asyncHandler(async (req, res, next) => {
  // use of advanceSearch Utils
  const searchResult = await advanceSearch(req.query, Technologies);
  res.status(200).json({
    ...searchResult,
  });
});

exports.deleteTechnologies = asyncHandler(async (req, res, next) => {
  const technologies = await Technologies.findById(req.params.technology_id);

  if (!technologies) {
    return next(new ErrorResponse(`Technologies not found`, 404));
  }

  await Technologies.remove();

  res.status(200).json({
    success: true,
    data: {
      message: "Technologies is Deleted",
    },
  });
});
