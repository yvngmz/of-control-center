/**
 * Système RBAC (Role-Based Access Control)
 */

import { UserRole, Permission } from '../types/auth';

export const ROLES: Record<UserRole, { name: string; description: string; level: number }> = {
  admin: {
    name: 'Administrateur',
    description: 'Accès complet à tous les modules',
    level: 10
  },
  direction: {
    name: 'Direction',
    description: 'Accès stratégique et pilotage général',
    level: 9
  },
  resp_pedagogy: {
    name: 'Responsable Pédagogique',
    description: 'Gestion des programmes et formateurs',
    level: 7
  },
  trainer: {
    name: 'Formateur',
    description: 'Accès aux contenus pédagogiques',
    level: 5
  },
  sales_marketing: {
    name: 'Commercial/Marketing',
    description: 'Gestion des prospects et campagnes',
    level: 6
  },
  csm: {
    name: 'Customer Success Manager',
    description: 'Suivi et satisfaction apprenants',
    level: 6
  },
  dpo_compliance: {
    name: 'DPO/Conformité',
    description: 'Gestion de la conformité RGPD/AI Act',
    level: 8
  },
  auditor: {
    name: 'Auditeur',
    description: 'Accès en lecture pour audits',
    level: 4
  }
};

export const PERMISSIONS: Record<string, Permission> = {
  // Permissions générales
  'dashboard.view': { id: 'dashboard.view', name: 'Voir le tableau de bord', resource: 'dashboard', action: 'read' },
  'users.manage': { id: 'users.manage', name: 'Gérer les utilisateurs', resource: 'users', action: 'admin' },
  
  // Permissions Administratif/Qualiopi
  'qualiopi.view': { id: 'qualiopi.view', name: 'Voir les données Qualiopi', resource: 'qualiopi', action: 'read' },
  'qualiopi.edit': { id: 'qualiopi.edit', name: 'Modifier les données Qualiopi', resource: 'qualiopi', action: 'update' },
  
  // Permissions CRM/Marketing
  'leads.view': { id: 'leads.view', name: 'Voir les prospects', resource: 'leads', action: 'read' },
  'leads.manage': { id: 'leads.manage', name: 'Gérer les prospects', resource: 'leads', action: 'admin' },
  'campaigns.view': { id: 'campaigns.view', name: 'Voir les campagnes', resource: 'campaigns', action: 'read' },
  'campaigns.manage': { id: 'campaigns.manage', name: 'Gérer les campagnes', resource: 'campaigns', action: 'admin' },
  
  // Permissions Relations Apprenants
  'learners.view': { id: 'learners.view', name: 'Voir les apprenants', resource: 'learners', action: 'read' },
  'learners.manage': { id: 'learners.manage', name: 'Gérer les apprenants', resource: 'learners', action: 'admin' },
  
  // Permissions Pédagogie/LMS
  'programs.view': { id: 'programs.view', name: 'Voir les programmes', resource: 'programs', action: 'read' },
  'programs.manage': { id: 'programs.manage', name: 'Gérer les programmes', resource: 'programs', action: 'admin' },
  'content.view': { id: 'content.view', name: 'Voir le contenu', resource: 'content', action: 'read' },
  'content.create': { id: 'content.create', name: 'Créer du contenu', resource: 'content', action: 'create' },
  
  // Permissions Data & BI
  'analytics.view': { id: 'analytics.view', name: 'Voir les analytics', resource: 'analytics', action: 'read' },
  'reports.view': { id: 'reports.view', name: 'Voir les rapports', resource: 'reports', action: 'read' },
  'reports.create': { id: 'reports.create', name: 'Créer des rapports', resource: 'reports', action: 'create' },
  
  // Permissions Finance
  'finance.view': { id: 'finance.view', name: 'Voir les données financières', resource: 'finance', action: 'read' },
  'finance.manage': { id: 'finance.manage', name: 'Gérer les finances', resource: 'finance', action: 'admin' },
  
  // Permissions Conformité
  'compliance.view': { id: 'compliance.view', name: 'Voir la conformité', resource: 'compliance', action: 'read' },
  'compliance.manage': { id: 'compliance.manage', name: 'Gérer la conformité', resource: 'compliance', action: 'admin' },
  
  // Permissions Intégrations
  'integrations.view': { id: 'integrations.view', name: 'Voir les intégrations', resource: 'integrations', action: 'read' },
  'integrations.manage': { id: 'integrations.manage', name: 'Gérer les intégrations', resource: 'integrations', action: 'admin' }
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: Object.keys(PERMISSIONS),
  
  direction: [
    'dashboard.view',
    'qualiopi.view',
    'leads.view',
    'learners.view',
    'programs.view',
    'analytics.view',
    'reports.view',
    'finance.view',
    'compliance.view',
    'integrations.view'
  ],
  
  resp_pedagogy: [
    'dashboard.view',
    'programs.view',
    'programs.manage',
    'content.view',
    'content.create',
    'learners.view',
    'learners.manage',
    'analytics.view',
    'reports.view'
  ],
  
  trainer: [
    'dashboard.view',
    'programs.view',
    'content.view',
    'content.create',
    'learners.view',
    'analytics.view'
  ],
  
  sales_marketing: [
    'dashboard.view',
    'leads.view',
    'leads.manage',
    'campaigns.view',
    'campaigns.manage',
    'analytics.view',
    'reports.view'
  ],
  
  csm: [
    'dashboard.view',
    'learners.view',
    'learners.manage',
    'programs.view',
    'analytics.view',
    'reports.view'
  ],
  
  dpo_compliance: [
    'dashboard.view',
    'compliance.view',
    'compliance.manage',
    'learners.view',
    'integrations.view',
    'reports.view'
  ],
  
  auditor: [
    'dashboard.view',
    'qualiopi.view',
    'learners.view',
    'programs.view',
    'analytics.view',
    'reports.view',
    'finance.view',
    'compliance.view',
    'integrations.view'
  ]
};

export function hasPermission(userRole: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
}

export function canAccessModule(userRole: UserRole, module: string): boolean {
  const modulePermissions = {
    administrative: ['qualiopi.view'],
    crm_marketing: ['leads.view', 'campaigns.view'],
    learner_relations: ['learners.view'],
    pedagogy_lms: ['programs.view', 'content.view'],
    data_bi: ['analytics.view'],
    internal_operations: ['dashboard.view'],
    finance: ['finance.view'],
    compliance: ['compliance.view'],
    integrations: ['integrations.view']
  };

  const requiredPermissions = modulePermissions[module as keyof typeof modulePermissions];
  if (!requiredPermissions) return false;

  return requiredPermissions.some(permission => hasPermission(userRole, permission));
}

export function getRoleLevel(role: UserRole): number {
  return ROLES[role].level;
}

export function canManageUser(managerRole: UserRole, targetRole: UserRole): boolean {
  return getRoleLevel(managerRole) > getRoleLevel(targetRole);
}
