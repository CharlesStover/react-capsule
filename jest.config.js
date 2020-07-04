module.exports = {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.test.{ts,tsx}',
    '!<rootDir>/src/**/test-utils/*.{ts,tsx}',
  ],
  coverageDirectory: './jest/coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    '\\.(?:css|gif|jpg|png|scss)$': '<rootDir>/test-utils/empty.ts',
  },
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
