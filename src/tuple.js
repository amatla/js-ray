const utils = require('./utils');
const RayError = require('./errors');
const constants = require('./constants');

const { dPoints } = constants;

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
  constructor(x = 0, y = 0, z = 0, w = Tuple.Type.Point) {
    if (w !== Tuple.Type.Point && w !== Tuple.Type.Vector)
      throw new RayError(
        'ray001',
        'Can only create tuples with w = Tuple.Type.Point or w = Tuple.Type.Vector',
      );
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
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
   *
   * @param  {...Tuple} tuples
   * @returns {Tuple}
   */
  static add(...tuples) {
    let pCount = 0;
    const sum = tuples.reduce((acc, curr) => {
      if (acc.type === Tuple.Type.Point) pCount += 1;
      if (pCount === 2)
        throw new RayError('ray002', "Can't add point to point");
      acc.x += curr.x;
      acc.y += curr.y;
      acc.z += curr.z;
      acc.w += curr.w;
      return acc;
    });
    return new Tuple(
      Number(sum.x.toFixed(dPoints)),
      Number(sum.y.toFixed(dPoints)),
      Number(sum.z.toFixed(dPoints)),
      Number(sum.w.toFixed(dPoints)),
    );
  }

  /**
   *
   * @param  {...Tuple} tuples
   * @returns {Tuple}
   */
  static subtract(...tuples) {
    const diff = tuples.reduce((acc, curr) => {
      if (
        acc.type === Tuple.Type.Vector &&
        curr.type === Tuple.Type.Point
      )
        throw new RayError(
          'ray002',
          "Can't subtract a point from a vector",
        );
      acc.x -= curr.x;
      acc.y -= curr.y;
      acc.z -= curr.z;
      acc.w -= curr.w;
      return acc;
    });
    return new Tuple(
      Number(diff.x.toFixed(dPoints)),
      Number(diff.y.toFixed(dPoints)),
      Number(diff.z.toFixed(dPoints)),
      Number(diff.w.toFixed(dPoints)),
    );
  }

  /**
   *
   * @param {Tuple} a
   * @param {Tuple} b
   * @returns {Number}
   */
  static dotProduct(a, b) {
    if (a.type === Tuple.Type.Point || b.type === Tuple.Type.Point)
      throw new RayError(
        'ray002',
        "Can't calculate the dot product of two points. Use vectors instead.",
      );
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  /**
   *
   * @param {Tuple} a
   * @param {Tuple} b
   * @returns {Tuple}
   */
  static crossProduct(a, b) {
    if (a.type === Tuple.Type.Point || b.type === Tuple.Type.Point)
      throw new RayError(
        'ray002',
        "Can't calculate the cross product of two points. Use vectors instead.",
      );
    return new Tuple(
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x,
      Tuple.Type.Vector,
    );
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
    if (this.w === Tuple.Type.Point)
      throw new Error('Points have no magnitude. Use vector instead');
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
