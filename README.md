# OF Control Center - Infrastructure IA

> Tableau de bord centralisé et interactif pour visualiser et piloter toute l'infrastructure IA d'un Organisme de Formation (OF)

## 🎯 Vue d'ensemble

OF Control Center est une application web moderne qui centralise la gestion de tous les aspects d'un organisme de formation : administratif/Qualiopi, CRM/Marketing, relation apprenant, pédagogie/LMS, data & BI, opérations internes, finance, conformité (RGPD/AI Act/RGAA), et intégrations.

### ✨ Fonctionnalités principales

- **🔐 Authentification RBAC** - 8 rôles utilisateur avec permissions granulaires
- **📊 Tableaux de bord interactifs** - KPIs en temps réel et drill-down
- **🎨 Interface moderne** - Design system cohérent avec dark/light mode
- **♿ Accessibilité RGAA 4.1.2** - Conforme WCAG 2.1 AA
- **🌍 Internationalisation** - FR par défaut, EN optionnel
- **📱 Responsive design** - Optimisé mobile et desktop
- **🧪 Tests complets** - Jest/RTL + Playwright + Storybook
- **🚀 Performance** - LCP < 2.5s, optimisations avancées

## 🏗️ Architecture technique

### Stack technologique

- **Framework** : Next.js 14 (App Router) + TypeScript
- **Styling** : Tailwind CSS + shadcn/ui
- **Animations** : Framer Motion
- **État** : TanStack Query + React Context
- **Forms** : React Hook Form + Zod
- **Charts** : Recharts
- **Architecture** : react-flow (cartes d'architecture)
- **Icons** : lucide-react
- **Thèmes** : next-themes

### Structure du projet

```
of-control-center/
├── libs/                    # Bibliothèques partagées
│   ├── auth/               # Authentification et RBAC
│   ├── types/              # Types TypeScript
│   ├── constants/          # Configuration des modules
│   ├── utils/              # Utilitaires (i18n, accessibilité)
│   ├── data/               # Données de seed
│   └── mocks/              # MSW handlers
├── src/
│   ├── app/                # Pages Next.js (App Router)
│   │   ├── dashboard/      # Tableau de bord principal
│   │   ├── admin/          # Module Administratif/Qualiopi
│   │   ├── sales/          # Module CRM/Marketing
│   │   ├── csm/            # Module Relation Apprenant
│   │   ├── pedagogy/       # Module Pédagogie/LMS
│   │   ├── analytics/      # Module Data & BI
│   │   ├── operations/     # Module Opérations internes
│   │   ├── finance/        # Module Finance
│   │   ├── dpo/            # Module Conformité
│   │   └── integrations/   # Module Intégrations
│   ├── components/         # Composants React
│   │   ├── ui/             # Composants shadcn/ui
│   │   ├── layout/         # Layout et navigation
│   │   ├── auth/           # Authentification
│   │   ├── dashboard/      # Tableaux de bord
│   │   ├── modules/        # Composants métier
│   │   ├── forms/          # Formulaires
│   │   └── charts/         # Graphiques
│   └── lib/                # Configuration et utilitaires
├── tests/                  # Tests E2E Playwright
├── .storybook/             # Configuration Storybook
└── public/                 # Assets statiques
```

## 🚀 Installation et démarrage

### Prérequis

- Node.js 18+ 
- npm ou yarn
- Git

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd of-control-center

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

### Comptes de démonstration

| Rôle | Email | Mot de passe | Accès |
|------|-------|--------------|--------|
| Administrateur | admin@of-control.com | demo123 | Complet |
| Direction | direction@of-control.com | demo123 | Stratégique |
| Resp. Pédagogique | pedagogy@of-control.com | demo123 | Programmes/Apprenants |
| Formateur | trainer@of-control.com | demo123 | Contenus pédagogiques |
| Commercial/Marketing | sales@of-control.com | demo123 | Prospects/Campagnes |
| Customer Success | csm@of-control.com | demo123 | Suivi apprenants |
| DPO/Conformité | dpo@of-control.com | demo123 | RGPD/AI Act/RGAA |
| Auditeur | auditor@of-control.com | demo123 | Lecture seule |

## 🧪 Tests

### Tests unitaires et d'intégration

```bash
# Lancer tous les tests
npm test

# Tests en mode watch
npm run test:watch

# Tests avec couverture
npm run test:coverage
```

### Tests E2E avec Playwright

```bash
# Installer les navigateurs Playwright
npx playwright install

# Lancer tous les tests E2E
npm run test:e2e

# Tests E2E avec interface graphique
npm run test:e2e:ui

# Tests d'accessibilité
npm run test:accessibility

# Tests de performance
npm run test:performance
```

### Storybook

```bash
# Démarrer Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

Storybook sera accessible sur [http://localhost:6006](http://localhost:6006)

## 🎭 Rôles et permissions (RBAC)

### Système de rôles

Le système RBAC définit 8 rôles avec des niveaux d'accès différents :

1. **Administrateur** (niveau 10) - Accès complet
2. **Direction** (niveau 9) - Vue stratégique
3. **DPO/Conformité** (niveau 8) - Conformité réglementaire
4. **Responsable Pédagogique** (niveau 7) - Gestion pédagogique
5. **Commercial/Marketing** (niveau 6) - Prospection et marketing
6. **Customer Success Manager** (niveau 6) - Relation client
7. **Formateur** (niveau 5) - Contenus pédagogiques
8. **Auditeur** (niveau 4) - Lecture seule pour audits

### Modules et permissions

| Module | Admin | Direction | Resp. Péda | Formateur | Sales/Mkt | CSM | DPO | Auditeur |
|--------|-------|-----------|------------|-----------|-----------|-----|-----|----------|
| Administratif/Qualiopi | ✅ | 👁️ | ❌ | ❌ | ❌ | ❌ | ❌ | 👁️ |
| CRM/Marketing | ✅ | 👁️ | ❌ | ❌ | ✅ | ❌ | ❌ | 👁️ |
| Relation Apprenant | ✅ | 👁️ | ✅ | 👁️ | ❌ | ✅ | ❌ | 👁️ |
| Pédagogie/LMS | ✅ | 👁️ | ✅ | ✅ | ❌ | 👁️ | ❌ | 👁️ |
| Data & BI | ✅ | 👁️ | 👁️ | 👁️ | 👁️ | 👁️ | ❌ | 👁️ |
| Opérations internes | ✅ | 👁️ | ❌ | ❌ | ❌ | ❌ | ❌ | 👁️ |
| Finance | ✅ | 👁️ | ❌ | ❌ | ❌ | ❌ | ❌ | 👁️ |
| Conformité | ✅ | 👁️ | ❌ | ❌ | ❌ | ❌ | ✅ | 👁️ |
| Intégrations | ✅ | 👁️ | ❌ | ❌ | ❌ | ❌ | 👁️ | 👁️ |

**Légende** : ✅ Accès complet | 👁️ Lecture seule | ❌ Pas d'accès

## 📊 Modules métier

### 1. Administratif/Qualiopi
- Suivi des 32 indicateurs Qualiopi
- Gestion des preuves et documents
- Planification des audits
- Tableau de bord de conformité

### 2. CRM/Marketing
- Gestion des prospects et leads
- Campagnes marketing (email, social, SMS, webinaires)
- Tunnel de conversion et analytics
- Automatisation marketing

### 3. Relation Apprenant
- Suivi des inscriptions et parcours
- Support et assistance
- Enquêtes de satisfaction
- Tableau de bord CSM

### 4. Pédagogie/LMS
- Catalogue des programmes de formation
- Bibliothèque de contenus pédagogiques
- Évaluations et quiz
- Gestion des formateurs

### 5. Data & BI
- KPIs et métriques clés
- Rapports personnalisés
- Analyses prédictives IA
- Exports de données

### 6. Opérations internes
- Workflows et processus automatisés
- Gestion des tâches
- Ressources et planning
- Calendrier général

### 7. Finance
- Suivi du chiffre d'affaires
- Gestion des dépenses
- Planification budgétaire
- Facturation

### 8. Conformité (RGPD/AI Act/RGAA)
- Conformité RGPD
- Conformité AI Act
- Accessibilité RGAA
- Piste d'audit

### 9. Intégrations
- **EDOF** - Portail de l'alternance
- **Kairos** - Gestion des temps
- **OPCO** - Financement formations
- **Make/N8N** - Outils d'automatisation

## ♿ Accessibilité (RGAA 4.1.2)

### Standards respectés

- **WCAG 2.1 niveau AA** - Conformité complète
- **Contraste des couleurs** - Ratios minimum respectés
- **Navigation au clavier** - Tous les éléments accessibles
- **Lecteurs d'écran** - Annotations ARIA complètes
- **Focus management** - Gestion avancée du focus
- **Responsive design** - Adaptatif sur tous appareils

### Fonctionnalités d'accessibilité

- Focus trap dans les modales
- Annonces aux lecteurs d'écran
- Support des préférences système (reduced motion, high contrast)
- Raccourcis clavier
- Descriptions alternatives complètes

## 🌍 Internationalisation

### Langues supportées

- **Français** (par défaut) - Langue principale
- **Anglais** (optionnel) - Traduction complète

### Fonctionnalités i18n

- Traductions complètes de l'interface
- Formatage des dates et nombres selon la locale
- Formatage des devises (EUR/USD)
- Détection automatique de la langue du navigateur

## 🔧 Configuration et personnalisation

### Variables d'environnement

```env
# Mode démo (active les mocks MSW)
NEXT_PUBLIC_ENABLE_MOCKS=true

# Configuration API (en production)
NEXT_PUBLIC_API_BASE_URL=https://api.of-control.com

# Monitoring et analytics
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
```

### Thèmes et personnalisation

Le système de thèmes est basé sur CSS variables et next-themes :

```css
/* Thème clair */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... */
}

