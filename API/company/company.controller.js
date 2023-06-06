const { asyncHandler } = require("../../middleware");
const { Schemas } = require("../../Database");
const { Company } = Schemas;
const { advanceSearch, ErrorResponse } = require("../../utils");

exports.createCompany = asyncHandler(async (req, res, next) => {
  req.body["userId"] = req.user["_id"];
  const company = await Company.create(req.body);
  res.status(201).json({ success: true, data: company });
});

exports.getCompany = asyncHandler(async (req, res, next) => {
  // use of advanceSearch Utils
  let searchResult = await advanceSearch(req.query, Company, {
    path: "technologies",
    select: ["name"],
  });

  res.status(200).json({
    ...searchResult,
  });
});

exports.updateCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.company_id);

  if (!company) {
    return next(new ErrorResponse(`Company not found`, 404));
  }

  const {
    name,
    gstNumber,
    address,
    branch,
    state,
    district,
    city,
    pincode,
    technologies,
    contactDetails,
  } = req.body;

  company.name = name;
  company.gstNumber = gstNumber;
  company.address = address;
  company.branch = branch;
  company.state = state;
  company.district = district;
  company.district = city;
  company.pincode = pincode;
  company.technologies = technologies;
  company.contactDetails = contactDetails;

  await company.save();

  res.status(200).json({ success: true, data: company });
});

exports.deleteCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.company_id);

  if (!company) {
    return next(new ErrorResponse(`Company not found`, 404));
  }

  await Company.remove();

  res.status(200).json({
    success: true,
    data: {
      message: "Company is Deleted",
    },
  });
});

exports.getCompanyById = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.company_id);

  if (!company) {
    return next(new ErrorResponse(`Company not found`, 404));
  }

  res.status(200).json({ success: true, data: company });
});
