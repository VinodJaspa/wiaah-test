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
    '@category': '<rootDir>/src/category',
    prismaService: '<rootDir>/src/prisma.service',
    '@prisma-client': '<rootDir>/prisma/generated/client',
    '@filter': '<rootDir>/src/filter',
    '@shop': '<rootDir>/src/shop',
    '@products': '<rootDir>/src/products',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
