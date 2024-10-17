module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: './docs/coverage', // Adjust path
  collectCoverageFrom: ['src/**/*.ts'], // Specify files for coverage
  transform: {
    '^.+\\.ts?$': 'ts-jest', // Let Jest use ts-jest to transform TypeScript files
  },
  rootDir: './', // Adjust based on your project structure
  testMatch: ['**/*.test.ts'], // Matches all .test.ts files
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
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
