const Tuple = require('../tuple');
const Shape = require('./shape');

/**
 * Mock class to test the Shape abstract class.
 * @class TestShape
 */
class TestShape extends Shape {
  constructor() {
    super();
    this.type = 'TestShape';
  }

  /**
   *
   * @param {Ray} localRay
   */
  intersectLocal(localRay) {
    this.savedRay = localRay;
  }

  /**
   *
   * @param {Tuple} localPt
   * @returns {Tuple}
   */
  localNormalAt(localPt) {
    return Tuple.getVector(localPt.x, localPt.y, localPt.z);
  }
}

module.exports = TestShape;
