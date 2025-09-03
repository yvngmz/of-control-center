/**
 * Configuration MSW pour le navigateur (mode démo)
 */

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Configuration du service worker MSW
export const worker = setupWorker(...handlers);

// Fonction pour démarrer les mocks en développement
export async function enableMocking() {
  if (typeof window === 'undefined') {
    return;
  }

  // Ne démarrer les mocks qu'en mode développement ou démo
  if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_ENABLE_MOCKS === 'true') {
    await worker.start({
      onUnhandledRequest: 'bypass', // Ignorer les requêtes non mockées
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    });
    
    console.log('🚀 MSW mocks activés en mode démo');
  }
}

// Fonction pour arrêter les mocks
export async function disableMocking() {
  if (typeof window !== 'undefined' && worker) {
    await worker.stop();
    console.log('🛑 MSW mocks désactivés');
  }
}
