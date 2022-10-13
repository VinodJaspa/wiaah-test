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
    prismaClient: '<rootDir>/prisma/generated/client/index.js',
    prismaService: '<rootDir>/src/prisma.service.ts',
    '@category': '<rootDir>/src/category',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
