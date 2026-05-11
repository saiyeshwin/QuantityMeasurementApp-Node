const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const History = sequelize.define("History", {
  operation: DataTypes.STRING,
  measurementType: DataTypes.STRING,
  input1: DataTypes.STRING,
  input2: DataTypes.STRING,
  result: DataTypes.STRING,
  status: DataTypes.STRING,
});
module.exports = History;