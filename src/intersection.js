const { EPSILON } = require('./constants');
const RayError = require('./errors');
const Sphere = require('./shapes/sphere');

class Intersection {
  /**
   *
   * @param {Number} t
   * @param {Shape} obj
   */
  constructor(t = 0, obj = new Sphere()) {
    this.t = t;
    this.object = obj;
  }

  /**
   *
   * @param {Intersection[]} intersections
   * @returns {Instrsection|null}
   */
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

  static computations(i, r) {
    const comps = {};
    comps.t = i.t;
    comps.object = i.object;
    comps.point = r.position(comps.t);
    comps.eyeV = r.direction.negate();
    comps.normal = comps.object.normalAt(comps.point);
    if (comps.normal.dotProduct(comps.eyeV) < 0) {
      comps.inside = true;
      comps.normal = comps.normal.negate();
    } else comps.inside = false;
    const offset = comps.normal.multiply(EPSILON);
    comps.overPoint = comps.point.add(offset);
    return comps;
  }
}

module.exports = Intersection;
