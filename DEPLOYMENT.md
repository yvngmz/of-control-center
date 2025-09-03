# 🚀 Guide de Déploiement - OF Control Center sur VPS Hostinger

## 📋 Prérequis

### Sur votre VPS Hostinger :
- Ubuntu 20.04+ ou CentOS 8+
- Node.js 18+ 
- PM2 (gestionnaire de processus)
- Nginx (reverse proxy)
- Domaine configuré pointant vers votre VPS

## 🔧 Étape 1 : Préparation du Build de Production

### 1.1 Build local
```bash
# Dans votre projet local
cd "/Users/zakariafarach/Documents/LakumIA/FRONT-END INFRA IA OF/of-control-center"

# Build de production
npm run build

# Test du build
npm start
```

### 1.2 Optimisation pour production
```bash
# Créer un archive pour le déploiement
tar -czf of-control-center-prod.tar.gz .next package.json package-lock.json public libs src next.config.js
```

## 🌐 Étape 2 : Configuration du VPS Hostinger

### 2.1 Connexion SSH
```bash
ssh root@votre-ip-vps
# ou
ssh votre-username@votre-ip-vps
```

### 2.2 Installation des dépendances
```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installation PM2
sudo npm install -g pm2

# Installation Nginx
sudo apt install nginx -y
```

### 2.3 Configuration des dossiers
```bash
# Créer le dossier de l'application
sudo mkdir -p /var/www/of-control-center
sudo chown $USER:$USER /var/www/of-control-center
cd /var/www/of-control-center
```

## 📦 Étape 3 : Upload et Installation

### 3.1 Transfer des fichiers
```bash
# Depuis votre machine locale
scp of-control-center-prod.tar.gz votre-username@votre-ip-vps:/var/www/of-control-center/

# Sur le VPS
cd /var/www/of-control-center
tar -xzf of-control-center-prod.tar.gz
rm of-control-center-prod.tar.gz
```

### 3.2 Installation des dépendances
```bash
# Installation des packages
npm ci --only=production

# Configuration des variables d'environnement
cp .env.production.example .env.production
nano .env.production
```

### 3.3 Configuration .env.production
```bash
NODE_ENV=production
NEXT_PUBLIC_ENABLE_MOCKS=true
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://votre-domaine.com
PORT=3000
```

## ⚙️ Étape 4 : Configuration PM2

### 4.1 Fichier ecosystem.config.js
```javascript
module.exports = {
  apps: [{
    name: 'of-control-center',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/of-control-center',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/of-control-center-error.log',
    out_file: '/var/log/pm2/of-control-center-out.log',
    log_file: '/var/log/pm2/of-control-center.log',
    time: true,
    watch: false,
    max_restarts: 10,
    restart_delay: 4000
  }]
};
```

### 4.2 Démarrage avec PM2
```bash
# Créer les dossiers de logs
sudo mkdir -p /var/log/pm2
sudo chown $USER:$USER /var/log/pm2

# Démarrer l'application
pm2 start ecosystem.config.js

# Sauvegarder la configuration PM2
pm2 save
pm2 startup
```

## 🌐 Étape 5 : Configuration Nginx

### 5.1 Configuration du site
```bash
sudo nano /etc/nginx/sites-available/of-control-center
```

```nginx
server {
    listen 80;
    server_name votre-domaine.com www.votre-domaine.com;
    
    # Redirection HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name votre-domaine.com www.votre-domaine.com;

    # Certificats SSL (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/votre-domaine.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/votre-domaine.com/privkey.pem;
    
    # Configuration SSL sécurisée
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;

    # Headers de sécurité
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:;" always;

    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    # Cache des assets statiques
    location /_next/static/ {
        alias /var/www/of-control-center/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /favicon.ico {
        alias /var/www/of-control-center/public/favicon.ico;
        expires 1y;
    }

    # Proxy vers Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Logs
    access_log /var/log/nginx/of-control-center.access.log;
    error_log /var/log/nginx/of-control-center.error.log;
}
```

### 5.2 Activation du site
```bash
# Activer la configuration
sudo ln -s /etc/nginx/sites-available/of-control-center /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx
```

## 🔒 Étape 6 : Configuration SSL avec Let's Encrypt

### 6.1 Installation Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 6.2 Obtention du certificat SSL
```bash
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com
```

### 6.3 Renouvellement automatique
```bash
# Test du renouvellement
sudo certbot renew --dry-run

# Crontab pour renouvellement automatique
sudo crontab -e
# Ajouter : 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔥 Étape 7 : Configuration du Firewall

```bash
# Configuration UFW
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

