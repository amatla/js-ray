const Pattern = require('./pattern');

class Checker extends Pattern {
  constructor(colorA, colorB) {
    super();
    this.a = colorA;
    this.b = colorB;
  }

  patternAt(point) {
    if (
      (Math.floor(point.x) +
        Math.floor(point.y) +
        Math.floor(point.z)) %
        2 ===
      0
    )
      return this.a;
    return this.b;
  }
}

module.exports = Checker;
