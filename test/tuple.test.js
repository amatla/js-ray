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
  test('equality', () => {
    const a = new Tuple(4.3, -4.2, 3.1, 1.0);
    const b = new Tuple(4.3, -4.2, 3.1, 1.0);
    expect(Tuple.compare(a, b)).toBe(true);
    expect(Tuple.compare(a, b)).not.toBe(false);
  });
  test('inequality', () => {
    const a = new Tuple(4.2, -4.1, 3.2, 0.0);
    const b = new Tuple(4.3, -4.2, 3.1, 1.0);
    expect(Tuple.compare(a, b)).toBe(false);
    expect(Tuple.compare(a, b)).not.toBe(true);
  });
  test('addition:', () => {
    const t1 = new Tuple(3, -2, 5, Tuple.Type.Point);
    const t2 = new Tuple(-2, 3, 1, Tuple.Type.Vector);
    expect(Tuple.add(t1, t2)).toEqual(
      new Tuple(1, 1, 6, Tuple.Type.Point),
    );
  });
  test('adding vector to vector:', () => {
    const t1 = new Tuple(3, -2, 5, Tuple.Type.Vector);
    const t2 = new Tuple(-2, 3, 1, Tuple.Type.Vector);
    expect(Tuple.add(t1, t2)).toEqual(
      new Tuple(1, 1, 6, Tuple.Type.Vector),
    );
  });
  test('adding point to point:', () => {
    const t1 = new Tuple(3, -2, 5, Tuple.Type.Point);
    const t2 = new Tuple(-2, 3, 1, Tuple.Type.Point);
    expect(() => Tuple.add(t1, t2)).toThrowError(
      "Can't add two points",
    );
  });
});
