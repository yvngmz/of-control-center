/**
 * Utilitaires pour l'accessibilité RGAA 4.1.2 (WCAG 2.1 AA)
 */

// Constantes pour l'accessibilité
export const ACCESSIBILITY_CONSTANTS = {
  // Ratios de contraste minimum WCAG AA
  CONTRAST_RATIOS: {
    NORMAL_TEXT: 4.5,
    LARGE_TEXT: 3,
    NON_TEXT: 3
  },
  
  // Tailles de texte considérées comme "grandes"
  LARGE_TEXT_SIZES: {
    PX: 18,
    PT: 14,
    BOLD_PX: 14,
    BOLD_PT: 18
  },

  // Délais recommandés pour les interactions
  TIMING: {
    FOCUS_DELAY: 100,
    DEBOUNCE_DELAY: 300,
    ANIMATION_DURATION: 200
  }
};

/**
 * Génère un ID unique accessible pour les éléments
 */
export function generateAccessibleId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Vérifie si un élément est focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ];

  return focusableSelectors.some(selector => element.matches(selector));
}

/**
 * Gère le focus trap dans un conteneur
 */
export class FocusTrap {
  private container: HTMLElement;
  private firstFocusable: HTMLElement | null = null;
  private lastFocusable: HTMLElement | null = null;
  private previousFocus: HTMLElement | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.updateFocusableElements();
  }

  private updateFocusableElements(): void {
    const focusableElements = this.container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
    );

    this.firstFocusable = focusableElements[0] || null;
    this.lastFocusable = focusableElements[focusableElements.length - 1] || null;
  }

  activate(): void {
    this.previousFocus = document.activeElement as HTMLElement;
    this.updateFocusableElements();

    // Focus le premier élément focusable
    if (this.firstFocusable) {
      this.firstFocusable.focus();
    }

    // Écouter les événements de navigation au clavier
    this.container.addEventListener('keydown', this.handleKeydown);
  }

  deactivate(): void {
    this.container.removeEventListener('keydown', this.handleKeydown);
    
    // Restaurer le focus précédent
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }

  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift + Tab (navigation arrière)
        if (document.activeElement === this.firstFocusable) {
          event.preventDefault();
          this.lastFocusable?.focus();
        }
      } else {
        // Tab (navigation avant)
        if (document.activeElement === this.lastFocusable) {
          event.preventDefault();
          this.firstFocusable?.focus();
        }
      }
    }

    if (event.key === 'Escape') {
      this.deactivate();
    }
  };
}

/**
 * Annonce un message aux lecteurs d'écran
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('class', 'sr-only');
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Supprimer l'élément après l'annonce
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Vérifie si l'utilisateur préfère les animations réduites
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Vérifie si l'utilisateur préfère un contraste élevé
 */
export function prefersHighContrast(): boolean {
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Utilitaire pour créer des descriptions accessibles
 */
export function createAriaDescription(element: HTMLElement, description: string): string {
  const descriptionId = generateAccessibleId('description');
  
  const descriptionElement = document.createElement('div');
  descriptionElement.id = descriptionId;
  descriptionElement.className = 'sr-only';
  descriptionElement.textContent = description;
  
  element.setAttribute('aria-describedby', descriptionId);
  element.appendChild(descriptionElement);
  
  return descriptionId;
}

/**
 * Classe utilitaire pour masquer visuellement mais garder accessible aux lecteurs d'écran
 */
export const SR_ONLY_STYLES = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: '0'
} as const;

/**
 * Hooks React pour l'accessibilité
 */
export function useAccessibleId(prefix: string): string {
  return generateAccessibleId(prefix);
}

/**
 * Validation RGAA pour les formulaires
 */
export class FormAccessibilityValidator {
  static validateRequired(value: string, fieldName: string): string | null {
    if (!value.trim()) {
      return `Le champ ${fieldName} est obligatoire`;
    }
    return null;
  }

  static validateEmail(email: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'L\'adresse email n\'est pas valide';
    }
    return null;
  }

  static validatePassword(password: string): string | null {
    if (password.length < 8) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre';
    }
    return null;
  }
}
