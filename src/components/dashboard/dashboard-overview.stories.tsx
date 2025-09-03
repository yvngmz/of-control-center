/**
 * Stories Storybook pour le composant DashboardOverview
 */

import type { Meta, StoryObj } from '@storybook/react';
import { DashboardOverview } from './dashboard-overview';
import { AuthProvider } from '../../../libs/auth/auth-context';

const meta: Meta<typeof DashboardOverview> = {
  title: 'Components/Dashboard/DashboardOverview',
  component: DashboardOverview,
  decorators: [
    (Story) => (
      <AuthProvider>
        <div className="p-6 bg-background min-h-screen">
          <Story />
        </div>
      </AuthProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Vue d\'ensemble du tableau de bord avec KPIs, graphiques et accès rapide aux modules selon les permissions RBAC.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userRole: {
      control: 'select',
      options: [
        'admin',
        'direction',
        'resp_pedagogy',
        'trainer',
        'sales_marketing',
        'csm',
        'dpo_compliance',
        'auditor'
      ],
      description: 'Rôle de l\'utilisateur déterminant les permissions et modules accessibles',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Vue Administrateur (accès complet)
 */
export const AdminView: Story = {
  args: {
    userRole: 'admin',
  },
  parameters: {
    docs: {
      description: {
        story: 'Vue complète du tableau de bord pour un administrateur avec accès à tous les modules et KPIs.',
      },
    },
  },
};

/**
 * Vue Direction (vue stratégique)
 */
export const DirectionView: Story = {
  args: {
    userRole: 'direction',
  },
  parameters: {
    docs: {
      description: {
        story: 'Vue stratégique pour la direction avec focus sur les KPIs globaux et la conformité.',
      },
    },
  },
};

/**
 * Vue Responsable Pédagogique
 */
export const PedagogyManagerView: Story = {
  args: {
    userRole: 'resp_pedagogy',
  },
  parameters: {
    docs: {
      description: {
        story: 'Vue orientée pédagogie avec accès aux programmes, apprenants et analytics de formation.',
      },
    },
  },
};

/**
 * Vue Formateur
 */
export const TrainerView: Story = {
  args: {
    userRole: 'trainer',
  },
  parameters: {
    docs: {
      description: {
        story: 'Vue simplifiée pour les formateurs avec accès aux contenus pédagogiques et suivi des apprenants.',
      },
    },
  },
};

/**
 * Vue Commercial/Marketing
 */
export const SalesView: Story = {
  args: {
    userRole: 'sales_marketing',
  },
  parameters: {
    docs: {
      description: {
        story: 'Vue commerciale avec focus sur les prospects, campagnes et tunnel de conversion.',
      },
    },
  },
};

/**
 * Vue Customer Success Manager
 */
export const CSMView: Story = {
  args: {
    userRole: 'csm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Vue CSM centrée sur la satisfaction et le suivi des apprenants.',
      },
    },
  },
};

/**
 * Vue DPO/Conformité
 */
export const ComplianceView: Story = {
  args: {
    userRole: 'dpo_compliance',
  },
  parameters: {
    docs: {
      description: {
        story: 'Vue conformité avec accès aux éléments RGPD, AI Act, RGAA et piste d\'audit.',
      },
    },
  },
};

/**
 * Vue Auditeur (lecture seule)
 */
export const AuditorView: Story = {
  args: {
    userRole: 'auditor',
  },
  parameters: {
    docs: {
      description: {
        story: 'Vue auditeur en lecture seule avec accès à tous les indicateurs pour les audits.',
      },
    },
  },
};

/**
 * Mode sombre
 */
export const DarkMode: Story = {
  args: {
    userRole: 'admin',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'Tableau de bord en mode sombre avec tous les éléments adaptés.',
      },
    },
  },
};

/**
 * Vue mobile
 */
export const MobileView: Story = {
  args: {
    userRole: 'admin',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Version mobile du tableau de bord avec layout adaptatif.',
      },
    },
  },
};

/**
 * État de chargement
 */
export const LoadingState: Story = {
  args: {
    userRole: 'admin',
  },
  parameters: {
    docs: {
      description: {
        story: 'Simulation de l\'état de chargement des données du dashboard.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Simuler un état de chargement
    const refreshButton = canvasElement.querySelector('[data-testid="refresh-button"]');
    if (refreshButton) {
      // Simuler un clic sur le bouton d'actualisation
    }
  },
};
