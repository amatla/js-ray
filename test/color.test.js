const RayError = require('../src/errors');
const Color = require('../src/color');

describe('Color:', () => {
  test('Creation:', () => {
    const c = new Color(-0.5, 0.4, 1.7);
    expect(c.red).toBe(-0.5);
    expect(c.green).toBe(0.4);
    expect(c.blue).toBe(1.7);
  });

  test('Adding colors:', () => {
    const c1 = new Color(0.9, 0.6, 0.75);
    const c2 = new Color(0.7, 0.1, 0.25);
    expect(Color.add(c1, c2)).toEqual(new Color(1.6, 0.7, 1.0));
  });
  test('Subtracting colors:', () => {
    const c1 = new Color(0.9, 0.6, 0.75);
    const c2 = new Color(0.7, 0.1, 0.25);
    expect(Color.subtract(c1, c2)).toEqual(new Color(0.2, 0.5, 0.5));
  });
});
