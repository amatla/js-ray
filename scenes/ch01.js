const Tuple = require('../src/tuple');

(function () {
  class Projectile {
    constructor(
      position = Tuple.getPoint(0, 0, 0),
      velocity = Tuple.getVector(1, 1, 0).normalize(),
    ) {
      this.position = position;
      this.velocity = velocity;
    }
  }

  const environment = {
    gravity: Tuple.getVector(0, -0.1, 0),
    wind: Tuple.getVector(-0.01, 0, 0),
  };

  function tick(env, proj) {
    const postion = Tuple.add(proj.position, proj.velocity);
    const velocity = Tuple.add(
      Tuple.add(proj.velocity, env.gravity),
      env.wind,
    );
    return new Projectile(postion, velocity);
  }

  let p = new Projectile(
    Tuple.getPoint(0, 1, 0),
    Tuple.getVector(1, 1, 0).normalize(),
  );

  let ticks = 0;

  while (p.position.y > 0) {
    console.log(
      `tick ${ticks}: (x = ${p.position.x}, y = ${p.position.y})`,
    );
    p = tick(environment, p);
    ticks += 1;
  }
})();
