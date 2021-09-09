const World = require('../src/world');
const PointLight = require('../src/pointLight');
const Sphere = require('../src/shapes/sphere');
const Tuple = require('../src/tuple');
const Color = require('../src/color');
const Matrix = require('../src/matrix');
const Ray = require('../src/ray');
const Intersection = require('../src/intersection');

describe('World:', () => {
  test('Creating a world:', () => {
    const w = new World();
    expect(w.objects).toBeInstanceOf(Array);
    expect(w.objects.length).toBe(0);
    expect(w.light).toBe(null);
  });
  test('Creating default world:', () => {
    const pLight = new PointLight(
      Tuple.getPoint(-10, 10, -10),
      new Color(1, 1, 1),
    );
    const s = new Sphere();
    s.material.color = new Color(0.8, 1, 0.6);
    s.material.diffuse = 0.7;
    s.material.specular = 0.2;
    const s2 = new Sphere();
    s2.setTransform(Matrix.scaling(0.5, 0.5, 0.5));
    const w = World.getDefault();
    expect(w.light).toEqual(pLight);
    expect(w.objects[0]).toBeInstanceOf(Sphere);
    expect(w.objects[1]).toBeInstanceOf(Sphere);
  });
  test('Intersects a world with a ray:', () => {
    const w = World.getDefault();
    const r = new Ray(
      Tuple.getPoint(0, 0, -5),
      Tuple.getVector(0, 0, 1),
    );
    const xs = w.intersect(r);
    expect(xs.length).toBe(4);
    expect(xs[0].t).toBe(4);
    expect(xs[1].t).toBe(4.5);
    expect(xs[2].t).toBe(5.5);
    expect(xs[3].t).toBe(6);
  });
  test('Shading an intersection:', () => {
    const w = World.getDefault();
    const r = new Ray(
      Tuple.getPoint(0, 0, -5),
      Tuple.getVector(0, 0, 1),
    );
    const s = w.objects[0];
    const i = new Intersection(4, s);
    const comps = Intersection.computations(i, r);
    const c = w.shadeHit(comps);
    expect(c.equal(new Color(0.38066, 0.47583, 0.2855))).toBe(true);
  });
  test('Shading an intersection from the inside:', () => {
    const w = World.getDefault();
    w.light = new PointLight(
      Tuple.getPoint(0, 0.25, 0),
      new Color(1, 1, 1),
    );
    const r = new Ray(
      Tuple.getPoint(0, 0, 0),
      Tuple.getVector(0, 0, 1),
    );
    const s = w.objects[1];
    const i = new Intersection(0.5, s);
    const comps = Intersection.computations(i, r);
    const c = w.shadeHit(comps);
    expect(c.equal(new Color(0.90498, 0.90498, 0.90498))).toBe(true);
  });
  test('Color when a ray misses:', () => {
    const w = World.getDefault();
    const r = new Ray(
      Tuple.getPoint(0, 0, -5),
      Tuple.getVector(0, 1, 0),
    );
    const c = w.colorAt(r);
    expect(c.equal(new Color(0, 0, 0))).toBe(true);
  });
  test('Color when a ray hits:', () => {
    const w = World.getDefault();
    const r = new Ray(
      Tuple.getPoint(0, 0, -5),
      Tuple.getVector(0, 0, 1),
    );
    const c = w.colorAt(r);
    expect(c.equal(new Color(0.38066, 0.47583, 0.2855))).toBe(true);
  });
  test('Color whit an intersection behind the ray:', () => {
    const w = World.getDefault();
    const outer = w.objects[0];
    outer.material.ambient = 1;
    const inner = w.objects[1];
    inner.material.ambient = 1;
    const r = new Ray(
      Tuple.getPoint(0, 0, 0.75),
      Tuple.getVector(0, 0, -1),
    );
    const c = w.colorAt(r);
    expect(c.equal(inner.material.color)).toBe(true);
  });
  describe('Shadows:', () => {
    const w = World.getDefault();
    test('There is no shadow when nothing is colinear with poin and light:', () => {
      const p = Tuple.getPoint(0, 10, 0);
      expect(w.isShadowed(p)).toBe(false);
    });
    test('The shadow when an object is between point and light:', () => {
      const p = Tuple.getPoint(10, -10, 10);
      expect(w.isShadowed(p)).toBe(true);
    });
    test('The shadow when an object is behind the light:', () => {
      const p = Tuple.getPoint(-20, 20, -20);
      expect(w.isShadowed(p)).toBe(false);
    });
    test('The shadow when an object is behind the point:', () => {
      const p = Tuple.getPoint(-2, 2, -2);
      expect(w.isShadowed(p)).toBe(false);
    });
    test('shadeHit() is given an intersection in shadow:', () => {
      const w1 = new World();
      w.light = new PointLight(
        Tuple.getPoint(0, 0, -10),
        new Color(1, 1, 1),
      );
      const s1 = new Sphere();
      const s2 = new Sphere();
      s2.transform = Matrix.translation(0, 0, 10);
      w1.objects.push(s1, s2);
      const r = new Ray(
        Tuple.getPoint(0, 0, 5),
        Tuple.getVector(0, 0, 1),
      );
      const i = new Intersection(4, s2);
      const comps = Intersection.computations(i, r);
      const c = w.shadeHit(comps);
      expect(c.equal(new Color(0.1, 0.1, 0.1))).toBe(true);
    });
  });
});
