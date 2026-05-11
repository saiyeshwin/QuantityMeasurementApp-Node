const successResponse = (res, data) => {
  return res.json({
    status: "success",
    data,
    timestamp: new Date().toISOString(),
  });
};

module.exports = successResponse;