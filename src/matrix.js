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
    this.data = [];
    for (let y = 0; y < this.size; y += 1) {
      this.data[y] = [];
      for (let x = 0; x < this.size; x += 1) {
        this.data[y][x] = value;
      }
    }
  }

  /**
   * Initialize the matrix with an array of values.
   * @param {number[]} valuesArray
   */
  initFromArray(valuesArray) {
    this.data = [];
    for (let y = 0; y < this.size; y += 1) {
      this.data[y] = [];
      for (let x = 0; x < this.size; x += 1) {
        this.data[y][x] = valuesArray.shift();
      }
    }
  }

  /**
   * Convert the matrix to string.
   * @returns {string}
   */
  toString() {
    return this.data.map((val) => val.join('\t')).join('\n');
  }

  /**
   * @param {matrix} mtx
   * @returns
   */
  equals(mtx) {
    if (!(mtx instanceof Matrix))
      throw new RayError('ray001', `${mtx} is not a matrix.`);
    if (this.size !== mtx.size) return false;

    return this.data.every((row, y) =>
      row.every((col, x) => col === mtx.data[y][x]),
    );
  }

  multiply(mtx) {
    if (this.size !== mtx.size)
      throw new RayError(
        'ray002',
        'Both matrices must be square and have the same size.',
      );
    const result = new Matrix(this.size, 0);
    for (let y = 0; y < this.size; y += 1) {
      for (let x = 0; x < this.size; x += 1) {
        for (let m = 0; m < this.size; m += 1) {
          result.data[y][x] += this.data[y][m] * mtx.data[m][x];
        }
      }
    }
    return result;
  }
}

module.exports = Matrix;
