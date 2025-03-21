module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.js$": "babel-jest",
    },
    moduleFileExtensions: ["js"],
    testMatch: ["**/tests/**/*.test.js"],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.js"],
    coverageDirectory: "coverage",
};
