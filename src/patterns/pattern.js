const Matrix = require('../matrix');
const RayError = require('../errors');
const Tuple = require('../tuple');

class Pattern {
  constructor() {
    this.transform = Matrix.identityMatrix();
    if (this.constructor === Pattern)
      throw new Error('Abstract classes cannot be instantiated');
  }

  /**
   *
   * @param {Matrix} mtx
   */
  setTransform(mtx) {
    if (!(mtx instanceof Matrix))
      throw new RayError('ray001', `${mtx} is not of type Matrix.`);
    this.transform = this.transform.multiply(mtx);
  }

  /**
   *
   * @param {Shape} shape
   * @param {Tuple} point
   * @returns
   */
  patternAtShape(shape, point) {
    let localPoint = shape.transform.inverse().multiply(point);
    localPoint = this.transform.inverse().multiply(localPoint);
    return this.patternAt(localPoint);
  }

  /**
   *
   * @param {Tuple} point
   * @returns {Color} - the color at the point.
   */
  patternAt(point = Tuple.getPoint(0, 0, 0)) {
    throw new Error(
      `Method "pattern at (${point})" must be implemented.`,
    );
  }
}

module.exports = Pattern;