## 📊 Étape 8 : Monitoring et Logs

### 8.1 Monitoring PM2
```bash
# Voir le status
pm2 status
pm2 logs of-control-center

# Monitoring en temps réel
pm2 monit
```

### 8.2 Configuration des logs
```bash
# Rotation des logs
pm2 install pm2-logrotate

# Configuration logrotate
sudo nano /etc/logrotate.d/of-control-center
```

## 🚀 Étape 9 : Script de Déploiement Automatisé

Créons un script pour automatiser les futures mises à jour :

```bash
#!/bin/bash
# deploy.sh

echo "🚀 Déploiement OF Control Center..."

# Variables
APP_DIR="/var/www/of-control-center"
BACKUP_DIR="/var/backups/of-control-center"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup de l'ancienne version
echo "📦 Sauvegarde de l'ancienne version..."
sudo mkdir -p $BACKUP_DIR
sudo cp -r $APP_DIR $BACKUP_DIR/backup_$DATE

# Arrêt de l'application
echo "⏹️ Arrêt de l'application..."
pm2 stop of-control-center

# Mise à jour du code
echo "📥 Mise à jour du code..."
cd $APP_DIR
git pull origin main

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm ci --only=production

# Build de production
echo "🏗️ Build de production..."
npm run build

# Redémarrage de l'application
echo "🔄 Redémarrage de l'application..."
pm2 restart of-control-center

# Vérification
echo "✅ Vérification du déploiement..."
sleep 5
pm2 status

echo "🎉 Déploiement terminé avec succès !"
```

## 📱 Étape 10 : Optimisations Spécifiques Hostinger

### 10.1 Configuration pour Hostinger
```bash
# Hostinger utilise souvent des ports spécifiques
# Modifier le port si nécessaire dans package.json
"scripts": {
  "start": "next start -p 3000"
}
```

### 10.2 Configuration mémoire
```javascript
// Dans ecosystem.config.js
module.exports = {
  apps: [{
    name: 'of-control-center',
    script: 'npm',
    args: 'start',
    max_memory_restart: '500M', // Limite mémoire Hostinger
    instances: 1, // 1 seule instance sur VPS basique
    // ... reste de la config
  }]
};
```

## 🔍 Étape 11 : Vérification et Tests

### 11.1 Tests de fonctionnement
```bash
# Test local
curl http://localhost:3000

# Test public
curl https://votre-domaine.com

# Test des pages principales
curl https://votre-domaine.com/administrative
curl https://votre-domaine.com/crm-formation
```

### 11.2 Monitoring de performance
```bash
# Monitoring ressources
htop
free -h
df -h

# Logs en temps réel
tail -f /var/log/nginx/of-control-center.access.log
pm2 logs of-control-center --lines 50
```

## 🛠️ Étape 12 : Maintenance et Mises à Jour

### 12.1 Script de mise à jour
```bash
# Créer un script de mise à jour
sudo nano /usr/local/bin/update-of-control-center
sudo chmod +x /usr/local/bin/update-of-control-center
```

### 12.2 Sauvegarde automatique
```bash
# Crontab pour sauvegarde quotidienne
0 2 * * * /usr/local/bin/backup-of-control-center
```

## 📞 Support et Dépannage

### Problèmes courants :
1. **Port déjà utilisé** → Changer le port dans package.json
2. **Mémoire insuffisante** → Réduire les instances PM2
3. **SSL non configuré** → Vérifier Let's Encrypt
4. **Application ne démarre pas** → Vérifier les logs PM2

### Commandes utiles :
```bash
# Redémarrer tout
pm2 restart all
sudo systemctl restart nginx

# Voir les logs
pm2 logs
sudo tail -f /var/log/nginx/error.log

# Status des services
pm2 status
sudo systemctl status nginx
```

## 🎯 Résultat Final

Votre OF Control Center sera accessible sur :
- **https://votre-domaine.com** (production)
- **Haute disponibilité** avec PM2 cluster
- **SSL automatique** avec Let's Encrypt
- **Performance optimisée** avec Nginx
- **Monitoring** en temps réel

## 🔐 Sécurité

- ✅ HTTPS obligatoire
- ✅ Headers de sécurité
- ✅ Firewall configuré
- ✅ Certificats SSL auto-renouvelés
- ✅ Logs complets pour audit

---

**Votre infrastructure IA sera accessible 24/7 depuis n'importe où dans le monde !** 🌍🚀
