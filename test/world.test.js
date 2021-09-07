const World = require('../src/world');
const PointLight = require('../src/pointLight');
const Sphere = require('../src/shapes/sphere');
const Tuple = require('../src/tuple');
const Color = require('../src/color');
const Matrix = require('../src/matrix');
const Ray = require('../src/ray');

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
});
