const ProjectileScene = require('./projectileScene');
const Tuple = require('../src/tuple');

(function () {
  let ticks = 0;
  const scene = new ProjectileScene();

  scene.setProjectile(
    Tuple.getPoint(0, 1, 0),
    Tuple.getVector(1, 1, 0).normalize(),
  );

  scene.setEnvironment(
    Tuple.getVector(0, -0.1, 0),
    Tuple.getVector(-0.01, 0, 0),
  );

  while (scene.projectile.position.y > 0) {
    console.log(
      `tick ${ticks}: (x=${scene.projectile.position.x}, y=${scene.projectile.position.y})`,
    );
    scene.update();
    ticks += 1;
  }
})();
