const Tuple = require('../src/tuple');
const Color = require('../src/color');
const Sphere = require('../src/shapes/sphere');
const PointLight = require('../src/pointLight');
const Matrix = require('../src/matrix');
const Camera = require('../src/camera');
const World = require('../src/world');

(function () {
  // scene objects
  // floor and walls
  const floor = new Sphere();
  floor.transform = Matrix.scaling(10, 0.01, 10);
  floor.material.color = new Color(1, 0.9, 0.9);
  floor.material.specular = 0;

  const wallLeft = new Sphere();
  wallLeft.transform = Matrix.translation(0, 0, 5).multiply(
    Matrix.rotateY(-Math.PI / 4).multiply(
      Matrix.rotateX(Math.PI / 2).multiply(
        Matrix.scaling(10, 0.01, 10),
      ),
    ),
  );
  wallLeft.material = floor.material;

  const wallRight = new Sphere();
  wallRight.transform = Matrix.translation(0, 0, 5).multiply(
    Matrix.rotateY(Math.PI / 4).multiply(
      Matrix.rotateX(Math.PI / 2).multiply(
        Matrix.scaling(10, 0.01, 10),
      ),
    ),
  );
  wallRight.material = floor.material;

  // Spheres
  const middle = new Sphere();
  middle.transform = Matrix.translation(-0.5, 1, 0.5);
  middle.material.color = new Color(0.1, 1, 0.5);
  middle.material.diffuse = 0.7;
  middle.material.specular = 0.3;

  const right = new Sphere();
  right.transform = Matrix.translation(1.5, 0.5, -0.5).multiply(
    Matrix.scaling(0.5, 0.5, 0.5),
  );
  right.material.color = new Color(0.5, 1, 0.1);
  right.material.diffuse = 0.7;
  right.material.specular = 0.3;

  const left = new Sphere();
  left.transform = Matrix.translation(-1.5, 0.33, -0.75).multiply(
    Matrix.scaling(0.33, 0.33, 0.33),
  );
  left.material.color = new Color(1, 0.8, 0.1);
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
    [floor, wallLeft, wallRight, middle, right, left],
    pLight,
  );

  const cvs = cam.render(scene);
  cvs.writePPM('./imgs/ch08.ppm');
})();
