const Color = require('./color');
const Tuple = require('./tuple');
const PointLight = require('./pointLight');
/**
 * @class Material
 */
class Material {
  /**
   *
   * @param {Color} color
   * @param {Number} ambient
   * @param {Number} diffuse
   * @param {Number} specular
   * @param {Number} shininess
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

  /**
   *
   * @param {PointLight} light
   * @param {Tuple} point
   * @param {Tuple} eye
   * @param {Tuple} normal
   * @returns {Color}
   */
  lighting(light, point, eye, normal) {
    // combine surface color with the light's color/intensity
    const effectiveColor = this.color.multiply(light.intensity);

    // find the direction to the light source
    const lightV = light.position.subtract(point).normalize();

    // compute the ambient contribution
    const ambient = effectiveColor.multiply(this.ambient);

    // lightNDot represents the cosine of the angle between the
    // light vector and the normal vector. A negative number means the
    // light is on the other side of the surface.
    const lightNDot = lightV.dotProduct(normal);
    let diffuse = new Color();
    let specular = new Color();
    if (lightNDot < 0) {
      diffuse = Color.BLACK;
      specular = Color.BLACK;
    } else {
      // compute diffuse contribution
      diffuse = effectiveColor.multiply(this.diffuse * lightNDot);

      // reflectDEye represents the cosine of the angle between the
      // reflection vector and the eye vector. A negative number means the
      // light reflects away from the eye
      const reflectV = lightV.negate().reflect(normal);
      const reflectDEye = reflectV.dotProduct(eye);
      if (reflectDEye < 0) specular = Color.BLACK;
      else {
        // compute specular contribution
        const factor = reflectDEye ** this.shininess;
        specular = light.intensity.multiply(this.specular * factor);
      }
    }
    return ambient.add(diffuse).add(specular);
  }
}

module.exports = Material;
