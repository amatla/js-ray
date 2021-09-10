const Color = require('./color');
const PointLight = require('./pointLight');
const Sphere = require('./shapes/sphere');
const Tuple = require('./tuple');
const Matrix = require('./matrix');
const Intersection = require('./intersection');
const Ray = require('./ray');

class World {
  constructor(objects = [], light = null) {
    this.objects = objects;
    this.light = light;
  }

  /**
   *
   * @param {Ray} r
   * @returns {Intersection[]}
   */
  intersect(r) {
    const xs = [];
    for (let i = 0, n = this.objects.length; i < n; i += 1) {
      xs.push(...this.objects[i].intersect(r));
    }
    return xs.sort((a, b) => a.t - b.t);
  }

  /**
   *
   * @param {Object} comps
   * @returns
   */
  shadeHit(comps) {
    let isShadow = false;
    if (this.isShadowed(comps.overPoint)) isShadow = true;
    return comps.object.material.lighting(
      this.light,
      comps.overPoint,
      comps.eyeV,
      comps.normal,
      isShadow,
    );
  }

  /**
   *
   * @param {Ray} r
   * @returns
   */
  colorAt(r) {
    const xs = this.intersect(r);
    const hit = Intersection.hit(xs);
    if (hit === null) return new Color(0, 0, 0);
    const comps = Intersection.computations(hit, r);
    return this.shadeHit(comps);
  }

  /**
   *
   * @returns {World}
   */
  static getDefault() {
    const s1 = new Sphere();
    s1.material.color = new Color(0.8, 1.0, 0.6);
    s1.material.diffuse = 0.7;
    s1.material.specular = 0.2;
    const s2 = new Sphere();
    s2.setTransform(Matrix.scaling(0.5, 0.5, 0.5));
    const pLight = new PointLight(
      Tuple.getPoint(-10, 10, -10),
      new Color(1, 1, 1),
    );
    return new World([s1, s2], pLight);
  }

  /**
   *
   * @param {Tuple} p
   * @returns {Boolean}
   */
  isShadowed(p) {
    const distance = this.light.position.subtract(p);
    const r = new Ray(p, distance.normalize());
    const xs = this.intersect(r);
    const hit = Intersection.hit(xs);
    if (hit && hit.t < distance.magnitude) return true;
    return false;
  }
}

module.exports = World;
