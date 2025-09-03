/**
 * Configuration Playwright pour les tests E2E
 */

import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

export default defineConfig({
  // Répertoire des tests
  testDir: './tests/e2e',
  
  // Timeout global pour les tests
  timeout: 30000,
  
  // Expect timeout
  expect: {
    timeout: 5000
  },

  // Configuration pour les tests en parallèle
  fullyParallel: true,
  
  // Reprendre les tests échoués en CI
  retries: process.env.CI ? 2 : 0,
  
  // Nombre de workers
  workers: process.env.CI ? 1 : undefined,

  // Configuration du reporter
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'playwright-results.json' }],
    process.env.CI ? ['github'] : ['list']
  ],

  // Configuration globale
  use: {
    // URL de base pour les tests
    baseURL,

    // Traces en cas d'échec
    trace: 'on-first-retry',
    
    // Screenshots en cas d'échec
    screenshot: 'only-on-failure',
    
    // Vidéos en cas d'échec
    video: 'retain-on-failure',

    // Timeout pour les actions
    actionTimeout: 10000,
    
    // Timeout pour la navigation
    navigationTimeout: 30000,

    // Locale française
    locale: 'fr-FR',
    timezoneId: 'Europe/Paris',

    // Configuration pour l'accessibilité
    colorScheme: 'light',
  },

  // Configuration des projets (navigateurs)
  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile browsers
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    // Tests d'accessibilité
    {
      name: 'accessibility',
      use: { 
        ...devices['Desktop Chrome'],
        // Configuration spéciale pour les tests d'accessibilité
        extraHTTPHeaders: {
          'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8'
        }
      },
      testMatch: '**/*.accessibility.spec.ts'
    },

    // Tests de performance
    {
      name: 'performance',
      use: { 
        ...devices['Desktop Chrome'],
        // Configuration pour les métriques de performance
        launchOptions: {
          args: ['--enable-precise-memory-info']
        }
      },
      testMatch: '**/*.performance.spec.ts'
    }
  ],

  // Serveur de développement local
  webServer: {
    command: 'npm run dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  // Configuration des dossiers
  outputDir: 'test-results/',
  
  // Configuration globale des tests
  globalSetup: './tests/global-setup.ts',
  globalTeardown: './tests/global-teardown.ts',
});
