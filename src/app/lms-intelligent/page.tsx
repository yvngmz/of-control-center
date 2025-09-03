'use client';

/**
 * Page LMS Intelligent
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
  RadialBarChart,
  RadialBar
} from 'recharts';
import {
  Brain,
  BookOpen,
  Target,
  MessageSquare,
  Zap,
  Play,
  FileText,
  Users,
  Award,
  Clock,
  TrendingUp,
  Plus,
  Upload,
  Sparkles,
  Bot,
  PenTool,
  CheckCircle,
  Eye,
  Edit,
  Settings,
  Wand2,
  FileVideo
} from 'lucide-react';
import { redirect } from 'next/navigation';

// Données mockées
const kpiData = {
  parcours_actifs: 28,
  taux_completion: 78.5,
  moyenne_evaluations: 82.3,
  contenus_ia: 156,
  requetes_chatbot: 2340
};

const parcoursData = [
  { nom: 'Data Science Avancée', apprenants: 45, completion: 85, duree: '120h', niveau: 'Avancé' },
  { nom: 'DevOps Pratique', apprenants: 32, completion: 72, duree: '80h', niveau: 'Intermédiaire' },
  { nom: 'IA & Machine Learning', apprenants: 28, completion: 91, duree: '150h', niveau: 'Avancé' },
  { nom: 'Cybersécurité', apprenants: 38, completion: 68, duree: '100h', niveau: 'Intermédiaire' },
  { nom: 'Cloud Computing', apprenants: 24, completion: 79, duree: '90h', niveau: 'Débutant' }
];

const evaluationsData = [
  { module: 'Module 1', moyenne: 85, participants: 156 },
  { module: 'Module 2', moyenne: 78, participants: 142 },
  { module: 'Module 3', moyenne: 82, participants: 138 },
  { module: 'Module 4', moyenne: 89, participants: 124 },
  { module: 'Module 5', moyenne: 76, participants: 118 }
];

const contenusIA = [
  { type: 'Quiz générés', nombre: 89, couleur: '#8884d8' },
  { type: 'Résumés créés', nombre: 67, couleur: '#82ca9d' },
  { type: 'Plans de cours', nombre: 45, couleur: '#ffc658' },
  { type: 'Exercices pratiques', nombre: 52, couleur: '#ff7c7c' }
];

const chatbotStats = [
  { semaine: 'S1', requetes: 245, resolutions: 198 },
  { semaine: 'S2', requetes: 312, resolutions: 267 },
  { semaine: 'S3', requetes: 289, resolutions: 245 },
  { semaine: 'S4', requetes: 356, resolutions: 301 }
];

const progressionParcours = [
  { etape: 'Démarré', value: 100, fill: '#8884d8' },
  { etape: 'En cours', value: 75, fill: '#82ca9d' },
  { etape: 'Évaluation', value: 45, fill: '#ffc658' },
  { etape: 'Terminé', value: 32, fill: '#ff7c7c' }
];

const activitesRecentes = [
  { action: 'Quiz IA généré', parcours: 'Data Science', utilisateur: 'Système IA', date: '2024-03-20', statut: 'Complété' },
  { action: 'Plan de cours créé', parcours: 'DevOps', utilisateur: 'Sophie Martin', date: '2024-03-19', statut: 'En révision' },
  { action: 'Chatbot activé', parcours: 'Cybersécurité', utilisateur: 'Système', date: '2024-03-18', statut: 'Actif' },
  { action: 'Évaluation générée', parcours: 'Cloud Computing', utilisateur: 'IA Assistant', date: '2024-03-17', statut: 'Publié' }
];

export default function LMSIntelligentPage() {
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

  if (!isAuthenticated || !hasPermission('programs.view')) {
    redirect('/');
  }

  const openDetailPanel = (type: string, data?: any) => {
    setDetailPanel({ isOpen: true, type, data });
  };

  const closeDetailPanel = () => {
    setDetailPanel({ isOpen: false, type: '' });
  };

  const getNiveauColor = (niveau: string) => {
    switch (niveau) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'Avancé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDetailContent = () => {
    switch (detailPanel.type) {
      case 'parcours':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{kpiData.parcours_actifs}</div>
              <div className="text-sm text-muted-foreground">Parcours actifs</div>
            </div>
            <div className="space-y-3">
              {parcoursData.map((parcours, idx) => (
                <div key={idx} className="p-3 border rounded space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{parcours.nom}</div>
                      <div className="text-sm text-muted-foreground">
                        {parcours.apprenants} apprenants • {parcours.duree}
                      </div>
                    </div>
                    <Badge className={getNiveauColor(parcours.niveau)}>
                      {parcours.niveau}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Taux de complétion</span>
                      <span>{parcours.completion}%</span>
                    </div>
                    <Progress value={parcours.completion} className="h-2" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-3 h-3 mr-1" />
                      Voir
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-3 h-3 mr-1" />
                      Modifier
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'ia-content':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{kpiData.contenus_ia}</div>
              <div className="text-sm text-muted-foreground">Contenus générés par IA</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {contenusIA.map((contenu, idx) => (
                <div key={idx} className="text-center p-3 border rounded">
                  <div className="text-xl font-bold" style={{ color: contenu.couleur }}>
                    {contenu.nombre}
                  </div>
                  <div className="text-sm text-muted-foreground">{contenu.type}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Actions IA disponibles</h4>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Générer un quiz
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <PenTool className="w-4 h-4 mr-2" />
                  Créer un plan de cours
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Résumer un document
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Bot className="w-4 h-4 mr-2" />
                  Configurer chatbot
                </Button>
              </div>
            </div>
          </div>
        );
      case 'chatbot':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{kpiData.requetes_chatbot}</div>
                <div className="text-sm text-muted-foreground">Requêtes totales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">84.3%</div>
                <div className="text-sm text-muted-foreground">Taux de résolution</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Questions fréquentes</h4>
              <div className="space-y-2">
                {[
                  'Comment accéder au module suivant ?',
                  'Où trouver les ressources du cours ?',
                  'Comment refaire un quiz ?',
                  'Quand sont les prochaines sessions ?'
                ].map((question, idx) => (
                  <div key={idx} className="p-2 bg-muted rounded text-sm">
                    {question}
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Configuration</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Bot className="w-4 h-4 mr-2" />
                  Entraîner le chatbot
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Voir les conversations
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">LMS Intelligent</h1>
            <p className="text-muted-foreground">
              Plateforme d'apprentissage intelligente avec IA
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              IA Activée
            </Badge>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau parcours
            </Button>
          </div>
        </div>

        {/* KPIs principaux */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openDetailPanel('parcours')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Parcours actifs</p>
                  <p className="text-2xl font-bold">{kpiData.parcours_actifs}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-xs text-green-600 mt-1">+3 nouveaux ce mois</div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taux de complétion</p>
                  <p className="text-2xl font-bold text-green-600">{kpiData.taux_completion}%</p>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>
              <Progress value={kpiData.taux_completion} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Moyenne évaluations</p>
                  <p className="text-2xl font-bold text-blue-600">{kpiData.moyenne_evaluations}</p>
                </div>
                <Award className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openDetailPanel('ia-content')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Contenus générés IA</p>
                  <p className="text-2xl font-bold text-purple-600">{kpiData.contenus_ia}</p>
                </div>
                <Brain className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openDetailPanel('chatbot')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Requêtes chatbot</p>
                  <p className="text-2xl font-bold">{kpiData.requetes_chatbot}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-orange-500" />
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
              Outils intelligents pour la création de contenu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <AIQuickAction
                label="Générer module IA"
                icon={Wand2}
                description="IA crée module complet"
                onClick={() => console.log('Génération module IA')}
              />
              <AIQuickAction
                label="Créer quiz"
                icon={Sparkles}
                description="Quiz adaptatif IA"
                onClick={() => console.log('Création quiz IA')}
              />
              <AIQuickAction
                label="Activer chatbot"
                icon={Bot}
                description="Assistant pédagogique IA"
                onClick={() => console.log('Activation chatbot')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Composants IA spécialisés LMS */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🤖 Assistants IA LMS
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              Intelligence Artificielle
            </Badge>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Parcours adaptatifs IA */}
            <AIComponent
              title="Parcours adaptatifs IA"
              description="IA adapte automatiquement le parcours selon les performances"
              status="active"
              confidence={92}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Parcours adaptés', value: '28' },
                { label: 'Amélioration', value: '+23%' }
              ]}
              actions={[
                { label: 'Configurer', icon: Settings, onClick: () => console.log('Config parcours IA') },
                { label: 'Analyser', icon: Brain, onClick: () => console.log('Analyse parcours') }
              ]}
            />

            {/* Génération de contenus pédagogiques */}
            <AIComponent
              title="Génération de contenus pédagogiques"
              description="IA crée automatiquement modules, quiz et exercices"
              status="active"
              confidence={89}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Contenus générés', value: '156' },
                { label: 'Qualité', value: '94%' }
              ]}
              actions={[
                { label: 'Générer', icon: Wand2, onClick: () => console.log('Génération contenu') },
                { label: 'Bibliothèque', icon: FileVideo, onClick: () => console.log('Voir contenus') }
              ]}
            />

            {/* Résumé automatique de cours */}
            <AIComponent
              title="Résumé automatique de cours"
              description="IA génère des résumés intelligents des sessions"
              status="processing"
              confidence={87}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Résumés créés', value: '89' },
                { label: 'Temps économisé', value: '45h' }
              ]}
              actions={[
                { label: 'Résumer', icon: FileText, onClick: () => console.log('Résumé IA') },
                { label: 'Configurer', icon: Settings, onClick: () => console.log('Config résumé') }
              ]}
            />
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progression des parcours */}
          <Card>
            <CardHeader>
              <CardTitle>Suivi des parcours de formation</CardTitle>
              <CardDescription>
                Progression visuelle par étape
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart data={progressionParcours}>
                    <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Performance du chatbot */}
          <Card>
            <CardHeader>
              <CardTitle>Performance du chatbot pédagogique</CardTitle>
              <CardDescription>
                Requêtes et résolutions par semaine
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chatbotStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semaine" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="requetes" stroke="#8884d8" strokeWidth={2} name="Requêtes" />
                    <Line type="monotone" dataKey="resolutions" stroke="#82ca9d" strokeWidth={2} name="Résolutions" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Factory IA */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              Content Factory IA
            </CardTitle>
            <CardDescription>
              Génération automatique de contenu pédagogique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {contenusIA.map((contenu, idx) => (
                <div key={idx} className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold mb-2" style={{ color: contenu.couleur }}>
                    {contenu.nombre}
                  </div>
                  <div className="text-sm font-medium mb-2">{contenu.type}</div>
                  <Button size="sm" variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-1" />
                    Générer
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tableau des évaluations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Tableau des évaluations par session
            </CardTitle>
            <CardDescription>
              Performance des apprenants par module
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={evaluationsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="module" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="moyenne" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activités récentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Activités récentes
            </CardTitle>
            <CardDescription>
              Dernières actions effectuées sur la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activitesRecentes.map((activite, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      {activite.action.includes('IA') || activite.action.includes('Chatbot') ? (
                        <Brain className="w-4 h-4 text-purple-600" />
                      ) : (
                        <FileText className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{activite.action}</div>
                      <div className="text-sm text-muted-foreground">
                        {activite.parcours} • Par {activite.utilisateur} • {activite.date}
                      </div>
                    </div>
                  </div>
                  <Badge variant={
                    activite.statut === 'Complété' || activite.statut === 'Publié' ? 'default' :
                    activite.statut === 'Actif' ? 'default' : 'secondary'
                  }>
                    {activite.statut}
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
          detailPanel.type === 'parcours' ? 'Gestion des parcours' :
          detailPanel.type === 'ia-content' ? 'Content Factory IA' :
          detailPanel.type === 'chatbot' ? 'Chatbot pédagogique' :
          'Détails'
        }
        width="lg"
      >
        {renderDetailContent()}
      </DetailPanel>
    </MainLayout>
  );
}
