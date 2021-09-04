const RayError = require('./errors');
const Tuple = require('./tuple');
const Intersection = require('./intersection');

class Ray {
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

  position(t = 0) {
    return this.origin.add(this.direction.multiply(t));
  }

  intersect(s) {
    const sToRay = this.origin.subtract(s.origin);
    const a = this.direction.dotProduct(this.direction);
    const b = 2 * this.direction.dotProduct(sToRay);
    const c = sToRay.dotProduct(sToRay) - 1;
    const disc = b ** 2 - 4 * a * c;
    if (disc < 0) return [];
    const t1 = (-b - Math.sqrt(disc)) / (2 * a);
    const t2 = (-b + Math.sqrt(disc)) / (2 * a);
    return [new Intersection(t1, s), new Intersection(t2, s)];
  }
}

module.exports = Ray;
