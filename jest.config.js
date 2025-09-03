/** @type {import('jest').Config} */
const config = {
  // Environnement de test
  testEnvironment: 'jsdom',

  // Extensions de fichiers à transformer
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  // Patterns pour trouver les fichiers de test
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js|jsx)',
    '**/*.(test|spec).(ts|tsx|js|jsx)'
  ],

  // Transformation des fichiers
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }],
    '^.+\\.(js|jsx)$': ['babel-jest', {
      presets: ['next/babel']
    }]
  },

  // Configuration des modules
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@libs/(.*)$': '<rootDir>/libs/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js'
  },

  // Fichiers de configuration
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Dossiers à ignorer
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/out/'
  ],

  // Couverture de code
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    'libs/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/app/layout.tsx',
    '!src/app/globals.css'
  ],

  // Seuils de couverture
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },

  // Format des rapports de couverture
  coverageReporters: [
    'text',
    'lcov',
    'html'
  ],

  // Variables d'environnement pour les tests
  testEnvironmentOptions: {
    url: 'http://localhost:3000'
  },

  // Délai d'attente par défaut pour les tests
  testTimeout: 10000,

  // Modules à transformer (même dans node_modules)
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.(mjs|esm|jsx?|tsx?)$))'
  ],

  // Configuration pour les tests en parallèle
  maxWorkers: '50%',

  // Nettoyage automatique des mocks
  clearMocks: true,
  restoreMocks: true
};

module.exports = config;
