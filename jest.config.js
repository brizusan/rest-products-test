/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  coverageDirectory: "coverage",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};