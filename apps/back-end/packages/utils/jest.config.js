module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  moduleNameMapper: {},
  coverageDirectory: "../coverage",
  testEnvironment: "node",
};
