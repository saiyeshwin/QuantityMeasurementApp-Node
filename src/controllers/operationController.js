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
const addWithTargetUnit = async (req, res, next) => {
  try {
    const result = await operationService.addWithTargetUnit(req.body);
    successResponse(res, result);
  } catch (error) { next(error); }
};

const subtractWithTargetUnit = async (req, res, next) => {
  try {
    const result = await operationService.subtractWithTargetUnit(req.body);
    successResponse(res, result);
  } catch (error) { next(error); }
};

const getHistoryByType = async (req, res, next) => {
  try {
    const history = await operationService.getHistoryByType(req.params.type);
    successResponse(res, history);
  } catch (error) { next(error); }
};

const getHistoryByOperation = async (req, res, next) => {
  try {
    const history = await operationService.getHistoryByOperation(req.params.operation);
    successResponse(res, history);
  } catch (error) { next(error); }
};

const getErroredHistory = async (req, res, next) => {
  try {
    const history = await operationService.getErroredHistory();
    successResponse(res, history);
  } catch (error) { next(error); }
};

const getOperationCount = async (req, res, next) => {
  try {
    const count = await operationService.getOperationCount(req.params.operation);
    successResponse(res, { operation: req.params.operation, count });
  } catch (error) { next(error); }
};
module.exports = {
  add,
  subtract,
  multiply,
  divide,
  compare,
  convert,
  addWithTargetUnit,
  subtractWithTargetUnit,
  getHistoryByType,
  getHistoryByOperation,
  getErroredHistory,
  getOperationCount,
};