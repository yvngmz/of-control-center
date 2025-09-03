'use client';

/**
 * Page Administratif & Réglementaire
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
  Line
} from 'recharts';
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileCheck,
  Users,
  Shield,
  Calendar,
  Download,
  Plus,
  Send,
  Eye,
  Edit,
  TrendingUp,
  Zap,
  Bell,
  Settings,
  Brain
} from 'lucide-react';
import { redirect } from 'next/navigation';

// Données mockées enrichies
const kpiData = {
  // Infos clés
  conventions_creees: 42,
  emargements_generes: 156,
  emargements_signes: 134,
  dossiers_cpf_total: 67,
  dossiers_cpf_acceptes: 23,
  dossiers_cpf_attente: 31,
  dossiers_cpf_incomplets: 13,
  preuves_qualiopi: 87.3,
  audits_passes: 8,
  
  // KPIs IA
  documents_auto_generes: 78.5,
  temps_economise_par_dossier: 2.4, // heures
  score_risque_non_conformite: 12.8 // %
};

const qualiopiData = [
  { critere: 'Critère 1', conforme: 85, nonConforme: 15 },
  { critere: 'Critère 2', conforme: 92, nonConforme: 8 },
  { critere: 'Critère 3', conforme: 78, nonConforme: 22 },
  { critere: 'Critère 4', conforme: 95, nonConforme: 5 },
  { critere: 'Critère 5', conforme: 88, nonConforme: 12 },
  { critere: 'Critère 6', conforme: 91, nonConforme: 9 },
  { critere: 'Critère 7', conforme: 83, nonConforme: 17 }
];

const timelineData = [
  { date: 'Jan', audits: 2, conformite: 85 },
  { date: 'Fév', audits: 1, conformite: 87 },
  { date: 'Mar', audits: 3, conformite: 89 },
  { date: 'Avr', audits: 2, conformite: 91 },
  { date: 'Mai', audits: 1, conformite: 88 },
  { date: 'Jun', audits: 2, conformite: 92 }
];

const documentTypes = [
  { name: 'Conventions', value: 42, auto: 33, manuel: 9, color: '#8884d8' },
  { name: 'Attestations', value: 156, auto: 134, manuel: 22, color: '#82ca9d' },
  { name: 'Factures', value: 89, auto: 67, manuel: 22, color: '#ffc658' },
  { name: 'Émargements', value: 234, auto: 189, manuel: 45, color: '#ff7c7c' }
];

const dossiersEDOF = [
  { numero: 'CPF-2024-001', nom: 'Marie Dupont', formation: 'Data Science', statut: 'Accepté', montant: 3500, date_creation: '2024-03-15' },
  { numero: 'CPF-2024-002', nom: 'Pierre Martin', formation: 'DevOps', statut: 'En attente', montant: 2800, date_creation: '2024-03-18' },
  { numero: 'EDOF-2024-003', nom: 'Sophie Bernard', formation: 'Cybersécurité', statut: 'Incomplet', montant: 4200, date_creation: '2024-03-12' },
  { numero: 'CPF-2024-004', nom: 'Thomas Dubois', formation: 'IA/ML', statut: 'Accepté', montant: 4800, date_creation: '2024-03-10' }
];

const alertesIA = [
  { 
    type: 'risque_audit', 
    niveau: 'high', 
    titre: 'Risque de non-conformité détecté', 
    description: 'Critère 3.2 - Manque 2 preuves pour l\'indicateur', 
    action_recommandee: 'Collecter attestations formateurs',
    score_confiance: 89
  },
  { 
    type: 'document_manquant', 
    niveau: 'medium', 
    titre: 'Documents d\'émargement incomplets', 
    description: '3 sessions sans signatures complètes', 
    action_recommandee: 'Relancer apprenants pour signatures',
    score_confiance: 76
  },
  { 
    type: 'echeance_proche', 
    niveau: 'low', 
    titre: 'Échéance CPF dans 5 jours', 
    description: 'Dossier CPF-2024-002 expire bientôt', 
    action_recommandee: 'Finaliser le dossier rapidement',
    score_confiance: 95
  }
];

const historiqueAudits = [
  { date: '2024-06-15', type: 'Surveillance Qualiopi', organisme: 'AFNOR', resultat: 'Conforme', score: 94.2, points_amelioration: 2 },
  { date: '2023-12-10', type: 'Audit EDOF', organisme: 'Région IDF', resultat: 'Conforme', score: 88.5, points_amelioration: 4 },
  { date: '2023-09-22', type: 'Contrôle OPCO', organisme: 'OPCO EP', resultat: 'Conforme', score: 91.8, points_amelioration: 1 }
];

export default function AdministrativePage() {
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

  if (!isAuthenticated || !hasPermission('qualiopi.view')) {
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
      case 'preuves':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">87%</div>
                <div className="text-sm text-muted-foreground">Validées</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">13%</div>
                <div className="text-sm text-muted-foreground">En attente</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Preuves récentes</h4>
              {[
                { name: 'Programme formation DevOps.pdf', status: 'validé', date: '2024-03-20' },
                { name: 'Évaluation satisfaction Q1.xlsx', status: 'en_attente', date: '2024-03-19' },
                { name: 'CV formateur expert IA.pdf', status: 'validé', date: '2024-03-18' }
              ].map((preuve, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <div className="font-medium text-sm">{preuve.name}</div>
                    <div className="text-xs text-muted-foreground">{preuve.date}</div>
                  </div>
                  <Badge variant={preuve.status === 'validé' ? 'default' : 'secondary'}>
                    {preuve.status === 'validé' ? 'Validé' : 'En attente'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        );
      case 'qualiopi':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">94.2%</div>
              <div className="text-sm text-muted-foreground">Score global Qualiopi</div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Détail par critère</h4>
              {qualiopiData.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{item.critere}</span>
                    <span>{item.conforme}%</span>
                  </div>
                  <Progress value={item.conforme} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'documents':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {documentTypes.map((doc, idx) => (
                <div key={idx} className="text-center p-3 border rounded">
                  <div className="text-xl font-bold">{doc.value}</div>
                  <div className="text-sm text-muted-foreground">{doc.name}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Actions rapides</h4>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle convention
                </Button>
                <Button variant="outline" size="sm">
                  <FileCheck className="w-4 h-4 mr-2" />
                  Générer attestation
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter émargements
                </Button>
              </div>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate">Administratif & Réglementaire</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Gestion administrative, Qualiopi et conformité réglementaire
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs md:text-sm">
              Qualiopi Valide
            </Badge>
            <Button size="sm" className="hidden sm:flex">
              <Download className="w-4 h-4 mr-2" />
              Rapport complet
            </Button>
            <Button size="sm" className="sm:hidden">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* KPIs principaux - Infos clés */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">📊 Infos clés</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openDetailPanel('conventions')}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Conventions créées ce mois</p>
                    <p className="text-2xl font-bold">{kpiData.conventions_creees}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
                <div className="text-xs text-green-600 mt-1">+15% vs mois dernier</div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openDetailPanel('emargements')}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Émargements signés</p>
                    <p className="text-2xl font-bold">{kpiData.emargements_signes}/{kpiData.emargements_generes}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
                <Progress value={(kpiData.emargements_signes / kpiData.emargements_generes) * 100} className="mt-2" />
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openDetailPanel('dossiers-cpf')}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Dossiers CPF/EDOF</p>
                    <p className="text-2xl font-bold">{kpiData.dossiers_cpf_total}</p>
                  </div>
                  <Shield className="w-8 h-8 text-orange-500" />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {kpiData.dossiers_cpf_acceptes} acceptés • {kpiData.dossiers_cpf_attente} en attente
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openDetailPanel('preuves')}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Preuves Qualiopi</p>
                    <p className="text-2xl font-bold text-green-600">{kpiData.preuves_qualiopi}%</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <Progress value={kpiData.preuves_qualiopi} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* KPIs IA */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🤖 KPIs IA
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              Intelligence Artificielle
            </Badge>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow border-purple-200"
              onClick={() => openDetailPanel('ia-documents')}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Documents générés automatiquement</p>
                    <p className="text-2xl font-bold text-purple-600">{kpiData.documents_auto_generes}%</p>
                  </div>
                  <Zap className="w-8 h-8 text-purple-500" />
                </div>
                <Progress value={kpiData.documents_auto_generes} className="mt-2" />
                <div className="text-xs text-purple-600 mt-1">vs {100 - kpiData.documents_auto_generes}% manuels</div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-purple-200">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Temps économisé/dossier</p>
                    <p className="text-2xl font-bold text-purple-600">{kpiData.temps_economise_par_dossier}h</p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-500" />
                </div>
                <div className="text-xs text-purple-600 mt-1">≈ {(kpiData.temps_economise_par_dossier * kpiData.dossiers_cpf_total).toFixed(0)}h économisées ce mois</div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow border-red-200"
              onClick={() => openDetailPanel('ia-risques')}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Score risque non-conformité</p>
                    <p className="text-2xl font-bold text-red-600">{kpiData.score_risque_non_conformite}%</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <div className="text-xs text-red-600 mt-1">Alerte proactive IA</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions rapides */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Actions rapides
            </CardTitle>
            <CardDescription>
              Raccourcis vers les actions les plus fréquentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <AIQuickAction
                label="Générer convention"
                icon={Plus}
                description="IA génère automatiquement"
                onClick={() => console.log('Génération convention IA')}
              />
              <AIQuickAction
                label="Créer preuve Qualiopi"
                icon={FileCheck}
                description="Assistant IA Qualiopi"
                onClick={() => console.log('Création preuve IA')}
              />
              <AIQuickAction
                label="Relancer dossier CPF"
                icon={Send}
                description="Relance intelligente"
                onClick={() => console.log('Relance CPF IA')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Composants IA spécialisés */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🤖 Assistants IA Spécialisés
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              Intelligence Artificielle
            </Badge>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {/* Génération automatique de documents */}
            <AIComponent
              title="Génération automatique de documents"
              description="IA génère conventions, attestations et factures automatiquement"
              status="active"
              confidence={94}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Documents générés', value: '78.5%' },
                { label: 'Temps économisé', value: '2.4h' }
              ]}
              actions={[
                { label: 'Générer', icon: Zap, onClick: () => console.log('Génération doc') },
                { label: 'Configurer', icon: Settings, onClick: () => console.log('Config IA') }
              ]}
            />

            {/* Vérification Qualiopi par IA */}
            <AIComponent
              title="Vérification Qualiopi par IA"
              description="IA vérifie automatiquement la conformité des preuves"
              status="active"
              confidence={89}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Preuves vérifiées', value: '156' },
                { label: 'Conformité', value: '87.3%' }
              ]}
              actions={[
                { label: 'Analyser', icon: Brain, onClick: () => console.log('Analyse Qualiopi') },
                { label: 'Rapport', icon: Eye, onClick: () => console.log('Rapport IA') }
              ]}
            />

            {/* Veille réglementaire IA */}
            <AIComponent
              title="Veille réglementaire IA"
              description="IA surveille les évolutions réglementaires en temps réel"
              status="active"
              confidence={92}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Alertes détectées', value: '12' },
                { label: 'Mises à jour', value: '3' }
              ]}
              actions={[
                { label: 'Veille', icon: Eye, onClick: () => console.log('Veille réglementaire') },
                { label: 'Alertes', icon: Bell, onClick: () => console.log('Alertes IA') }
              ]}
            />
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conformité Qualiopi par critère */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openDetailPanel('qualiopi')}
          >
            <CardHeader>
              <CardTitle>Conformité Qualiopi par critère</CardTitle>
              <CardDescription>
                Répartition des scores par critère Qualiopi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={qualiopiData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="critere" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="conforme" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Timeline des actions réglementaires */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline des actions réglementaires</CardTitle>
              <CardDescription>
                Évolution de la conformité et des audits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="conformite" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="audits" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panneau d'alerte IA */}
        <Card className="border-red-200 bg-red-50/50 dark:bg-red-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              🚨 Panneau d'alerte IA - Risques de non-conformité
              <Badge variant="destructive">3 alertes</Badge>
            </CardTitle>
            <CardDescription>
              L'IA surveille en permanence les risques de rejet ou de non-conformité
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertesIA.map((alerte, idx) => (
                <div key={idx} className={`flex items-start gap-3 p-4 rounded-lg border-l-4 ${
                  alerte.niveau === 'high' ? 'border-l-red-500 bg-red-50 dark:bg-red-900/20' :
                  alerte.niveau === 'medium' ? 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/20' :
                  'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                }`}>
                  <div className="flex-shrink-0">
                    {alerte.niveau === 'high' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                    {alerte.niveau === 'medium' && <AlertTriangle className="w-5 h-5 text-orange-600" />}
                    {alerte.niveau === 'low' && <Clock className="w-5 h-5 text-yellow-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{alerte.titre}</p>
                      <Badge variant="outline" className="text-xs">
                        Confiance IA: {alerte.score_confiance}%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {alerte.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {alerte.action_recommandee}
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Eye className="w-3 h-3 mr-1" />
                        Détails
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dossiers CPF/EDOF avec statuts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Dossiers CPF/EDOF en cours
            </CardTitle>
            <CardDescription>
              Suivi détaillé des dossiers avec statuts en temps réel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{kpiData.dossiers_cpf_acceptes}</div>
                <div className="text-sm text-green-700">Acceptés</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{kpiData.dossiers_cpf_attente}</div>
                <div className="text-sm text-yellow-700">En attente</div>
              </div>
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{kpiData.dossiers_cpf_incomplets}</div>
                <div className="text-sm text-red-700">Incomplets</div>
              </div>
            </div>
            <div className="space-y-3">
              {dossiersEDOF.map((dossier, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{dossier.numero} - {dossier.nom}</div>
                      <div className="text-sm text-muted-foreground">
                        {dossier.formation} • {dossier.montant}€ • Créé le {dossier.date_creation}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={
                      dossier.statut === 'Accepté' ? 'bg-green-100 text-green-800' :
                      dossier.statut === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {dossier.statut}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Checklist Qualiopi */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Checklist Qualiopi dynamique avec jauges de progression
            </CardTitle>
            <CardDescription>
              Suivi des 7 critères et 32 indicateurs Qualiopi avec progression par critère
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {qualiopiData.map((critere, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {critere.conforme >= 90 ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : critere.conforme >= 80 ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    )}
                    <div>
                      <div className="font-medium">{critere.critere}</div>
                      <div className="text-sm text-muted-foreground">
                        {critere.conforme}% de conformité
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={critere.conforme} className="w-24" />
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
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
          detailPanel.type === 'preuves' ? 'Détail des preuves Qualiopi' :
          detailPanel.type === 'qualiopi' ? 'Analyse Qualiopi détaillée' :
          detailPanel.type === 'documents' ? 'Générateur de documents' :
          'Détails'
        }
        width="lg"
      >
        {renderDetailContent()}
      </DetailPanel>
    </MainLayout>
  );
}
