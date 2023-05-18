const { asyncHandler } = require("../../middleware");
const { Schemas } = require("../../Database");
const { Candidate, CandidateCompany, Company } = Schemas;
const { advanceSearch, ErrorResponse } = require("../../utils");
const _ = require("lodash");
exports.createCandidate = asyncHandler(async (req, res, next) => {
  req.body["userId"] = req.user["_id"];
  let candidateCompany = req.body.currentCompanies;
  let candidateId = _.map(candidateCompany, "companyId");
  const candidate = {
    ...req.body,
    currentCompanies: candidateId,
  };
  const createdCandidate = await Candidate.create(candidate);
  if (createdCandidate) {
    candidateCompany = candidateCompany.map((company) => {
      return {
        ...company,
        candidateId: createdCandidate._id,
      };
    });

    const createdCandidateCompany = await CandidateCompany.create(
      candidateCompany
    );
    if (createdCandidateCompany) {
      res.status(201).json({ success: true, data: createdCandidate });
    }
  }
});

exports.getCandidates = asyncHandler(async (req, res, next) => {
  // use of advanceSearch Utils
  const searchResult = await advanceSearch(req.query, Candidate, {
    path: "currentCompanies",
    select: ["name"],
  });

  res.status(200).json({
    ...searchResult,
  });
});

exports.updateCandidate = asyncHandler(async (req, res, next) => {
  const candidate = await Candidate.findById(req.params.candidate_id);
  if (!candidate) {
    return next(
      new ErrorResponse(
        `Candidate is not found with id of ${req.params.candidate_id}`,
        404
      )
    );
  }

  const {
    name,
    mobile,
    technology,
    experience,
    currentCompanies,
    lastSalaryMonth,
    availableIn,
  } = req.body;

  candidate.name = name;
  candidate.mobile = mobile;
  candidate.technology = technology;
  candidate.experience = experience;
  candidate.currentCompanies = currentCompanies;
  candidate.lastSalaryMonth = lastSalaryMonth;
  candidate.availableIn = availableIn;

  await candidate.save();

  res.status(200).json({ success: true, data: candidate });
});

exports.deleteCandidate = asyncHandler(async (req, res, next) => {
  const candidate = await Candidate.findById(req.params.candidate_id);

  if (!candidate) {
    return next(
      new ErrorResponse(
        `Candidate is not found with id of ${req.params.candidate_id}`,
        404
      )
    );
  }

  await candidate.remove();

  res.status(200).json({
    success: true,
    data: {
      message: "Candidate is Deleted",
    },
  });
});

exports.getCandidateById = asyncHandler(async (req, res, next) => {
  let candidate = await Candidate.findById(req.params.candidate_id).lean();
  const candiDateCompany = await CandidateCompany.find({
    candidateId: req.params.candidate_id,
  }).populate({ path: "companyId", select: ["name"] });

  candidate = {
    ...candidate,
    currentCompanies: candiDateCompany,
  };

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
