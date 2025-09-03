/**
 * Stories Storybook pour le composant LoginForm
 */

import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './login-form';
import { AuthProvider } from '../../../libs/auth/auth-context';

const meta: Meta<typeof LoginForm> = {
  title: 'Components/Auth/LoginForm',
  component: LoginForm,
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Composant de formulaire de connexion avec authentification RBAC et comptes de démonstration.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSuccess: {
      action: 'onSuccess',
      description: 'Callback appelé après une connexion réussie',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * État par défaut du formulaire de connexion
 */
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Formulaire de connexion dans son état initial avec tous les comptes de démonstration disponibles.',
      },
    },
  },
};

/**
 * Formulaire avec callback de succès
 */
export const WithSuccessCallback: Story = {
  args: {
    onSuccess: () => {
      console.log('Connexion réussie !');
      alert('Connexion réussie !');
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Formulaire avec un callback personnalisé appelé après une connexion réussie.',
      },
    },
  },
};

/**
 * Démonstration des états d'erreur
 */
export const WithError: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Pour tester l\'état d\'erreur, utilisez des identifiants invalides comme "wrong@email.com" avec "wrongpassword".',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Cette fonction peut être utilisée pour simuler des interactions
    // dans Storybook avec @storybook/addon-interactions
  },
};

/**
 * Mode dark
 */
export const DarkMode: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'Formulaire de connexion en mode sombre.',
      },
    },
  },
};

/**
 * Vue mobile
 */
export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Formulaire de connexion optimisé pour les appareils mobiles.',
      },
    },
  },
};

/**
 * Test d'accessibilité
 */
export const AccessibilityTest: Story = {
  args: {},
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
          {
            id: 'focus-management',
            enabled: true,
          },
        ],
      },
    },
    docs: {
      description: {
        story: 'Version du formulaire optimisée pour les tests d\'accessibilité RGAA 4.1.2.',
      },
    },
  },
};
