const lengthMap = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
};
const toBase = (value, unit) => {
  return value * lengthMap[unit];
};
const fromBase = (value, unit) => {
  return value / lengthMap[unit];
};
module.exports = {
  toBase,
  fromBase,
};