const { v4: uuidv4 } = require('uuid');
const RayError = require('../errors');
const Matrix = require('../matrix');
const Tuple = require('../tuple');

class Sphere {
  constructor(origin = Tuple.getPoint(0, 0, 0), radius = 1) {
    this.uuid = uuidv4();
    this.origin = origin;
    this.radius = radius;
    this.transform = Matrix.identityMatrix();
  }

  setTransform(mtx) {
    if (!(mtx instanceof Matrix))
      throw new RayError('ray001', `${mtx} is not of type Matrix.`);
    this.transform = mtx.multiply(this.transform);
  }
}

module.exports = Sphere;
