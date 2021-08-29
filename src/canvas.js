const Color = require('./color');
const constants = require('./constants');
const RayError = require('./errors');

const { ppmMaxColor, ppmLineLength } = constants;
/**
 * Class representing a canvas.
 * @class Canvas
 */
class Canvas {
  /**
   * Create a canvas.
   * @param {Number} width
   * @param {Number} length
   */
  constructor(width = 10, heigth = 10) {
    this.width = width;
    this.heigth = heigth;
    this.pixels = [];
    this.initialize(Color.BLACK);
  }

  /**
   * Inititalize the pixels array and sets each pixel to "color".
   * @param {Color} color
   * @returns {Canvas}
   */
  initialize(color) {
    for (let y = 0; y < this.heigth; y += 1) {
      this.pixels[y] = [];
      for (let x = 0; x < this.width; x += 1) {
        this.pixels[y][x] = color;
      }
    }
    return this;
  }

  /**
   * Sets each pixel of the canvas to "color".
   * @param {Color} color
   * @returns {Canvas}
   */
  fill(color) {
    if (!(color instanceof Color))
      throw new RayError('ray001', `${color} is not of type Color`);

    for (let y = 0; y < this.heigth; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        this.pixels[y][x] = color;
      }
    }
    return this;
  }

  /**
   * Checks if a pixel exist at location this.pixels[y][x].
   * Returns 'true' if it exists and 'false' if not.
   * @param {Number} x
   * @param {Number} y
   * @returns {Boolean}
   */
  hasPixel(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.heigth;
  }

  /**
   * Writes the Color 'color' at 'this.pixels[y][x]'.
   * Checks if the coordinates (x, y) and the Color 'color' are valid.
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
    return this;
  }

  /**
   * Returns the Color object at 'this.pixels[y][x]' if it exists.
   * @param {Number} x
   * @param {Number} y
   * @returns {Color}
   */
  pixelAt(x, y) {
    if (!this.hasPixel(x, y))
      throw new RayError('ray002', `Index (${x},${y}) out of bound`);
    if (!(this.pixels[y][x] instanceof Color))
      throw new RayError(
        'ray001',
        `${this.pixels[y][x]} is not of type Color`,
      );
    return this.pixels[y][x];
  }

  /**
   * Returns a PPM representation (including the appropriate header) of the canvas's pixels in string format.
   * Makes sure the last char of the PPM is a newline.
   * @returns {String}
   */
  toPPM() {
    this.ppm = `${this.ppmHeader.join('\n')}\n`;
    this.ppm += this.ppmPixelData.join('\n');
    this.ppm += '\n';
    return this.ppm;
  }

  /**
   * Returns the canvas PPM header in string format.
   * @returns {String}
   */
  get ppmHeader() {
    return ['P3', `${this.width} ${this.heigth}`, `${ppmMaxColor}`];
  }

  /**
   * Converts the red, green or blue value of a pixel color in PPM format.
   * @param {Number} num
   * @returns {Number}
   */
  ppmScale(num) {
    if (num <= 0) return 0;
    if (num >= 1) return 255;
    return Math.round(num * ppmMaxColor);
  }

  /**
   * Returns an array of strings containing the red green and blue value of each pixel Color in the canvas.
   * The values are scaled bewteen 0 and ppmMaxColor. Each string of the arry has a max length of ppmLineLenght.
   * @returns {String[]}
   */
  get ppmPixelData() {
    const ppmPixel = [];
    for (let y = 0; y < this.heigth; y += 1) {
      let line = '';
      for (let x = 0; x < this.width; x += 1) {
        // gets each color red, green and blue values, scales them to the appropriate range and converts the values to a string.
        const data = Object.values(this.pixels[y][x]).map((value) =>
          this.ppmScale(value).toString(),
        );
        // If adding the current value to the current line would make the current line length exceed the max length allowed,
        // add the current line to the array as it is and start a new line. If not keep adding the current values.
        for (let i = 0, n = data.length; i < n; i += 1) {
          if (line.length + data.length > ppmLineLength) {
            ppmPixel.push(line.trimEnd());
            line = data[i].concat(' ');
          } else line = line.concat(data[i], ' ');
        }
      }
      // Add the last line if it contains any data.
      if (line.length) ppmPixel.push(line.trimEnd());
    }
    return ppmPixel;
  }
}

module.exports = Canvas;
