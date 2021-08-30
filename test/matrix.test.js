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
  });
});
