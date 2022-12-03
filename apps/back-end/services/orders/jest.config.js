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
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve('uuid'),
    '@dto': '<rootDir>/src/dto',
    prismaService: '<rootDir>/src/prisma.service',
    '@prisma-client': '<rootDir>/prisma/generated/client',
    '@entities': '<rootDir>/src/entities',
    '@exceptions': '<rootDir>/src/exceptions',
    '^@orders/(.+)$': '<rootDir>/src/orders/$1',
    '^@refund/(.+)$': '<rootDir>/src/refund/$1',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  globalSetup: '<rootDir>/test/setup/globalSetup.ts',
  globalTeardown: '<rootDir>/test/setup/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/test/setup/setupFile.ts'],
};
