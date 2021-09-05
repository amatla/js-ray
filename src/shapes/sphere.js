const { v4: uuidv4 } = require('uuid');
const RayError = require('../errors');
const Matrix = require('../matrix');
const Tuple = require('../tuple');

class Sphere {
  /**
   *
   * @param {tuple} origin
   * @param {number} radius
   */
  constructor(origin = Tuple.getPoint(0, 0, 0), radius = 1) {
    this.uuid = uuidv4();
    this.origin = origin;
    this.radius = radius;
    this.transform = Matrix.identityMatrix();
  }

  /**
   *
   * @param {matrix} mtx
   */
  setTransform(mtx) {
    if (!(mtx instanceof Matrix))
      throw new RayError('ray001', `${mtx} is not of type Matrix.`);
    this.transform = this.transform.multiply(mtx);
  }

  /**
   *
   * @param {tuple} p
   * @returns {tuple}
   */
  normalAt(p) {
    if (!(p instanceof Tuple || !(p.type === Tuple.Type.Point)))
      throw new RayError('ray001', `${p} is not a point.`);
    console.log(p);
    // transform point to obj coordinates
    const objP = this.transform.inverse().multiply(p);
    // calculate the normal in object space
    const objN = objP.subtract(this.origin);
    // calculate the normal in world space
    const worldN = this.transform
      .inverse()
      .transpose()
      .multiply(objN);
    worldN.w = 0;
    return worldN.normalize();
  }
}

module.exports = Sphere;
