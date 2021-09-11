const Plane = require('../src/shapes/plane');
const Tuple = require('../src/tuple');
const Ray = require('../src/ray');

describe('Planes:', () => {
  test('The normal of a plane is constant everywhere:', () => {
    const p = new Plane();
    const n1 = p.normalAt(Tuple.getPoint(0, 0, 0));
    const n2 = p.normalAt(Tuple.getPoint(10, 0, -10));
    const n3 = p.normalAt(Tuple.getPoint(-5, 0, 150));
    expect(n1).toEqual(Tuple.getVector(0, 1, 0));
    expect(n2).toEqual(Tuple.getVector(0, 1, 0));
    expect(n3).toEqual(Tuple.getVector(0, 1, 0));
  });
  describe('Itersections:', () => {
    test('Intersection with a ray parallel to the plane:', () => {
      const p = new Plane();
      const r = new Ray(
        Tuple.getPoint(0, 10, 0),
        Tuple.getVector(0, 0, 1),
      );
      const xs = p.intersect(r);
      expect(xs).toEqual([]);
    });
    test('Intersect with a coplanar ray:', () => {
      const p = new Plane();
      const r = new Ray(
        Tuple.getPoint(0, 0, 0),
        Tuple.getVector(0, 0, 1),
      );
      const xs = p.intersect(r);
      expect(xs).toEqual([]);
    });
    test('A ray intersecting a plane from above:', () => {
      const p = new Plane();
      const r = new Ray(
        Tuple.getPoint(0, 1, 0),
        Tuple.getVector(0, -1, 0),
      );
      const xs = p.intersect(r);
      expect(xs.length).toBe(1);
      expect(xs[0].t).toBe(1);
      expect(xs[0].object).toEqual(p);
    });
    test('A ray intersecting a plane from below:', () => {
      const p = new Plane();
      const r = new Ray(
        Tuple.getPoint(0, -1, 0),
        Tuple.getVector(0, 1, 0),
      );
      const xs = p.intersect(r);
      expect(xs.length).toBe(1);
      expect(xs[0].t).toBe(1);
      expect(xs[0].object).toEqual(p);
    });
  });
});
