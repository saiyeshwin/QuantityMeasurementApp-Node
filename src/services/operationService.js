const History = require("../models/history");
const { UNIT_TYPES } = require("../utils/constants");
const lengthConverter = require("../utils/conversions/length");
const temperatureConverter = require("../utils/conversions/temperature");
const weightConverter = require("../utils/conversions/weight");
const volumeConverter = require("../utils/conversions/volume");
const { Op } = require("sequelize");
const validateUnits = (unit1, unit2) => {
  const type1 = UNIT_TYPES[unit1];
  const type2 = UNIT_TYPES[unit2];
  if (!type1 || !type2) {
    throw new Error("Invalid units");
  }
  if (type1 !== type2) {
    throw new Error("Incompatible unit types");
  }
  return type1;
};

const convertToBase = (value, unit, type) => {
  switch (type) {
    case "LENGTH":
      return lengthConverter.toBase(value, unit);
    case "TEMPERATURE":
      return temperatureConverter.toKelvin(value, unit);
    case "WEIGHT":
      return weightConverter.toBase(value, unit);
    case "VOLUME":
      return volumeConverter.toBase(value, unit);
    default:
      return value;
  }
};

const add = async (data) => {
  const {
    value1,
    unit1,
    value2,
    unit2,
  } = data;
  const type = validateUnits(unit1, unit2);
  const base1 = convertToBase(value1, unit1, type);
  const base2 = convertToBase(value2, unit2, type);
  const result = base1 + base2;
  await History.create({
    operation: "ADD",
    measurementType: type,
    input1: `${value1} ${unit1}`,
    input2: `${value2} ${unit2}`,
    result,
    status: "SUCCESS",
  });

  return result;
};

const subtract = async (data) => {
  const {
    value1,
    unit1,
    value2,
    unit2,
  } = data;
  const type = validateUnits(unit1, unit2);
  const base1 = convertToBase(value1, unit1, type);
  const base2 = convertToBase(value2, unit2, type);
  const result = base1 - base2;
  await History.create({
    operation: "SUBTRACT",
    measurementType: type,
    input1: `${value1} ${unit1}`,
    input2: `${value2} ${unit2}`,
    result,
    status: "SUCCESS",
  });

  return result;
};

const multiply = async (data) => {
  const {
    value1,
    value2,
  } = data;
  const result = value1 * value2;
  await History.create({
    operation: "MULTIPLY",
    measurementType: "NUMBER",
    input1: `${value1}`,
    input2: `${value2}`,
    result,
    status: "SUCCESS",
  });

  return result;
};
const divide = async (data) => {
  const {
    value1,
    value2,
  } = data;
  if (value2 === 0) {
    throw new Error("Division by zero");
  }
  const result = value1 / value2;
  await History.create({
    operation: "DIVIDE",
    measurementType: "NUMBER",
    input1: `${value1}`,
    input2: `${value2}`,
    result,
    status: "SUCCESS",
  });

  return result;
};

const compare = async (data) => {
  const {
    value1,
    unit1,
    value2,
    unit2,
  } = data;
  const type = validateUnits(unit1, unit2);
  const base1 = convertToBase(value1, unit1, type);
  const base2 = convertToBase(value2, unit2, type);
  let result;
  if (base1 > base2) {
    result = "GREATER_THAN";
  }
  else if (base1 < base2) {
    result = "LESS_THAN";
  }
  else {
    result = "EQUAL";
  }
  await History.create({
    operation: "COMPARE",
    measurementType: type,
    input1: `${value1} ${unit1}`,
    input2: `${value2} ${unit2}`,
    result,
    status: "SUCCESS",
  });
  return result;
};
const convert = async (data) => {
  const { value1, unit1, targetUnit } = data;
  const type1 = UNIT_TYPES[unit1];
  const type2 = UNIT_TYPES[targetUnit];
  
  if (type1 !== type2) {
    throw new Error("Incompatible conversion");
  }

  let baseValue;
  let result;
  
  switch (type1) {
    case "LENGTH":
      baseValue = lengthConverter.toBase(value1, unit1);
      result = lengthConverter.fromBase(baseValue, targetUnit);
      break;
    case "TEMPERATURE":
      baseValue = temperatureConverter.toKelvin(value1, unit1);
      result = temperatureConverter.fromKelvin(baseValue, targetUnit);
      break;
    case "WEIGHT":
      baseValue = weightConverter.toBase(value1, unit1);
      result = weightConverter.fromBase(baseValue, targetUnit);
      break;
    case "VOLUME":
      baseValue = volumeConverter.toBase(value1, unit1);
      result = volumeConverter.fromBase(baseValue, targetUnit);
      break;
    default:
      result = value1;
  }

  await History.create({
    operation: "CONVERT",
    measurementType: type1,
    input1: `${value1} ${unit1}`,
    input2: targetUnit,
    result,
    status: "SUCCESS",
  });
  return result;
};
const addWithTargetUnit = async (data) => {
  const { value1, unit1, value2, unit2, targetUnit } = data;
  const type = validateUnits(unit1, unit2);
  validateUnits(unit1, targetUnit); 
  const base1 = convertToBase(value1, unit1, type);
  const base2 = convertToBase(value2, unit2, type);
  const sumBase = base1 + base2;
  const result = type === "TEMPERATURE" 
    ? temperatureConverter.fromKelvin(sumBase, targetUnit)
    : sumBase / (type === "LENGTH" ? lengthMap[targetUnit] : weightMap[targetUnit] || volumeMap[targetUnit]);
  await History.create({
    operation: "ADD_WITH_TARGET",
    measurementType: type,
    input1: `${value1} ${unit1}`,
    input2: `${value2} ${unit2}`,
    result: `${result} ${targetUnit}`,
    status: "SUCCESS",
  });
  return result;
};

const subtractWithTargetUnit = async (data) => {
  const { value1, unit1, value2, unit2, targetUnit } = data;
  const type = validateUnits(unit1, unit2);
  validateUnits(unit1, targetUnit);

  const base1 = convertToBase(value1, unit1, type);
  const base2 = convertToBase(value2, unit2, type);
  const diffBase = base1 - base2;

  const result = type === "TEMPERATURE" 
    ? temperatureConverter.fromKelvin(diffBase, targetUnit)
    : diffBase / (type === "LENGTH" ? lengthMap[targetUnit] : weightMap[targetUnit] || volumeMap[targetUnit]);

  await History.create({
    operation: "SUBTRACT_WITH_TARGET",
    measurementType: type,
    input1: `${value1} ${unit1}`,
    input2: `${value2} ${unit2}`,
    result: `${result} ${targetUnit}`,
    status: "SUCCESS",
  });
  return result;
};

const getHistoryByType = (type) => History.findAll({ where: { measurementType: type.toUpperCase() } });
const getHistoryByOperation = (operation) => History.findAll({ where: { operation: operation.toUpperCase() } });
const getErroredHistory = () => History.findAll({ where: { status: "FAILED" } });
const getOperationCount = (operation) => History.count({ where: { operation: operation.toUpperCase() } });
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