/* Thème sombre */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  /* ... */
}
```

## 🚀 Déploiement

### Build de production

```bash
# Build optimisé
npm run build

# Démarrer en production
npm start
```

### Déploiement Vercel (recommandé)

1. Connecter le repository à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement sur push

### Autres plateformes

L'application est compatible avec :
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker/Kubernetes

## 📈 Performance

### Métriques cibles

- **LCP** < 2.5s (Largest Contentful Paint)
- **FID** < 100ms (First Input Delay)
- **CLS** < 0.1 (Cumulative Layout Shift)
- **TTFB** < 600ms (Time to First Byte)

### Optimisations implémentées

- Code splitting automatique avec Next.js
- Lazy loading des composants
- Optimisation des images avec next/image
- Compression gzip/brotli
- Service worker pour le cache
- Bundle analyzer intégré

## 🔒 Sécurité

### Mesures de sécurité

- **CSP stricte** - Content Security Policy
- **Headers de sécurité** - helmet-like configuration
- **Protection CSRF** - sur toutes les actions
- **Validation côté client et serveur** - avec Zod
- **Authentification sécurisée** - JWT avec refresh tokens
- **Audit trail** - Traçabilité des actions sensibles

### Conformité

- **RGPD** - Gestion des données personnelles
- **AI Act** - Classification des systèmes IA
- **RGAA 4.1.2** - Accessibilité numérique
- **ISO 27001** - Bonnes pratiques sécurité

## 🤝 Contribution

### Workflow de développement

1. Fork du repository
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit des changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

### Standards de code

- **ESLint** - Linting automatique
- **Prettier** - Formatage du code
- **Husky** - Git hooks
- **Conventional Commits** - Messages de commit standardisés
- **Tests obligatoires** - Couverture > 80%

## 📚 Documentation

### Ressources

- **Storybook** - Documentation des composants
- **API Documentation** - Swagger/OpenAPI
- **Architecture Decision Records** - Décisions techniques
- **User Manual** - Guide utilisateur complet

### Support

- **Issues GitHub** - Bugs et demandes de fonctionnalités
- **Discussions** - Questions et échanges
- **Wiki** - Documentation détaillée
- **Changelog** - Historique des versions

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Développé avec ❤️ pour les Organismes de Formation**

*OF Control Center - Votre infrastructure IA centralisée*