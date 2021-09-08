const Camera = require('../src/camera');
const Color = require('../src/color');
const Matrix = require('../src/matrix');
const Tuple = require('../src/tuple');
const Utils = require('../src/utils');
const World = require('../src/world');

describe('Camera:', () => {
  test('Constructing a camera:', () => {
    const hsize = 160;
    const vsize = 120;
    const fov = Math.PI / 2;
    const c = new Camera(hsize, vsize, fov);
    expect(c.width).toEqual(hsize);
    expect(c.height).toEqual(vsize);
    expect(c.fov).toEqual(fov);
    expect(c.transform.equals(Matrix.identityMatrix())).toBe(true);
  });
  test('Pixel size for an horizontal canvas:', () => {
    const c = new Camera(200, 125, Math.PI / 2);
    expect(Utils.equal(c.pixelSize, 0.01)).toBe(true);
  });
  test('Pixel size for an vertical canvas:', () => {
    const c = new Camera(125, 200, Math.PI / 2);
    expect(Utils.equal(c.pixelSize, 0.01)).toBe(true);
  });
  describe('Casting rays from the camera', () => {
    test('Constructing a ray throught the centere of the canvas', () => {
      const c = new Camera(201, 101, Math.PI / 2);
      const r = c.rayPixel(100, 50);
      expect(r.origin).toEqual(Tuple.getPoint(0, 0, 0));
      expect(
        Tuple.compare(r.direction, Tuple.getVector(0, 0, -1)),
      ).toBe(true);
    });
    test('Constructing a ray throught a corner of the canvas', () => {
      const c = new Camera(201, 101, Math.PI / 2);
      const r = c.rayPixel(0, 0);
      expect(r.origin).toEqual(Tuple.getPoint(0, 0, 0));
      expect(
        Tuple.compare(
          r.direction,
          Tuple.getVector(0.66519, 0.33259, -0.66851),
        ),
      ).toBe(true);
    });
    test('Constructing a ray when the camera is transformed:', () => {
      const c = new Camera(201, 101, Math.PI / 2);
      c.transform = Matrix.rotateY(Math.PI / 4).multiply(
        Matrix.translation(0, -2, 5),
      );
      const r = c.rayPixel(100, 50);
      expect(r.origin).toEqual(Tuple.getPoint(0, 2, -5));
      expect(
        Tuple.compare(
          r.direction,
          Tuple.getVector(Math.sqrt(2) / 2, 0, -Math.sqrt(2) / 2),
        ),
      ).toBe(true);
    });
  });
  test('Rendering a world with a camera:', () => {
    const w = World.getDefault();
    const c = new Camera(11, 11, Math.PI / 2);
    const from = Tuple.getPoint(0, 0, -5);
    const to = Tuple.getPoint(0, 0, 0);
    const up = Tuple.getVector(0, 1, 0);
    c.transform = Matrix.viewTransform(from, to, up);
    const img = c.render(w);
    expect(
      img.pixelAt(5, 5).equal(new Color(0.38066, 0.47583, 0.2855)),
    ).toBe(true);
  });
});
