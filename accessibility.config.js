/**
 * Configuration pour l'accessibilité RGAA 4.1.2 (WCAG 2.1 AA)
 */

module.exports = {
  // Règles d'accessibilité à vérifier
  rules: {
    // Contraste des couleurs
    'color-contrast': {
      enabled: true,
      level: 'AA',
      minRatio: {
        normal: 4.5,
        large: 3.0,
        nonText: 3.0
      }
    },

    // Navigation au clavier
    'keyboard-navigation': {
      enabled: true,
      focusVisible: true,
      tabOrder: true,
      skipLinks: true
    },

    // Annotations ARIA
    'aria-labels': {
      enabled: true,
      requireLabels: true,
      requireDescriptions: true,
      landmarkRoles: true
    },

    // Structure sémantique
    'semantic-structure': {
      enabled: true,
      headingHierarchy: true,
      landmarkStructure: true,
      listStructure: true
    },

    // Images et médias
    'images': {
      enabled: true,
      altText: true,
      decorativeImages: true,
      complexImages: true
    },

    // Formulaires
    'forms': {
      enabled: true,
      labelAssociation: true,
      errorIdentification: true,
      instructions: true
    },

    // Liens
    'links': {
      enabled: true,
      purposeInContext: true,
      focusVisible: true,
      skipDuplicates: false
    },

    // Temporisation et animations
    'timing': {
      enabled: true,
      pauseControl: true,
      autoUpdate: true,
      reducedMotion: true
    }
  },

  // Sélecteurs à ignorer lors des tests
  ignore: [
    // Éléments tiers
    '[data-testid*="storybook"]',
    '[class*="sb-"]',
    '.chromatic-ignore',
    
    // Éléments de développement
    '[data-dev-tools]',
    '.dev-only',
    
    // Composants temporaires
    '.temp-ignore'
  ],

  // Configuration pour les tests automatisés
  testing: {
    // Playwright
    playwright: {
      violations: 'fail', // 'fail' | 'warn' | 'ignore'
      reportPath: './accessibility-report.json',
      includeScreenshots: true
    },

    // Jest
    jest: {
      setupFile: './jest.accessibility.setup.js',
      testMatch: '**/*.accessibility.test.{js,ts,tsx}'
    },

    // Storybook
    storybook: {
      addon: '@storybook/addon-a11y',
      config: {
        element: '#root',
        options: {
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa', 'wcag21aa']
          }
        }
      }
    }
  },

  // Métriques et rapports
  reporting: {
    format: ['json', 'html', 'csv'],
    outputDir: './accessibility-reports',
    includePassedTests: false,
    groupBy: 'severity' // 'severity' | 'rule' | 'component'
  },

  // Configuration par environnement
  environments: {
    development: {
      strictMode: false,
      warnings: true,
      autoFix: true
    },
    
    testing: {
      strictMode: true,
      warnings: true,
      autoFix: false
    },

    production: {
      strictMode: true,
      warnings: false,
      autoFix: false
    }
  },

  // Intégration avec les outils
  integrations: {
    // ESLint
    eslint: {
      plugin: 'eslint-plugin-jsx-a11y',
      rules: {
        'jsx-a11y/accessible-emoji': 'error',
        'jsx-a11y/alt-text': 'error',
        'jsx-a11y/anchor-has-content': 'error',
        'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
        'jsx-a11y/aria-props': 'error',
        'jsx-a11y/aria-proptypes': 'error',
        'jsx-a11y/aria-role': 'error',
        'jsx-a11y/aria-unsupported-elements': 'error',
        'jsx-a11y/click-events-have-key-events': 'error',
        'jsx-a11y/heading-has-content': 'error',
        'jsx-a11y/iframe-has-title': 'error',
        'jsx-a11y/interactive-supports-focus': 'error',
        'jsx-a11y/label-has-associated-control': 'error',
        'jsx-a11y/no-access-key': 'error',
        'jsx-a11y/no-distracting-elements': 'error',
        'jsx-a11y/no-redundant-roles': 'error',
        'jsx-a11y/role-has-required-aria-props': 'error',
        'jsx-a11y/role-supports-aria-props': 'error',
        'jsx-a11y/scope': 'error',
        'jsx-a11y/tabindex-no-positive': 'error'
      }
    },

    // Lighthouse
    lighthouse: {
      accessibility: {
        threshold: 90,
        auditRefs: [
          'accesskeys',
          'aria-allowed-attr',
          'aria-hidden-body',
          'aria-hidden-focus',
          'aria-input-field-name',
          'aria-required-attr',
          'aria-roles',
          'aria-valid-attr',
          'aria-valid-attr-value',
          'button-name',
          'bypass',
          'color-contrast',
          'definition-list',
          'dlitem',
          'document-title',
          'duplicate-id',
          'form-field-multiple-labels',
          'frame-title',
          'heading-order',
          'html-has-lang',
          'html-lang-valid',
          'image-alt',
          'input-image-alt',
          'label',
          'link-name',
          'list',
          'listitem',
          'meta-refresh',
          'meta-viewport',
          'object-alt',
          'tabindex',
          'td-headers-attr',
          'th-has-data-cells',
          'valid-lang'
        ]
      }
    }
  }
};
