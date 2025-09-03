/**
 * Types pour les modules métier de l'OF
 */

export type ModuleType = 
  | 'administrative'
  | 'crm_marketing'
  | 'learner_relations'
  | 'pedagogy_lms'
  | 'data_bi'
  | 'internal_operations'
  | 'finance'
  | 'compliance'
  | 'integrations';

export interface Module {
  id: string;
  name: string;
  type: ModuleType;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  permissions: string[];
  path?: string; // Chemin direct vers la page principale du module
  subModules: SubModule[];
}

export interface SubModule {
  id: string;
  name: string;
  path: string;
  icon: string;
  description: string;
  permissions: string[];
}

// Module Administratif/Qualiopi
export interface QualiopiData {
  id: string;
  certificationNumber: string;
  expiryDate: Date;
  status: 'valid' | 'expired' | 'pending';
  lastAuditDate: Date;
  nextAuditDate: Date;
  indicators: QualiopiIndicator[];
}

export interface QualiopiIndicator {
  id: string;
  number: string;
  title: string;
  status: 'compliant' | 'non_compliant' | 'in_progress';
  evidence: string[];
  lastUpdated: Date;
}

// Module CRM/Marketing
export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  score: number;
  interestedPrograms: string[];
  createdAt: Date;
  assignedTo?: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'sms' | 'webinar';
  status: 'draft' | 'active' | 'paused' | 'completed';
  targetAudience: string[];
  metrics: CampaignMetrics;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
}

export interface CampaignMetrics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  unsubscribed: number;
}

// Module Relations Apprenants
export interface Learner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'graduated' | 'dropped';
  enrollments: Enrollment[];
  satisfactionScore?: number;
  createdAt: Date;
}

export interface Enrollment {
  id: string;
  learnerId: string;
  programId: string;
  status: 'enrolled' | 'in_progress' | 'completed' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  progress: number;
  grade?: number;
}

// Module Pédagogie/LMS
export interface Program {
  id: string;
  name: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // en heures
  modules: ProgramModule[];
  certifications: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface ProgramModule {
  id: string;
  name: string;
  description: string;
  order: number;
  duration: number;
  content: ModuleContent[];
  assessments: Assessment[];
}

export interface ModuleContent {
  id: string;
  type: 'video' | 'document' | 'quiz' | 'exercise' | 'webinar';
  title: string;
  url?: string;
  duration?: number;
  isCompleted?: boolean;
}

export interface Assessment {
  id: string;
  type: 'quiz' | 'assignment' | 'exam' | 'project';
  title: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number;
}

export interface Question {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'text' | 'code';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

// Module Finance
export interface FinancialData {
  revenue: number;
  expenses: number;
  profit: number;
  period: string;
  breakdown: FinancialBreakdown;
}

export interface FinancialBreakdown {
  programs: { [key: string]: number };
  expenses: { [key: string]: number };
  regions: { [key: string]: number };
}

// Module Conformité
export interface ComplianceItem {
  id: string;
  type: 'rgpd' | 'ai_act' | 'rgaa' | 'qualiopi';
  title: string;
  description: string;
  status: 'compliant' | 'non_compliant' | 'in_review';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate?: Date;
  assignedTo?: string;
  evidence: string[];
  lastUpdated: Date;
}

// Module Intégrations
export interface Integration {
  id: string;
  name: string;
  type: 'edof' | 'kairos' | 'opco' | 'make' | 'n8n';
  status: 'active' | 'inactive' | 'error';
  lastSync?: Date;
  config: { [key: string]: any };
  logs: IntegrationLog[];
}

export interface IntegrationLog {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
  message: string;
  details?: any;
}
