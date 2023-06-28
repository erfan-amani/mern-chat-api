const createError = (err, message = "Something went wrong!", status = 500) => {
  if (err?.details?.[0]) {
    const error = new Error(err.details[0].message);
    error.status = 422;

    return error;
  } else {
    const error = new Error(message);
    error.status = status;

    return error;
  }
};

module.exports = createError;
