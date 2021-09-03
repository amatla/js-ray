const { v4: uuidv4 } = require('uuid');
const Tuple = require('../tuple');

class Sphere {
  constructor(origin = Tuple.getPoint(0, 0, 0), radius = 1) {
    this.uuid = uuidv4();
    this.origin = origin;
    this.radius = radius;
  }
}

module.exports = Sphere;
