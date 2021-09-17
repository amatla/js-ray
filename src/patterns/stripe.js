const Pattern = require('./pattern');

/**
 *
 * @class StripePattern
 */
class StripePattern extends Pattern {
  /**
   *
   * @param {Color} colorA
   * @param {Color} colorB
   */
  constructor(colorA, colorB) {
    super();
    this.a = colorA;
    this.b = colorB;
  }

  /**
   *
   * @param {Tuple} point
   * @returns {Color} - the color at the point.
   */
  patternAt(point) {
    if (Math.floor(point.x) === 0) return this.a;
    return Math.floor(point.x) % 2 === 0 ? this.a : this.b;
  }
}

module.exports = StripePattern;
