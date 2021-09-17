const Pattern = require('./pattern');

class Gradient extends Pattern {
  constructor(colorA, colorB) {
    super();
    this.a = colorA;
    this.b = colorB;
  }

  /**
   *
   * @param {Tuple} point
   * @returns {Color}
   */
  patternAt(point) {
    const distance = this.a.subtract(this.b);
    const factor = point.x - Math.floor(point.x);
    return this.a.subtract(distance.multiply(factor));
  }
}

module.exports = Gradient;
