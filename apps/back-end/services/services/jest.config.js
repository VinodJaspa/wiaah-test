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
    '@category': '<rootDir>/src/category',
    prismaService: '<rootDir>/src/prisma.service',
    prismaClient: '<rootDir>/prisma/generated/client',
    '@entities': '<rootDir>/src/entities',
    '@const': '<rootDir>/src/constents',
    '@decorators': '<rootDir>/src/decorators',
    '@restaurant': '<rootDir>/src/restaurant',
    '@service-ownership': '<rootDir>/src/service-ownership',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  globalSetup: '<rootDir>/test/setup/globalSetup.ts',
  globalTeardown: '<rootDir>/test/setup/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/test/setup/setupFile.ts'],
};
