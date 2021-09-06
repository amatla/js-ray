const Material = require('../src/material');
const Color = require('../src/color');
const Tuple = require('../src/tuple');
const PointLight = require('../src/pointLight');

describe('Material:', () => {
  test('The default material:', () => {
    const m = new Material();
    expect(m.color).toEqual(new Color(1, 1, 1));
    expect(m.ambient).toBe(0.1);
    expect(m.diffuse).toBe(0.9);
    expect(m.specular).toBe(0.9);
    expect(m.shininess).toBe(200);
  });
  describe('Lighting:', () => {
    const m = new Material();
    const position = Tuple.getPoint(0, 0, 0);
    test('Lighting with eye between light and surface:', () => {
      const eye = Tuple.getVector(0, 0, -1);
      const normal = Tuple.getVector(0, 0, -1);
      const light = new PointLight(
        Tuple.getPoint(0, 0, -10),
        new Color(1, 1, 1),
      );
      const result = m.lighting(light, position, eye, normal);
      expect(result).toEqual(new Color(1.9, 1.9, 1.9));
    });
    test('Lighting with eye between light and surface, eye offset 45 degrees:', () => {
      const eye = Tuple.getVector(
        0,
        Math.sqrt(2) / 2,
        -Math.sqrt(2) / 2,
      );
      const normal = Tuple.getVector(0, 0, -1);
      const light = new PointLight(
        Tuple.getPoint(0, 0, -10),
        new Color(1, 1, 1),
      );
      const result = m.lighting(light, position, eye, normal);
      expect(result).toEqual(new Color(1, 1, 1));
    });
    test('Lighting with eye opposite surface, light offset 45 degrees:', () => {
      const eye = Tuple.getVector(0, 0, -1);
      const normal = Tuple.getVector(0, 0, -1);
      const light = new PointLight(
        Tuple.getPoint(0, 10, -10),
        new Color(1, 1, 1),
      );
      const result = m.lighting(light, position, eye, normal);
      expect(result.equal(new Color(0.7364, 0.7364, 0.7364))).toBe(
        true,
      );
    });
    test('Lighting with eye in the path of the reflection vector:', () => {
      const eye = Tuple.getVector(
        0,
        -Math.sqrt(2) / 2,
        -Math.sqrt(2) / 2,
      );
      const normal = Tuple.getVector(0, 0, -1);
      const light = new PointLight(
        Tuple.getPoint(0, 10, -10),
        new Color(1, 1, 1),
      );
      const result = m.lighting(light, position, eye, normal);
      expect(result.equal(new Color(1.6364, 1.6364, 1.6364))).toBe(
        true,
      );
    });
    test('Lighting with light behind the surface:', () => {
      const eye = Tuple.getVector(0, 0, -1);
      const normal = Tuple.getVector(0, 0, -1);
      const light = new PointLight(
        Tuple.getPoint(0, 0, 10),
        new Color(1, 1, 1),
      );
      const result = m.lighting(light, position, eye, normal);
      expect(result).toEqual(new Color(0.1, 0.1, 0.1));
    });
  });
});
