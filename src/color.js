const RayError = require('./errors');
const utils = require('./utils');

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
   * Compares this color to another color and return true if they are the same.
   * @param {color} col
   * @returns
   */
  equal(col) {
    if (!(col instanceof Color))
      throw new RayError('ray001', `${col} is not a color.`);
    return (
      utils.equal(this.red, col.red) &&
      utils.equal(this.green, col.green) &&
      utils.equal(this.blue, col.blue)
    );
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
    return new Color(sum.red, sum.green, sum.blue);
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
    return new Color(diff.red, diff.green, diff.blue);
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
    return new Color(mult.red, mult.green, mult.blue);
  }

  /**
   *
   * @param {Number} num
   * @returns {Color}
   */
  multiply(num) {
    return new Color(
      this.red * num,
      this.green * num,
      this.blue * num,
    );
  }

  static get BLACK() {
    return new Color(0, 0, 0);
  }

  static get WHITE() {
    return new Color(1, 1, 1);
  }
}

module.exports = Color;
