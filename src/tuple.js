const utils = require('./utils');
/**
 * @class Tuple
 */
class Tuple {
  /**
   * @constructor
   * @param {Number} x
   * @param {Number} x
   * @param {Number} y
   * @param {Number} w
   */
  constructor(x = 0, y = 0, z = 0, w = 1.0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w < 1.0 ? 0 : 1.0;
  }

  /**
   * @returns {Object} - returns Tuple's type as a object
   */
  static get Type() {
    return { Point: 1.0, Vector: 0.0 };
  }

  /**
   * returns a new Point
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @returns {Tuple}
   */
  static getPoint(x = 0, y = 0, z = 0) {
    return new Tuple(x, y, z, 1.0);
  }

  /**
   * returns a new Vector
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @returns {Tuple}
   */
  static getVector(x = 0, y = 0, z = 0) {
    return new Tuple(x, y, z, 0.0);
  }

  /**
   * Compares two tuple and return true if they are of the same type and the values of each component are the same
   * @param {Tuple} a
   * @param {Tuple} b
   * @returns {boolean}
   */
  static compare(a, b) {
    return (
      a instanceof Tuple &&
      b instanceof Tuple &&
      utils.equal(a.x, b.x) &&
      utils.equal(a.y, b.y) &&
      utils.equal(a.z, b.z) &&
      a.type === b.type
    );
  }

  /**
   * @param {Tuple} a
   * @param {Tuple} b
   * @returns {Tuple}
   */
  static add(a, b) {
    if (a.type === Tuple.Type.Point && b.type === Tuple.Type.Point) {
      throw new Error("Can't add two points");
    }
    return new Tuple(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
  }

  /**
   * @param {Tuple} a
   * @param {Tuple} b
   * @returns {Tuple}
   */
  static subctract(a, b) {
    if (a.type === Tuple.Type.Vector && b.type === Tuple.Type.Point) {
      throw new Error("Can't subtract a point from a vector");
    }
    return new Tuple(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
  }

  /**
   * returns the Tuple's type as a number
   * @returns {Number}
   */
  get type() {
    return this.w;
  }

  /**
   * returns the Tuple's type as a string
   * @returns {String}
   */
  typeToString() {
    return this.w === 1 ? 'Point' : 'Vector';
  }

  /**
   * @returns {Tuple}
   */
  negate() {
    return new Tuple(-this.x, -this.y, -this.z, this.w);
  }

  /**
   *
   * @param {Number} scalar
   * @returns {Tuple}
   */
  multiply(scalar) {
    return new Tuple(
      this.x * scalar,
      this.y * scalar,
      this.z * scalar,
      this.w,
    );
  }

  /**
   *
   * @param {Number} scalar
   * @returns {Tuple}
   */
  divideBy(scalar) {
    return new Tuple(
      this.x / scalar,
      this.y / scalar,
      this.z / scalar,
      this.w,
    );
  }

  /**
   *@returns{Number}
   */
  get magnitude() {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z,
    );
  }

  /**
   * @returns {Number}
   */
  normalize() {
    const mag = this.magnitude;
    return new Tuple(
      this.x / mag,
      this.y / mag,
      this.z / mag,
      this.w,
    );
  }
}

module.exports = Tuple;
