const Tuple = require('../src/tuple');
const Color = require('../src/color');
const Canvas = require('../src/canvas');
const ProjectileScene = require('./projectileScene');

(function () {
  const scene = new ProjectileScene();
  const cvs = new Canvas(900, 550);

  scene.setProjectile(
    Tuple.getPoint(0, 1, 0),
    Tuple.getVector(1, 1.8, 0).normalize().multiply(11.25),
  );
  console.log(scene.projectile.velocity);
  scene.setEnvironment(
    Tuple.getVector(0, -0.1, 0),
    Tuple.getVector(-0.01, 0, 0),
  );

  let ticks = 0;
  const clr = new Color(1, 0, 0);
  while (scene.projectile.position.y > 0) {
    console.log(
      `tick ${ticks}: (x=${scene.projectile.position.x}, y=${scene.projectile.position.y})`,
    );
    cvs.writePixel(
      Math.round(scene.projectile.position.x),
      Math.round(cvs.heigth - scene.projectile.position.y),
      clr,
    );
    scene.update();
    ticks += 1;
  }
  cvs.writePPM('./imgs/ch02.ppm');
})();
