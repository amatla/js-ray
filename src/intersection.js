const Sphere = require('./shapes/sphere');

class Intersection {
  constructor(t = 0, obj = new Sphere()) {
    this.t = t;
    this.object = obj;
  }
}

module.exports = Intersection;
