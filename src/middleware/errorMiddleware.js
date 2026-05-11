const errorHandler = (err, req, res, next) => {

  res.status(500).json({
    status: "error",
    message: err.message,
    timestamp: new Date().toISOString(),
  });

};

module.exports = errorHandler;