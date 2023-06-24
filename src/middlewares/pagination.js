const pagination = (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const skip = page >= 1 ? (page - 1) * limit : 0;

  req.pagination = {
    skip,
    limit,
    page,
  };

  next();
};

module.exports = pagination;
