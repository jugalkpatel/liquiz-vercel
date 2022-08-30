function errorHandler(err, req, res, next) {
  console.log({ err });

  if (err.name === "ValidationError") {
    console.log(err.errors);
    return res.status(422).json({
      success: false,
      message: err?.errors ? err.errors : "Invalid data",
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  // setTimeout(() => {
  //   res.status(err.status || 500).json({
  //     success: false,
  //     message: err.message || "something went wrong",
  //   });
  // }, 5000);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "something went wrong",
  });
}

module.exports = { errorHandler };
