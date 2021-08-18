/**
 * @class Tuple
 */
class Tuple {
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
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @returns {Tuple}
   */

  static point(x = 0, y = 0, z = 0) {
    return new Tuple(x, y, z, 1.0);
  }

  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @returns {Tuple}
   */

  static vector(x = 0, y = 0, z = 0) {
    return new Tuple(x, y, z, 0.0);
  }

  /**
   * @returns {String}
   */

  get type() {
    return this.w === 1.0 ? 'point' : 'vector';
  }
}

module.exports = Tuple;
