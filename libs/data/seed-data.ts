/**
 * Données de seed réalistes pour le mode démo
 */

import { User, UserRole } from '../types/auth';
import { 
  QualiopiData, 
  Lead, 
  Campaign, 
  Learner, 
  Program, 
  FinancialData, 
  ComplianceItem, 
  Integration 
} from '../types/modules';

// Utilisateurs de démonstration
export const seedUsers: User[] = [
  {
    id: '1',
    email: 'admin@of-control.com',
    firstName: 'Admin',
    lastName: 'System',
    role: 'admin',
    permissions: [],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-01'),
    avatar: '/avatars/admin.jpg'
  },
  {
    id: '2',
    email: 'direction@of-control.com',
    firstName: 'Marie',
    lastName: 'Directrice',
    role: 'direction',
    permissions: [],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-01'),
    avatar: '/avatars/direction.jpg'
  },
  {
    id: '3',
    email: 'pedagogy@of-control.com',
    firstName: 'Pierre',
    lastName: 'Pédagogue',
    role: 'resp_pedagogy',
    permissions: [],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-01'),
    avatar: '/avatars/pedagogy.jpg'
  },
  {
    id: '4',
    email: 'trainer@of-control.com',
    firstName: 'Sophie',
    lastName: 'Formatrice',
    role: 'trainer',
    permissions: [],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-01'),
    avatar: '/avatars/trainer.jpg'
  },
  {
    id: '5',
    email: 'sales@of-control.com',
    firstName: 'Jean',
    lastName: 'Commercial',
    role: 'sales_marketing',
    permissions: [],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-01'),
    avatar: '/avatars/sales.jpg'
  },
  {
    id: '6',
    email: 'csm@of-control.com',
    firstName: 'Laura',
    lastName: 'Success',
    role: 'csm',
    permissions: [],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-01'),
    avatar: '/avatars/csm.jpg'
  },
  {
    id: '7',
    email: 'dpo@of-control.com',
    firstName: 'David',
    lastName: 'Protection',
    role: 'dpo_compliance',
    permissions: [],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-01'),
    avatar: '/avatars/dpo.jpg'
  },
  {
    id: '8',
    email: 'auditor@of-control.com',
    firstName: 'Anne',
    lastName: 'Auditrice',
    role: 'auditor',
    permissions: [],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-01'),
    avatar: '/avatars/auditor.jpg'
  }
];

// Données Qualiopi
export const seedQualiopiData: QualiopiData = {
  id: '1',
  certificationNumber: 'QUAL-2024-001',
  expiryDate: new Date('2027-06-15'),
  status: 'valid',
  lastAuditDate: new Date('2024-06-15'),
  nextAuditDate: new Date('2025-06-15'),
  indicators: [
    {
      id: '1',
      number: '1.1',
      title: 'Conditions d\'information du public sur les prestations',
      status: 'compliant',
      evidence: ['Catalogue formations 2024.pdf', 'Site web screenshots.pdf'],
      lastUpdated: new Date('2024-03-15')
    },
    {
      id: '2',
      number: '1.2',
      title: 'Identification précise des objectifs des prestations',
      status: 'compliant',
      evidence: ['Objectifs pédagogiques.pdf', 'Référentiels compétences.pdf'],
      lastUpdated: new Date('2024-03-10')
    },
    {
      id: '3',
      number: '2.1',
      title: 'Analyse du besoin du bénéficiaire',
      status: 'in_progress',
      evidence: ['Questionnaires besoins.pdf'],
      lastUpdated: new Date('2024-03-20')
    }
  ]
};

// Prospects et leads
export const seedLeads: Lead[] = [
  {
    id: '1',
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@example.com',
    phone: '0123456789',
    source: 'Site web',
    status: 'new',
    score: 85,
    interestedPrograms: ['Développement web', 'UX/UI Design'],
    createdAt: new Date('2024-03-20'),
    assignedTo: 'Jean Commercial'
  },
  {
    id: '2',
    firstName: 'Pierre',
    lastName: 'Martin',
    email: 'pierre.martin@example.com',
    phone: '0987654321',
    source: 'LinkedIn',
    status: 'contacted',
    score: 92,
    interestedPrograms: ['Data Science', 'Machine Learning'],
    createdAt: new Date('2024-03-18'),
    assignedTo: 'Sophie Marketing'
  },
  {
    id: '3',
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@example.com',
    phone: '0156789123',
    source: 'Référencement',
    status: 'qualified',
    score: 78,
    interestedPrograms: ['Cybersécurité'],
    createdAt: new Date('2024-03-15'),
    assignedTo: 'Jean Commercial'
  },
  {
    id: '4',
    firstName: 'Thomas',
    lastName: 'Dubois',
    email: 'thomas.dubois@example.com',
    phone: '0198765432',
    source: 'Bouche à oreille',
    status: 'converted',
    score: 95,
    interestedPrograms: ['DevOps', 'Cloud Computing'],
    createdAt: new Date('2024-03-10'),
    assignedTo: 'Jean Commercial'
  }
];

