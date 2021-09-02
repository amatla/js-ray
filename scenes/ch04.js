const Canvas = require('../src/canvas');
const Tuple = require('../src/tuple');
const Matrix = require('../src/matrix');
const Color = require('../src/color');

(function () {
  const cvs = new Canvas(400, 400);
  const col = new Color(1, 1, 1);
  const center = Tuple.getPoint(
    Math.round(cvs.width / 2),
    0,
    Math.round(cvs.heigth / 2),
  );
  // we are rotating around Y axis
  // we create a vector that moves one unit in +Z direction, where 12 o'clock is
  const start = Tuple.getVector(0, 0, 1);
  // length of the clock arm
  const armLength = 150;

  // draw center
  cvs.writePixel(center.x, center.z, col);

  // draw the hours
  for (let i = 0; i < 12; i += 1) {
    let pixel = start;
    const rot = Matrix.rotateY(i * (Math.PI / 6));
    pixel = rot.multiply(pixel);
    // add the rotated vector (multiplied by the arm length) to the center point
    // to move it in the right direction of armLength amount.
    pixel = Tuple.add(pixel.multiply(armLength), center);
    cvs.writePixel(Math.round(pixel.x), Math.round(pixel.z), col);
  }
  cvs.writePPM('./imgs/ch04.ppm');
})();
