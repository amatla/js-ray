const utils = require('./utils');
const RayError = require('./errors');

/**
 * @class Tuple
 */
class Tuple {
  /**
   * @constructor
   * @param {number} x
   * @param {number} x
   * @param {number} y
   * @param {number} w
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
   * @returns {object} - returns Tuple's type as a object
   */
  static get Type() {
    return { Point: 1.0, Vector: 0.0 };
  }

  /**
   * returns a new Point
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {tuple}
   */
  static getPoint(x = 0, y = 0, z = 0) {
    return new Tuple(x, y, z, 1.0);
  }

  /**
   * returns a new Vector
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {tuple}
   */
  static getVector(x = 0, y = 0, z = 0) {
    return new Tuple(x, y, z, 0.0);
  }

  /**
   * Compares two tuple and return true if they are of the same type and the values of each component are the same
   * @param {tuple|tuple[]} a
   * @param {tuple} [b]
   * @returns {boolean}
   */
  static compare(...tuples) {
    if (tuples.length === 1)
      throw new RayError(
        'ray002',
        'compare needs at least 2 Tuples as argument',
      );
    if (tuples.length === 2)
      return (
        tuples[0] instanceof Tuple &&
        tuples[1] instanceof Tuple &&
        tuples[0].type === tuples[1].type &&
        utils.equal(tuples[0].x, tuples[1].x) &&
        utils.equal(tuples[0].y, tuples[1].y) &&
        utils.equal(tuples[0].z, tuples[1].z)
      );

    const first = tuples.shift();
    return tuples.every(
      (tpl) =>
        first instanceof Tuple &&
        tpl instanceof Tuple &&
        first.type === tpl.type &&
        utils.equal(first.x, tpl.x) &&
        utils.equal(first.y, tpl.y) &&
        utils.equal(first.z, tpl.z),
    );
  }

  /**
   *
   * @param {tuple} tuple
   * @returns {tuple}
   */
  static copy(tuple) {
    if (!(tuple instanceof Tuple))
      throw RayError('ray001', `${tuple} must be a Tuple.`);
    return new Tuple(tuple.x, tuple.y, tuple.z, tuple.w);
  }

  /**
   *
   * @param {tuple} tpl
   * @returns {tuple}
   */
  add(tpl) {
    if (!(tpl instanceof Tuple))
      throw new RayError('ray001', `${tpl} is not a Tuple.`);
    if (
      this.type === Tuple.Type.Point &&
      tpl.type === Tuple.Type.Point
    )
      throw new RayError('ray002', "Can't add point to point");
    return new Tuple(
      this.x + tpl.x,
      this.y + tpl.y,
      this.z + tpl.z,
      this.w + tpl.w,
    );
  }

  /**
   *
   * @param  {tuple} tpl
   * @returns {Tuple}
   */
  subtract(tpl) {
    if (!(tpl instanceof Tuple))
      throw new RayError('ray001', `${tpl} is not a Tuple.`);
    if (
      this.type === Tuple.Type.Vector &&
      tpl.type === Tuple.Type.Point
    )
      throw new RayError(
        'ray002',
        "Can't subtract a point from a vector",
      );
    return new Tuple(
      this.x - tpl.x,
      this.y - tpl.y,
      this.z - tpl.z,
      this.w - tpl.w,
    );
  }

  /**
   *
   * @param {tuple} a
   * @param {tuple} b
   * @returns {number}
   */
  dotProduct(tpl) {
    if (!(tpl instanceof Tuple))
      throw new RayError('ray001', `${tpl} is not a tuple`);
    if (
      this.type === Tuple.Type.Point ||
      tpl.type === Tuple.Type.Point
    )
      throw new RayError(
        'ray002',
        "Can't calculate the dot product of two points. Use vectors instead.",
      );
    return this.x * tpl.x + this.y * tpl.y + this.z * tpl.z;
  }

  /**
   *
   * @param {tuple} a
   * @param {tuple} b
   * @returns {tuple}
   */
  crossProduct(tpl) {
    if (
      this.type === Tuple.Type.Point ||
      tpl.type === Tuple.Type.Point
    )
      throw new RayError(
        'ray002',
        "Can't calculate the cross product of two points. Use vectors instead.",
      );
    return new Tuple(
      this.y * tpl.z - this.z * tpl.y,
      this.z * tpl.x - this.x * tpl.z,
      this.x * tpl.y - this.y * tpl.x,
      Tuple.Type.Vector,
    );
  }

  /**
   * returns the Tuple's type as a number
   * @returns {number}
   */
  get type() {
    return this.w;
  }

  /**
   * returns the Tuple's type as a string
   * @returns {string}
   */
  typeToString() {
    return this.w === 1 ? 'Point' : 'Vector';
  }

  /**
   * @returns {tuple}
   */
  negate() {
    return new Tuple(-this.x, -this.y, -this.z, this.w);
  }

  /**
   *
   * @param {number} scalar
   * @returns {tuple}
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
   * @param {number} scalar
   * @returns {tuple}
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
   *@returns {number}
   */
  get magnitude() {
    if (this.w === Tuple.Type.Point)
      throw new Error('Points have no magnitude. Use vector instead');
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z,
    );
  }

  /**
   * @returns {number}
   */
  normalize() {
    const mag = this.magnitude;
    if (mag === 0) return new Tuple(0, 0, 0, this.w);
    return new Tuple(
      this.x / mag,
      this.y / mag,
      this.z / mag,
      this.w,
    );
  }
}

module.exports = Tuple;
