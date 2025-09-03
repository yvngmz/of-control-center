/**
 * Configuration PM2 pour OF Control Center
 * Optimisé pour VPS Hostinger
 */

module.exports = {
  apps: [{
    name: 'of-control-center',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/of-control-center',
    
    // Configuration des instances
    instances: 1, // 1 seule instance pour VPS basique Hostinger
    exec_mode: 'fork', // fork mode pour économiser la mémoire
    
    // Variables d'environnement
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXT_PUBLIC_ENABLE_MOCKS: 'true' // Mode démo en production
    },
    
    // Gestion de la mémoire (important pour Hostinger)
    max_memory_restart: '400M', // Redémarrage si > 400MB
    
    // Logs
    error_file: '/var/log/pm2/of-control-center-error.log',
    out_file: '/var/log/pm2/of-control-center-out.log',
    log_file: '/var/log/pm2/of-control-center.log',
    time: true,
    
    // Gestion des redémarrages
    watch: false,
    ignore_watch: ['node_modules', '.next', 'logs'],
    max_restarts: 10,
    restart_delay: 4000,
    
    // Auto-restart en cas de crash
    autorestart: true,
    
    // Configuration de santé
    health_check_url: 'http://localhost:3000',
    health_check_grace_period: 3000,
    
    // Variables spécifiques production
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXT_PUBLIC_ENABLE_MOCKS: 'true',
      // Ajoutez vos autres variables ici
    }
  }],

  // Configuration de déploiement (optionnel)
  deploy: {
    production: {
      user: 'root',
      host: 'votre-ip-vps',
      ref: 'origin/main',
      repo: 'git@github.com:votre-username/of-control-center.git',
      path: '/var/www/of-control-center',
      'post-deploy': 'npm ci --only=production && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'apt update && apt install git -y'
    }
  }
};
