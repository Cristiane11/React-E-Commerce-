const jestConfig = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^firebase/app$": "<rootDir>/src/__mocks__/firebase/app.ts",
    "^firebase/auth$": "<rootDir>/src/__mocks__/firebase/auth.ts",
    "^firebase/firestore$": "<rootDir>/src/__mocks__/firebase/firestore.ts",
    "\\.(gif|eot|svg|png|jpg|ttf|woff|woff2)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};

export default jestConfig;