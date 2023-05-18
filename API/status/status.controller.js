const { asyncHandler } = require("../../middleware");
const { Schemas } = require("../../Database");
const { Status } = Schemas;
const { advanceSearch, ErrorResponse } = require("../../utils");

exports.createStatus = asyncHandler(async (req, res, next) => {
  req.body["userId"] = req.user["_id"];
  req.body["status"] = req.body.statusName.toLowerCase().split(" ").join("_");
  const status = await Status.create(req.body);
  res.status(201).json({ success: true, data: status });
});

exports.getStatus = asyncHandler(async (req, res, next) => {
  // use of advanceSearch Utils
  const searchResult = await advanceSearch(req.query, Status);
  res.status(200).json({
    ...searchResult,
  });
});

exports.deleteStatus = asyncHandler(async (req, res, next) => {
  const status = await Status.findById(req.params.status_id);

  if (!status) {
    return next(new ErrorResponse(`Status not found`, 404));
  }

  await Status.remove();

  res.status(200).json({
    success: true,
    data: {
      message: "Status is Deleted",
    },
  });
});
