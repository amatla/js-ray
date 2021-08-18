const Tuple = require('../src/tuple');

describe('Tuple', () => {
  describe('Creation:', () => {
    test('constructor as a point', () => {
      const t = new Tuple(4.3, -4.2, 3.1, 1.0);
      expect(t.x).toBe(4.3);
      expect(t.y).toBe(-4.2);
      expect(t.z).toBe(3.1);
      expect(t.w).toBe(1.0);
      expect(t.type).toBe('point');
      expect(t.type).not.toBe('vector');
    });
    test('constructor as a vector', () => {
      const t = new Tuple(4.3, -4.2, 3.1, 0.0);
      expect(t.x).toBe(4.3);
      expect(t.y).toBe(-4.2);
      expect(t.z).toBe(3.1);
      expect(t.w).toBe(0.0);
      expect(t.type).toBe('vector');
      expect(t.type).not.toBe('point');
    });
    test('static method as a point', () => {
      const t = Tuple.point(4, -4, 3);
      expect(t).toEqual(new Tuple(4, -4, 3, 1.0));
    });
    test('static method as a vector', () => {
      const t = Tuple.vector(4, -4, 3);
      expect(t).toEqual(new Tuple(4, -4, 3, 0.0));
    });
  });
});
