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
  test('Transposing identity matrix:', () => {
    expect(Matrix.identityMatrix().transpose()).toEqual(
      Matrix.identityMatrix(),
    );
  });
  describe('Inverting matrices:', () => {
    test('Determinant of a 2x2 matrix:', () => {
      const m = new Matrix([1, 5, -3, 2]);
      expect(m.determinant).toBe(17);
    });
    test('Submatrix of a 3x3 matrix:', () => {
      const m = new Matrix([1, 5, 0, -3, 2, 7, 0, 6, -3]);
      expect(m.submatrix(0, 2)).toEqual(new Matrix([-3, 2, 0, 6]));
    });
    test('Submatrix of a 4x4 matrix:', () => {
      const m = new Matrix([
        -6, 1, 1, 6, -8, 5, 8, 6, -1, 0, 8, 2, -7, 1, -1, 1,
      ]);
      expect(m.submatrix(2, 1)).toEqual(
        new Matrix([-6, 1, 6, -8, 8, 6, -7, -1, 1]),
      );
    });
    test('Minor of a 3x3 matrix:', () => {
      const m = new Matrix([3, 5, 0, 2, -1, -7, 6, -1, 5]);
      const sub = m.submatrix(1, 0);
      expect(sub.determinant).toBe(25);
      expect(m.minor(1, 0)).toBe(25);
    });
    test('Cofactor:', () => {
      const m = new Matrix([3, 5, 0, 2, -1, -7, 6, -1, 5]);
      expect(m.minor(0, 0)).toBe(-12);
      expect(m.cofactor(0, 0)).toBe(-12);
      expect(m.minor(1, 0)).toBe(25);
      expect(m.cofactor(1, 0)).toBe(-25);
    });
    test('Determinant of a 3x3 matrix:', () => {
      const m = new Matrix([1, 2, 6, -5, 8, -4, 2, 6, 4]);
      expect(m.cofactor(0, 0)).toBe(56);
      expect(m.cofactor(0, 1)).toBe(12);
      expect(m.cofactor(0, 2)).toBe(-46);
      expect(m.determinant).toBe(-196);
    });
    test('Determinant of a 4x4 matrix:', () => {
      const m = new Matrix([
        -2, -8, 3, 5, -3, 1, 7, 3, 1, 2, -9, 6, -6, 7, 7, -9,
      ]);
      expect(m.cofactor(0, 0)).toBe(690);
      expect(m.cofactor(0, 1)).toBe(447);
      expect(m.cofactor(0, 2)).toBe(210);
      expect(m.cofactor(0, 3)).toBe(51);
      expect(m.determinant).toBe(-4071);
    });
    test('Testing an invertable matrix for invertibility:', () => {
      const m = new Matrix([
        6, 4, 4, 4, 5, 5, 7, 6, 4, -9, 3, -7, 9, 1, 7, -6,
      ]);
      expect(m.determinant).toBe(-2120);
      expect(m.isInvertible()).toBe(true);
    });
    test('Testing a non invertable matrix for invertibility:', () => {
      const m = new Matrix([
        -4, 2, -2, -3, 9, 6, 2, 6, 0, -5, 1, -5, 0, 0, 0, 0,
      ]);
      expect(m.determinant).toBe(0);
      expect(m.isInvertible()).toBe(false);
    });
    test('Calculating the inverse of a matrix:', () => {
      const m = new Matrix([
        -5, 2, 6, -8, 1, -5, 1, 8, 7, 7, -6, -7, 1, -3, 7, 4,
      ]);
      const n = m.inverse();
      expect(m.determinant).toBe(532);
      expect(m.cofactor(2, 3)).toBe(-160);
      expect(n.data[3][2]).toBe(-160 / 532);
      expect(m.cofactor(3, 2)).toBe(105);
      expect(n.data[2][3]).toBe(105 / 532);
      expect(
        n.equals(
          new Matrix([
            0.21805, 0.45113, 0.2406, -0.04511, -0.80827, -1.45677,
            -0.44361, 0.52068, -0.07895, -0.22368, -0.05263, 0.19737,
            -0.52256, -0.81391, -0.30075, 0.30639,
          ]),
        ),
      ).toBe(true);
    });
    test('Calcualting the inverse of another matrix:', () => {
      const m = new Matrix([
        8, -5, 9, 2, 7, 5, 6, 1, -6, 0, 9, 6, -3, 0, -9, -4,
      ]);
      expect(
        m
          .inverse()
          .equals(
            new Matrix([
              -0.15385, -0.15385, -0.28205, -0.53846, -0.07692,
              0.12308, 0.02564, 0.03077, 0.35897, 0.35897, 0.4359,
              0.92308, -0.69231, -0.69231, -0.76923, -1.92308,
            ]),
          ),
      ).toBe(true);
    });
    test('Calcualting the inverse of a third matrix:', () => {
      const m = new Matrix([
        9, 3, 0, 9, -5, -2, -6, -3, -4, 9, 6, 4, -7, 6, 6, 2,
      ]);
      expect(
        m
          .inverse()
          .equals(
            new Matrix([
              -0.04074, -0.07778, 0.14444, -0.22222, -0.07778,
              0.03333, 0.36667, -0.33333, -0.02901, -0.1463, -0.10926,
              0.12963, 0.17778, 0.06667, -0.26667, 0.33333,
            ]),
          ),
      ).toBe(true);
    });
    test('Multiplying a product by its inverse:', () => {
      const m = new Matrix([
        3, -9, 7, 3, 3, -8, 2, -9, -4, 4, 4, 1, -6, 5, -1, 1,
      ]);
      const n = new Matrix([
        8, 2, 2, 2, 3, -1, 7, 0, 7, 0, 5, 4, 6, -2, 0, 5,
      ]);
      const prod = m.multiply(n);
      const result = prod.multiply(n.inverse());
      expect(result.equals(m)).toBe(true);
    });
  });
  describe('Matrix transformations:', () => {
    describe('Translation:', () => {
      test('Multiplying by a translation matrix:', () => {
        const t = Matrix.translation(5, -3, 2);
        const p = Tuple.getPoint(-3, 4, 5);
        expect(t.multiply(p)).toEqual(Tuple.getPoint(2, 1, 7));
      });
      test('Multiplying by the inverse of a translation matrix:', () => {
        const t = Matrix.translation(5, -3, 2);
        const inv = t.inverse();
        const p = Tuple.getPoint(-3, 4, 5);
        expect(inv.multiply(p)).toEqual(Tuple.getPoint(-8, 7, 3));
      });
      test('Translation does not affect vectors:', () => {
        const t = Matrix.translation(5, -3, 2);
        const v = Tuple.getVector(-3, 4, 5);
        expect(t.multiply(v)).toEqual(v);
      });
    });
    describe('Scaling:', () => {
      test('A scaling matrix applied to a point:', () => {
        const s = Matrix.scaling(2, 3, 4);
        const p = Tuple.getPoint(-4, 6, 8);
        expect(s.multiply(p)).toEqual(Tuple.getPoint(-8, 18, 32));
      });
      test('A scaling matrix applied to a vector:', () => {
        const s = Matrix.scaling(2, 3, 4);
        const v = Tuple.getVector(-4, 6, 8);
        expect(s.multiply(v)).toEqual(Tuple.getVector(-8, 18, 32));
      });
      test('Multiplying by the inverse of a scaling matrix', () => {
        const s = Matrix.scaling(2, 3, 4);
        const inv = s.inverse();
        const v = Tuple.getVector(-4, 6, 8);
        expect(inv.multiply(v)).toEqual(Tuple.getVector(-2, 2, 2));
      });
      test('Reflection is scaling by a negative value:', () => {
        const r = Matrix.scaling(-1, 1, 1);
        const p = Tuple.getPoint(2, 3, 4);
        expect(r.multiply(p)).toEqual(Tuple.getPoint(-2, 3, 4));
      });
    });
    describe('Rotation:', () => {
      test('Rotating a point around the x axis', () => {
        const p = Tuple.getPoint(0, 1, 0);
        const halfQuarter = Matrix.rotateX(Math.PI / 4);
        const fullQuarter = Matrix.rotateX(Math.PI / 2);
        expect(
          Tuple.compare(
            halfQuarter.multiply(p),
            Tuple.getPoint(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2),
          ),
        ).toBe(true);
        expect(
          Tuple.compare(
            fullQuarter.multiply(p),
            Tuple.getPoint(0, 0, 1),
          ),
        ).toBe(true);
      });
      test('The inverse of an x rotation rotates in the opposite direction:', () => {
        const p = Tuple.getPoint(0, 1, 0);
        const halfQuarter = Matrix.rotateX(Math.PI / 4);
        const inv = halfQuarter.inverse();
        expect(
          Tuple.compare(
            inv.multiply(p),
            Tuple.getPoint(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2),
          ),
        ).toBe(true);
      });
      test('Rotating a point around the y axis:', () => {
        const p = Tuple.getPoint(0, 0, 1);
        const halfQuarter = Matrix.rotateY(Math.PI / 4);
        const fullQuarter = Matrix.rotateY(Math.PI / 2);
        expect(
          Tuple.compare(
            halfQuarter.multiply(p),
            Tuple.getPoint(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2),
          ),
        ).toBe(true);
        expect(
          Tuple.compare(
            fullQuarter.multiply(p),
            Tuple.getPoint(1, 0, 0),
          ),
        ).toBe(true);
      });
      test('Rotating a point around the z axis:', () => {
        const p = Tuple.getPoint(0, 1, 0);
        const halfQuarter = Matrix.rotateZ(Math.PI / 4);
        const fullQuarter = Matrix.rotateZ(Math.PI / 2);
        expect(
          Tuple.compare(
            halfQuarter.multiply(p),
            Tuple.getPoint(-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0),
          ),
        ).toBe(true);
        expect(
          Tuple.compare(
            fullQuarter.multiply(p),
            Tuple.getPoint(-1, 0, 0),
          ),
        ).toBe(true);
      });
    });
    describe('Shearing:', () => {
      test('Shearing x in proportion to y:', () => {
        const s = Matrix.shearing(1, 0, 0, 0, 0, 0);
        const p = Tuple.getPoint(2, 3, 4);
        expect(
          Tuple.compare(s.multiply(p), Tuple.getPoint(5, 3, 4)),
        ).toBe(true);
      });
      test('Shearing x in proportion to z:', () => {
        const s = Matrix.shearing(0, 1, 0, 0, 0, 0);
        const p = Tuple.getPoint(2, 3, 4);
        expect(
          Tuple.compare(s.multiply(p), Tuple.getPoint(6, 3, 4)),
        ).toBe(true);
      });
      test('Shearing y in proportion to x:', () => {
        const s = Matrix.shearing(0, 0, 1, 0, 0, 0);
        const p = Tuple.getPoint(2, 3, 4);
        expect(
          Tuple.compare(s.multiply(p), Tuple.getPoint(2, 5, 4)),
        ).toBe(true);
      });
      test('Shearing y in proportion to z:', () => {
        const s = Matrix.shearing(0, 0, 0, 1, 0, 0);
        const p = Tuple.getPoint(2, 3, 4);
        expect(
          Tuple.compare(s.multiply(p), Tuple.getPoint(2, 7, 4)),
        ).toBe(true);
      });
      test('Shearing z in proportion to x:', () => {
        const s = Matrix.shearing(0, 0, 0, 0, 1, 0);
        const p = Tuple.getPoint(2, 3, 4);
        expect(
          Tuple.compare(s.multiply(p), Tuple.getPoint(2, 3, 6)),
        ).toBe(true);
      });
      test('Shearing z in proportion to y:', () => {
        const s = Matrix.shearing(0, 0, 0, 0, 0, 1);
        const p = Tuple.getPoint(2, 3, 4);
        expect(
          Tuple.compare(s.multiply(p), Tuple.getPoint(2, 3, 7)),
        ).toBe(true);
      });
    });
  });
});
