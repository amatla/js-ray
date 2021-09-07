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
   * @param {Color} col
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
   * @param  {Color} col
   * @returns {Color}
   */
  add(col) {
    if (!(col instanceof Color))
      throw new RayError('ray001', `${col} is not a color`);
    return new Color(
      this.red + col.red,
      this.green + col.green,
      this.blue + col.blue,
    );
  }

  /**
   *
   * @param  {Color} col
   * @returns {Color}
   */
  subtract(col) {
    if (!(col instanceof Color))
      throw new RayError('ray001', `${col} is not a color`);
    return new Color(
      this.red - col.red,
      this.green - col.green,
      this.blue - col.blue,
    );
  }

  /**
   *
   * @param  {Color|Number} col
   * @returns {Color}
   */
  multiply(col) {
    if (col instanceof Color)
      return new Color(
        this.red * col.red,
        this.green * col.green,
        this.blue * col.blue,
      );

    return new Color(
      this.red * col,
      this.green * col,
      this.blue * col,
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
