const Color = require('./color');

/**
 * @class Material
 */
class Material {
  /**
   *
   * @param {color} color
   * @param {number} ambient
   * @param {number} diffuse
   * @param {number} specular
   * @param {number} shininess
   */
  constructor(
    color = new Color(1, 1, 1),
    ambient = 0.1,
    diffuse = 0.9,
    specular = 0.9,
    shininess = 200,
  ) {
    this.color = color;
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
    this.shininess = shininess;
  }

  lighting(material, light, point, eye, normal) {
    // combine surface color with the light's color/intensity
    const effectiveColor = this.color. * light.intensity;

    // find the direction to the light source
    const lightV = light.position.subtract(point).normalize();

    // compute the ambient contribution
    const ambient = effectiveColor
  }
}

module.exports = Material;
