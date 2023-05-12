const advanceSearch = async (queryparams, model, populate, queryoption) => {
  let query, pagequery;

  //Copy query
  let reqQuery = { ...queryparams };

  // Exclude field
  const removeFields = ['select', 'sort', 'page', 'limit'];

  removeFields.forEach(param => delete reqQuery[param]);

  // Creating Qurey String
  let queryStr = JSON.stringify(reqQuery);

  // Generate JSON string for $gt, $gte and other operators
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  query = model.find(JSON.parse(queryStr));
  pagequery = model.find(JSON.parse(queryStr));

  // Other qurey options
  if (queryoption) {
    query = query.find(queryoption);
    pagequery = pagequery.find(queryoption);
  }

  // SELECT Fields
  if (queryparams.select) {
    const fields = queryparams.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sorting
  if (queryparams.sort) {
    const sortBy = queryparams.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(queryparams.page, 10) || 1;
  const limit = parseInt(queryparams.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await pagequery.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }
  //Executing query
  const results = await query.lean();
  // const results = await query;

  //Pagination result
  const pagination = {
    totalRecords: total,
    totalPages: Math.ceil(total / limit),
    limit,
  };

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
    };
  }

  searchResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  return searchResults;
};

module.exports = advanceSearch;
