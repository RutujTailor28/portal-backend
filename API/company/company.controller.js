const { asyncHandler } = require("../../middleware");
const { Schemas } = require("../../Database");
const { CandidateCompany } = Schemas;
const { advanceSearch, ErrorResponse } = require("../../utils");

exports.createCandidateCompany = asyncHandler(async (req, res, next) => {
  req.body["userId"] = req.user["_id"];
  const candidateCompany = await CandidateCompany.create(req.body);
  // const findCar = await Candidate.findById(candidate["_id"]).populate({path: "userId", select: ["firstName", "middleName", "lastName"]});
  res.status(201).json({ success: true, data: candidateCompany });
});

exports.getCandidatesCompany = asyncHandler(async (req, res, next) => {
  // use of advanceSearch Utils
  const searchResult = await advanceSearch(req.query, CandidateCompany);
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

  const { companyId, candidateId, joinDate, position, salary } = req.body;

  candidate.companyId = companyId;
  candidate.candidateId = candidateId;
  candidate.joinDate = joinDate;
  candidate.position = position;
  candidate.salary = salary;

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
        `Candidate company is not found with id of ${req.params.candidateCompany_id}`,
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
  const candidate = await CandidateCompany.findById(req.params.candidate_id);

  if (!candidate) {
    return next(
      new ErrorResponse(
        `Candidate is not found with id of ${req.params.candidate_id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: candidate });
});
