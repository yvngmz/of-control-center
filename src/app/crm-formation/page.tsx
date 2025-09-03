'use client';

/**
 * Page CRM Formation
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
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts';
import {
  Users,
  TrendingUp,
  Target,
  Clock,
  Megaphone,
  UserPlus,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Filter,
  Plus,
  Send,
  Eye,
  Edit,
  Bot,
  Brain,
  Zap,
  Settings,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { redirect } from 'next/navigation';

// Données mockées enrichies
const kpiData = {
  // Infos clés
  leads_generes: 156,
  leads_ads: 67,
  leads_organiques: 45,
  leads_partenariats: 44,
  taux_conversion: 24.8,
  campagnes_actives: 7,
  temps_premier_contact: 12.5,
  relances_automatiques: 89,
  
  // KPIs IA
  score_qualification_ia: {
    froid: 23,
    tiede: 89,
    chaud: 44
  },
  taux_conversion_predit: 27.3,
  roi_campagnes: {
    cpl: 45, // Coût par Lead
    cpa: 180, // Coût par Acquisition  
    roas: 4.2 // Return on Ad Spend
  }
};

const pipelineData = [
  { name: 'Leads', value: 156, color: '#8884d8' },
  { name: 'Prospects qualifiés', value: 89, color: '#82ca9d' },
  { name: 'Devis envoyés', value: 52, color: '#ffc658' },
  { name: 'Négociation', value: 31, color: '#ff7c7c' },
  { name: 'Inscrits', value: 24, color: '#8dd1e1' }
];

const conversionData = [
  { etape: 'Lead', nombre: 156, taux: 100 },
  { etape: 'Qualifié', nombre: 89, taux: 57 },
  { etape: 'Devis', nombre: 52, taux: 33 },
  { etape: 'Négociation', nombre: 31, taux: 20 },
  { etape: 'Inscrit', nombre: 24, taux: 15 }
];

const campagnesData = [
  { nom: 'Email DevOps Q1', type: 'Email', statut: 'Active', envois: 1250, ouvertures: 312, clics: 89, conversions: 12 },
  { nom: 'LinkedIn Data Science', type: 'Social', statut: 'Active', envois: 450, ouvertures: 189, clics: 67, conversions: 8 },
  { nom: 'Webinaire IA', type: 'Webinaire', statut: 'Planifiée', envois: 0, ouvertures: 0, clics: 0, conversions: 0 },
  { nom: 'Retargeting Web', type: 'Display', statut: 'Active', envois: 2340, ouvertures: 876, clics: 234, conversions: 18 }
];

const leadsRecents = [
  { nom: 'Marie Dupont', entreprise: 'TechCorp', email: 'marie@techcorp.fr', score: 85, statut: 'Qualifié', source: 'LinkedIn', temperature_ia: 'chaud', probabilite_conversion: 78 },
  { nom: 'Pierre Martin', entreprise: 'DataSoft', email: 'pierre@datasoft.com', score: 72, statut: 'Nouveau', source: 'Site web', temperature_ia: 'tiede', probabilite_conversion: 45 },
  { nom: 'Sophie Bernard', entreprise: 'InnovLab', email: 'sophie@innovlab.fr', score: 91, statut: 'Négociation', source: 'Référence', temperature_ia: 'chaud', probabilite_conversion: 89 },
  { nom: 'Thomas Dubois', entreprise: 'CloudTech', email: 'thomas@cloudtech.io', score: 68, statut: 'Devis envoyé', source: 'Google Ads', temperature_ia: 'tiede', probabilite_conversion: 52 },
  { nom: 'Anna Rodriguez', entreprise: 'StartupIA', email: 'anna@startupai.com', score: 42, statut: 'Nouveau', source: 'Organique', temperature_ia: 'froid', probabilite_conversion: 23 }
];

const leadsParCanal = [
  { canal: 'Google Ads', leads: 67, conversion: 28.4, cpl: 42, couleur: '#8884d8' },
  { canal: 'Organique (SEO)', leads: 45, conversion: 31.1, cpl: 0, couleur: '#82ca9d' },
  { canal: 'Partenariats', leads: 44, conversion: 18.2, cpl: 67, couleur: '#ffc658' },
  { canal: 'LinkedIn', leads: 34, conversion: 35.3, cpl: 89, couleur: '#ff7c7c' },
  { canal: 'Référencement', leads: 23, conversion: 43.5, cpl: 12, couleur: '#8dd1e1' }
];

const roiCampagnes = [
  { campagne: 'Google Ads Q1', budget: 5000, leads: 67, conversions: 19, ca_genere: 34200, roi: 584 },
  { campagne: 'LinkedIn DevOps', budget: 3000, leads: 34, conversions: 12, ca_genere: 21600, roi: 620 },
  { campagne: 'Partenariat Écoles', budget: 2000, leads: 44, conversions: 8, ca_genere: 14400, roi: 620 },
  { campagne: 'Retargeting Web', budget: 1500, leads: 28, conversions: 9, ca_genere: 16200, roi: 980 }
];

const evolutionLeads = [
  { mois: 'Jan', leads: 89, conversions: 12 },
  { mois: 'Fév', leads: 124, conversions: 18 },
  { mois: 'Mar', leads: 156, conversions: 24 },
  { mois: 'Avr', leads: 134, conversions: 21 },
  { mois: 'Mai', leads: 167, conversions: 28 },
  { mois: 'Jun', leads: 189, conversions: 31 }
];

export default function CRMFormationPage() {
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

  if (!isAuthenticated || !hasPermission('leads.view')) {
    redirect('/');
  }

  const openDetailPanel = (type: string, data?: any) => {
    setDetailPanel({ isOpen: true, type, data });
  };

  const closeDetailPanel = () => {
    setDetailPanel({ isOpen: false, type: '' });
  };

  const getStatutBadge = (statut: string) => {
    const config = {
      'Nouveau': 'bg-blue-100 text-blue-800',
      'Qualifié': 'bg-green-100 text-green-800',
      'Devis envoyé': 'bg-yellow-100 text-yellow-800',
      'Négociation': 'bg-orange-100 text-orange-800',
      'Inscrit': 'bg-purple-100 text-purple-800'
    };
    return config[statut as keyof typeof config] || 'bg-gray-100 text-gray-800';
  };

  const renderDetailContent = () => {
    switch (detailPanel.type) {
      case 'pipeline':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{kpiData.taux_conversion}%</div>
              <div className="text-sm text-muted-foreground">Taux de conversion global</div>
            </div>
            <div className="space-y-3">
              {pipelineData.map((etape, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: etape.color }}
                    />
                    <span className="font-medium">{etape.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{etape.value}</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((etape.value / pipelineData[0].value) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Actions recommandées</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Relancer 12 prospects qualifiés
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer 8 devis en attente
                </Button>
              </div>
            </div>
          </div>
        );
      case 'campagnes':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{kpiData.campagnes_actives}</div>
                <div className="text-sm text-muted-foreground">Campagnes actives</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">23.4%</div>
                <div className="text-sm text-muted-foreground">Taux d'ouverture moyen</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Performances par campagne</h4>
              {campagnesData.slice(0, 3).map((campagne, idx) => (
                <div key={idx} className="p-3 border rounded space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{campagne.nom}</span>
                    <Badge className={campagne.statut === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {campagne.statut}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="font-medium">{campagne.envois}</div>
                      <div className="text-muted-foreground">Envois</div>
                    </div>
                    <div>
                      <div className="font-medium">{campagne.ouvertures}</div>
                      <div className="text-muted-foreground">Ouvertures</div>
                    </div>
                    <div>
                      <div className="font-medium">{campagne.conversions}</div>
                      <div className="text-muted-foreground">Conversions</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'leads':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{kpiData.leads_generes}</div>
                <div className="text-sm text-muted-foreground">Leads ce mois</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{kpiData.temps_conversion}j</div>
                <div className="text-sm text-muted-foreground">Temps moyen</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Leads prioritaires</h4>
              {leadsRecents.filter(lead => lead.score > 80).map((lead, idx) => (
                <div key={idx} className="p-3 border rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{lead.nom}</div>
                      <div className="text-sm text-muted-foreground">{lead.entreprise} • {lead.email}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{lead.score}</div>
                      <Badge className={getStatutBadge(lead.statut)}>
                        {lead.statut}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-1" />
                      Appeler
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              ))}
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
            <h1 className="text-3xl font-bold tracking-tight">CRM Formation</h1>
            <p className="text-muted-foreground">
              Gestion des prospects et pipeline de formation
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {kpiData.campagnes_actives} campagnes actives
            </Badge>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle campagne
            </Button>
          </div>
        </div>

        {/* KPIs principaux - Infos clés */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">📊 Infos clés</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openDetailPanel('leads-canaux')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Leads générés ce mois</p>
                    <p className="text-2xl font-bold">{kpiData.leads_generes}</p>
                  </div>
                  <UserPlus className="w-8 h-8 text-blue-500" />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Ads: {kpiData.leads_ads} • Organique: {kpiData.leads_organiques} • Partenaires: {kpiData.leads_partenariats}
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openDetailPanel('pipeline')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Taux de conversion</p>
                    <p className="text-2xl font-bold text-green-600">{kpiData.taux_conversion}%</p>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
                <Progress value={kpiData.taux_conversion} className="mt-2" />
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openDetailPanel('campagnes')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Temps 1er contact → inscription</p>
                    <p className="text-2xl font-bold text-blue-600">{kpiData.temps_premier_contact}j</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-500" />
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
                  <Mail className="w-8 h-8 text-orange-500" />
                </div>
                <div className="text-xs text-green-600 mt-1">+34% efficacité vs manuel</div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow border-purple-200"
              onClick={() => openDetailPanel('scoring-ia')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Score qualification IA</p>
                    <div className="flex gap-2 mt-1">
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        🥶 Froid: {kpiData.score_qualification_ia.froid}
                      </Badge>
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                        🌡️ Tiède: {kpiData.score_qualification_ia.tiede}
                      </Badge>
                      <Badge className="bg-red-100 text-red-800 text-xs">
                        🔥 Chaud: {kpiData.score_qualification_ia.chaud}
                      </Badge>
                    </div>
                  </div>
                  <Target className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Taux conversion prédit IA</p>
                    <p className="text-2xl font-bold text-purple-600">{kpiData.taux_conversion_predit}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
                <div className="text-xs text-purple-600 mt-1">vs {kpiData.taux_conversion}% réel actuel</div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow border-purple-200"
              onClick={() => openDetailPanel('roi-ia')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">ROI campagnes calculé IA</p>
                    <div className="grid grid-cols-3 gap-1 mt-1">
                      <div className="text-center">
                        <div className="text-sm font-bold">{kpiData.roi_campagnes.cpl}€</div>
                        <div className="text-xs text-muted-foreground">CPL</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold">{kpiData.roi_campagnes.cpa}€</div>
                        <div className="text-xs text-muted-foreground">CPA</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold">{kpiData.roi_campagnes.roas}x</div>
                        <div className="text-xs text-muted-foreground">ROAS</div>
                      </div>
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions rapides */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Actions rapides
            </CardTitle>
            <CardDescription>
              Raccourcis vers les actions commerciales fréquentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <AIQuickAction
                label="Créer campagne"
                icon={Plus}
                description="Assistant IA marketing"
                onClick={() => console.log('Création campagne IA')}
              />
              <AIQuickAction
                label="Lancer relance IA"
                icon={Send}
                description="Relance intelligente personnalisée"
                onClick={() => console.log('Relance IA')}
              />
              <AIQuickAction
                label="Ajouter lead"
                icon={UserPlus}
                description="Scoring automatique IA"
                onClick={() => console.log('Ajout lead IA')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Composants IA spécialisés CRM */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🤖 Assistants IA CRM
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              Intelligence Artificielle
            </Badge>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Scoring intelligent des leads */}
            <AIComponent
              title="Scoring intelligent des leads"
              description="IA analyse et qualifie automatiquement chaque lead"
              status="active"
              confidence={91}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Leads scorés', value: '156' },
                { label: 'Précision', value: '91%' }
              ]}
              actions={[
                { label: 'Analyser', icon: Brain, onClick: () => console.log('Scoring IA') },
                { label: 'Configurer', icon: Settings, onClick: () => console.log('Config scoring') }
              ]}
            />

            {/* Relances vocales automatiques IA */}
            <AIComponent
              title="Relances vocales automatiques IA"
              description="IA génère et lance des appels de relance personnalisés"
              status="processing"
              confidence={87}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Appels lancés', value: '89' },
                { label: 'Taux succès', value: '76%' }
              ]}
              actions={[
                { label: 'Lancer', icon: Phone, onClick: () => console.log('Relance vocale IA') },
                { label: 'Écouter', icon: Eye, onClick: () => console.log('Écouter appel') }
              ]}
            />

            {/* Chatbot WhatsApp de préqualification */}
            <AIComponent
              title="Chatbot WhatsApp préqualification"
              description="IA qualifie automatiquement les prospects via WhatsApp"
              status="active"
              confidence={94}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Conversations', value: '234' },
                { label: 'Qualifiés', value: '67%' }
              ]}
              actions={[
                { label: 'Configurer', icon: Bot, onClick: () => console.log('Config WhatsApp') },
                { label: 'Conversations', icon: MessageSquare, onClick: () => console.log('Voir conversations') }
              ]}
            />
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pipeline visuel */}
          <Card>
            <CardHeader>
              <CardTitle>Pipeline visuel des leads</CardTitle>
              <CardDescription>
                Répartition des prospects par étape du pipeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pipelineData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {pipelineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Évolution des leads */}
          <Card>
            <CardHeader>
              <CardTitle>Évolution des leads et conversions</CardTitle>
              <CardDescription>
                Tendance sur les 6 derniers mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={evolutionLeads}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="leads" stroke="#8884d8" strokeWidth={2} name="Leads" />
                    <Line type="monotone" dataKey="conversions" stroke="#82ca9d" strokeWidth={2} name="Conversions" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Segmentation dynamique des prospects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Segmentation dynamique IA des prospects
            </CardTitle>
            <CardDescription>
              Leads classifiés automatiquement par l'IA avec score de conversion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leadsRecents.map((lead, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      lead.temperature_ia === 'chaud' ? 'bg-red-100' :
                      lead.temperature_ia === 'tiede' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      <span className="font-semibold text-sm">
                        {lead.temperature_ia === 'chaud' ? '🔥' :
                         lead.temperature_ia === 'tiede' ? '🌡️' : '🥶'}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{lead.nom}</span>
                        <Badge className={
                          lead.temperature_ia === 'chaud' ? 'bg-red-100 text-red-800' :
                          lead.temperature_ia === 'tiede' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }>
                          {lead.temperature_ia.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {lead.entreprise} • {lead.email} • Source: {lead.source}
                      </div>
                      <div className="text-xs text-purple-600 mt-1">
                        🤖 IA: {lead.probabilite_conversion}% de chance de conversion
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="font-bold text-lg">{lead.score}</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                    <Badge className={getStatutBadge(lead.statut)}>
                      {lead.statut}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="w-4 h-4" />
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

        {/* ROI des campagnes calculé automatiquement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              ROI des campagnes calculé automatiquement
            </CardTitle>
            <CardDescription>
              Analyse automatique de la rentabilité par canal et campagne
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roiCampagnes.map((campagne, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">{campagne.campagne}</div>
                      <div className="text-sm text-muted-foreground">
                        Budget: {campagne.budget}€ • {campagne.leads} leads • {campagne.conversions} conversions
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600 text-lg">
                      ROI: {campagne.roi}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      CA: {(campagne.ca_genere / 1000).toFixed(1)}k€
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
          detailPanel.type === 'pipeline' ? 'Analyse du pipeline' :
          detailPanel.type === 'campagnes' ? 'Détail des campagnes' :
          detailPanel.type === 'leads' ? 'Gestion des leads' :
          'Détails'
        }
        width="lg"
      >
        {renderDetailContent()}
      </DetailPanel>
    </MainLayout>
  );
}
