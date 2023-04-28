/** @type {import('jest').Config} */
module.exports = {
  clearMocks: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules', 'dist'],
  preset: 'ts-jest/presets/js-with-babel',
  transform: { '\\.[jt]sx?$': 'babel-jest' },
};
