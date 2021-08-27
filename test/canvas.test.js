const Canvas = require('../src/canvas');
const Color = require('../src/color');

describe('Canvas:', () => {
  test('Creation:', () => {
    const c = new Canvas(10, 20);
    expect(c.width).toBe(10);
    expect(c.heigth).toBe(20);
    for (let y = 0; y < c.heigth; y += 1) {
      for (let x = 0; x < c.width; x += 1) {
        expect(c.pixels[(x, y)]).toEqual(Color.BLACK);
      }
    }
  });
});
