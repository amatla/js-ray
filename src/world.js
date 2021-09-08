const Color = require('./color');
const PointLight = require('./pointLight');
const Sphere = require('./shapes/sphere');
const Tuple = require('./tuple');
const Matrix = require('./matrix');
const Ray = require('./ray');
const Intersection = require('./intersection');

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
      xs.push(...r.intersect(this.objects[i]));
    }
    return xs.sort((a, b) => a.t - b.t);
  }

  /**
   *
   * @param {Object} comps
   * @returns
   */
  shadeHit(comps) {
    return comps.object.material.lighting(
      this.light,
      comps.point,
      comps.eyeV,
      comps.normal,
    );
  }

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
}

const w = World.getDefault();
w.light = new PointLight(
  Tuple.getPoint(0, 0.25, 0),
  new Color(1, 1, 1),
);

module.exports = World;
