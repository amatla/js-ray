const utils = require('../src/utils');
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
    expect(c1.add(c2)).toEqual(new Color(1.6, 0.7, 1.0));
  });
  test('Subtracting colors:', () => {
    const c1 = new Color(0.9, 0.6, 0.75);
    const c2 = new Color(0.7, 0.1, 0.25);
    expect(c1.subtract(c2).equal(new Color(0.2, 0.5, 0.5))).toBe(
      true,
    );
  });
  test('Multiplying colors', () => {
    const c1 = new Color(1, 0.2, 0.4);
    const c2 = new Color(0.9, 1, 0.1);
    expect(c1.multiply(c2).equal(new Color(0.9, 0.2, 0.04))).toBe(
      true,
    );
  });
  test('Mulyplying a color by a scalar:', () => {
    const c = new Color(0.2, 0.3, 0.4);
    const num = 2.2;
    expect(c.multiply(num).equal(new Color(0.44, 0.66, 0.88))).toBe(
      true,
    );
  });
});
