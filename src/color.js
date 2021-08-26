const constants = require('./constants');

const { dPoints } = constants;
class Color {
  constructor(red = 0.0, green = 0.0, blue = 0.0) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  static add(...colors) {
    const sum = colors.reduce((acc, curr) => {
      acc.red += curr.red;
      acc.green += curr.green;
      acc.blue += curr.blue;
      return acc;
    });
    return new Color(
      Number(sum.red.toFixed(dPoints)),
      Number(sum.green.toFixed(dPoints)),
      Number(sum.blue.toFixed(dPoints)),
    );
  }

  static subtract(...colors) {
    const diff = colors.reduce((acc, curr) => {
      acc.red -= curr.red;
      acc.green -= curr.green;
      acc.blue -= curr.blue;
      return acc;
    });
    return new Color(
      Number(diff.red.toFixed(dPoints)),
      Number(diff.green.toFixed(dPoints)),
      Number(diff.blue.toFixed(dPoints)),
    );
  }
}

const c1 = new Color(0.6, 0.6, 0.75);
const c2 = new Color(0.1, 0.3, 0.25);
console.log(Color.subtract(c1, c2));
module.exports = Color;
