'use strict';
const advancedResults = (model, populate, Owners) => async (req, res, next) => {
  let query, pagequery;
  //Copy query
  let reqQuery = { ...req.query };

  // Exclude field
  const removeFields = ['select', 'sort', 'page', 'limit'];

  removeFields.forEach(param => delete reqQuery[param]);

  // Creating Qurey String
  let queryStr = JSON.stringify(reqQuery);

  // Generate JSON string for $gt, $gte and other operators
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  query = model.find(JSON.parse(queryStr));
  pagequery = model.find(JSON.parse(queryStr));

  // Data Owership
  if (Owners) {
    query = query.find({ user: req.user.id });
    pagequery = pagequery.find(queryoption);
  }
  // SELECT Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }
  // console.log("query ==> ", query);
  //Executing query
  const results = await query;

  //Pagination result
  const pagination = {
    totalRecords: total,
    totalPages: Math.ceil(total / limit),
    limit,
  };

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
