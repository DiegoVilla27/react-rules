module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: false,
        useESM: true,
        babelConfig: true,
        plugins: ["babel-plugin-transform-vite-meta-env"],
      }
    ],
  },
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@otherFolder/(.*)$": "<rootDir>/src/otherFolder/$1"
  }
};