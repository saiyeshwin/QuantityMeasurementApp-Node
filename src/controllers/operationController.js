const operationService = require("../services/operationService");

const successResponse = require("../utils/responseHandler");
const add = async (req, res, next) => {
  try {
    const result = await operationService.add(req.body);
    successResponse(res, result);
  } 
  catch (error) {
    next(error);
  }
};

const subtract = async (req, res, next) => {
  try {
    const result = await operationService.subtract(req.body);
    successResponse(res, result);
  } 
  catch (error) {
    next(error);
  }
};

const multiply = async (req, res, next) => {
  try {
    const result = await operationService.multiply(req.body);
    successResponse(res, result);
  } 
  catch (error) {
    next(error);
  }
};

const divide = async (req, res, next) => {
  try {
    const result = await operationService.divide(req.body);
    successResponse(res, result);
  } 
  catch (error) {
    next(error);
  }
};

const compare = async (req, res, next) => {
  try {
    const result = await operationService.compare(req.body);
    successResponse(res, result);
  } 
  catch (error) {
    next(error);
  }
};

const convert = async (req, res, next) => {
  try {
    const result = await operationService.convert(req.body);
    successResponse(res, result);
  } 
  catch (error) {
    next(error);
  }
};

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  compare,
  convert,
};