const utils = require('./utils');
/**
 * @class Tuple
 */
class Tuple {
  static get Type() {
    return { Point: 1.0, Vector: 0.0 };
  }

  /**
   *
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

  static compare(a, b) {
    return (
      typeof a === typeof b &&
      utils.equal(a.x, b.x) &&
      utils.equal(a.y, b.y) &&
      utils.equal(a.z, b.z) &&
      a.type === b.type
    );
  }

  /**
   * returns the tuple's type
   * @returns {String}
   */

  get type() {
    return this.w;
  }

  typeToString() {
    return this.w === 1 ? 'Point' : 'Vector';
  }
}
const t = Tuple.getPoint();
console.log(t.typeToString());
module.exports = Tuple;
