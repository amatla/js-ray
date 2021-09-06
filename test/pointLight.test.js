const PointLight = require('../src/pointLight');
const Color = require('../src/color');
const Tuple = require('../src/tuple');

describe('Point Light:', () => {
  test('A point light has a position and an intensity:', () => {
    const intensity = new Color(1, 1, 1);
    const position = Tuple.getPoint(0, 0, 0);
    const light = new PointLight(position, intensity);
    expect(light.position).toEqual(position);
    expect(light.intensity).toEqual(intensity);
  });
});
