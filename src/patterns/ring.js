const Pattern = require('./pattern');

class RingPattern extends Pattern {
  constructor(colorA, colorB) {
    super();
    this.a = colorA;
    this.b = colorB;
  }

  patternAt(point) {
    if (
      Math.floor(Math.sqrt(point.x * point.x + point.z * point.z)) %
        2 ===
      0
    )
      return this.a;
    return this.b;
  }
}

module.exports = RingPattern;
