module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  moduleNameMapper: {
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve('uuid'),
    prismaService: '<rootDir>/src/prisma.service',
    '@prisma-client': '<rootDir>/prisma/generated/client',
    '^@users-interations/(.+)$': '<rootDir>/src/users-interactions/$1',
    '^@user-activity-stats/(.+)$': '<rootDir>/src/user-activity-stats/$1',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  globalSetup: '<rootDir>/test/setup/globalSetup.ts',
  globalTeardown: '<rootDir>/test/setup/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/test/setup/setupFile.ts'],
};
