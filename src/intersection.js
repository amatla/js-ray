const RayError = require('./errors');
const Sphere = require('./shapes/sphere');

class Intersection {
  constructor(t = 0, obj = new Sphere()) {
    this.t = t;
    this.object = obj;
  }

  static hit(intersections) {
    if (!(intersections instanceof Array))
      throw new RayError(
        'ray001',
        `${intersections} is not an array.`,
      );
    intersections.sort((a, b) => {
      if (
        !(a instanceof Intersection) ||
        !(b instanceof Intersection)
      )
        throw new RayError(
          'ray001',
          `Some elements in ${intersections} are int of type Intersection`,
        );
      return a.t - b.t;
    });
    for (let i = 0, n = intersections.length; i < n; i += 1) {
      if (intersections[i].t > 0) return intersections[i];
    }
    return null;
  }
}

module.exports = Intersection;
