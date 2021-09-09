const { EPSILON } = require('./constants');

/**
 *
 * Compares two floating point numbers within an error of EPSILON
 * @param {Number} a
 * @param {Number} b
 * @returns {boolean}
 */
exports.equal = (a, b) => {
  if (Math.abs(a - b) < EPSILON) return true;
  return false;
};
