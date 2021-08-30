const RayError = require('./errors');
/**
 * Represent a square matrix
 * @class Matrix
 */
class Matrix {
  /**
   *
   * @param {number|number[]} [rows=4] number of rows/column for the matrix or an array of values to fill the matrix with.
   * array.length must be a perfect square.
   * @param {number} [data=0] if the first argument is a {number} data is the value each element of the square matrix will be filled with.
   */
  constructor(rows = 4, data = 0) {
    if (Array.isArray(rows)) {
      this.size = Math.sqrt(rows.length);
      if (!(this.size % 1 === 0)) {
        throw new RayError(
          'ray003',
          'Array size must be a perfect square (4, 9, 16, 25,...)',
        );
      }
      this.initFromArray(rows);
    } else {
      this.size = rows;
      this.initMatrix(data);
    }
  }

  /**
   * Initialize the matrix with each element = value.
   * @param {number} value
   */
  initMatrix(value) {
    this.matrix = [];
    for (let y = 0; y < this.size; y += 1) {
      this.matrix[y] = [];
      for (let x = 0; x < this.size; x += 1) {
        this.matrix[y][x] = value;
      }
    }
  }

  /**
   * Initialize the matrix with an array of values.
   * @param {number[]} valuesArray
   */
  initFromArray(valuesArray) {
    this.matrix = [];
    for (let y = 0; y < this.size; y += 1) {
      this.matrix[y] = [];
      for (let x = 0; x < this.size; x += 1) {
        this.matrix[y][x] = valuesArray.shift();
      }
    }
  }

  /**
   * Convert the matrix to string.
   * @returns {string}
   */
  toString() {
    return this.matrix
      .map((val) => ` | ${val.join(' | ')} | `)
      .join('\n');
  }
}

module.exports = Matrix;
