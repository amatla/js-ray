const Ray = require('./ray');
const Matrix = require('./matrix');
const Tuple = require('./tuple');
const Canvas = require('./canvas');

/**
 * @class Camera
 */
class Camera {
  /**
   *
   * @param {Number} width
   * @param {Number} height
   * @param {Number} fov - field of view in radians
   */
  constructor(width, height, fov) {
    this.width = width;
    this.height = height;
    this.fov = fov;
    this.transform = Matrix.identityMatrix();
    this.pixelSize = this.setPixelSize();
  }

  /**
   *
   * @returns {Number}
   */
  setPixelSize() {
    const halfView = Math.tan(this.fov / 2);
    const aspectRatio = this.width / this.height;
    if (aspectRatio >= 1) {
      this.halfWidth = halfView;
      this.halfHeight = this.halfWidth / aspectRatio;
    } else {
      this.halfWidth = halfView * aspectRatio;
      this.halfHeight = halfView;
    }
    return (this.halfWidth * 2) / this.width;
  }

  /**
   *
   * @param {Number} px - pixel x coordinate
   * @param {Number} py - pixel y coordinate
   * @returns {Ray}
   */
  rayPixel(px, py) {
    // offset from edge of the canvas to the pixel center
    const xOffset = (px + 0.5) * this.pixelSize;
    const yOffset = (py + 0.5) * this.pixelSize;

    // pixel coordinates in world space
    const worldX = this.halfWidth - xOffset;
    const worldY = this.halfHeight - yOffset;

    // transform pixel coordinates and ray origin in camera space
    const pixel = this.transform
      .inverse()
      .multiply(Tuple.getPoint(worldX, worldY, -1));
    const origin = this.transform
      .inverse()
      .multiply(Tuple.getPoint(0, 0, 0));
    const direction = pixel.subtract(origin).normalize();
    return new Ray(origin, direction);
  }

  /**
   *
   * @param {World} world
   * @returns {Canvas}
   */
  render(world) {
    const cvs = new Canvas(this.width, this.height);
    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        const r = this.rayPixel(x, y);
        const color = world.colorAt(r);
        cvs.writePixel(x, y, color);
      }
    }
    return cvs;
  }
}

module.exports = Camera;
