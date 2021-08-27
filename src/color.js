const constants = require('./constants');

const { dPoints } = constants;

/**
 *
 * @class Color
 */
class Color {
  /**
   *
   * @param {Number} red
   * @param {Number} green
   * @param {Number} blue
   */
  constructor(red = 0.0, green = 0.0, blue = 0.0) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  /**
   *
   * @param  {...Color} colors
   * @returns {Color}
   */
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

  /**
   *
   * @param  {...Color} colors
   * @returns {Color}
   */
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

  /**
   *
   * @param  {...Color} colors
   * @returns {Color}
   */
  static multiply(...colors) {
    const mult = colors.reduce((acc, curr) => {
      acc.red *= curr.red;
      acc.green *= curr.green;
      acc.blue *= curr.blue;
      return acc;
    });
    return new Color(
      Number(mult.red.toFixed(dPoints)),
      Number(mult.green.toFixed(dPoints)),
      Number(mult.blue.toFixed(dPoints)),
    );
  }

  static get BLACK() {
    return new Color(0, 0, 0);
  }

  static get WHITE() {
    return new Color(1, 1, 1);
  }

  /**
   *
   * @param {Number} num
   * @returns {Color}
   */
  multiply(num) {
    return new Color(
      Number((this.red * num).toFixed(dPoints)),
      Number((this.green * num).toFixed(dPoints)),
      Number((this.blue * num).toFixed(dPoints)),
    );
  }
}

module.exports = Color;
