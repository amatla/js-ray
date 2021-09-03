const RayError = require('./errors');
const Tuple = require('./tuple');

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
    return Tuple.add(this.origin, this.direction.multiply(t));
  }
}

module.exports = Ray;
