const Color = require('./color');
const constants = require('./constants');
const RayError = require('./errors');

const { ppmMaxColor, ppmLineLength } = constants;
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
  constructor(width = 10, heigth = 10) {
    this.width = width;
    this.heigth = heigth;
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
      this.pixels[y] = [];
      for (let x = 0; x < this.width; x += 1) {
        this.pixels[y][x] = color;
      }
    }
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
   * @returns {Canvas}
   */
  writePixel(x, y, color) {
    if (!this.hasPixel(x, y))
      throw new RayError('ray002', `Index (${x},${y}) out of bound`);

    if (!(color instanceof Color))
      throw new RayError('ray001', `${color} is not of type Color`);
    this.pixels[y][x] = color;
  }

  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @returns {(Color)}
   */
  pixelAt(x, y) {
    if (!this.hasPixel(x, y))
      throw new RayError('ray002', `Index (${x},${y}) out of bound`);
    return this.pixels[y][x];
  }

  /**
   *
   * @returns {String}
   */
  toPPM() {
    this.ppm = `${this.ppmHeader.join('\n')}\n`;
    this.ppm += this.ppmPixelData.join('\n');
    return this.ppm;
  }

  /**
   *
   * @returns {String}
   */
  get ppmHeader() {
    return ['P3', `${this.width} ${this.heigth}`, `${ppmMaxColor}`];
  }

  /**
   *
   * @param {Number} num
   * @returns {Number}
   */
  ppmScale(num) {
    if (num <= 0) return 0;
    if (num >= 1) return 255;
    return Math.round(num * ppmMaxColor);
  }

  /**
   *
   * @returns {String[]}
   */
  get ppmPixelData() {
    const ppmPixel = [];
    const keys = ['red', 'green', 'blue'];
    for (let y = 0; y < this.heigth; y += 1) {
      ppmPixel[y] = [];
      for (let x = 0; x < this.width; x += 1) {
        keys.forEach((key) => {
          ppmPixel[y].push(this.ppmScale(this.pixels[y][x][key]));
        });
      }
      ppmPixel[y] = ppmPixel[y].join(' ');
    }
    return ppmPixel;
  }
}
module.exports = Canvas;
