module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  testEnvironment: 'node',
  testTimeout: 30000, // Increased timeout for async Pact tests
  verbose: true,
  collectCoverage: true,
  coverageDirectory: './docs/coverage', // Adjust path
  collectCoverageFrom: ['src/**/*.ts'], // Specify files for coverage
  transform: {
    '^.+\\.ts?$': 'ts-jest', // Use transform for ts-jest instead of globals
  },
  rootDir: './', // Adjust based on your project structure
  testMatch: ['**/*.test.ts'], // Matches all .test.ts files
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  moduleNameMapper: {
    '^@models/(.*)$': '<rootDir>/src/infrastructure/persistence/models/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // tsconfig.json at the root of your project
    },
  },
};
