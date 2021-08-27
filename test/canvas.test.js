const Canvas = require('../src/canvas');
const Color = require('../src/color');

describe('Canvas:', () => {
  test('Creation:', () => {
    const c = new Canvas(10, 20);
    expect(c.width).toBe(10);
    expect(c.heigth).toBe(20);
    for (let x = 0; x < c.heigth; x += 1) {
      for (let y = 0; y < c.width; y += 1) {
        expect(c.pixels[x][y]).toEqual(Color.BLACK);
      }
    }
  });
  test('Writing a pixel', () => {
    const c = new Canvas(10, 20);
    const red = new Color(1, 0, 0);
    c.writePixel(2, 3, red);
    expect(c.pixelAt(2, 3)).toEqual(new Color(1, 0, 0));
  });
});
