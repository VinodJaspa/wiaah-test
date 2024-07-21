module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  // testRegex: '.*\\.spec\\.ts$',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  moduleNameMapper: {
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve('uuid'),
    '@input': '<rootDir>/src/dto',
    prismaService: '<rootDir>/src/prisma.service',
    prismaClient: '<rootDir>/prisma/generated/client',
    '@entities': '<rootDir>/src/entities',
    '@manger': '<rootDir>/src/manager',
    '@notification-settings': '<rootDir>/src/notification-settings',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  globalSetup: '<rootDir>/test/setup/globalSetup.ts',
  globalTeardown: '<rootDir>/test/setup/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/test/setup/setupFile.ts'],
};
