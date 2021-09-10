const Matrix = require('../matrix');
const Material = require('../material');
const RayError = require('../errors');

/**
 * Abstract Class Shape
 *
 * @class Shape
 */
class Shape {
  /**
   *
   * @param {Material} material
   */
  constructor(material = new Material()) {
    this.material = material;
    this.transform = Matrix.identityMatrix();
    if (this.constructor === Shape)
      throw new Error('Abstract classes cannot be instantiated.');
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
   * @param {Ray} ray
   * @returns{Intersection[]|[]}
   */
  intersect(ray) {
    const localRay = ray.transform(this.transform.inverse());
    return this.intersectLocal(localRay);
  }

  /**
   *
   * @param {Ray} localRay
   */
  intersectLocal(localRay) {
    throw new Error(
      `Method "intersectLocal(${localRay})" must be implemented.`,
    );
  }

  /**
   *
   * @param {Tuple} pt
   * @returns {Tuple} - the normalized normal at point pt.
   */
  normalAt(pt) {
    // transform point to obj coordinates
    const localPt = this.transform.inverse().multiply(pt);
    // calculate the normal in object space
    const localN = this.localNormalAt(localPt);
    // calculate the normal in world space
    const worldN = this.transform
      .inverse()
      .transpose()
      .multiply(localN);
    worldN.w = 0;
    return worldN.normalize();
  }

  /**
   *
   * @param {Tuple} localPt
   */
  localNormalAt(localPt) {
    throw new Error(
      `Method "intersectLocal(${localPt})" must be implemented.`,
    );
  }
}

module.exports = Shape;
