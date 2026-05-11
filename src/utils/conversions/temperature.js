const toKelvin = (value, unit) => {
  switch (unit) {
    case "C":
      return value + 273.15;
    case "F":
      return ((value - 32) * 5) / 9 + 273.15;
    case "K":
      return value;
    default:
      throw new Error("Invalid temperature unit");
  }
};
const fromKelvin = (value, unit) => {
  switch (unit) {
    case "C":
      return value - 273.15;
    case "F":
      return ((value - 273.15) * 9) / 5 + 32;
    case "K":
      return value;
    default:
      throw new Error("Invalid temperature unit");
  }
};
module.exports = {
  toKelvin,
  fromKelvin,
};