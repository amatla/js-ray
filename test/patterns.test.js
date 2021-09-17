const Color = require('../src/color');
const Tuple = require('../src/tuple');
const StripePattern = require('../src/patterns/stripe');
const Material = require('../src/material');
const PointLight = require('../src/pointLight');
const Sphere = require('../src/shapes/sphere');
const Matrix = require('../src/matrix');

describe('Patterns:', () => {
  describe('Stripe:', () => {
    test('Creating a stripe pattern:', () => {
      const pattern = new StripePattern(Color.WHITE, Color.BLACK);
      expect(pattern.a).toEqual(Color.WHITE);
      expect(pattern.b).toEqual(Color.BLACK);
    });
    test('A stripe pattern is constant in y:', () => {
      const pattern = new StripePattern(Color.WHITE, Color.BLACK);
      expect(pattern.patternAt(Tuple.getPoint(0, 0, 0))).toEqual(
        Color.WHITE,
      );
      expect(pattern.patternAt(Tuple.getPoint(0, 1, 0))).toEqual(
        Color.WHITE,
      );
      expect(pattern.patternAt(Tuple.getPoint(0, 2, 0))).toEqual(
        Color.WHITE,
      );
    });
    test('A stripe pattern is constant in z:', () => {
      const pattern = new StripePattern(Color.WHITE, Color.BLACK);
      expect(pattern.patternAt(Tuple.getPoint(0, 0, 0))).toEqual(
        Color.WHITE,
      );
      expect(pattern.patternAt(Tuple.getPoint(0, 0, 1))).toEqual(
        Color.WHITE,
      );
      expect(pattern.patternAt(Tuple.getPoint(0, 0, 2))).toEqual(
        Color.WHITE,
      );
    });
    test('A stripe pattern alternates in x:', () => {
      const pattern = new StripePattern(Color.WHITE, Color.BLACK);
      expect(pattern.patternAt(Tuple.getPoint(0, 0, 0))).toEqual(
        Color.WHITE,
      );
      expect(pattern.patternAt(Tuple.getPoint(0.9, 0, 0))).toEqual(
        Color.WHITE,
      );
      expect(pattern.patternAt(Tuple.getPoint(1, 0, 0))).toEqual(
        Color.BLACK,
      );
      expect(pattern.patternAt(Tuple.getPoint(-0.1, 0, 0))).toEqual(
        Color.BLACK,
      );
      expect(pattern.patternAt(Tuple.getPoint(-1, 0, 0))).toEqual(
        Color.BLACK,
      );
      expect(pattern.patternAt(Tuple.getPoint(-1.1, 0, 0))).toEqual(
        Color.WHITE,
      );
    });
    test('Lighting with a pattern applied:', () => {
      const s = new Sphere();
      const m = new Material();
      m.pattern = new StripePattern(Color.WHITE, Color.BLACK);
      m.ambient = 1;
      m.diffuse = 0;
      m.specular = 0;
      const eyeV = Tuple.getVector(0, 0, -1);
      const normalV = Tuple.getVector(0, 0, -1);
      const light = new PointLight(
        Tuple.getPoint(0, 0, -10),
        Color.WHITE,
      );
      const c1 = m.lighting(
        s,
        light,
        Tuple.getPoint(0.9, 0, 0),
        eyeV,
        normalV,
        false,
      );
      const c2 = m.lighting(
        s,
        light,
        Tuple.getPoint(1.1, 0, 0),
        eyeV,
        normalV,
        false,
      );
      expect(c1).toEqual(Color.WHITE);
      expect(c2).toEqual(Color.BLACK);
    });
    test('Stripes with object transformation:', () => {
      const obj = new Sphere();
      obj.setTransform(Matrix.scaling(2, 2, 2));
      const pattern = new StripePattern(Color.WHITE, Color.BLACK);
      const c = pattern.patternAtShape(
        obj,
        Tuple.getPoint(1.5, 0, 0),
      );
      expect(c).toEqual(Color.WHITE);
    });
    test('Stripes with a pattern transformation:', () => {
      const obj = new Sphere();
      const pattern = new StripePattern(Color.WHITE, Color.BLACK);
      pattern.setTransform(Matrix.scaling(2, 2, 2));
      const c = pattern.patternAtShape(
        obj,
        Tuple.getPoint(1.5, 0, 0),
      );
      expect(c).toEqual(Color.WHITE);
    });
    test('Stripes with object and pattern transformation:', () => {
      const obj = new Sphere();
      const pattern = new StripePattern(Color.WHITE, Color.BLACK);
      obj.setTransform(Matrix.scaling(2, 2, 2));
      pattern.setTransform(Matrix.translation(0.5, 0, 0));
      const c = pattern.patternAtShape(
        obj,
        Tuple.getPoint(1.5, 0, 0),
      );
      expect(c).toEqual(Color.WHITE);
    });
  });
});