// Campagnes marketing
export const seedCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Campagne Rentrée 2024',
    type: 'email',
    status: 'active',
    targetAudience: ['Développeurs', 'Étudiants', 'Reconversion'],
    metrics: {
      sent: 5000,
      delivered: 4850,
      opened: 1940,
      clicked: 485,
      converted: 48,
      unsubscribed: 12
    },
    createdAt: new Date('2024-02-01'),
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-04-30')
  },
  {
    id: '2',
    name: 'Formation IA - Webinaire',
    type: 'webinar',
    status: 'completed',
    targetAudience: ['Managers', 'Développeurs seniors'],
    metrics: {
      sent: 2000,
      delivered: 1950,
      opened: 975,
      clicked: 390,
      converted: 78,
      unsubscribed: 5
    },
    createdAt: new Date('2024-01-15'),
    startDate: new Date('2024-02-15'),
    endDate: new Date('2024-02-15')
  }
];

// Apprenants
export const seedLearners: Learner[] = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    phone: '0123456789',
    status: 'active',
    enrollments: [
      {
        id: '1',
        learnerId: '1',
        programId: '1',
        status: 'in_progress',
        startDate: new Date('2024-02-01'),
        progress: 65,
        grade: 85
      }
    ],
    satisfactionScore: 4.5,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@example.com',
    phone: '0987654321',
    status: 'graduated',
    enrollments: [
      {
        id: '2',
        learnerId: '2',
        programId: '2',
        status: 'completed',
        startDate: new Date('2023-09-01'),
        endDate: new Date('2024-01-15'),
        progress: 100,
        grade: 92
      }
    ],
    satisfactionScore: 4.8,
    createdAt: new Date('2023-08-15')
  }
];

// Programmes de formation
export const seedPrograms: Program[] = [
  {
    id: '1',
    name: 'Développement Web Full Stack',
    description: 'Formation complète en développement web moderne',
    category: 'Développement',
    level: 'intermediate',
    duration: 600, // heures
    modules: [
      {
        id: '1',
        name: 'HTML/CSS Avancé',
        description: 'Maîtrise du HTML5 et CSS3',
        order: 1,
        duration: 80,
        content: [
          {
            id: '1',
            type: 'video',
            title: 'Introduction au HTML5',
            url: '/content/html5-intro.mp4',
            duration: 45
          },
          {
            id: '2',
            type: 'quiz',
            title: 'Quiz HTML5',
            duration: 15
          }
        ],
        assessments: [
          {
            id: '1',
            type: 'quiz',
            title: 'Évaluation HTML/CSS',
            questions: [
              {
                id: '1',
                type: 'multiple_choice',
                question: 'Quelle balise HTML5 est sémantique ?',
                options: ['<div>', '<section>', '<span>', '<p>'],
                correctAnswer: '<section>',
                points: 10
              }
            ],
            passingScore: 70,
            timeLimit: 30
          }
        ]
      }
    ],
    certifications: ['Certification Développeur Web'],
    isActive: true,
    createdAt: new Date('2023-12-01')
  },
  {
    id: '2',
    name: 'Data Science avec Python',
    description: 'Formation en science des données et machine learning',
    category: 'Data Science',
    level: 'advanced',
    duration: 800,
    modules: [],
    certifications: ['Certification Data Scientist'],
    isActive: true,
    createdAt: new Date('2023-11-01')
  }
];

// Données financières
export const seedFinancialData: FinancialData[] = [
  {
    revenue: 156780,
    expenses: 98450,
    profit: 58330,
    period: '2024-Q1',
    breakdown: {
      programs: {
        'Développement Web': 65000,
        'Data Science': 45000,
        'Cybersécurité': 32000,
        'UX/UI Design': 14780
      },
      expenses: {
        'Salaires': 45000,
        'Infrastructure': 15000,
        'Marketing': 12000,
        'Autres': 26450
      },
      regions: {
        'Île-de-France': 78000,
        'Auvergne-Rhône-Alpes': 34000,
        'Nouvelle-Aquitaine': 25000,
        'Autres': 19780
      }
    }
  }
];

