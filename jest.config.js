module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src',
  setupFilesAfterEnv: [
    './src/tests/setup.ts'
    // can have more setup files here
  ]
};