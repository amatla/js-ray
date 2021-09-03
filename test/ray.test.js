const Ray = require('../src/ray');
const Tuple = require('../src/tuple');

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
});
