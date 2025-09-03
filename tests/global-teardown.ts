/**
 * Configuration globale Playwright - Teardown
 */

import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Nettoyage après les tests E2E...');
  
  // Nettoyer les données de test si nécessaire
  // Par exemple, supprimer les fichiers temporaires, réinitialiser la base de données, etc.
  
  console.log('✅ Nettoyage terminé');
}

export default globalTeardown;
