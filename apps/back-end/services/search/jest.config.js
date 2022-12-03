module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  moduleNameMapper: {
    uuid: require.resolve('uuid'),
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  //   globalSetup: '<rootDir>/test/setup/globalSetup.ts',
  //   globalTeardown: '<rootDir>/test/setup/globalTeardown.ts',
  //   setupFilesAfterEnv: ['<rootDir>/test/setup/setupFile.ts'],
};
