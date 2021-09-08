const Sphere = require('../src/shapes/sphere');
const Intersection = require('../src/intersection');
const Tuple = require('../src/tuple');
const Ray = require('../src/ray');

describe('Intersection:', () => {
  test('An intersection encapsulate t and object:', () => {
    const s = new Sphere();
    const i = new Intersection(3.5, s);
    expect(i.t).toBe(3.5);
    expect(i.object).toEqual(s);
  });
  test('Aggregating intersections:', () => {
    const s = new Sphere();
    const i1 = new Intersection(1, s);
    const i2 = new Intersection(2, s);
    const xs = [i1, i2];
    expect(xs.length).toBe(2);
    expect(xs[0].t).toBe(1);
    expect(xs[1].t).toBe(2);
  });
  describe('Hits:', () => {
    test('Hits when all intersections have positive t:', () => {
      const s = new Sphere();
      const i1 = new Intersection(1, s);
      const i2 = new Intersection(2, s);
      const xs = [i1, i2];
      const i = Intersection.hit(xs);
      expect(i).toEqual(i1);
    });
    test('Hits when some intersections have negative t:', () => {
      const s = new Sphere();
      const i1 = new Intersection(-1, s);
      const i2 = new Intersection(1, s);
      const xs = [i1, i2];
      const i = Intersection.hit(xs);
      expect(i).toEqual(i2);
    });
    test('Hits when all intersections have negative t:', () => {
      const s = new Sphere();
      const i1 = new Intersection(-2, s);
      const i2 = new Intersection(-1, s);
      const xs = [i1, i2];
      const i = Intersection.hit(xs);
      expect(i).toBe(null);
    });
    test('The hit is always the lowest non negative intersection:', () => {
      const s = new Sphere();
      const i1 = new Intersection(5, s);
      const i2 = new Intersection(7, s);
      const i3 = new Intersection(-3, s);
      const i4 = new Intersection(2, s);
      const xs = [i1, i2, i3, i4];
      const i = Intersection.hit(xs);
      expect(i).toEqual(i4);
    });
  });
  test('Precomputing the state of an intersection:', () => {
    const r = new Ray(
      Tuple.getPoint(0, 0, -5),
      Tuple.getVector(0, 0, 1),
    );
    const s = new Sphere();
    const i = new Intersection(4, s);
    const comps = Intersection.computations(i, r);
    expect(comps.t).toEqual(i.t);
    expect(comps.object).toEqual(i.object);
    expect(comps.point).toEqual(Tuple.getPoint(0, 0, -1));
    expect(comps.eyeV).toEqual(Tuple.getVector(0, 0, -1));
    expect(comps.normal).toEqual(Tuple.getVector(0, 0, -1));
  });
  test('Instersection occurs on the outside:', () => {
    const r = new Ray(
      Tuple.getPoint(0, 0, -5),
      Tuple.getVector(0, 0, 1),
    );
    const s = new Sphere();
    const i = new Intersection(4, s);
    const comps = Intersection.computations(i, r);
    expect(comps.inside).toBe(false);
  });
  test('Instersection occurs on the inside:', () => {
    const r = new Ray(
      Tuple.getPoint(0, 0, 0),
      Tuple.getVector(0, 0, 1),
    );
    const s = new Sphere();
    const i = new Intersection(1, s);
    const comps = Intersection.computations(i, r);
    expect(comps.point).toEqual(Tuple.getPoint(0, 0, 1));
    expect(comps.eyeV).toEqual(Tuple.getVector(0, 0, -1));
    expect(comps.inside).toBe(true);
  });
});
