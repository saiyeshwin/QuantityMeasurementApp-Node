const weightMap = {
  mg: 0.001,
  g: 1,
  kg: 1000,
};
const toBase = (value, unit) => {
  if (!weightMap[unit]) throw new Error("Invalid weight unit");
  return value * weightMap[unit];
};
const fromBase = (value, unit) => {
  if (!weightMap[unit]) throw new Error("Invalid weight unit");
  return value / weightMap[unit];
};
module.exports = {
  toBase,
  fromBase,
};