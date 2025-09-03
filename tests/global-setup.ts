/**
 * Configuration globale Playwright - Setup
 */

import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  
  console.log('🚀 Démarrage des tests E2E...');
  console.log(`📍 Base URL: ${baseURL}`);
  
  // Optionnel: Pré-authentification pour certains tests
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Naviguer vers la page de login
    await page.goto(baseURL || 'http://localhost:3000');
    
    // Attendre que la page soit chargée
    await page.waitForSelector('[data-testid="login-form"]', { timeout: 10000 });
    
    console.log('✅ Application accessible et prête pour les tests');
  } catch (error) {
    console.error('❌ Erreur lors de la vérification de l\'application:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;
