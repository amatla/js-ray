const Sphere = require('../src/shapes/sphere');
const Ray = require('../src/ray');
const Matrix = require('../src/matrix');
const Tuple = require('../src/tuple');
const utils = require('../src/utils');
const Material = require('../src/material');

describe('Sphere:', () => {
  describe('Transformations:', () => {
    test('A sphere default transformation:', () => {
      const s = new Sphere();
      expect(s.transform).toEqual(Matrix.identityMatrix());
    });
    test('Changing a sphere transformation:', () => {
      const s = new Sphere();
      const t = Matrix.translation(2, 3, 4);
      s.setTransform(t);
      expect(s.transform).toEqual(t);
    });
    test('Intersecting a scaled sphere with a ray:', () => {
      const r = new Ray(
        Tuple.getPoint(0, 0, -5),
        Tuple.getVector(0, 0, 1),
      );
      const s = new Sphere();
      s.setTransform(Matrix.scaling(2, 2, 2));
      const xs = s.intersect(r);
      expect(xs.length).toBe(2);
      expect(xs[0].t).toBe(3);
      expect(xs[1].t).toBe(7);
    });
    test('Intersecting a translated sphere with a ray:', () => {
      const r = new Ray(
        Tuple.getPoint(0, 0, -5),
        Tuple.getVector(0, 0, 1),
      );
      const s = new Sphere();
      s.setTransform(Matrix.translation(5, 0, 0));
      const xs = s.intersect(r);
      expect(xs.length).toBe(0);
    });
  });
  describe('Normals', () => {
    test('The normal on a sphere at a point on the x axis:', () => {
      const s = new Sphere();
      expect(s.normalAt(Tuple.getPoint(1, 0, 0))).toEqual(
        Tuple.getVector(1, 0, 0),
      );
    });
    test('The normal on a sphere at a point on the y axis:', () => {
      const s = new Sphere();
      expect(s.normalAt(Tuple.getPoint(0, 1, 0))).toEqual(
        Tuple.getVector(0, 1, 0),
      );
    });
    test('The normal on a sphere at a point on the z axis:', () => {
      const s = new Sphere();
      expect(s.normalAt(Tuple.getPoint(0, 0, 1))).toEqual(
        Tuple.getVector(0, 0, 1),
      );
    });
    test('The normal on a sphere at a non axial point:', () => {
      const s = new Sphere();
      expect(
        s.normalAt(
          Tuple.getPoint(
            Math.sqrt(3) / 3,
            Math.sqrt(3) / 3,
            Math.sqrt(3) / 3,
          ),
        ),
      ).toEqual(
        Tuple.getVector(
          Math.sqrt(3) / 3,
          Math.sqrt(3) / 3,
          Math.sqrt(3) / 3,
        ),
      );
    });
    test('The normal is a normalized vector:', () => {
      const s = new Sphere();
      const n = s.normalAt(
        Tuple.getPoint(
          Math.sqrt(3) / 3,
          Math.sqrt(3) / 3,
          Math.sqrt(3) / 3,
        ),
      );
      expect(n).toEqual(n.normalize());
    });
    test('Computing the normal on a translated sphere:', () => {
      const s = new Sphere();
      s.setTransform(Matrix.translation(0, 1, 0));
      const n = s.normalAt(Tuple.getPoint(0, 1.70711, -0.70711));
      expect(utils.equal(n.x, 0)).toBe(true);
      expect(utils.equal(n.y, 0.70711)).toBe(true);
      expect(utils.equal(n.z, -0.70711)).toBe(true);
    });
    test('Computing the normal on a transformed sphere:', () => {
      const s = new Sphere();
      const m = Matrix.scaling(1, 0.5, 1).multiply(
        Matrix.rotateZ(Math.PI / 5),
      );
      s.setTransform(m);
      const n = s.normalAt(
        Tuple.getPoint(0, Math.sqrt(2) / 2, -(Math.sqrt(2) / 2)),
      );
      expect(utils.equal(n.x, 0)).toBe(true);
      expect(utils.equal(n.y, 0.97014)).toBe(true);
      expect(utils.equal(n.z, -0.24254)).toBe(true);
    });
  });
  describe('Material:', () => {
    test('A sphere has a default material:', () => {
      const s = new Sphere();
      expect(s.material).toEqual(new Material());
    });
    test('A sphere can be assigned a material:', () => {
      const s = new Sphere();
      const m = new Material();
      m.ambient = 1;
      s.material = m;
      expect(s.material).toEqual(m);
    });
  });
});
