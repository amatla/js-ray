const Matrix = require('../src/matrix');

describe('Matrix:', () => {
  describe('Creation:', () => {
    test('Creating and inspecting a 4x4 matrix:', () => {
      const m = new Matrix([
        1, 2, 3, 4, 5.5, 6.5, 7.5, 8.5, 9, 10, 11, 12, 13.5, 14.5,
        15.5, 16.5,
      ]);
      expect(m.matrix[0][0]).toBe(1);
      expect(m.matrix[0][3]).toBe(4);
      expect(m.matrix[1][0]).toBe(5.5);
      expect(m.matrix[1][2]).toBe(7.5);
      expect(m.matrix[2][2]).toBe(11);
      expect(m.matrix[3][0]).toBe(13.5);
      expect(m.matrix[3][2]).toBe(15.5);
    });
    test('Creating and inspecting a 2x2 matrix:', () => {
      const m = new Matrix([-3, 5, 1, -2]);
      expect(m.matrix[0][0]).toBe(-3);
      expect(m.matrix[0][1]).toBe(5);
      expect(m.matrix[1][0]).toBe(1);
      expect(m.matrix[1][1]).toBe(-2);
    });
    test('Creating and inspecting a 3x3 matrix:', () => {
      const m = new Matrix([-3, 5, 0, 1, -2, -7, 0, 1, 1]);
      expect(m.matrix[0][0]).toBe(-3);
      expect(m.matrix[1][1]).toBe(-2);
      expect(m.matrix[2][2]).toBe(1);
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
});
