const Tuple = require('../src/tuple');
const Color = require('../src/color');
const Sphere = require('../src/shapes/sphere');
const PointLight = require('../src/pointLight');
const Matrix = require('../src/matrix');
const Camera = require('../src/camera');
const World = require('../src/world');
const Plane = require('../src/shapes/plane');

(function () {
  // scene objects
  // floor and walls
  const floor = new Plane();
  floor.material.color = new Color(1, 0.9, 0.9);
  floor.material.specular = 0;

  const backWall = new Plane();
  backWall.setTransform(
    Matrix.translation(0, 0, 2).multiply(Matrix.rotateX(Math.PI / 2)),
  );
  backWall.material.color = new Color(0.36, 0.54, 0.66);
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
  right.material.color = new Color(0.69, 0, 0.16);
  right.material.diffuse = 0.7;
  right.material.specular = 0.3;

  const left = new Sphere();
  left.transform = Matrix.translation(-1.5, 0.33, -0.75).multiply(
    Matrix.scaling(0.33, 0.33, 0.33),
  );
  left.material.color = new Color(0.67, 1, 0.5);
  left.material.diffuse = 0.7;
  left.material.specular = 0.3;

  // Light and Cam
  const pLight = new PointLight(
    Tuple.getPoint(-10, 10, -10),
    new Color(1, 1, 1),
  );

  const cam = new Camera(640, 360, Math.PI / 3);
  cam.transform = Matrix.viewTransform(
    Tuple.getPoint(0, 1.5, -5),
    Tuple.getPoint(0, 1, 0),
    Tuple.getVector(0, 1, 0),
  );

  const scene = new World(
    [floor, backWall, middle, right, left],
    pLight,
  );

  const cvs = cam.render(scene);
  cvs.writePPM('./imgs/ch09.ppm');
})();