// Éléments de conformité
export const seedComplianceItems: ComplianceItem[] = [
  {
    id: '1',
    type: 'rgpd',
    title: 'Mise à jour des consentements',
    description: 'Révision des formulaires de consentement selon les nouvelles directives',
    status: 'compliant',
    priority: 'high',
    dueDate: new Date('2024-04-15'),
    assignedTo: 'David Protection',
    evidence: ['Formulaires_consentement_v2.pdf', 'Audit_RGPD_mars2024.pdf'],
    lastUpdated: new Date('2024-03-20')
  },
  {
    id: '2',
    type: 'ai_act',
    title: 'Évaluation des systèmes IA',
    description: 'Classification et évaluation des risques des systèmes IA utilisés',
    status: 'in_review',
    priority: 'medium',
    dueDate: new Date('2024-05-01'),
    assignedTo: 'David Protection',
    evidence: ['Inventaire_IA.xlsx'],
    lastUpdated: new Date('2024-03-18')
  },
  {
    id: '3',
    type: 'rgaa',
    title: 'Audit d\'accessibilité site web',
    description: 'Vérification de la conformité RGAA 4.1.2 du site web',
    status: 'non_compliant',
    priority: 'high',
    dueDate: new Date('2024-04-01'),
    assignedTo: 'Équipe Dev',
    evidence: [],
    lastUpdated: new Date('2024-03-15')
  }
];

// Intégrations
export const seedIntegrations: Integration[] = [
  {
    id: '1',
    name: 'EDOF - Portail de l\'alternance',
    type: 'edof',
    status: 'active',
    lastSync: new Date('2024-03-21T08:30:00'),
    config: {
      apiUrl: 'https://api.portail-alternance.fr',
      syncInterval: '24h',
      autoSync: true
    },
    logs: [
      {
        id: '1',
        timestamp: new Date('2024-03-21T08:30:00'),
        level: 'info',
        message: 'Synchronisation réussie - 145 candidatures mises à jour'
      },
      {
        id: '2',
        timestamp: new Date('2024-03-20T08:30:00'),
        level: 'warning',
        message: 'Délai de réponse API élevé (3.2s)'
      }
    ]
  },
  {
    id: '2',
    name: 'Kairos - Gestion des temps',
    type: 'kairos',
    status: 'active',
    lastSync: new Date('2024-03-21T09:00:00'),
    config: {
      serverUrl: 'https://kairos.entreprise.fr',
      syncMode: 'realtime',
      departments: ['Formation', 'Administration']
    },
    logs: [
      {
        id: '1',
        timestamp: new Date('2024-03-21T09:00:00'),
        level: 'info',
        message: 'Pointages synchronisés - 23 collaborateurs'
      }
    ]
  },
  {
    id: '3',
    name: 'OPCO - Financement formations',
    type: 'opco',
    status: 'error',
    lastSync: new Date('2024-03-20T14:15:00'),
    config: {
      opcoType: 'OPCO_EP',
      autoSubmit: false,
      validationLevel: 'manual'
    },
    logs: [
      {
        id: '1',
        timestamp: new Date('2024-03-21T10:00:00'),
        level: 'error',
        message: 'Échec de la connexion - Certificat SSL expiré',
        details: {
          error: 'SSL_CERTIFICATE_EXPIRED',
          endpoint: '/api/v2/dossiers'
        }
      }
    ]
  },
  {
    id: '4',
    name: 'N8N - Automatisations',
    type: 'n8n',
    status: 'active',
    lastSync: new Date('2024-03-21T10:30:00'),
    config: {
      webhookUrl: 'https://n8n.of-control.com/webhook/leads',
      workflows: ['lead-qualification', 'email-automation', 'reporting']
    },
    logs: [
      {
        id: '1',
        timestamp: new Date('2024-03-21T10:30:00'),
        level: 'info',
        message: '12 workflows exécutés avec succès'
      }
    ]
  }
];

// Export de toutes les données
export const seedData = {
  users: seedUsers,
  qualiopi: seedQualiopiData,
  leads: seedLeads,
  campaigns: seedCampaigns,
  learners: seedLearners,
  programs: seedPrograms,
  financial: seedFinancialData,
  compliance: seedComplianceItems,
  integrations: seedIntegrations
};
