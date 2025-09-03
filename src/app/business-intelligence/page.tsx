'use client';

/**
 * Page Business Intelligence
 */

import React, { useState } from 'react';
import { useAuth } from '../../../libs/auth/auth-context';
import { MainLayout } from '../../components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { DetailPanel } from '../../components/ui/detail-panel';
import { AIComponent, AIAlert, AIMetric, AIQuickAction } from '../../components/ui/ai-component';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  FileBarChart,
  Target,
  Activity,
  Zap,
  Download,
  Plus,
  Filter,
  Eye,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Settings,
  Brain,
  Bot,
  Sparkles,
  AlertTriangle,
  Search
} from 'lucide-react';
import { redirect } from 'next/navigation';

// Données mockées
const kpiData = {
  ca_genere: 1567800,
  marge_brute: 34.7,
  taux_occupation: 89.2,
  previsions_30j: 156,
  rapports_generes: 23
};

const evolutionCA = [
  { mois: 'Jan', ca: 125000, marge: 32.1, inscriptions: 89 },
  { mois: 'Fév', ca: 142000, marge: 33.5, inscriptions: 124 },
  { mois: 'Mar', ca: 156780, marge: 34.7, inscriptions: 156 },
  { mois: 'Avr', ca: 134000, marge: 33.2, inscriptions: 134 },
  { mois: 'Mai', ca: 167000, marge: 35.1, inscriptions: 167 },
  { mois: 'Jun', ca: 189000, marge: 36.2, inscriptions: 189 }
];

const repartitionCA = [
  { formation: 'Data Science', ca: 456000, part: 29.1, couleur: '#8884d8' },
  { formation: 'DevOps', ca: 342000, part: 21.8, couleur: '#82ca9d' },
  { formation: 'Cybersécurité', ca: 289000, part: 18.4, couleur: '#ffc658' },
  { formation: 'IA/ML', ca: 234000, part: 14.9, couleur: '#ff7c7c' },
  { formation: 'Cloud', ca: 156000, part: 9.9, couleur: '#8dd1e1' },
  { formation: 'Autres', ca: 90800, part: 5.9, couleur: '#d084d0' }
];

const previsionInscriptions = [
  { periode: 'Sem 1', reel: 45, prevision: 48 },
  { periode: 'Sem 2', reel: 52, prevision: 55 },
  { periode: 'Sem 3', reel: 38, prevision: 42 },
  { periode: 'Sem 4', reel: 0, prevision: 51 },
  { periode: 'Sem 5', reel: 0, prevision: 47 },
  { periode: 'Sem 6', reel: 0, prevision: 53 }
];

const occupationSessions = [
  { formation: 'Data Science', capacite: 100, inscrits: 89, taux: 89 },
  { formation: 'DevOps', capacite: 80, inscrits: 76, taux: 95 },
  { formation: 'Cybersécurité', capacite: 60, inscrits: 52, taux: 87 },
  { formation: 'IA/ML', capacite: 40, inscrits: 38, taux: 95 },
  { formation: 'Cloud', capacite: 50, inscrits: 41, taux: 82 }
];

const rapportsPersonnalises = [
  { nom: 'Rapport mensuel Direction', type: 'Exécutif', derniere_generation: '2024-03-20', format: 'PDF' },
  { nom: 'Analyse performance formateurs', type: 'Opérationnel', derniere_generation: '2024-03-19', format: 'Excel' },
  { nom: 'Suivi satisfaction apprenants', type: 'Qualité', derniere_generation: '2024-03-18', format: 'PowerBI' },
  { nom: 'Tableau de bord financier', type: 'Financier', derniere_generation: '2024-03-17', format: 'Dashboard' }
];

const kpiBuilder = [
  { nom: 'CA par formation', type: 'Financier', icone: 'DollarSign' },
  { nom: 'Taux de satisfaction', type: 'Qualité', icone: 'Target' },
  { nom: 'Taux de complétion', type: 'Pédagogique', icone: 'Users' },
  { nom: 'ROI par campagne', type: 'Marketing', icone: 'TrendingUp' },
  { nom: 'Temps de conversion', type: 'Commercial', icone: 'Calendar' },
  { nom: 'Coût d\'acquisition', type: 'Commercial', icone: 'Activity' }
];

