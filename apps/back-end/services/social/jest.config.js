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
    '@entities': '<rootDir>/src/entities/index.ts',
    prismaClient: '<rootDir>/prisma/generated/index.js',
    '@input': '<rootDir>/src/dto/index.ts',
    '@exceptions': '<rootDir>/src/exceptions/index.ts',
    '@profile-error-messages': '<rootDir>/src/profile/profileErrorMessage.ts',
    prismaService: '<rootDir>/src/prisma.service.ts',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
