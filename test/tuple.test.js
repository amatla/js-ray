const RayError = require('../src/errors');
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
    test('constructor with wrong type', () => {
      expect(() => new Tuple(1, 2, 3, 4)).toThrow(RayError);
      expect(() => new Tuple(1, 2, 3, 4)).toThrow(
        'ray001 -- Invalid Type: Can only create tuples with w = Tuple.Type.Point or w = Tuple.Type.Vector',
      );
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
      expect(a.add(b)).toEqual(new Tuple(1, 1, 6, Tuple.Type.Point));
    });
    test('adding vector to vector:', () => {
      const a = new Tuple(3, -2, 5, Tuple.Type.Vector);
      const b = new Tuple(-2, 3, 1, Tuple.Type.Vector);
      expect(a.add(b)).toEqual(new Tuple(1, 1, 6, Tuple.Type.Vector));
    });
    test('adding 3 tuples:', () => {
      const a = new Tuple(3, -2, 5, Tuple.Type.Vector);
      const b = new Tuple(-2, 3, 1, Tuple.Type.Vector);
      const c = new Tuple(1, 1, 2, Tuple.Type.Point);
      expect(a.add(b).add(c)).toEqual(
        new Tuple(2, 2, 8, Tuple.Type.Point),
      );
    });
    test('adding point to point:', () => {
      const a = new Tuple(3, -2, 5, Tuple.Type.Point);
      const b = new Tuple(-2, 3, 1, Tuple.Type.Vector);
      const c = new Tuple(-2, 3, 1, Tuple.Type.Point);
      expect(() => a.add(b).add(c)).toThrowError(RayError);
      expect(() => a.add(b).add(c)).toThrowError(
        "ray002 -- Invalid Operation: Can't add point to point",
      );
    });
  });
  describe('Subtraction:', () => {
    test('Subctracting two points:', () => {
      const a = Tuple.getPoint(3, 2, 1);
      const b = Tuple.getPoint(5, 6, 7);
      expect(a.subtract(b)).toEqual(Tuple.getVector(-2, -4, -6));
    });
    test('Subtracting a vector from a point', () => {
      const a = Tuple.getPoint(3, 2, 1);
      const b = Tuple.getVector(5, 6, 7);
      expect(a.subtract(b)).toEqual(Tuple.getPoint(-2, -4, -6));
    });
    test('Subtracting two vectors', () => {
      const a = Tuple.getVector(3, 2, 1);
      const b = Tuple.getVector(5, 6, 7);
      expect(a.subtract(b)).toEqual(Tuple.getVector(-2, -4, -6));
    });
    test('Subtracting three vectors', () => {
      const a = Tuple.getVector(3, 2, 1);
      const b = Tuple.getVector(5, 6, 7);
      const c = Tuple.getVector(2, -2, -1);
      expect(a.subtract(b).subtract(c)).toEqual(
        Tuple.getVector(-4, -2, -5),
      );
    });
    test('Subtracting a point from a vector', () => {
      const a = Tuple.getVector(3, 2, 1);
      const b = Tuple.getPoint(5, 6, 7);
      expect(() => a.subtract(b)).toThrow(RayError);
      expect(() => a.subtract(b)).toThrow(
        "ray002 -- Invalid Operation: Can't subtract a point from a vector",
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
      expect(() => t.magnitude).toThrow(
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
      expect(() => t.normalize()).toThrow(
        'Points have no magnitude. Use vector instead',
      );
    });
  });
  describe('Dot product', () => {
    test('Dot product of two vectors:', () => {
      const a = Tuple.getVector(1, 2, 3);
      const b = Tuple.getVector(2, 3, 4);
      expect(a.dotProduct(b)).toBe(20);
    });
    test('Dot product with points:', () => {
      const a = Tuple.getVector(1, 2, 3);
      const b = Tuple.getPoint(2, 3, 4);
      expect(() => a.dotProduct(b)).toThrow(RayError);
      expect(() => a.dotProduct(b)).toThrow(
        "ray002 -- Invalid Operation: Can't calculate the dot product of two points. Use vectors instead.",
      );
    });
  });
  describe('Cross product', () => {
    test('Cross product of two vectors:', () => {
      const a = Tuple.getVector(1, 2, 3);
      const b = Tuple.getVector(2, 3, 4);
      expect(a.crossProduct(b)).toEqual(Tuple.getVector(-1, 2, -1));
      expect(b.crossProduct(a)).toEqual(Tuple.getVector(1, -2, 1));
    });
    test('Cross product with points:', () => {
      const a = Tuple.getVector(1, 2, 3);
      const b = Tuple.getPoint(2, 3, 4);
      expect(() => a.crossProduct(b)).toThrow(RayError);
      expect(() => a.crossProduct(b)).toThrow(
        "ray002 -- Invalid Operation: Can't calculate the cross product of two points. Use vectors instead.",
      );
    });
  });
});
