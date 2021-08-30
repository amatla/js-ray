const RayError = require('../src/errors');

describe('RayError:', () => {
  test('Invalid Type:', () => {
    expect(() => {
      throw new RayError('ray001', 'error message');
    }).toThrow(RayError);
    expect(() => {
      throw new RayError('ray001', 'error message');
    }).toThrow('ray001 -- Invalid Type: error message');
  });
  test('Invalid Operation:', () => {
    expect(() => {
      throw new RayError('ray002', 'error message');
    }).toThrow(RayError);
    expect(() => {
      throw new RayError('ray002', 'error message');
    }).toThrow('ray002 -- Invalid Operation: error message');
  });
  test('Invalid Size:', () => {
    expect(() => {
      throw new RayError('ray003', 'error message');
    }).toThrow(RayError);
    expect(() => {
      throw new RayError('ray003', 'error message');
    }).toThrow('ray003 -- Invalid Size: error message');
  });
});
