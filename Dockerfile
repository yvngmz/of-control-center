# Dockerfile pour OF Control Center
# Optimisé pour déploiement VPS

# Stage 1: Build
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm ci --only=production --ignore-scripts

# Copier le code source
COPY . .

# Build de production
RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS runner

# Variables d'environnement
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires depuis le build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Changer les permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

# Exposer le port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Commande de démarrage
CMD ["node", "server.js"]
