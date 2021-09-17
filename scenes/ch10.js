const Tuple = require('../src/tuple');
const Color = require('../src/color');
const Sphere = require('../src/shapes/sphere');
const PointLight = require('../src/pointLight');
const Matrix = require('../src/matrix');
const Camera = require('../src/camera');
const World = require('../src/world');
const Plane = require('../src/shapes/plane');
const StripePattern = require('../src/patterns/stripe');
const Gradient = require('../src/patterns/gradient');

(function () {
  // scene objects
  // floor and walls
  const floor = new Plane();
  floor.material.pattern = new StripePattern(
    new Color(0.67, 0.15, 0.31),
    new Color(0.94, 0.97, 1),
  );
  floor.material.specular = 0;

  const backWall = new Plane();
  backWall.setTransform(
    Matrix.translation(0, 0, 3).multiply(Matrix.rotateX(Math.PI / 2)),
  );
  backWall.material.pattern = new StripePattern(
    new Color(0.67, 0.15, 0.31),
    new Color(0.94, 0.97, 1),
  );
  backWall.material.specular = 0;

  // Spheres
  const middle = new Sphere();
  middle.transform = Matrix.translation(-0.5, 1, 0.5);
  middle.material.color = new Color(1, 0.75, 0);
  middle.material.diffuse = 0.7;
  middle.material.specular = 0.3;

  const right = new Sphere();
  right.transform = Matrix.translation(1.5, 0.5, -0.5).multiply(
    Matrix.scaling(0.5, 0.5, 0.5),
  );
  right.material.pattern = new Gradient(
    new Color(0.8, 0.13, 0.18),
    new Color(0.52, 0.87, 0.01),
  );
  right.material.pattern.setTransform(Matrix.scaling(0.6, 0.6, 0.6));
  right.material.pattern.setTransform(Matrix.rotateZ(Math.PI / 2));

  const left = new Sphere();
  left.transform = Matrix.translation(-1.5, 0.33, -0.75).multiply(
    Matrix.scaling(0.33, 0.33, 0.33),
  );
  left.material.pattern = new StripePattern(
    new Color(0.67, 0.15, 0.31),
    new Color(0.94, 0.97, 1),
  );
  left.material.pattern.setTransform(Matrix.scaling(0.2, 0.2, 0.2));

  // Light and Cam
  const pLight = new PointLight(
    Tuple.getPoint(-10, 10, -10),
    new Color(1, 1, 1),
  );

  const cam = new Camera(600, 340, Math.PI / 3);
  cam.transform = Matrix.viewTransform(
    Tuple.getPoint(-3, 1.5, -5),
    Tuple.getPoint(0, 1, 0),
    Tuple.getVector(0, 1, 0),
  );

  const scene = new World(
    [floor, backWall, middle, right, left],
    pLight,
  );

  const cvs = cam.render(scene);
  cvs.writePPM('./imgs/ch10.ppm');
})();
