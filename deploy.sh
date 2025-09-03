#!/bin/bash

# 🚀 Script de déploiement automatisé OF Control Center
# Usage: ./deploy.sh [production|staging]

set -e  # Arrêter en cas d'erreur

# Configuration
APP_NAME="of-control-center"
APP_DIR="/var/www/$APP_NAME"
BACKUP_DIR="/var/backups/$APP_NAME"
DATE=$(date +%Y%m%d_%H%M%S)
ENVIRONMENT=${1:-production}

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Fonctions utilitaires
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_step() {
    echo -e "${PURPLE}🚀 $1${NC}"
}

# Vérifications préliminaires
check_requirements() {
    log_step "Vérification des prérequis..."
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js n'est pas installé"
        exit 1
    fi
    
    # Vérifier PM2
    if ! command -v pm2 &> /dev/null; then
        log_error "PM2 n'est pas installé"
        exit 1
    fi
    
    # Vérifier Nginx
    if ! command -v nginx &> /dev/null; then
        log_warning "Nginx n'est pas installé (recommandé pour la production)"
    fi
    
    log_success "Tous les prérequis sont satisfaits"
}

# Sauvegarde de l'ancienne version
backup_current() {
    log_step "Sauvegarde de l'ancienne version..."
    
    if [ -d "$APP_DIR" ]; then
        sudo mkdir -p $BACKUP_DIR
        sudo cp -r $APP_DIR $BACKUP_DIR/backup_$DATE
        log_success "Sauvegarde créée : $BACKUP_DIR/backup_$DATE"
    else
        log_info "Première installation, pas de sauvegarde nécessaire"
    fi
}

# Préparation du build local
prepare_build() {
    log_step "Préparation du build de production..."
    
    # Build de production
    npm run build
    log_success "Build de production terminé"
    
    # Création de l'archive
    tar -czf of-control-center-$DATE.tar.gz \
        .next package.json package-lock.json \
        public libs src next.config.js \
        ecosystem.config.js \
        --exclude=node_modules \
        --exclude=.git
    
    log_success "Archive créée : of-control-center-$DATE.tar.gz"
}

# Déploiement sur le serveur
deploy_to_server() {
    log_step "Déploiement sur le serveur..."
    
    # Créer le dossier si nécessaire
    sudo mkdir -p $APP_DIR
    sudo chown $USER:$USER $APP_DIR
    
    # Extraction de l'archive
    cd $APP_DIR
    tar -xzf ~/of-control-center-$DATE.tar.gz
    
    # Installation des dépendances
    npm ci --only=production
    log_success "Dépendances installées"
}

# Configuration PM2
setup_pm2() {
    log_step "Configuration PM2..."
    
    # Arrêter l'ancienne version si elle existe
    pm2 stop $APP_NAME 2>/dev/null || true
    pm2 delete $APP_NAME 2>/dev/null || true
    
    # Démarrer la nouvelle version
    pm2 start ecosystem.config.js --env $ENVIRONMENT
    
    # Sauvegarder la configuration
    pm2 save
    
    # Configuration du démarrage automatique
    pm2 startup
    
    log_success "PM2 configuré et application démarrée"
}

# Vérification de santé
health_check() {
    log_step "Vérification de santé de l'application..."
    
    # Attendre que l'application démarre
    sleep 10
    
    # Test de connectivité
    if curl -f http://localhost:3000 >/dev/null 2>&1; then
        log_success "Application accessible sur http://localhost:3000"
    else
        log_error "Application non accessible"
        pm2 logs $APP_NAME --lines 20
        exit 1
    fi
    
    # Test des pages principales
    local pages=("administrative" "crm-formation" "suivi-apprenants" "lms-intelligent" "business-intelligence" "finance-operations" "communication-ops")
    
    for page in "${pages[@]}"; do
        if curl -f http://localhost:3000/$page >/dev/null 2>&1; then
            log_success "Page /$page accessible"
        else
            log_warning "Page /$page non accessible"
        fi
    done
}

# Nettoyage
cleanup() {
    log_step "Nettoyage..."
    
    # Supprimer l'archive
    rm -f ~/of-control-center-$DATE.tar.gz
    
    # Nettoyer les anciennes sauvegardes (garder les 5 dernières)
    if [ -d "$BACKUP_DIR" ]; then
        sudo find $BACKUP_DIR -name "backup_*" -type d | sort -r | tail -n +6 | sudo xargs rm -rf
        log_success "Anciennes sauvegardes nettoyées"
    fi
}

# Fonction principale
main() {
    log_step "🎯 Démarrage du déploiement OF Control Center"
    log_info "Environnement: $ENVIRONMENT"
    log_info "Date: $(date)"
    
    check_requirements
    backup_current
    prepare_build
    deploy_to_server
    setup_pm2
    health_check
    cleanup
    
    log_success "🎉 Déploiement terminé avec succès !"
    log_info "Application accessible sur : https://votre-domaine.com"
    log_info "Monitoring PM2 : pm2 monit"
    log_info "Logs : pm2 logs $APP_NAME"
}

# Gestion des erreurs
trap 'log_error "Erreur lors du déploiement à la ligne $LINENO"' ERR

# Exécution
main "$@"
