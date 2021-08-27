const Color = require('./color');

/**
 *
 * @class Canvas
 */
class Canvas {
  /**
   *
   * @param {Number} width
   * @param {Number} length
   */
  constructor(width = 10, length = 10) {
    this.width = width;
    this.heigth = length;
    this.pixels = [];
    this.fill(Color.BLACK);
  }

  /**
   *
   * @param {Color} color
   * @returns {Canvas}
   */
  fill(color) {
    for (let y = 0; y < this.heigth; y += 1) {
      this.pixels[y] = new Array(this.width).fill(color);
    }
    return this;
  }

  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @returns {Boolean}
   */
  hasPixel(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.heigth;
  }

  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Color} color
   * @returns {Boolean}
   */
  writePixel(x, y, color) {
    if (this.hasPixel(x, y) && color instanceof Color) {
      this.pixels[x][y] = color;
      return true;
    }
    return false;
  }

  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @returns {(Color) || (false)}
   */
  pixelAt(x, y) {
    if (this.hasPixel(x, y)) return this.pixels[x][y];
    return false;
  }
}

module.exports = Canvas;
