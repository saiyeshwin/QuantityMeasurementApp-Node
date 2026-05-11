const Joi = require("joi");

const operationSchema = Joi.object({
  value1: Joi.number().required(),
  unit1: Joi.string().required(),

  value2: Joi.number(),
  unit2: Joi.string(),

  targetUnit: Joi.string(),
});

module.exports = operationSchema;