export default function BusinessIntelligencePage() {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();
  const [detailPanel, setDetailPanel] = useState<{
    isOpen: boolean;
    type: string;
    data?: any;
  }>({ isOpen: false, type: '' });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !hasPermission('analytics.view')) {
    redirect('/');
  }

  const openDetailPanel = (type: string, data?: any) => {
    setDetailPanel({ isOpen: true, type, data });
  };

  const closeDetailPanel = () => {
    setDetailPanel({ isOpen: false, type: '' });
  };

  const renderDetailContent = () => {
    switch (detailPanel.type) {
      case 'ca-detail':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {(kpiData.ca_genere / 1000000).toFixed(1)}M€
              </div>
              <div className="text-sm text-muted-foreground">Chiffre d'affaires annuel</div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Répartition par formation</h4>
              {repartitionCA.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.couleur }}
                    />
                    <span className="text-sm">{item.formation}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{(item.ca / 1000).toFixed(0)}k€</div>
                    <div className="text-xs text-muted-foreground">{item.part}%</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Tendance</h4>
              <div className="text-sm text-green-600">
                +12.3% vs période précédente
              </div>
            </div>
          </div>
        );
      case 'previsions':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{kpiData.previsions_30j}</div>
              <div className="text-sm text-muted-foreground">Inscriptions prévues (30j)</div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Prévisions par semaine</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={previsionInscriptions}>
                    <Line type="monotone" dataKey="prevision" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="reel" stroke="#82ca9d" strokeWidth={2} />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 border rounded">
                <div className="text-lg font-bold text-green-600">92%</div>
                <div className="text-xs text-muted-foreground">Précision</div>
              </div>
              <div className="p-2 border rounded">
                <div className="text-lg font-bold text-blue-600">+8%</div>
                <div className="text-xs text-muted-foreground">Croissance</div>
              </div>
            </div>
          </div>
        );
      case 'builder':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{kpiData.rapports_generes}</div>
              <div className="text-sm text-muted-foreground">Rapports générés ce mois</div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">KPIs disponibles</h4>
              <div className="grid grid-cols-1 gap-2">
                {kpiBuilder.map((kpi, idx) => {
                  const IconComponent = require('lucide-react')[kpi.icone];
                  return (
                    <div key={idx} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        <span className="text-sm">{kpi.nom}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {kpi.type}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="pt-4 border-t">
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Créer un tableau de bord
              </Button>
            </div>
          </div>
        );
      default:
        return <div>Sélectionnez un élément pour voir les détails</div>;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Business Intelligence</h1>
            <p className="text-muted-foreground">
              Analytics avancés et business intelligence
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Données en temps réel
            </Badge>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau rapport
            </Button>
          </div>
        </div>

        {/* KPIs principaux */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openDetailPanel('ca-detail')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">CA généré (année)</p>
                  <p className="text-2xl font-bold text-green-600">
                    {(kpiData.ca_genere / 1000000).toFixed(1)}M€
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
              <div className="text-xs text-green-600 mt-1">+23% vs année dernière</div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Marge brute</p>
                  <p className="text-2xl font-bold text-blue-600">{kpiData.marge_brute}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
              <Progress value={kpiData.marge_brute} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taux d'occupation</p>
                  <p className="text-2xl font-bold text-orange-600">{kpiData.taux_occupation}%</p>
                </div>
                <Users className="w-8 h-8 text-orange-500" />
              </div>
              <Progress value={kpiData.taux_occupation} className="mt-2" />
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openDetailPanel('previsions')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Prévisions 30j</p>
                  <p className="text-2xl font-bold text-purple-600">{kpiData.previsions_30j}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
              <div className="text-xs text-purple-600 mt-1">Inscriptions prévues</div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openDetailPanel('builder')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rapports générés</p>
                  <p className="text-2xl font-bold">{kpiData.rapports_generes}</p>
                </div>
                <FileBarChart className="w-8 h-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides IA */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Actions rapides IA
            </CardTitle>
            <CardDescription>
              Outils d'analyse et de reporting intelligents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
              <AIQuickAction
                label="Exporter rapport"
                icon={Download}
                description="Rapport automatique IA"
                onClick={() => console.log('Export rapport IA')}
              />
              <AIQuickAction
                label="Créer dashboard personnalisé"
                icon={BarChart3}
                description="Builder IA drag & drop"
                onClick={() => console.log('Dashboard IA')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Composants IA spécialisés BI */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🤖 Assistants IA Business Intelligence
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              Intelligence Artificielle
            </Badge>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Prédiction demande par filière */}
            <AIComponent
              title="Prédiction demande par filière"
              description="IA prédit la demande future par domaine de formation"
              status="active"
              confidence={94}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Prédictions', value: '12' },
                { label: 'Précision', value: '91%' }
              ]}
              actions={[
                { label: 'Analyser', icon: Brain, onClick: () => console.log('Prédiction demande') },
                { label: 'Configurer', icon: Settings, onClick: () => console.log('Config prédiction') }
              ]}
            />

            {/* Génération automatique de rapports */}
            <AIComponent
              title="Génération automatique de rapports"
              description="IA génère des rapports personnalisés en temps réel"
              status="active"
              confidence={88}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Rapports générés', value: '23' },
                { label: 'Temps économisé', value: '67h' }
              ]}
              actions={[
                { label: 'Générer', icon: Sparkles, onClick: () => console.log('Génération rapport') },
                { label: 'Templates', icon: FileBarChart, onClick: () => console.log('Templates IA') }
              ]}
            />

            {/* Détection d'anomalies sessions */}
            <AIComponent
              title="Détection d'anomalies sessions"
              description="IA surveille et détecte automatiquement les anomalies"
              status="active"
              confidence={96}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Anomalies détectées', value: '7' },
                { label: 'Alertes envoyées', value: '12' }
              ]}
              actions={[
                { label: 'Surveiller', icon: AlertTriangle, onClick: () => console.log('Surveillance IA') },
                { label: 'Configurer', icon: Settings, onClick: () => console.log('Config détection') }
              ]}
            />
          </div>
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Évolution du CA */}
          <Card>
            <CardHeader>
              <CardTitle>Évolution du chiffre d'affaires</CardTitle>
              <CardDescription>
                CA et marge brute sur les 6 derniers mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={evolutionCA}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="ca" fill="#8884d8" name="CA (€)" />
                    <Line type="monotone" dataKey="marge" stroke="#82ca9d" strokeWidth={2} name="Marge (%)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Répartition du CA */}
          <Card>
            <CardHeader>
              <CardTitle>Répartition du CA par formation</CardTitle>
              <CardDescription>
                Contribution de chaque formation au CA total
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={repartitionCA}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="ca"
                      label={({ formation, part }) => `${formation}: ${part}%`}
                    >
                      {repartitionCA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.couleur} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${(Number(value) / 1000).toFixed(0)}k€`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prévisions et occupation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Prévisions d'inscriptions */}
          <Card>
            <CardHeader>
              <CardTitle>Prévisions d'inscriptions (90 jours)</CardTitle>
              <CardDescription>
                Comparaison réel vs prévisions IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={previsionInscriptions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="periode" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="prevision" stackId="1" stroke="#8884d8" fill="#8884d8" name="Prévision" />
                    <Area type="monotone" dataKey="reel" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Réel" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Taux d'occupation */}
          <Card>
            <CardHeader>
              <CardTitle>Taux d'occupation des sessions</CardTitle>
              <CardDescription>
                Utilisation de la capacité par formation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {occupationSessions.map((session, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{session.formation}</span>
                      <span>{session.inscrits}/{session.capacite} ({session.taux}%)</span>
                    </div>
                    <Progress value={session.taux} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Builder de rapports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Builder de rapports personnalisés
            </CardTitle>
            <CardDescription>
              Créez vos tableaux de bord avec un glisser-déposer de KPIs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {kpiBuilder.map((kpi, idx) => {
                const IconComponent = require('lucide-react')[kpi.icone];
                return (
                  <div 
                    key={idx} 
                    className="p-3 border rounded-lg cursor-move hover:bg-muted/50 transition-colors"
                    draggable
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <IconComponent className="w-6 h-6" />
                      <div className="text-xs font-medium">{kpi.nom}</div>
                      <Badge variant="outline" className="text-xs">
                        {kpi.type}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-4 border-2 border-dashed border-muted rounded-lg text-center text-muted-foreground">
              Glissez-déposez les KPIs ici pour créer votre tableau de bord personnalisé
            </div>
          </CardContent>
        </Card>

        {/* Rapports existants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileBarChart className="w-5 h-5" />
              Rapports personnalisés existants
            </CardTitle>
            <CardDescription>
              Vos rapports sauvegardés et leurs dernières générations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rapportsPersonnalises.map((rapport, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileBarChart className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{rapport.nom}</div>
                      <div className="text-sm text-muted-foreground">
                        {rapport.type} • Dernière génération: {rapport.derniere_generation}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{rapport.format}</Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panneau de détail */}
      <DetailPanel
        isOpen={detailPanel.isOpen}
        onClose={closeDetailPanel}
        title={
          detailPanel.type === 'ca-detail' ? 'Analyse du chiffre d\'affaires' :
          detailPanel.type === 'previsions' ? 'Prévisions avancées' :
          detailPanel.type === 'builder' ? 'Builder de rapports' :
          'Détails'
        }
        width="lg"
      >
        {renderDetailContent()}
      </DetailPanel>
    </MainLayout>
  );
}
