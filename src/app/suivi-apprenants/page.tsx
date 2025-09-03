'use client';

/**
 * Page Suivi Apprenants
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import {
  GraduationCap,
  Users,
  AlertTriangle,
  Star,
  MessageSquare,
  TrendingDown,
  Calendar,
  Mail,
  Phone,
  MessageCircle,
  Bell,
  UserCheck,
  Heart,
  Award,
  Clock,
  Send,
  Plus,
  Bot,
  Brain,
  Zap,
  Settings,
  Target
} from 'lucide-react';
import { redirect } from 'next/navigation';

// Données mockées
const kpiData = {
  apprenants_actifs: 342,
  taux_retention: 87.3,
  apprenants_risque: 23,
  satisfaction_moyenne: 4.2,
  relances_automatiques: 156
};

const repartitionStatuts = [
  { name: 'Actifs', value: 342, color: '#10b981' },
  { name: 'En pause', value: 45, color: '#f59e0b' },
  { name: 'Abandons', value: 28, color: '#ef4444' },
  { name: 'Diplômés', value: 189, color: '#8b5cf6' }
];

const evolutionRetention = [
  { mois: 'Jan', retention: 85.2, satisfaction: 4.1 },
  { mois: 'Fév', retention: 86.1, satisfaction: 4.0 },
  { mois: 'Mar', retention: 87.3, satisfaction: 4.2 },
  { mois: 'Avr', retention: 86.8, satisfaction: 4.3 },
  { mois: 'Mai', retention: 88.1, satisfaction: 4.2 },
  { mois: 'Jun', retention: 87.9, satisfaction: 4.4 }
];

const apprenantsRisque = [
  { nom: 'Alice Martin', formation: 'Data Science', progression: 23, derniere_connexion: '5 jours', score_risque: 85, raisons: ['Faible progression', 'Absence prolongée'] },
  { nom: 'Thomas Dubois', formation: 'DevOps', progression: 45, derniere_connexion: '3 jours', score_risque: 72, raisons: ['Résultats faibles', 'Peu d\'interactions'] },
  { nom: 'Sophie Bernard', formation: 'Cybersécurité', progression: 12, derniere_connexion: '7 jours', score_risque: 91, raisons: ['Très faible progression', 'Pas de réponse aux messages'] },
  { nom: 'Pierre Durand', formation: 'IA/ML', progression: 67, derniere_connexion: '2 jours', score_risque: 68, raisons: ['Difficultés sur les exercices'] }
];

const satisfactionDetails = [
  { critere: 'Contenu', note: 4.3 },
  { critere: 'Formateur', note: 4.5 },
  { critere: 'Support', note: 4.0 },
  { critere: 'Plateforme', note: 4.1 },
  { critere: 'Suivi', note: 4.2 }
];

const interactionsRecentes = [
  { apprenant: 'Marie Dupont', type: 'Email', sujet: 'Difficulté module 3', date: '2024-03-20', statut: 'Répondu' },
  { apprenant: 'Jean Martin', type: 'Appel', sujet: 'Planification session 1:1', date: '2024-03-19', statut: 'Planifié' },
  { apprenant: 'Sophie Chen', type: 'Message', sujet: 'Question sur l\'évaluation', date: '2024-03-18', statut: 'En attente' },
  { apprenant: 'Lucas Moreau', type: 'Email', sujet: 'Demande de report', date: '2024-03-17', statut: 'Traité' }
];

export default function SuiviApprenantsPage() {
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

  if (!isAuthenticated || !hasPermission('learners.view')) {
    redirect('/');
  }

  const openDetailPanel = (type: string, data?: any) => {
    setDetailPanel({ isOpen: true, type, data });
  };

  const closeDetailPanel = () => {
    setDetailPanel({ isOpen: false, type: '' });
  };

  const getRisqueColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-green-600';
  };

  const renderDetailContent = () => {
    switch (detailPanel.type) {
      case 'risque':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{kpiData.apprenants_risque}</div>
              <div className="text-sm text-muted-foreground">Apprenants à risque</div>
            </div>
            <div className="space-y-3">
              {apprenantsRisque.map((apprenant, idx) => (
                <div key={idx} className="p-3 border rounded space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{apprenant.nom}</div>
                      <div className="text-sm text-muted-foreground">{apprenant.formation}</div>
                    </div>
                    <div className={`text-lg font-bold ${getRisqueColor(apprenant.score_risque)}`}>
                      {apprenant.score_risque}%
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Progression:</span> {apprenant.progression}%
                    </div>
                    <div>
                      <span className="text-muted-foreground">Dernière connexion:</span> {apprenant.derniere_connexion}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {apprenant.raisons.map((raison, ridx) => (
                      <Badge key={ridx} variant="secondary" className="text-xs">
                        {raison}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline">
                      <Phone className="w-3 h-3 mr-1" />
                      Appeler
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="w-3 h-3 mr-1" />
                      RDV
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'satisfaction':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{kpiData.satisfaction_moyenne}</div>
              <div className="flex justify-center">
                {[1,2,3,4,5].map(star => (
                  <Star 
                    key={star} 
                    className={`w-5 h-5 ${star <= kpiData.satisfaction_moyenne ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">Note moyenne</div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Détail par critère</h4>
              {satisfactionDetails.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm">{item.critere}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1,2,3,4,5].map(star => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= item.note ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-medium w-8">{item.note}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Actions recommandées</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Enquête satisfaction détaillée
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  Programme de fidélisation
                </Button>
              </div>
            </div>
          </div>
        );
      case 'retention':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{kpiData.taux_retention}%</div>
              <div className="text-sm text-muted-foreground">Taux de rétention</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 border rounded">
                <div className="text-lg font-bold text-green-600">{repartitionStatuts[0].value}</div>
                <div className="text-xs text-muted-foreground">Actifs</div>
              </div>
              <div className="p-2 border rounded">
                <div className="text-lg font-bold text-yellow-600">{repartitionStatuts[1].value}</div>
                <div className="text-xs text-muted-foreground">En pause</div>
              </div>
              <div className="p-2 border rounded">
                <div className="text-lg font-bold text-red-600">{repartitionStatuts[2].value}</div>
                <div className="text-xs text-muted-foreground">Abandons</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Évolution sur 6 mois</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={evolutionRetention}>
                    <Line type="monotone" dataKey="retention" stroke="#10b981" strokeWidth={2} />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
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
            <h1 className="text-3xl font-bold tracking-tight">Suivi Apprenants</h1>
            <p className="text-muted-foreground">
              Suivi et accompagnement personnalisé des apprenants
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              {kpiData.apprenants_risque} à risque
            </Badge>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau suivi
            </Button>
          </div>
        </div>

        {/* KPIs principaux */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Apprenants actifs</p>
                  <p className="text-2xl font-bold">{kpiData.apprenants_actifs}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-xs text-green-600 mt-1">+12% vs mois dernier</div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openDetailPanel('retention')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taux de rétention</p>
                  <p className="text-2xl font-bold text-green-600">{kpiData.taux_retention}%</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-500" />
              </div>
              <Progress value={kpiData.taux_retention} className="mt-2" />
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openDetailPanel('risque')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Apprenants à risque</p>
                  <p className="text-2xl font-bold text-red-600">{kpiData.apprenants_risque}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openDetailPanel('satisfaction')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Satisfaction moyenne</p>
                  <p className="text-2xl font-bold text-yellow-600">{kpiData.satisfaction_moyenne}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex mt-1">
                {[1,2,3,4,5].map(star => (
                  <Star 
                    key={star} 
                    className={`w-3 h-3 ${star <= kpiData.satisfaction_moyenne ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Relances automatiques</p>
                  <p className="text-2xl font-bold">{kpiData.relances_automatiques}</p>
                </div>
                <Bell className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Actions rapides
            </CardTitle>
            <CardDescription>
              Actions fréquentes pour le suivi des apprenants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <AIQuickAction
                label="Envoyer message"
                icon={Send}
                description="Message personnalisé IA"
                onClick={() => console.log('Message IA')}
              />
              <AIQuickAction
                label="Programmer relance"
                icon={Calendar}
                description="Relance intelligente"
                onClick={() => console.log('Relance IA')}
              />
              <AIQuickAction
                label="Assigner formateur"
                icon={UserCheck}
                description="Matching IA optimal"
                onClick={() => console.log('Assignment IA')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Composants IA spécialisés Suivi */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🤖 Assistants IA Suivi Apprenants
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              Intelligence Artificielle
            </Badge>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Détection prédictive de l'abandon */}
            <AIComponent
              title="Détection prédictive de l'abandon"
              description="IA identifie les apprenants à risque avant l'abandon"
              status="active"
              confidence={93}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Apprenants analysés', value: '342' },
                { label: 'À risque détectés', value: '23' }
              ]}
              actions={[
                { label: 'Analyser', icon: Brain, onClick: () => console.log('Analyse risque IA') },
                { label: 'Actions', icon: Target, onClick: () => console.log('Actions recommandées') }
              ]}
            />

            {/* Relances intelligentes personnalisées */}
            <AIComponent
              title="Relances intelligentes personnalisées"
              description="IA personnalise chaque relance selon le profil apprenant"
              status="processing"
              confidence={88}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Relances envoyées', value: '156' },
                { label: 'Taux réponse', value: '67%' }
              ]}
              actions={[
                { label: 'Personnaliser', icon: Zap, onClick: () => console.log('Relance personnalisée') },
                { label: 'Planifier', icon: Calendar, onClick: () => console.log('Planning relance') }
              ]}
            />

            {/* Chatbot conseiller pédagogique 24/7 */}
            <AIComponent
              title="Chatbot conseiller pédagogique 24/7"
              description="IA accompagne les apprenants en continu"
              status="active"
              confidence={91}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Questions répondues', value: '1247' },
                { label: 'Satisfaction', value: '4.3/5' }
              ]}
              actions={[
                { label: 'Configurer', icon: Bot, onClick: () => console.log('Config chatbot') },
                { label: 'Conversations', icon: MessageSquare, onClick: () => console.log('Voir conversations') }
              ]}
            />
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Répartition des statuts */}
          <Card>
            <CardHeader>
              <CardTitle>Répartition des apprenants</CardTitle>
              <CardDescription>
                Statut actuel de tous les apprenants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={repartitionStatuts}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {repartitionStatuts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Radar satisfaction */}
          <Card>
            <CardHeader>
              <CardTitle>Analyse de satisfaction</CardTitle>
              <CardDescription>
                Répartition des notes par critère
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={satisfactionDetails}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="critere" />
                    <PolarRadiusAxis angle={90} domain={[0, 5]} />
                    <Radar
                      name="Satisfaction"
                      dataKey="note"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Apprenants à risque */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Apprenants à risque - Action requise
            </CardTitle>
            <CardDescription>
              Apprenants nécessitant une attention particulière
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apprenantsRisque.slice(0, 3).map((apprenant, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg bg-red-50 dark:bg-red-900/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <div className="font-medium">{apprenant.nom}</div>
                      <div className="text-sm text-muted-foreground">
                        {apprenant.formation} • Progression: {apprenant.progression}% • Dernière connexion: {apprenant.derniere_connexion}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {apprenant.raisons.map((raison, ridx) => (
                          <Badge key={ridx} variant="secondary" className="text-xs">
                            {raison}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className={`text-lg font-bold ${getRisqueColor(apprenant.score_risque)}`}>
                        {apprenant.score_risque}%
                      </div>
                      <div className="text-xs text-muted-foreground">Risque</div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Historique des interactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Interactions récentes
            </CardTitle>
            <CardDescription>
              Derniers échanges avec les apprenants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {interactionsRecentes.map((interaction, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      {interaction.type === 'Email' && <Mail className="w-4 h-4" />}
                      {interaction.type === 'Appel' && <Phone className="w-4 h-4" />}
                      {interaction.type === 'Message' && <MessageCircle className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-medium">{interaction.apprenant}</div>
                      <div className="text-sm text-muted-foreground">
                        {interaction.sujet} • {interaction.date}
                      </div>
                    </div>
                  </div>
                  <Badge variant={
                    interaction.statut === 'Répondu' ? 'default' :
                    interaction.statut === 'Planifié' ? 'secondary' :
                    interaction.statut === 'Traité' ? 'default' : 'destructive'
                  }>
                    {interaction.statut}
                  </Badge>
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
          detailPanel.type === 'risque' ? 'Apprenants à risque' :
          detailPanel.type === 'satisfaction' ? 'Analyse de satisfaction' :
          detailPanel.type === 'retention' ? 'Analyse de rétention' :
          'Détails'
        }
        width="lg"
      >
        {renderDetailContent()}
      </DetailPanel>
    </MainLayout>
  );
}
