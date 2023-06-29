const createError = (error) => {
  let errorResponse;

  if (error?.details?.[0]) {
    errorResponse = new Error(error.details[0].message);
    errorResponse.status = 422;
  } else {
    const { message = "Something went wrong!", status = 500 } = error;
    errorResponse = new Error(message);
    errorResponse.status = status;
  }

  return errorResponse;
};

module.exports = createError;
