# 🌐 Déploiement Rapide sur VPS Hostinger

## 🚀 Guide Express - 15 minutes

### 📋 Étape 1 : Préparation (Local)
```bash
# Dans votre projet
cd "/Users/zakariafarach/Documents/LakumIA/FRONT-END INFRA IA OF/of-control-center"

# Build de production
npm run build

# Créer l'archive de déploiement
tar -czf of-control-center.tar.gz \
  .next package.json package-lock.json \
  public libs src next.config.js \
  ecosystem.config.js
```

### 🔗 Étape 2 : Connexion VPS Hostinger
```bash
# Connectez-vous à votre VPS
ssh root@VOTRE-IP-VPS

# Ou si vous avez un utilisateur spécifique
ssh votre-username@VOTRE-IP-VPS
```

### ⚙️ Étape 3 : Installation Rapide sur VPS
```bash
# Installation Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installation PM2
sudo npm install -g pm2

# Création du dossier app
sudo mkdir -p /var/www/of-control-center
sudo chown $USER:$USER /var/www/of-control-center
```

### 📦 Étape 4 : Upload et Installation
```bash
# Upload du fichier (depuis votre machine locale)
scp of-control-center.tar.gz votre-username@VOTRE-IP-VPS:/var/www/of-control-center/

# Sur le VPS : extraction et installation
cd /var/www/of-control-center
tar -xzf of-control-center.tar.gz
npm ci --only=production
```

### 🚀 Étape 5 : Démarrage avec PM2
```bash
# Démarrer l'application
pm2 start ecosystem.config.js

# Sauvegarder la config PM2
pm2 save
pm2 startup

# Vérifier que ça fonctionne
pm2 status
curl http://localhost:3000
```

### 🌐 Étape 6 : Configuration Nginx (Optionnel)
```bash
# Installation Nginx
sudo apt install nginx -y

# Configuration basique
sudo tee /etc/nginx/sites-available/of-control-center > /dev/null <<EOF
server {
    listen 80;
    server_name VOTRE-DOMAINE.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Activer le site
sudo ln -s /etc/nginx/sites-available/of-control-center /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🎯 Accès Final

### Sans Nginx (Port 3000) :
- **http://VOTRE-IP-VPS:3000**

### Avec Nginx :
- **http://VOTRE-DOMAINE.com**

## 📱 Comptes de Test
- **admin@of-control.com** / demo123
- **direction@of-control.com** / demo123
- **pedagogy@of-control.com** / demo123
- **sales@of-control.com** / demo123

## 🔧 Commandes Utiles

### Gestion PM2 :
```bash
pm2 status                    # Status des apps
pm2 logs of-control-center   # Voir les logs
pm2 restart of-control-center # Redémarrer
pm2 monit                    # Monitoring temps réel
```

### Mise à jour rapide :
```bash
# Sur votre machine locale
npm run build
tar -czf update.tar.gz .next

# Sur le VPS
scp update.tar.gz votre-username@VOTRE-IP-VPS:/var/www/of-control-center/
ssh votre-username@VOTRE-IP-VPS
cd /var/www/of-control-center
tar -xzf update.tar.gz
pm2 restart of-control-center
```

## 🚨 Dépannage Express

### Application ne démarre pas :
```bash
pm2 logs of-control-center --lines 50
pm2 restart of-control-center
```

### Port déjà utilisé :
```bash
# Changer le port dans ecosystem.config.js
env: {
  PORT: 3001  # Au lieu de 3000
}
```

### Mémoire insuffisante :
```bash
# Dans ecosystem.config.js
max_memory_restart: '300M'  # Réduire la limite
```

## 🎉 Résultat Final

✅ **Application accessible 24/7**
✅ **Redémarrage automatique** en cas de crash
✅ **Monitoring** avec PM2
✅ **Performance optimisée** pour VPS
✅ **Sécurité** de base configurée

---

**Votre OF Control Center sera accessible depuis n'importe où dans le monde !** 🌍✨
