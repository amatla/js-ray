const Sphere = require('../src/shapes/sphere');
const Intersection = require('../src/intersection');

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
});
