const Canvas = require('../src/canvas');
const Tuple = require('../src/tuple');
const Color = require('../src/color');
const Ray = require('../src/ray');
const Sphere = require('../src/shapes/sphere');
const Material = require('../src/material');
const Intersection = require('../src/intersection');
const PointLight = require('../src/pointLight');
// const Matrix = require('../src/matrix');

(function () {
  const rayOrigin = Tuple.getPoint(0, 0, -5);
  const cameraZ = 10;
  const cvsSize = 100;
  const cameraSize = 7;
  const pixelSize = cameraSize / cvsSize;
  const cvs = new Canvas(cvsSize, cvsSize);
  const s = new Sphere();
  const pLight = new PointLight(
    Tuple.getPoint(-10, 10, -10),
    new Color(1, 1, 1),
  );
  // s.setTransform(Matrix.scaling(0.5, 0.5, 0.5));
  // s.setTransform(Matrix.translation(0, 1, 0));

  s.material = new Material();
  s.material.color = new Color(1, 0.2, 1);
  for (let y = 0; y < cvsSize; y += 1) {
    for (let x = 0; x < cvsSize; x += 1) {
      // todo
      const cameraX = -cameraSize / 2 + x * pixelSize;
      const cameraY = cameraSize / 2 - y * pixelSize;
      const pixelPosition = Tuple.getPoint(cameraX, cameraY, cameraZ);
      const r = new Ray(
        rayOrigin,
        pixelPosition.subtract(rayOrigin).normalize(),
      );
      const xs = s.intersect(r);
      const hit = Intersection.hit(xs);
      if (hit) {
        const hitPosition = r.position(hit.t);
        const normal = hit.object.normalAt(hitPosition);
        const eye = r.direction.negate();
        const col = hit.object.material.lighting(
          pLight,
          hitPosition,
          eye,
          normal,
        );
        cvs.writePixel(x, y, col);
      }
    }
  }
  cvs.writePPM('./imgs/ch06.ppm');
})();
