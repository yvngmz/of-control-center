'use client';

/**
 * Vue d'ensemble du tableau de bord avec widgets interactifs
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../libs/auth/auth-context';
import { MODULES } from '../../../libs/constants/modules';
import { canAccessModule } from '../../../libs/auth/rbac';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Activity,
  Zap,
  Shield
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import Link from 'next/link';

// Données mockées pour le tableau de bord
const mockKPIData = {
  totalLearners: 1247,
  activeLearners: 892,
  completionRate: 78.5,
  satisfaction: 4.2,
  revenue: 156780,
  revenueGrowth: 12.3,
  activePrograms: 23,
  qualiopiScore: 94.2,
};

const mockChartData = [
  { month: 'Jan', inscriptions: 65, completions: 45, revenue: 12500 },
  { month: 'Fév', inscriptions: 78, completions: 52, revenue: 14200 },
  { month: 'Mar', inscriptions: 90, completions: 68, revenue: 16800 },
  { month: 'Avr', inscriptions: 85, completions: 71, revenue: 15900 },
  { month: 'Mai', inscriptions: 95, completions: 78, revenue: 18200 },
  { month: 'Jun', inscriptions: 110, completions: 89, revenue: 21500 },
];

const mockComplianceData = [
  { name: 'Conforme', value: 85, color: '#10b981' },
  { name: 'En cours', value: 12, color: '#f59e0b' },
  { name: 'Non conforme', value: 3, color: '#ef4444' },
];

interface DashboardOverviewProps {
  userRole: string;
}

export function DashboardOverview({ userRole }: DashboardOverviewProps) {
  const { user } = useAuth();
  
  const accessibleModules = MODULES.filter(module => 
    module.isActive && canAccessModule(userRole, module.type)
  );

  const KPICard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    trend = 'up',
    format = 'number'
  }: {
    title: string;
    value: number;
    change?: number;
    icon: any;
    trend?: 'up' | 'down';
    format?: 'number' | 'currency' | 'percentage';
  }) => {
    const formatValue = (val: number) => {
      switch (format) {
        case 'currency':
          return `${val.toLocaleString()} €`;
        case 'percentage':
          return `${val}%`;
        default:
          return val.toLocaleString();
      }
    };

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{formatValue(value)}</p>
              {change && (
                <div className={`flex items-center gap-1 text-sm ${
                  trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {Math.abs(change)}%
                </div>
              )}
            </div>
            <Icon className="w-8 h-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  };

  const QuickActionCard = ({ module }: { module: typeof MODULES[0] }) => {
    const Icon = require('lucide-react')[module.icon];
    
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${module.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{module.name}</h3>
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              {module.subModules.slice(0, 2).map(subModule => (
                <Link key={subModule.id} href={subModule.path}>
                  <Button variant="outline" size="sm">
                    {subModule.name}
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec salutation */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Bonjour, {user?.firstName} 👋
          </h1>
          <p className="text-muted-foreground">
            Voici un aperçu de votre infrastructure IA OF
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{user?.role}</Badge>
          <Button>
            <Activity className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
        </div>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Apprenants actifs"
          value={mockKPIData.activeLearners}
          change={8.2}
          icon={Users}
        />
        <KPICard
          title="Taux de complétion"
          value={mockKPIData.completionRate}
          change={3.1}
          icon={Target}
          format="percentage"
        />
        <KPICard
          title="Chiffre d'affaires"
          value={mockKPIData.revenue}
          change={mockKPIData.revenueGrowth}
          icon={DollarSign}
          format="currency"
        />
        <KPICard
          title="Score Qualiopi"
          value={mockKPIData.qualiopiScore}
          change={2.1}
          icon={Shield}
          format="percentage"
        />
      </div>

      {/* Graphiques et analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution des inscriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution des inscriptions</CardTitle>
            <CardDescription>
              Inscriptions et complétions sur les 6 derniers mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="inscriptions" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    name="Inscriptions"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completions" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    name="Complétions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* État de conformité */}
        <Card>
          <CardHeader>
            <CardTitle>État de conformité</CardTitle>
            <CardDescription>
              Répartition des éléments de conformité
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockComplianceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {mockComplianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides par module */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Accès rapide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {accessibleModules.slice(0, 6).map((module) => (
            <QuickActionCard key={module.id} module={module} />
          ))}
        </div>
      </div>

      {/* Alertes et notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Alertes importantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium">Audit Qualiopi prévu</p>
                <p className="text-sm text-muted-foreground">
                  L'audit de surveillance est programmé pour le 15 octobre 2024
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">Mise à jour RGPD terminée</p>
                <p className="text-sm text-muted-foreground">
                  Tous les consentements ont été mis à jour selon les nouvelles directives
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Zap className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">Nouvelle intégration disponible</p>
                <p className="text-sm text-muted-foreground">
                  Le connecteur Kairos v2.0 est maintenant disponible
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
