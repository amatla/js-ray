const Ray = require('../src/ray');
const Tuple = require('../src/tuple');
const Sphere = require('../src/shapes/sphere');

describe('Ray:', () => {
  test('Creating and querying a ray:', () => {
    const origin = Tuple.getPoint(1, 2, 3);
    const direction = Tuple.getVector(4, 5, 6);
    const r = new Ray(origin, direction);
    expect(Tuple.compare(r.origin, origin)).toBe(true);
    expect(Tuple.compare(r.direction, direction)).toBe(true);
  });
  test('Computing a point from a distance:', () => {
    const r = new Ray(
      Tuple.getPoint(2, 3, 4),
      Tuple.getVector(1, 0, 0),
    );
    expect(r.position(0)).toEqual(Tuple.getPoint(2, 3, 4));
    expect(r.position(1)).toEqual(Tuple.getPoint(3, 3, 4));
    expect(r.position(-1)).toEqual(Tuple.getPoint(1, 3, 4));
    expect(r.position(2.5)).toEqual(Tuple.getPoint(4.5, 3, 4));
  });
  test('A ray intersect a sphere at two points:', () => {
    const r = new Ray(
      Tuple.getPoint(0, 0, -5),
      Tuple.getVector(0, 0, 1),
    );
    const s = new Sphere();
    const xs = r.intersect(s);
    expect(xs.length).toBe(2);
    expect(xs[0].t).toBe(4);
    expect(xs[1].t).toBe(6);
  });
  test('A ray instersect a sphere at a tangent:', () => {
    const r = new Ray(
      Tuple.getPoint(0, 1, -5),
      Tuple.getVector(0, 0, 1),
    );
    const s = new Sphere();
    const xs = r.intersect(s);
    expect(xs.length).toBe(2);
    expect(xs[0].t).toBe(5);
    expect(xs[1].t).toBe(5);
  });
  test('A ray misses a sphere:', () => {
    const r = new Ray(
      Tuple.getPoint(0, 2, -5),
      Tuple.getVector(0, 0, 1),
    );
    const s = new Sphere();
    const xs = r.intersect(s);
    expect(xs.length).toBe(0);
  });
  test('A ray originates inside a sphere:', () => {
    const r = new Ray(
      Tuple.getPoint(0, 0, 0),
      Tuple.getVector(0, 0, 1),
    );
    const s = new Sphere();
    const xs = r.intersect(s);
    expect(xs.length).toBe(2);
    expect(xs[0].t).toBe(-1);
    expect(xs[1].t).toBe(1);
  });
  test('A ray originates behind a sphere:', () => {
    const r = new Ray(
      Tuple.getPoint(0, 0, 5),
      Tuple.getVector(0, 0, 1),
    );
    const s = new Sphere();
    const xs = r.intersect(s);
    expect(xs.length).toBe(2);
    expect(xs[0].t).toBe(-6);
    expect(xs[1].t).toBe(-4);
  });
  test('Intersect sets the object on the intersection:', () => {
    const r = new Ray(
      Tuple.getPoint(0, 0, -5),
      Tuple.getVector(0, 0, 1),
    );
    const s = new Sphere();
    const xs = r.intersect(s);
    expect(xs.length).toBe(2);
    expect(xs[0].object).toEqual(s);
    expect(xs[1].object).toEqual(s);
  });
});
