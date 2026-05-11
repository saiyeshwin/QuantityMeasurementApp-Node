const volumeMap = {
  ml: 0.001,
  l: 1,
};
const toBase = (value, unit) => {
  if (!volumeMap[unit]) throw new Error("Invalid volume unit");
  return value * volumeMap[unit];
};
const fromBase = (value, unit) => {
  if (!volumeMap[unit]) throw new Error("Invalid volume unit");
  return value / volumeMap[unit];
};
module.exports = {
  toBase,
  fromBase,
};