const RayError = require('./errors');
const Tuple = require('./tuple');
const Matrix = require('./matrix');

class Ray {
  /**
   *
   * @param {Tuple} origin
   * @param {Tuple} direction
   */
  constructor(
    origin = Tuple.getPoint(0, 0, 0),
    direction = Tuple.getVector(1, 1, 0),
  ) {
    if (
      !(origin instanceof Tuple) ||
      !(origin.type === Tuple.Type.Point)
    )
      throw new RayError('ray001', 'origin must be a point.');
    if (
      !(direction instanceof Tuple) ||
      !(direction.type === Tuple.Type.Vector)
    )
      throw new RayError('ray001', 'direction must be a vector.');
    this.origin = origin;
    this.direction = direction;
  }

  /**
   *
   * @param {Number} t
   * @returns {Tuple}
   */
  position(t) {
    return this.origin.add(this.direction.multiply(t));
  }

  /**
   *
   * @param {Shape} s
   * @returns {Intersection[]|[]}
   */
  // intersect(s) {
  //   const rt = this.transform(s.transform.inverse());
  //   const sToRay = rt.origin.subtract(s.origin);
  //   const a = rt.direction.dotProduct(rt.direction);
  //   const b = 2 * rt.direction.dotProduct(sToRay);
  //   const c = sToRay.dotProduct(sToRay) - 1;
  //   const disc = b ** 2 - 4 * a * c;
  //   if (disc < 0) return [];
  //   const t1 = (-b - Math.sqrt(disc)) / (2 * a);
  //   const t2 = (-b + Math.sqrt(disc)) / (2 * a);
  //   return [new Intersection(t1, s), new Intersection(t2, s)];
  // }

  /**
   *
   * @param {Matrix} mtx
   * @returns
   */
  transform(mtx) {
    if (!(mtx instanceof Matrix))
      throw new RayError('ray001', `${mtx} is not of type Matrix.`);
    return new Ray(
      mtx.multiply(this.origin),
      mtx.multiply(this.direction),
    );
  }
}

module.exports = Ray;
