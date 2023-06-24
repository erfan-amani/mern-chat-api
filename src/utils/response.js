const generateResponseWithPagination = (data, { limit, total, page }) => {
  const totalPage = Math.ceil(total / limit);

  return { data, total, totalPage, page, limit };
};

module.exports = { generateResponseWithPagination };
