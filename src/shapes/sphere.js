const Shape = require('./shape');
const RayError = require('../errors');
const Tuple = require('../tuple');
const Intersection = require('../intersection');

/**
 *
 * @class Sphere
 */
class Sphere extends Shape {
  /**
   *
   * @param {Tuple} origin
   * @param {Number} radius
   */
  constructor(origin = Tuple.getPoint(0, 0, 0), radius = 1) {
    super();
    this.origin = origin;
    this.radius = radius;
  }

  /**
   *
   * @param {Tuple} p
   * @returns {Tuple}
   */
  localNormalAt(p) {
    if (!(p instanceof Tuple || !(p.type === Tuple.Type.Point)))
      throw new RayError('ray001', `${p} is not a point.`);
    const objN = p.subtract(this.origin);
    return objN;
  }

  /**
   *
   * @param {Ray} ray - ray in object space
   * @returns {Intersection[]|[]}
   */
  intersectLocal(ray) {
    const sToRay = ray.origin.subtract(this.origin);
    const a = ray.direction.dotProduct(ray.direction);
    const b = 2 * ray.direction.dotProduct(sToRay);
    const c = sToRay.dotProduct(sToRay) - 1;
    const disc = b ** 2 - 4 * a * c;
    if (disc < 0) return [];
    const t1 = (-b - Math.sqrt(disc)) / (2 * a);
    const t2 = (-b + Math.sqrt(disc)) / (2 * a);
    return [new Intersection(t1, this), new Intersection(t2, this)];
  }
}

module.exports = Sphere;
