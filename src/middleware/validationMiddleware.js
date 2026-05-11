const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
        timestamp: new Date().toISOString(),
      });
    }
    next();
  };
};
module.exports = validate;