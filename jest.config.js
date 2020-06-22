module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.test|spec).ts?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageDirectory: '<rootDir>/reports/unit',
  coverageReporters: ['text', 'html'],
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    'src/index.ts',
    'src/core/handlers/index.ts',
    'src/core/interfaces/index.ts',
    'src/servers/http/index.ts',
    'src/servers/http/api/controllers/index.ts',
    'src/servers/http/api/middlewares/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  collectCoverageFrom: ['src/**/*.ts'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'jest tests',
        outputDirectory: '<rootDir>/reports/unit',
        outputName: 'junit.xml',
        uniqueOutputName: 'false',
        classNameTemplate: '{classname}-{title}',
        titleTemplate: '{classname}-{title}',
        ancestorSeparator: ' › ',
        suiteNameTemplate: '{filename}'
      }
    ]
  ],
  setupFiles: ['<rootDir>/.jest/setEnvVars.js']
};
