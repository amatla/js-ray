class RayError extends Error {
  static get errorMessage() {
    return {
      ray001: 'Invalid Type',
      ray002: 'Invalid Operation',
      ray003: 'Invalid Size',
    };
  }

  /**
   *
   * @param {string} code
   * @param {string} message
   */
  constructor(code, message) {
    super(message);
    this.code = code;
    this.errorMessage = RayError.errorMessage[this.code];
    this.message = `${this.code} -- ${this.errorMessage}: ${message}`;
  }
}

module.exports = RayError;
