const RayError = require('../errors');
const Tuple = require('../tuple');
const Shape = require('./shape');
const { EPSILON } = require('../constants');
const Intersection = require('../intersection');

class Plane extends Shape {
  localNormalAt(p) {
    if (!(p instanceof Tuple || !(p.type === Tuple.Type.Point)))
      throw new RayError('ray001', `${p} is not a point.`);

    return Tuple.getVector(0, 1, 0);
  }

  intersectLocal(ray) {
    if (Math.abs(ray.direction.y) < EPSILON) return [];
    const t = -ray.origin.y / ray.direction.y;
    return [new Intersection(t, this)];
  }
}

module.exports = Plane;
