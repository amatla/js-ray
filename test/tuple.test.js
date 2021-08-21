const Tuple = require('../src/tuple');

describe('Tuple', () => {
  describe('Creation:', () => {
    test('constructor as a point', () => {
      const t = new Tuple(4.3, -4.2, 3.1, Tuple.Type.Point);
      expect(t.x).toBe(4.3);
      expect(t.y).toBe(-4.2);
      expect(t.z).toBe(3.1);
      expect(t.w).toBe(1.0);
      expect(t.type).toBe(Tuple.Type.Point);
      expect(t.type).not.toBe(Tuple.Type.Vector);
      expect(t.typeToString()).toBe('Point');
    });
    test('constructor as a vector', () => {
      const t = new Tuple(4.3, -4.2, 3.1, Tuple.Type.Vector);
      expect(t.x).toBe(4.3);
      expect(t.y).toBe(-4.2);
      expect(t.z).toBe(3.1);
      expect(t.w).toBe(0.0);
      expect(t.type).toBe(Tuple.Type.Vector);
      expect(t.type).not.toBe(Tuple.Type.Point);
      expect(t.typeToString()).toBe('Vector');
    });
    test('static method as a point', () => {
      const t = Tuple.getPoint(4, -4, 3);
      expect(t).toEqual(new Tuple(4, -4, 3, Tuple.Type.Point));
    });
    test('static method as a vector', () => {
      const t = Tuple.getVector(4, -4, 3);
      expect(t).toEqual(new Tuple(4, -4, 3, Tuple.Type.Vector));
    });
  });
  test('Equality', () => {
    const a = new Tuple(4.3, -4.2, 3.1, 1.0);
    const b = new Tuple(4.3, -4.2, 3.1, 1.0);
    expect(Tuple.compare(a, b)).toBe(true);
    expect(Tuple.compare(a, b)).not.toBe(false);
  });
  test('Inequality', () => {
    const a = new Tuple(4.2, -4.1, 3.2, 0.0);
    const b = new Tuple(4.3, -4.2, 3.1, 1.0);
    expect(Tuple.compare(a, b)).toBe(false);
    expect(Tuple.compare(a, b)).not.toBe(true);
  });
  describe('Addition:', () => {
    test('adding tuple to tuple:', () => {
      const a = new Tuple(3, -2, 5, Tuple.Type.Point);
      const b = new Tuple(-2, 3, 1, Tuple.Type.Vector);
      expect(Tuple.add(a, b)).toEqual(
        new Tuple(1, 1, 6, Tuple.Type.Point),
      );
    });
    test('adding vector to vector:', () => {
      const a = new Tuple(3, -2, 5, Tuple.Type.Vector);
      const b = new Tuple(-2, 3, 1, Tuple.Type.Vector);
      expect(Tuple.add(a, b)).toEqual(
        new Tuple(1, 1, 6, Tuple.Type.Vector),
      );
    });
    test('adding point to point:', () => {
      const a = new Tuple(3, -2, 5, Tuple.Type.Point);
      const b = new Tuple(-2, 3, 1, Tuple.Type.Point);
      expect(() => Tuple.add(a, b)).toThrowError(
        "Can't add two points",
      );
    });
  });
  describe('Subtraction:', () => {
    test('Subctracting two points:', () => {
      const a = Tuple.getPoint(3, 2, 1);
      const b = Tuple.getPoint(5, 6, 7);
      expect(Tuple.subctract(a, b)).toEqual(
        Tuple.getVector(-2, -4, -6),
      );
    });
    test('Subtracting a vector from a point', () => {
      const a = Tuple.getPoint(3, 2, 1);
      const b = Tuple.getVector(5, 6, 7);
      expect(Tuple.subctract(a, b)).toEqual(
        Tuple.getPoint(-2, -4, -6),
      );
    });
    test('Subtracting two vectors', () => {
      const a = Tuple.getVector(3, 2, 1);
      const b = Tuple.getVector(5, 6, 7);
      expect(Tuple.subctract(a, b)).toEqual(
        Tuple.getVector(-2, -4, -6),
      );
    });
    test('Subtracting a point from a vector', () => {
      const a = Tuple.getVector(3, 2, 1);
      const b = Tuple.getPoint(5, 6, 7);
      expect(() => Tuple.subctract(a, b)).toThrowError(
        "Can't subtract a point from a vector",
      );
    });
  });
  test('Negation:', () => {
    const t = new Tuple(1, -2, 3, Tuple.Type.Vector);
    expect(t.negate()).toEqual(
      new Tuple(-1, 2, -3, Tuple.Type.Vector),
    );
  });
  test('Scalar multiplication:', () => {
    const t = new Tuple(1, -2, 3, Tuple.Type.Vector);
    expect(t.multiply(3.5)).toEqual(
      new Tuple(3.5, -7, 10.5, Tuple.Type.Vector),
    );
  });
  test('Division', () => {
    const t = new Tuple(1, -2, 3, Tuple.Type.Vector);
    expect(t.divideBy(2)).toEqual(
      new Tuple(0.5, -1, 1.5, Tuple.Type.Vector),
    );
  });
  describe('Magnitude:', () => {
    test('Vector (1, 0, 0)', () => {
      const t = new Tuple(1, 0, 0, Tuple.Type.Vector);
      expect(t.magnitude).toEqual(1);
    });
    test('Vector (0, 1, 0)', () => {
      const t = new Tuple(0, 1, 0, Tuple.Type.Vector);
      expect(t.magnitude).toEqual(1);
    });
    test('Vector (0, 0, 1)', () => {
      const t = new Tuple(0, 0, 1, Tuple.Type.Vector);
      expect(t.magnitude).toEqual(1);
    });
    test('Vector (1, 2, 3)', () => {
      const t = new Tuple(1, 2, 3, Tuple.Type.Vector);
      expect(t.magnitude).toEqual(Math.sqrt(14));
    });
    test('Vector (-1, -2, -3)', () => {
      const t = new Tuple(-1, -2, -3, Tuple.Type.Vector);
      expect(t.magnitude).toEqual(Math.sqrt(14));
    });
    test('Point (1, 2, 3)', () => {
      const t = new Tuple(1, 2, 3, Tuple.Type.Point);
      expect(() => t.magnitude).toThrowError(
        'Points have no magnitude. Use vector instead',
      );
    });
  });
  describe('Normalization:', () => {
    test('Vector (4, 0, 0)', () => {
      const t = new Tuple(4, 0, 0, Tuple.Type.Vector);
      expect(t.normalize()).toEqual(Tuple.getVector(1, 0, 0));
    });
    test('Vector (1, 2, 3)', () => {
      const t = new Tuple(1, 2, 3, Tuple.Type.Vector);
      const d = Math.sqrt(14);
      expect(t.normalize()).toEqual(
        Tuple.getVector(1 / d, 2 / d, 3 / d),
      );
    });
    test('Magnitude of a normalized vector:', () => {
      const t = new Tuple(1, 2, 4, Tuple.Type.Vector);
      expect(t.normalize().magnitude).toBe(1);
    });
    test('Point (1, 2, 3)', () => {
      const t = new Tuple(1, 2, 3, Tuple.Type.Point);
      expect(() => t.normalize()).toThrowError(
        'Points have no magnitude. Use vector instead',
      );
    });
  });
  describe('Dot product', () => {
    test('Dot product of two vectors:', () => {
      const a = Tuple.getVector(1, 2, 3);
      const b = Tuple.getVector(2, 3, 4);
      expect(Tuple.dotProduct(a, b)).toBe(20);
    });
    test('Dot product with points:', () => {
      const a = Tuple.getVector(1, 2, 3);
      const b = Tuple.getPoint(2, 3, 4);
      expect(() => Tuple.dotProduct(a, b)).toThrowError(
        "Can't calculate the dot product of two points. Use vectors instead.",
      );
    });
  });
  describe('Cross product', () => {
    test('Cross product of two vectors:', () => {
      const a = Tuple.getVector(1, 2, 3);
      const b = Tuple.getVector(2, 3, 4);
      expect(Tuple.crossProduct(a, b)).toEqual(
        Tuple.getVector(-1, 2, -1),
      );
      expect(Tuple.crossProduct(b, a)).toEqual(
        Tuple.getVector(1, -2, 1),
      );
    });
    test('Cross product with points:', () => {
      const a = Tuple.getVector(1, 2, 3);
      const b = Tuple.getPoint(2, 3, 4);
      expect(() => Tuple.crossProduct(a, b)).toThrowError(
        "Can't calculate the cross product of two points. Use vectors instead.",
      );
    });
  });
});
