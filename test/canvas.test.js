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
  test('PPM header', () => {
    const c = new Canvas(5, 3);
    const header = c.toPPM().split('\n');
    expect(header[0]).toBe('P3');
    expect(header[1]).toBe('5 3');
    expect(header[2]).toBe('255');
  });
  test('PPM pixel data:', () => {
    const c = new Canvas(5, 3);
    const c1 = new Color(1.5, 0, 0);
    const c2 = new Color(0, 0.5, 0);
    const c3 = new Color(-0.5, 0, 1);
    c.writePixel(0, 0, c1);
    c.writePixel(2, 1, c2);
    c.writePixel(4, 2, c3);
    const pixels = c.ppmPixelData;
    expect(pixels[0]).toBe('255 0 0 0 0 0 0 0 0 0 0 0 0 0 0');
    expect(pixels[1]).toBe('0 0 0 0 0 0 0 128 0 0 0 0 0 0 0');
    expect(pixels[2]).toBe('0 0 0 0 0 0 0 0 0 0 0 0 0 0 255');
  });
});
