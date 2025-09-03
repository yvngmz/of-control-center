/**
 * Configuration des modules métier de l'OF Control Center
 */

import { Module } from '../types/modules';

export const MODULES: Module[] = [
  {
    id: 'administrative',
    name: 'Administratif & Réglementaire',
    type: 'administrative',
    description: 'Gestion administrative, Qualiopi et conformité réglementaire',
    icon: 'FileText',
    color: 'bg-blue-500',
    isActive: true,
    permissions: ['qualiopi.view', 'qualiopi.edit'],
    path: '/administrative',
    subModules: []
  },
  {
    id: 'crm_formation',
    name: 'CRM Formation',
    type: 'crm_marketing',
    description: 'Gestion des prospects et pipeline de formation',
    icon: 'Users',
    color: 'bg-green-500',
    isActive: true,
    permissions: ['leads.view', 'campaigns.view'],
    path: '/crm-formation',
    subModules: []
  },
  {
    id: 'suivi_apprenants',
    name: 'Suivi Apprenants',
    type: 'learner_relations',
    description: 'Suivi et accompagnement des apprenants',
    icon: 'GraduationCap',
    color: 'bg-purple-500',
    isActive: true,
    permissions: ['learners.view'],
    path: '/suivi-apprenants',
    subModules: []
  },
  {
    id: 'lms_intelligent',
    name: 'LMS Intelligent',
    type: 'pedagogy_lms',
    description: 'Plateforme d\'apprentissage intelligente avec IA',
    icon: 'Brain',
    color: 'bg-orange-500',
    isActive: true,
    permissions: ['programs.view', 'content.view'],
    path: '/lms-intelligent',
    subModules: []
  },
  {
    id: 'business_intelligence',
    name: 'Business Intelligence',
    type: 'data_bi',
    description: 'Analytics avancés et business intelligence',
    icon: 'TrendingUp',
    color: 'bg-indigo-500',
    isActive: true,
    permissions: ['analytics.view', 'reports.view'],
    path: '/business-intelligence',
    subModules: []
  },
  {
    id: 'finance_operations',
    name: 'Finance & Opérations',
    type: 'finance',
    description: 'Gestion financière et opérationnelle',
    icon: 'DollarSign',
    color: 'bg-emerald-500',
    isActive: true,
    permissions: ['finance.view'],
    path: '/finance-operations',
    subModules: []
  },
  {
    id: 'communication_ops',
    name: 'Communication & Ops internes',
    type: 'internal_operations',
    description: 'Hub interne avec workflows automatisés et IA',
    icon: 'MessageSquare',
    color: 'bg-gray-500',
    isActive: true,
    permissions: ['dashboard.view'],
    path: '/communication-ops',
    subModules: []
  },

];

export function getModulesByRole(userRole: string): Module[] {
  // Importer les fonctions RBAC ici pour éviter les imports circulaires
  const { canAccessModule } = require('../auth/rbac');
  
  return MODULES.filter(module => 
    module.isActive && canAccessModule(userRole, module.type)
  );
}

export function getModuleById(id: string): Module | undefined {
  return MODULES.find(module => module.id === id);
}

export function getSubModulesByModuleId(moduleId: string): Module['subModules'] {
  const module = getModuleById(moduleId);
  return module?.subModules || [];
}
