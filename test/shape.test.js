const Shape = require('../src/shapes/testShape');
const Matrix = require('../src/matrix');
const Material = require('../src/material');
const TestShape = require('../src/shapes/testShape');
const Ray = require('../src/ray');
const Tuple = require('../src/tuple');

describe('Shape:', () => {
  test('The default transformation:', () => {
    const s = new TestShape();
    expect(s.transform.equals(Matrix.identityMatrix())).toBe(true);
  });
  test('Assigning a transformation:', () => {
    const s = new TestShape();
    s.setTransform(Matrix.translation(2, 3, 4));
    expect(s.transform.equals(Matrix.translation(2, 3, 4))).toBe(
      true,
    );
  });
  test('Default material', () => {
    const s = new Shape();
    expect(s.material).toEqual(new Material());
  });
  test('Assigning a material', () => {
    const s = new Shape();
    const m = new Material();
    m.ambient = 1;
    s.material = m;
    expect(s.material).toEqual(m);
  });
  test('Intersection a scaled shape with a ray:', () => {
    const r = new Ray(
      Tuple.getPoint(0, 0, -5),
      Tuple.getVector(0, 0, 1),
    );
    const s = new TestShape();
    s.setTransform(Matrix.scaling(2, 2, 2));
    s.intersect(r);
    expect(
      Tuple.compare(s.savedRay.origin, Tuple.getPoint(0, 0, -2.5)),
    ).toBe(true);
    expect(
      Tuple.compare(s.savedRay.direction, Tuple.getVector(0, 0, 0.5)),
    ).toBe(true);
  });
  test('Intersection a translated shape with a ray:', () => {
    const r = new Ray(
      Tuple.getPoint(0, 0, -5),
      Tuple.getVector(0, 0, 1),
    );
    const s = new TestShape();
    s.setTransform(Matrix.translation(5, 0, 0));
    s.intersect(r);
    expect(
      Tuple.compare(s.savedRay.origin, Tuple.getPoint(-5, 0, -5)),
    ).toBe(true);
    expect(
      Tuple.compare(s.savedRay.direction, Tuple.getVector(0, 0, 1)),
    ).toBe(true);
  });
  test('Computing the normal on a translated sphere:', () => {
    const s = new TestShape();
    s.setTransform(Matrix.translation(0, 1, 0));
    const n = s.normalAt(Tuple.getPoint(0, 1.70711, -0.70711));
    expect(
      Tuple.compare(n, Tuple.getVector(0, 0.70711, -0.70711)),
    ).toBe(true);
  });
  test('Computing the normal on a transformed sphere:', () => {
    const s = new TestShape();
    const m = Matrix.scaling(1, 0.5, 1).multiply(
      Matrix.rotateZ(Math.PI / 5),
    );
    s.setTransform(m);
    const n = s.normalAt(
      Tuple.getPoint(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2),
    );
    expect(
      Tuple.compare(n, Tuple.getVector(0, 0.97014, -0.24254)),
    ).toBe(true);
  });
});
