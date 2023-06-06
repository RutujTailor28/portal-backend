const { asyncHandler } = require("../../middleware");
const { Schemas } = require("../../Database");
const { Salary } = Schemas;
const { advanceSearch, ErrorResponse } = require("../../utils");

exports.createSalary = asyncHandler(async (req, res, next) => {
  req.body["userId"] = req.user["_id"];
  const salary = await Salary.create(req.body);
  res.status(201).json({ success: true, data: salary });
});

exports.getSalary = asyncHandler(async (req, res, next) => {
  // use of advanceSearch Utils
  console.log("res", res);
  const searchResult = await advanceSearch(req.query, Salary, [
    {
      path: "companyId",
      select: ["name"],
    },
    {
      path: "paymentStatus",
      select: ["status"],
    },
  ]);
  res.status(200).json({
    ...searchResult,
  });
});

exports.updateSalary = asyncHandler(async (req, res, next) => {
  const salary = await Salary.findById(req.params.salary_id);

  if (!salary) {
    return next(new ErrorResponse(`Salary record not found`, 404));
  }

  const {
    name,
    paymentStatus,
    paymentType,
    transferAmount,
    month,
    year,
    companyId,
  } = req.body;

  salary.companyId = companyId;
  salary.name = name;
  salary.paymentStatus = paymentStatus;
  salary.paymentType = paymentType;
  salary.transferAmount = transferAmount;
  salary.month = month;
  salary.year = year;

  await salary.save();

  res.status(200).json({ success: true, data: salary });
});

exports.deleteSalary = asyncHandler(async (req, res, next) => {
  const salary = await Salary.findById(req.params.salary_id);

  if (!salary) {
    return next(new ErrorResponse(`Salary record found`, 404));
  }

  await salary.remove();

  res.status(200).json({
    success: true,
    data: {
      message: "Salary record is Deleted",
    },
  });
});

exports.getSalaryById = asyncHandler(async (req, res, next) => {
  let salary = await Salary.findById(req.params.salary_id).lean();
  let history;

  if (!salary) {
    return next(new ErrorResponse(`Salary record not found.`, 404));
  } else {
    const salaryDetailsByName = await Salary.find({
      name: salary.name,
    }).populate([
      {
        path: "companyId",
        select: ["name"],
      },
      {
        path: "paymentStatus",
        select: ["status"],
      },
    ]);
    console.log("salaryDetailsByName", salaryDetailsByName);
    history = salaryDetailsByName.filter(
      (salary) => salary._id.toString() !== req.params.salary_id
    );
  }
  salary = {
    ...salary,
    history: history,
  };

  res.status(200).json({ success: true, data: salary });
});
