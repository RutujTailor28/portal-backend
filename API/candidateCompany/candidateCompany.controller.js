const { asyncHandler } = require("../../middleware");
const { Schemas } = require("../../Database");
const { CandidateCompany } = Schemas;
const { advanceSearch, ErrorResponse } = require("../../utils");

exports.createCandidateCompany = asyncHandler(async (req, res, next) => {
  req.body["userId"] = req.user["_id"];
  const candidateCompany = await CandidateCompany.create(req.body);
  res.status(201).json({ success: true, data: candidateCompany });
});

exports.getCandidatesCompany = asyncHandler(async (req, res, next) => {
  // use of advanceSearch Utils
  const searchResult = await advanceSearch(req.query, CandidateCompany, {
    path: "companyId",
    select: ["name"],
  });
  res.status(200).json({
    ...searchResult,
  });
});

exports.updateCandidateCompany = asyncHandler(async (req, res, next) => {
  const candidateCompany = await CandidateCompany.findById(
    req.params.candidateCompany_id
  );

  if (!candidateCompany) {
    return next(
      new ErrorResponse(
        `Candidate company is not found with id of ${req.params.candidateCompany_id}`,
        404
      )
    );
  }

  if (candidateCompany.candidateId !== req.body.candidateId) {
    return next(
      new ErrorResponse(
        `Update failed, The company is not belongs to provided candidate`,
        404
      )
    );
  }

  const { companyId, candidateId, joinDate, position, salary } = req.body;

  candidateCompany.companyId = companyId;
  candidateCompany.candidateId = candidateId;
  candidateCompany.joinDate = joinDate;
  candidateCompany.position = position;
  candidateCompany.salary = salary;

  await candidateCompany.save();

  res.status(200).json({ success: true, data: candidateCompany });
});

exports.deleteCandidateCompany = asyncHandler(async (req, res, next) => {
  const candidateCompany = await CandidateCompany.findById(
    req.params.candidateCompany_id
  );

  if (!candidate) {
    return next(
      new ErrorResponse(
        `Candidate Company is not found with provided candidate`,
        404
      )
    );
  }

  if (candidateCompany.candidateId !== req.body.candidateId) {
    return next(
      new ErrorResponse(
        `Delete failed, The company is not belongs to provided candidate`,
        404
      )
    );
  }

  await candidateCompany.remove();

  res.status(200).json({
    success: true,
    data: {
      message: "Candidate Company is Deleted",
    },
  });
});

exports.getCandidateCompanyById = asyncHandler(async (req, res, next) => {
  const candidateCompany = await CandidateCompany.findById(
    req.params.candidateCompany_id
  );

  if (!candidateCompany) {
    return next(
      new ErrorResponse(
        `Candidate Company is not found with provided candidate`,
        404
      )
    );
  }
  if (candidateCompany.candidateId !== req.body.candidateId) {
    return next(
      new ErrorResponse(`The company is not belongs to provided candidate`, 404)
    );
  }

  res.status(200).json({ success: true, data: candidateCompany });
});
