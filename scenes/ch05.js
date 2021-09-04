const Canvas = require('../src/canvas');
const Tuple = require('../src/tuple');
const Color = require('../src/color');
const Ray = require('../src/ray');
const Sphere = require('../src/shapes/sphere');
const Intersection = require('../src/intersection');
// const Matrix = require('../src/matrix');

(function () {
  const rayOrigin = Tuple.getPoint(0, 0, -5);
  const cameraZ = 10;
  const cvsSize = 100;
  const cameraSize = 7;
  const pixelSize = cameraSize / cvsSize;
  const cvs = new Canvas(cvsSize, cvsSize);
  const s = new Sphere();
  const col = new Color(1, 0, 0);
  // s.setTransform(Matrix.scaling(0.5, 0.5, 0.5));
  // s.setTransform(Matrix.translation(0, 1, 0));

  for (let y = 0; y < cvsSize; y += 1) {
    for (let x = 0; x < cvsSize; x += 1) {
      // todo
      const cameraX = -cameraSize / 2 + x * pixelSize;
      const cameraY = cameraSize / 2 - y * pixelSize;
      const cameraPosition = Tuple.getPoint(
        cameraX,
        cameraY,
        cameraZ,
      );
      const r = new Ray(
        rayOrigin,
        cameraPosition.subtract(rayOrigin).normalize(),
      );
      const xs = r.intersect(s);
      if (Intersection.hit(xs)) cvs.writePixel(x, y, col);
    }
  }
  cvs.writePPM('./imgs/ch05.ppm');
})();
