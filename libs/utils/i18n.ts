/**
 * Système d'internationalisation (i18n)
 * FR par défaut, EN optionnel
 */

export type Locale = 'fr' | 'en';

export const DEFAULT_LOCALE: Locale = 'fr';
export const SUPPORTED_LOCALES: Locale[] = ['fr', 'en'];

// Dictionnaire des traductions
export const translations = {
  fr: {
    // Navigation
    nav: {
      dashboard: 'Tableau de bord',
      logout: 'Se déconnecter',
      profile: 'Profil',
      settings: 'Paramètres',
      search: 'Rechercher...',
      notifications: 'Notifications'
    },
    
    // Authentification
    auth: {
      login: 'Se connecter',
      logout: 'Se déconnecter',
      email: 'Email',
      password: 'Mot de passe',
      forgotPassword: 'Mot de passe oublié ?',
      invalidCredentials: 'Identifiants invalides',
      loginSuccess: 'Connexion réussie',
      loginError: 'Erreur de connexion'
    },
    
    // Modules
    modules: {
      administrative: 'Administratif/Qualiopi',
      crmMarketing: 'CRM/Marketing',
      learnerRelations: 'Relation Apprenant',
      pedagogyLms: 'Pédagogie/LMS',
      dataBi: 'Data & BI',
      internalOperations: 'Opérations internes',
      finance: 'Finance',
      compliance: 'Conformité',
      integrations: 'Intégrations'
    },
    
    // États et statuts
    status: {
      active: 'Actif',
      inactive: 'Inactif',
      pending: 'En attente',
      completed: 'Terminé',
      cancelled: 'Annulé',
      valid: 'Valide',
      invalid: 'Invalide',
      compliant: 'Conforme',
      nonCompliant: 'Non conforme',
      inProgress: 'En cours'
    },
    
    // Actions communes
    actions: {
      create: 'Créer',
      edit: 'Modifier',
      delete: 'Supprimer',
      save: 'Enregistrer',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      view: 'Voir',
      download: 'Télécharger',
      export: 'Exporter',
      import: 'Importer',
      refresh: 'Actualiser',
      search: 'Rechercher',
      filter: 'Filtrer',
      sort: 'Trier'
    },
    
    // Messages
    messages: {
      loading: 'Chargement...',
      noData: 'Aucune donnée disponible',
      error: 'Une erreur est survenue',
      success: 'Opération réussie',
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
      unsavedChanges: 'Vous avez des modifications non sauvegardées',
      sessionExpired: 'Votre session a expiré',
      accessDenied: 'Accès refusé'
    },
    
    // Formulaires
    forms: {
      required: 'Ce champ est obligatoire',
      invalidEmail: 'Adresse email invalide',
      passwordTooShort: 'Le mot de passe doit contenir au moins 8 caractères',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
      invalidPhone: 'Numéro de téléphone invalide',
      invalidDate: 'Date invalide'
    },
    
    // Dates et temps
    time: {
      now: 'Maintenant',
      today: 'Aujourd\'hui',
      yesterday: 'Hier',
      tomorrow: 'Demain',
      thisWeek: 'Cette semaine',
      thisMonth: 'Ce mois',
      thisYear: 'Cette année',
      minute: 'minute',
      minutes: 'minutes',
      hour: 'heure',
      hours: 'heures',
      day: 'jour',
      days: 'jours',
      week: 'semaine',
      weeks: 'semaines',
      month: 'mois',
      months: 'mois',
      year: 'année',
      years: 'années'
    }
  },
  
  en: {
    // Navigation
    nav: {
      dashboard: 'Dashboard',
      logout: 'Logout',
      profile: 'Profile',
      settings: 'Settings',
      search: 'Search...',
      notifications: 'Notifications'
    },
    
    // Authentication
    auth: {
      login: 'Login',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot password?',
      invalidCredentials: 'Invalid credentials',
      loginSuccess: 'Login successful',
      loginError: 'Login error'
    },
    
    // Modules
    modules: {
      administrative: 'Administrative/Qualiopi',
      crmMarketing: 'CRM/Marketing',
      learnerRelations: 'Learner Relations',
      pedagogyLms: 'Pedagogy/LMS',
      dataBi: 'Data & BI',
      internalOperations: 'Internal Operations',
      finance: 'Finance',
      compliance: 'Compliance',
      integrations: 'Integrations'
    },
    
    // Status
    status: {
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending',
      completed: 'Completed',
      cancelled: 'Cancelled',
      valid: 'Valid',
      invalid: 'Invalid',
      compliant: 'Compliant',
      nonCompliant: 'Non-compliant',
      inProgress: 'In Progress'
    },
    
    // Common actions
    actions: {
      create: 'Create',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      view: 'View',
      download: 'Download',
      export: 'Export',
      import: 'Import',
      refresh: 'Refresh',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort'
    },
    
    // Messages
    messages: {
      loading: 'Loading...',
      noData: 'No data available',
      error: 'An error occurred',
      success: 'Operation successful',
      confirmDelete: 'Are you sure you want to delete this item?',
      unsavedChanges: 'You have unsaved changes',
      sessionExpired: 'Your session has expired',
      accessDenied: 'Access denied'
    },
    
    // Forms
    forms: {
      required: 'This field is required',
      invalidEmail: 'Invalid email address',
      passwordTooShort: 'Password must be at least 8 characters',
      passwordMismatch: 'Passwords do not match',
      invalidPhone: 'Invalid phone number',
      invalidDate: 'Invalid date'
    },
    
    // Time
    time: {
      now: 'Now',
      today: 'Today',
      yesterday: 'Yesterday',
      tomorrow: 'Tomorrow',
      thisWeek: 'This week',
      thisMonth: 'This month',
      thisYear: 'This year',
      minute: 'minute',
      minutes: 'minutes',
      hour: 'hour',
      hours: 'hours',
      day: 'day',
      days: 'days',
      week: 'week',
      weeks: 'weeks',
      month: 'month',
      months: 'months',
      year: 'year',
      years: 'years'
    }
  }
} as const;

/**
 * Fonction de traduction
 */
export function t(key: string, locale: Locale = DEFAULT_LOCALE): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback vers la traduction française si la clé n'existe pas
      if (locale !== 'fr') {
        return t(key, 'fr');
      }
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }
  
  return typeof value === 'string' ? value : key;
}

/**
 * Hook React pour l'internationalisation
 */
export function useTranslation(locale: Locale = DEFAULT_LOCALE) {
  return {
    t: (key: string) => t(key, locale),
    locale,
    isRTL: false // Le français et l'anglais sont LTR
  };
}

/**
 * Formatage des dates selon la locale
 */
export function formatDate(date: Date | string, locale: Locale = DEFAULT_LOCALE): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', options).format(dateObj);
}

/**
 * Formatage des nombres selon la locale
 */
export function formatNumber(number: number, locale: Locale = DEFAULT_LOCALE): string {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US').format(number);
}

/**
 * Formatage des devises selon la locale
 */
export function formatCurrency(amount: number, locale: Locale = DEFAULT_LOCALE): string {
  const currency = locale === 'fr' ? 'EUR' : 'USD';
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency
  }).format(amount);
}

/**
 * Détection automatique de la locale du navigateur
 */
export function detectBrowserLocale(): Locale {
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language.split('-')[0] as Locale;
    return SUPPORTED_LOCALES.includes(browserLang) ? browserLang : DEFAULT_LOCALE;
  }
  return DEFAULT_LOCALE;
}
