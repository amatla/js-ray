const Tuple = require('../src/tuple');

/**
 * @class ProjectileScene
 */
class ProjectileScene {
  /**
   *
   * @param {Tuple} position
   * @param {Tuple} velocity
   * @param {Tuple} gravity
   * @param {Tuple} wind
   */
  constructor(position, velocity, gravity, wind) {
    this.projectile = {
      position: position || Tuple.getPoint(0, 0, 0),
      velocity: velocity || Tuple.getVector(1, 1, 0).normalize(),
    };

    this.environment = {
      gravity: gravity || Tuple.getVector(0, -0.1, 0),
      wind: wind || Tuple.getVector(-0.01, 0, 0),
    };
  }

  /**
   *
   * @param {Tuple} position
   * @param {Tuple} velocity
   */
  setProjectile(position, velocity) {
    this.projectile.position = position;
    this.projectile.velocity = velocity;
  }

  /**
   *
   * @param {Tuple} gravity
   * @param {Tuple} wind
   */
  setEnvironment(gravity, wind) {
    this.gravity = gravity;
    this.wind = wind;
  }

  /**
   * Update the projectile position and velocity.
   * @returns {this}
   */
  update() {
    this.projectile.position = Tuple.add(
      this.projectile.position,
      this.projectile.velocity,
    );
    this.projectile.velocity = Tuple.add(
      this.projectile.velocity,
      this.environment.gravity,
      this.environment.wind,
    );
    return this;
  }
}

module.exports = ProjectileScene;
