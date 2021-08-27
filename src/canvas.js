const Color = require('./color');

class Canvas {
  constructor(width = 10, length = 10) {
    this.width = width;
    this.heigth = length;
    this.pixels = [];
    this.fill(Color.BLACK);
  }

  fill(color) {
    for (let y = 0; y < this.heigth; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        this.pixels[(x, y)] = color;
      }
    }
  }
}

const c = new Canvas(10, 10);
console.log(c);
module.exports = Canvas;
