const RayError = require('./errors');
const utils = require('./utils');
const Tuple = require('./tuple');
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
      row.every(
        (col, x) => utils.equal(col, mtx.data[y][x]) === true,
      ),
    );
  }

  /**
   * Matrix multiplication.
   * @param {matrix|tuple} value
   * @returns {matrix|tuple}
   */
  multiply(value) {
    if (value instanceof Matrix) {
      if (this.size !== value.size)
        throw new RayError(
          'ray002',
          'Both matrices must be square and have the same size.',
        );
      else {
        const result = new Matrix(this.size, 0);
        for (let y = 0; y < this.size; y += 1) {
          for (let x = 0; x < this.size; x += 1) {
            for (let m = 0; m < this.size; m += 1) {
              result.data[y][x] += this.data[y][m] * value.data[m][x];
            }
          }
        }
        return result;
      }
    }
    if (value instanceof Tuple) {
      const result = new Tuple(0, 0, 0, 0);
      const keys = Object.keys(value);
      for (let y = 0; y < this.size; y += 1) {
        for (let x = 0; x < this.size; x += 1) {
          result[keys[y]] += this.data[y][x] * value[keys[x]];
        }
      }
      return result;
    }
    throw new RayError(
      'ray001',
      `${value} must be of type Tuple or Matrix`,
    );
  }

  transpose() {
    const result = new Matrix(this.size, 0);
    for (let y = 0; y < this.size; y += 1) {
      for (let x = 0; x < this.size; x += 1)
        result.data[y][x] = this.data[x][y];
    }
    return result;
  }

  get determinant() {
    let result = 0;
    if (this.size === 2)
      result =
        this.data[0][0] * this.data[1][1] -
        this.data[0][1] * this.data[1][0];
    else
      for (let y = 0; y < this.size; y += 1) {
        result += this.data[y][0] * this.cofactor(y, 0);
      }
    return result;
  }

  submatrix(col, row) {
    const values = [];
    for (let y = 0; y < this.size; y += 1) {
      for (let x = 0; x < this.size; x += 1) {
        if (y !== col && x !== row) values.push(this.data[y][x]);
      }
    }
    return new Matrix(values);
  }

  minor(col, row) {
    return this.submatrix(col, row).determinant;
  }

  cofactor(col, row) {
    if ((row + col) % 2) return this.minor(col, row) * -1;
    return this.minor(col, row);
  }

  isInvertible() {
    return this.determinant !== 0;
  }

  inverse() {
    if (!this.isInvertible)
      throw new RayError(
        'ray002',
        `The matrix ${this} is not invertable.`,
      );
    const inv = new Matrix(this.size, 0);
    for (let y = 0; y < this.size; y += 1) {
      for (let x = 0; x < this.size; x += 1) {
        const c = this.cofactor(x, y);
        inv.data[y][x] = c / this.determinant;
      }
    }
    return inv;
  }

  /**
   * @returns {matrix}
   */
  static identityMatrix() {
    return new Matrix([
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
    ]);
  }

  static translation(x = 0, y = 0, z = 0) {
    const t = Matrix.identityMatrix();
    t.data[0][3] = x;
    t.data[1][3] = y;
    t.data[2][3] = z;
    return t;
  }

  static scaling(x = 1, y = 1, z = 1) {
    const s = Matrix.identityMatrix();
    s.data[0][0] = x;
    s.data[1][1] = y;
    s.data[2][2] = z;
    return s;
  }

  static rotateX(radians) {
    const rx = Matrix.identityMatrix();
    rx.data[1][1] = Math.cos(radians);
    rx.data[1][2] = Math.sin(radians) * -1;
    rx.data[2][1] = Math.sin(radians);
    rx.data[2][2] = Math.cos(radians);
    return rx;
  }

  static rotateY(radians) {
    const ry = Matrix.identityMatrix();
    ry.data[0][0] = Math.cos(radians);
    ry.data[0][2] = Math.sin(radians);
    ry.data[2][0] = Math.sin(radians) * -1;
    ry.data[2][2] = Math.cos(radians);
    return ry;
  }

  static rotateZ(radians) {
    const rz = Matrix.identityMatrix();
    rz.data[0][0] = Math.cos(radians);
    rz.data[0][1] = Math.sin(radians) * -1;
    rz.data[1][0] = Math.sin(radians);
    rz.data[1][1] = Math.cos(radians);
    return rz;
  }
}
const m = new Matrix([
  -5, 2, 6, -8, 1, -5, 1, 8, 7, 7, -6, -7, 1, -3, 7, 4,
]);
const n = m.inverse();

console.log(n.toString());
console.log(
  n.equals(
    new Matrix([
      0.21805, 0.45113, 0.2406, -0.04511, -0.80827, -1.45677,
      -0.44361, 0.52068, -0.07895, -0.22368, -0.05263, 0.19737,
      -0.52256, -0.81391, -0.30075, 0.30639,
    ]),
  ),
);
module.exports = Matrix;
