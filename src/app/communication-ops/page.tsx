'use client';

/**
 * Page Communication & Ops internes
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
  MessageSquare,
  Zap,
  Clock,
  CheckCircle,
  Bot,
  Bell,
  Users,
  Activity,
  TrendingUp,
  Settings,
  Play,
  Pause,
  Plus,
  Send,
  FileText,
  AlertTriangle,
  Target,
  Brain,
  Workflow,
  Eye,
  Edit,
  Sparkles,
  Cog
} from 'lucide-react';
import { redirect } from 'next/navigation';

// Données mockées
const kpiData = {
  // Infos clés
  notifications_envoyees: 1247,
  workflows_actifs: 23,
  temps_economise_total: 156.7, // heures
  tickets_resolus_auto: 89,
  
  // KPIs IA
  heures_economisees_ia: 234.5,
  erreurs_detectees_ia: 45,
  taux_adoption_ia: {
    chatbot_interne: 78.3,
    playbooks_ia: 65.2,
    automatisations: 91.7
  }
};

const notificationsEquipes = [
  { equipe: 'Setters', notifications: 345, ouvertes: 298, actions: 234 },
  { equipe: 'Closers', notifications: 267, ouvertes: 245, actions: 189 },
  { equipe: 'Formateurs', notifications: 189, ouvertes: 167, actions: 145 },
  { equipe: 'Support', notifications: 156, ouvertes: 142, actions: 128 },
  { equipe: 'Administration', notifications: 290, ouvertes: 278, actions: 256 }
];

const workflowsActifs = [
  { nom: 'Qualification automatique leads', type: 'Make', statut: 'Actif', executions: 1247, succes: 98.7, derniere_exec: '2024-03-21 10:30' },
  { nom: 'Relance apprenants inactifs', type: 'N8N', statut: 'Actif', executions: 567, succes: 94.2, derniere_exec: '2024-03-21 09:15' },
  { nom: 'Génération rapports hebdo', type: 'Make', statut: 'Actif', executions: 52, succes: 100, derniere_exec: '2024-03-21 08:00' },
  { nom: 'Sync données formation', type: 'N8N', statut: 'Pause', executions: 234, succes: 89.3, derniere_exec: '2024-03-20 18:45' },
  { nom: 'Notification fin de module', type: 'Make', statut: 'Actif', executions: 890, succes: 96.8, derniere_exec: '2024-03-21 11:22' }
];

const activiteInterne = [
  { timestamp: '2024-03-21 11:30', action: 'Workflow "Qualification leads" exécuté', utilisateur: 'Système', type: 'automatisation', statut: 'Succès' },
  { timestamp: '2024-03-21 11:25', action: 'Notification envoyée à l\'équipe Sales', utilisateur: 'IA Assistant', type: 'notification', statut: 'Envoyé' },
  { timestamp: '2024-03-21 11:20', action: 'Ticket support résolu automatiquement', utilisateur: 'Chatbot IA', type: 'support', statut: 'Résolu' },
  { timestamp: '2024-03-21 11:15', action: 'Erreur détectée dans pipeline formation', utilisateur: 'IA Monitor', type: 'alerte', statut: 'Corrigée' },
  { timestamp: '2024-03-21 11:10', action: 'Playbook IA consulté par formateur', utilisateur: 'Sophie Martin', type: 'consultation', statut: 'Complété' }
];

const adoptionIA = [
  { outil: 'Chatbot interne', utilisation: 78.3, utilisateurs_actifs: 45, requetes_jour: 234 },
  { outil: 'Playbooks IA', utilisation: 65.2, utilisateurs_actifs: 32, consultations_jour: 89 },
  { outil: 'Automatisations', utilisation: 91.7, utilisateurs_actifs: 23, workflows_actifs: 23 }
];

const impactIA = [
  { domaine: 'Support client', heures_avant: 120, heures_apres: 45, economie: 75 },
  { domaine: 'Administration', heures_avant: 80, heures_apres: 32, economie: 48 },
  { domaine: 'Formation', heures_avant: 160, heures_apres: 89, economie: 71 },
  { domaine: 'Commercial', heures_avant: 200, heures_apres: 134, economie: 66 }
];

const ticketsSupport = [
  { id: '#T-001', sujet: 'Problème connexion LMS', equipe: 'Support', statut: 'Résolu auto', resolution_ia: true, temps: '2min' },
  { id: '#T-002', sujet: 'Question sur émargement', equipe: 'Administration', statut: 'En cours', resolution_ia: false, temps: '15min' },
  { id: '#T-003', sujet: 'Accès module avancé', equipe: 'Support', statut: 'Résolu auto', resolution_ia: true, temps: '1min' },
  { id: '#T-004', sujet: 'Facturation formation', equipe: 'Finance', statut: 'Escaladé', resolution_ia: false, temps: '45min' }
];

export default function CommunicationOpsPage() {
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

  if (!isAuthenticated || !hasPermission('dashboard.view')) {
    redirect('/');
  }

  const openDetailPanel = (type: string, data?: any) => {
    setDetailPanel({ isOpen: true, type, data });
  };

  const closeDetailPanel = () => {
    setDetailPanel({ isOpen: false, type: '' });
  };

  const getStatutWorkflow = (statut: string) => {
    switch (statut) {
      case 'Actif':
        return 'bg-green-100 text-green-800';
      case 'Pause':
        return 'bg-yellow-100 text-yellow-800';
      case 'Erreur':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTemperatureIA = (score: number) => {
    if (score >= 80) return { emoji: '🔥', label: 'Excellent', color: 'text-red-600' };
    if (score >= 60) return { emoji: '🌡️', label: 'Bon', color: 'text-yellow-600' };
    return { emoji: '🥶', label: 'Faible', color: 'text-blue-600' };
  };

  const renderDetailContent = () => {
    switch (detailPanel.type) {
      case 'workflows':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{kpiData.workflows_actifs}</div>
              <div className="text-sm text-muted-foreground">Workflows automatisés actifs</div>
            </div>
            <div className="space-y-3">
              {workflowsActifs.map((workflow, idx) => (
                <div key={idx} className="p-3 border rounded space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{workflow.nom}</div>
                      <div className="text-sm text-muted-foreground">
                        {workflow.type} • {workflow.executions} exécutions
                      </div>
                    </div>
                    <Badge className={getStatutWorkflow(workflow.statut)}>
                      {workflow.statut}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Succès:</span> {workflow.succes}%
                    </div>
                    <div>
                      <span className="text-muted-foreground">Dernière exec:</span> {workflow.derniere_exec}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      {workflow.statut === 'Actif' ? <Pause className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
                      {workflow.statut === 'Actif' ? 'Pause' : 'Démarrer'}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-3 h-3 mr-1" />
                      Logs
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'ia-impact':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{kpiData.heures_economisees_ia}h</div>
              <div className="text-sm text-muted-foreground">Heures économisées ce mois grâce à l'IA</div>
            </div>
            <div className="space-y-3">
              {impactIA.map((impact, idx) => (
                <div key={idx} className="p-3 border rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{impact.domaine}</span>
                    <Badge className="bg-green-100 text-green-800">
                      -{impact.economie}h
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Avant IA:</span> {impact.heures_avant}h
                    </div>
                    <div>
                      <span className="text-muted-foreground">Après IA:</span> {impact.heures_apres}h
                    </div>
                  </div>
                  <Progress value={(impact.economie / impact.heures_avant) * 100} className="mt-2 h-2" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'chatbot':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {adoptionIA.map((outil, idx) => (
                <div key={idx} className="text-center p-3 border rounded">
                  <div className="text-lg font-bold text-purple-600">{outil.utilisation}%</div>
                  <div className="text-sm text-muted-foreground">{outil.outil}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Questions fréquentes (IA interne)</h4>
              <div className="space-y-2">
                {[
                  'Comment créer une nouvelle formation ?',
                  'Processus de validation Qualiopi ?',
                  'Où trouver les templates de documents ?',
                  'Comment configurer une relance automatique ?'
                ].map((question, idx) => (
                  <div key={idx} className="p-2 bg-muted rounded text-sm flex items-center gap-2">
                    <Bot className="w-4 h-4 text-purple-600" />
                    {question}
                  </div>
                ))}
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Communication & Ops internes</h1>
            <p className="text-muted-foreground">
              Hub interne avec workflows automatisés et IA
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {kpiData.workflows_actifs} workflows actifs
            </Badge>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau workflow
            </Button>
          </div>
        </div>

        {/* KPIs principaux - Infos clés */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">📊 Infos clés</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Notifications envoyées équipes</p>
                    <p className="text-2xl font-bold">{kpiData.notifications_envoyees}</p>
                  </div>
                  <Bell className="w-8 h-8 text-blue-500" />
                </div>
                <div className="text-xs text-green-600 mt-1">+23% engagement vs manuel</div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openDetailPanel('workflows')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Workflows automatisés actifs</p>
                    <p className="text-2xl font-bold">{kpiData.workflows_actifs}</p>
                  </div>
                  <Zap className="w-8 h-8 text-purple-500" />
                </div>
                <div className="text-xs text-purple-600 mt-1">97.3% de succès moyen</div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Temps économisé/mois</p>
                    <p className="text-2xl font-bold text-green-600">{kpiData.temps_economise_total}h</p>
                  </div>
                  <Clock className="w-8 h-8 text-green-500" />
                </div>
                <div className="text-xs text-green-600 mt-1">≈ 4 semaines de travail</div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tickets résolus automatiquement</p>
                    <p className="text-2xl font-bold">{kpiData.tickets_resolus_auto}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-orange-500" />
                </div>
                <div className="text-xs text-orange-600 mt-1">84% résolution auto</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* KPIs IA */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🤖 KPIs IA - Impact mesuré
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              Intelligence Artificielle
            </Badge>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow border-purple-200"
              onClick={() => openDetailPanel('ia-impact')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Heures économisées IA</p>
                    <p className="text-2xl font-bold text-purple-600">{kpiData.heures_economisees_ia}h</p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-500" />
                </div>
                <div className="text-xs text-purple-600 mt-1">Impact mesurable de l'IA</div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Erreurs détectées/corrigées IA</p>
                    <p className="text-2xl font-bold text-purple-600">{kpiData.erreurs_detectees_ia}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-purple-500" />
                </div>
                <div className="text-xs text-purple-600 mt-1">Prévention proactive</div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow border-purple-200"
              onClick={() => openDetailPanel('chatbot')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Taux adoption IA équipes</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {Math.round((kpiData.taux_adoption_ia.chatbot_interne + kpiData.taux_adoption_ia.playbooks_ia + kpiData.taux_adoption_ia.automatisations) / 3)}%
                    </p>
                  </div>
                  <Bot className="w-8 h-8 text-purple-500" />
                </div>
                <div className="text-xs text-purple-600 mt-1">Adoption croissante</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions rapides IA */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Actions rapides IA
            </CardTitle>
            <CardDescription>
              Raccourcis intelligents pour les opérations internes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <AIQuickAction
                label="Créer tâche"
                icon={Plus}
                description="Tâche intelligente IA"
                onClick={() => console.log('Création tâche IA')}
              />
              <AIQuickAction
                label="Lancer workflow"
                icon={Zap}
                description="Automatisation IA"
                onClick={() => console.log('Workflow IA')}
              />
              <AIQuickAction
                label="Envoyer notification"
                icon={Send}
                description="Notification personnalisée IA"
                onClick={() => console.log('Notification IA')}
              />
              <AIQuickAction
                label="Chatbot interne"
                icon={Bot}
                description="Assistant IA équipes"
                onClick={() => console.log('Chatbot interne IA')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Hub interne avec fil d'activité */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Hub interne - Fil d'activité en temps réel
            </CardTitle>
            <CardDescription>
              Activité de l'équipe et des automatisations en temps réel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activiteInterne.map((activite, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex-shrink-0">
                    {activite.type === 'automatisation' && <Zap className="w-5 h-5 text-purple-600" />}
                    {activite.type === 'notification' && <Bell className="w-5 h-5 text-blue-600" />}
                    {activite.type === 'support' && <MessageSquare className="w-5 h-5 text-green-600" />}
                    {activite.type === 'alerte' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                    {activite.type === 'consultation' && <Eye className="w-5 h-5 text-orange-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{activite.action}</span>
                      <Badge variant={
                        activite.statut === 'Succès' || activite.statut === 'Résolu' || activite.statut === 'Complété' ? 'default' :
                        activite.statut === 'Envoyé' ? 'secondary' : 'destructive'
                      }>
                        {activite.statut}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Par {activite.utilisateur} • {activite.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Suivi des workflows avec statuts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="w-5 h-5" />
              Suivi des workflows automatisés
            </CardTitle>
            <CardDescription>
              Statuts et performances des automatisations Make/N8N
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {workflowsActifs.map((workflow, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      workflow.statut === 'Actif' ? 'bg-green-100' :
                      workflow.statut === 'Pause' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      {workflow.statut === 'Actif' ? (
                        <Play className="w-6 h-6 text-green-600" />
                      ) : workflow.statut === 'Pause' ? (
                        <Pause className="w-6 h-6 text-yellow-600" />
                      ) : (
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{workflow.nom}</div>
                      <div className="text-sm text-muted-foreground">
                        {workflow.type} • {workflow.executions} exécutions • {workflow.succes}% succès
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Dernière exécution: {workflow.derniere_exec}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatutWorkflow(workflow.statut)}>
                      {workflow.statut}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        {workflow.statut === 'Actif' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tickets support résolus automatiquement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Chatbot interne - Tickets résolus automatiquement
            </CardTitle>
            <CardDescription>
              Support automatique pour les questions process et FAQ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ticketsSupport.map((ticket, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      ticket.resolution_ia ? 'bg-purple-100' : 'bg-gray-100'
                    }`}>
                      {ticket.resolution_ia ? (
                        <Bot className="w-4 h-4 text-purple-600" />
                      ) : (
                        <Users className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{ticket.id}</span>
                        {ticket.resolution_ia && (
                          <Badge className="bg-purple-100 text-purple-800 text-xs">
                            🤖 IA
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {ticket.sujet} • {ticket.equipe}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-center">
                      <div className="font-medium">{ticket.temps}</div>
                      <div className="text-xs text-muted-foreground">Temps</div>
                    </div>
                    <Badge className={
                      ticket.statut === 'Résolu auto' ? 'bg-green-100 text-green-800' :
                      ticket.statut === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {ticket.statut}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notifications par équipe */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications par équipe</CardTitle>
              <CardDescription>
                Engagement et actions par équipe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={notificationsEquipes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="equipe" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="notifications" fill="#8884d8" name="Envoyées" />
                    <Bar dataKey="actions" fill="#82ca9d" name="Actions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Adoption des outils IA */}
          <Card>
            <CardHeader>
              <CardTitle>Adoption des outils IA par équipe</CardTitle>
              <CardDescription>
                Taux d'utilisation des assistants IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adoptionIA.map((outil, idx) => {
                  const temp = getTemperatureIA(outil.utilisation);
                  return (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{temp.emoji}</span>
                          <span className="font-medium">{outil.outil}</span>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold text-lg ${temp.color}`}>
                            {outil.utilisation}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {outil.utilisateurs_actifs} utilisateurs
                          </div>
                        </div>
                      </div>
                      <Progress value={outil.utilisation} className="h-3" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Panneau de détail */}
      <DetailPanel
        isOpen={detailPanel.isOpen}
        onClose={closeDetailPanel}
        title={
          detailPanel.type === 'workflows' ? 'Gestion des workflows' :
          detailPanel.type === 'ia-impact' ? 'Impact de l\'IA mesuré' :
          detailPanel.type === 'chatbot' ? 'Chatbot interne' :
          'Détails'
        }
        width="lg"
      >
        {renderDetailContent()}
      </DetailPanel>
    </MainLayout>
  );
}
