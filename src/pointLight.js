const Color = require('./color');
const Tuple = require('./tuple');

/**
 * @class Pointlight
 */
class PointLight {
  /**
   *
   * @param {tuple} position
   * @param {color} intensity
   */
  constructor(
    position = Tuple.getVector(0, 0, 0),
    intensity = new Color(1, 1, 1),
  ) {
    this.position = position;
    this.intensity = intensity;
  }
}

module.exports = PointLight;
