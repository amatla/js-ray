const Matrix = require('../src/matrix');
const Tuple = require('../src/tuple');

describe('Matrix:', () => {
  describe('Creation:', () => {
    test('Creating and inspecting a 4x4 matrix:', () => {
      const m = new Matrix([
        1, 2, 3, 4, 5.5, 6.5, 7.5, 8.5, 9, 10, 11, 12, 13.5, 14.5,
        15.5, 16.5,
      ]);
      expect(m.data[0][0]).toBe(1);
      expect(m.data[0][3]).toBe(4);
      expect(m.data[1][0]).toBe(5.5);
      expect(m.data[1][2]).toBe(7.5);
      expect(m.data[2][2]).toBe(11);
      expect(m.data[3][0]).toBe(13.5);
      expect(m.data[3][2]).toBe(15.5);
    });
    test('Creating and inspecting a 2x2 matrix:', () => {
      const m = new Matrix([-3, 5, 1, -2]);
      expect(m.data[0][0]).toBe(-3);
      expect(m.data[0][1]).toBe(5);
      expect(m.data[1][0]).toBe(1);
      expect(m.data[1][1]).toBe(-2);
    });
    test('Creating and inspecting a 3x3 matrix:', () => {
      const m = new Matrix([-3, 5, 0, 1, -2, -7, 0, 1, 1]);
      expect(m.data[0][0]).toBe(-3);
      expect(m.data[1][1]).toBe(-2);
      expect(m.data[2][2]).toBe(1);
    });
  });
  describe('Equality:', () => {
    test('Equal matrices:', () => {
      const m = new Matrix([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2,
      ]);
      const n = new Matrix([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2,
      ]);
      expect(m.equals(n)).toBe(true);
    });
    test('Different matrices:', () => {
      const m = new Matrix([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2,
      ]);
      const n = new Matrix([
        2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1,
      ]);
      expect(m.equals(n)).toBe(false);
    });
  });
  describe('Matrix multiplication:', () => {
    test('Mutliplying 2 matrices:', () => {
      const m1 = new Matrix([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2,
      ]);
      const m2 = new Matrix([
        -2, 1, 2, 3, 3, 2, 1, -1, 4, 3, 6, 5, 1, 2, 7, 8,
      ]);
      expect(m1.multiply(m2)).toEqual(
        new Matrix([
          20, 22, 50, 48, 44, 54, 114, 108, 40, 58, 110, 102, 16, 26,
          46, 42,
        ]),
      );
    });
    test('Multiplying a matrix by a tuple:', () => {
      const m = new Matrix([
        1, 2, 3, 4, 2, 4, 4, 2, 8, 6, 4, 1, 0, 0, 0, 1,
      ]);
      const t = new Tuple(1, 2, 3, 1);
      expect(m.multiply(t)).toEqual(new Tuple(18, 24, 33, 1));
    });
    test('Multiplying a matrix by the identity matrix:', () => {
      const m = new Matrix([
        0, 1, 2, 4, 1, 2, 4, 8, 2, 4, 8, 16, 4, 8, 16, 32,
      ]);
      const id = Matrix.identityMatrix();
      expect(m.multiply(id)).toEqual(m);
    });
    test('Multiplying a tuple by the identity matrix:', () => {
      const t = new Tuple(1, 2, 3, Tuple.Type.Point);
      const id = Matrix.identityMatrix();
      expect(id.multiply(t)).toEqual(t);
    });
  });
  test('Matrix transposition:', () => {
    const m = new Matrix([
      0, 9, 3, 0, 9, 8, 0, 8, 1, 8, 5, 3, 0, 0, 5, 8,
    ]);
    expect(m.transpose()).toEqual(
      new Matrix([0, 9, 1, 0, 9, 8, 8, 0, 3, 0, 5, 5, 0, 8, 3, 8]),
    );
  });
});
