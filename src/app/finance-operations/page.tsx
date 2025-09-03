'use client';

/**
 * Page Finance & Opérations
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
  Area
} from 'recharts';
import {
  DollarSign,
  Receipt,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  AlertCircle,
  CheckCircle,
  Send,
  Download,
  Plus,
  FileText,
  CreditCard,
  Building,
  Calendar,
  Eye,
  Edit,
  Phone,
  Brain,
  Bot,
  Sparkles,
  Settings,
  Target
} from 'lucide-react';
import { redirect } from 'next/navigation';

// Données mockées
const kpiData = {
  factures_emises: 1567800,
  factures_payees: 87.3,
  cashflow_30j: 234500,
  relances_paiement: 23,
  integrations_actives: 8
};

const facturesData = [
  { numero: 'F2024-001', client: 'TechCorp SAS', montant: 12500, statut: 'Payée', echeance: '2024-03-15', formation: 'Data Science' },
  { numero: 'F2024-002', client: 'InnovLab', montant: 8900, statut: 'En attente', echeance: '2024-03-25', formation: 'DevOps' },
  { numero: 'F2024-003', client: 'DataSoft', montant: 15600, statut: 'Payée', echeance: '2024-03-10', formation: 'IA/ML' },
  { numero: 'F2024-004', client: 'CloudTech', montant: 7800, statut: 'Relancée', echeance: '2024-03-20', formation: 'Cloud' },
  { numero: 'F2024-005', client: 'SecureIT', montant: 11200, statut: 'En attente', echeance: '2024-03-30', formation: 'Cybersécurité' }
];

const evolutionCashflow = [
  { mois: 'Jan', entrees: 125000, sorties: 89000, solde: 36000 },
  { mois: 'Fév', entrees: 142000, sorties: 95000, solde: 47000 },
  { mois: 'Mar', entrees: 156000, sorties: 102000, solde: 54000 },
  { mois: 'Avr', entrees: 134000, sorties: 98000, solde: 36000 },
  { mois: 'Mai', entrees: 167000, sorties: 105000, solde: 62000 },
  { mois: 'Jun', entrees: 189000, sorties: 112000, solde: 77000 }
];

const previsionCashflow = [
  { semaine: 'S1', entrees_prevues: 45000, sorties_prevues: 32000, solde_prevu: 13000 },
  { semaine: 'S2', entrees_prevues: 52000, sorties_prevues: 38000, solde_prevu: 14000 },
  { semaine: 'S3', entrees_prevues: 38000, sorties_prevues: 35000, solde_prevu: 3000 },
  { semaine: 'S4', entrees_prevues: 61000, sorties_prevues: 41000, solde_prevu: 20000 }
];

const repartitionFactures = [
  { statut: 'Payées', nombre: 156, montant: 1367800, couleur: '#10b981' },
  { statut: 'En attente', nombre: 23, montant: 145600, couleur: '#f59e0b' },
  { statut: 'En retard', nombre: 8, montant: 54400, couleur: '#ef4444' }
];

const integrationsActives = [
  { nom: 'Sage Comptabilité', type: 'ERP', statut: 'Connecté', derniere_sync: '2024-03-20 14:30' },
  { nom: 'Stripe Paiements', type: 'Paiement', statut: 'Connecté', derniere_sync: '2024-03-20 15:45' },
  { nom: 'PayPal Business', type: 'Paiement', statut: 'Connecté', derniere_sync: '2024-03-20 16:12' },
  { nom: 'Banque Populaire', type: 'Bancaire', statut: 'Connecté', derniere_sync: '2024-03-20 09:15' },
  { nom: 'Quadratus', type: 'Expert-comptable', statut: 'En cours', derniere_sync: '2024-03-19 18:30' },
  { nom: 'URSSAF Connect', type: 'Déclaratif', statut: 'Connecté', derniere_sync: '2024-03-20 12:00' }
];

const relancesPaiement = [
  { facture: 'F2024-002', client: 'InnovLab', montant: 8900, jours_retard: 5, derniere_relance: '2024-03-18' },
  { facture: 'F2024-004', client: 'CloudTech', montant: 7800, jours_retard: 12, derniere_relance: '2024-03-15' },
  { facture: 'F2024-007', client: 'StartupTech', montant: 5600, jours_retard: 8, derniere_relance: '2024-03-17' }
];

export default function FinanceOperationsPage() {
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

  if (!isAuthenticated || !hasPermission('finance.view')) {
    redirect('/');
  }

  const openDetailPanel = (type: string, data?: any) => {
    setDetailPanel({ isOpen: true, type, data });
  };

  const closeDetailPanel = () => {
    setDetailPanel({ isOpen: false, type: '' });
  };

  const getStatutFacture = (statut: string) => {
    switch (statut) {
      case 'Payée':
        return 'bg-green-100 text-green-800';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Relancée':
        return 'bg-orange-100 text-orange-800';
      case 'En retard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatutIntegration = (statut: string) => {
    switch (statut) {
      case 'Connecté':
        return 'bg-green-100 text-green-800';
      case 'En cours':
        return 'bg-yellow-100 text-yellow-800';
      case 'Erreur':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDetailContent = () => {
    switch (detailPanel.type) {
      case 'factures':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {repartitionFactures.map((item, idx) => (
                <div key={idx} className="text-center p-3 border rounded">
                  <div className="text-lg font-bold" style={{ color: item.couleur }}>
                    {item.nombre}
                  </div>
                  <div className="text-sm text-muted-foreground">{item.statut}</div>
                  <div className="text-xs text-muted-foreground">
                    {(item.montant / 1000).toFixed(0)}k€
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Factures récentes</h4>
              {facturesData.slice(0, 3).map((facture, idx) => (
                <div key={idx} className="p-3 border rounded space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{facture.numero}</span>
                    <Badge className={getStatutFacture(facture.statut)}>
                      {facture.statut}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {facture.client} • {facture.montant}€
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Échéance: {facture.echeance}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Nouvelle facture
                </Button>
                <Button size="sm" variant="outline">
                  <Send className="w-4 h-4 mr-1" />
                  Relancer paiement
                </Button>
              </div>
            </div>
          </div>
        );
      case 'cashflow':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {(kpiData.cashflow_30j / 1000).toFixed(0)}k€
              </div>
              <div className="text-sm text-muted-foreground">Cashflow projeté 30j</div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Prévisions par semaine</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={previsionCashflow}>
                    <Area type="monotone" dataKey="solde_prevu" stroke="#10b981" fill="#10b981" />
                    <Tooltip />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 border rounded">
                <div className="text-lg font-bold text-green-600">+12%</div>
                <div className="text-xs text-muted-foreground">Croissance</div>
              </div>
              <div className="text-center p-2 border rounded">
                <div className="text-lg font-bold text-blue-600">2.3M€</div>
                <div className="text-xs text-muted-foreground">Trésorerie</div>
              </div>
            </div>
          </div>
        );
      case 'integrations':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{kpiData.integrations_actives}</div>
              <div className="text-sm text-muted-foreground">Intégrations actives</div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Statut des intégrations</h4>
              {integrationsActives.map((integration, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <div className="font-medium text-sm">{integration.nom}</div>
                    <div className="text-xs text-muted-foreground">
                      {integration.type} • {integration.derniere_sync}
                    </div>
                  </div>
                  <Badge className={getStatutIntegration(integration.statut)}>
                    {integration.statut}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t">
              <Button size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter intégration
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
            <h1 className="text-3xl font-bold tracking-tight">Finance & Opérations</h1>
            <p className="text-muted-foreground">
              Gestion financière et opérationnelle
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              {relancesPaiement.length} relances en attente
            </Badge>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle facture
            </Button>
          </div>
        </div>

        {/* KPIs principaux */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openDetailPanel('factures')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Factures émises (mois)</p>
                  <p className="text-2xl font-bold">
                    {(kpiData.factures_emises / 1000).toFixed(0)}k€
                  </p>
                </div>
                <Receipt className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-xs text-green-600 mt-1">+18% vs mois dernier</div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Factures payées</p>
                  <p className="text-2xl font-bold text-green-600">{kpiData.factures_payees}%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <Progress value={kpiData.factures_payees} className="mt-2" />
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openDetailPanel('cashflow')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cashflow projeté 30j</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {(kpiData.cashflow_30j / 1000).toFixed(0)}k€
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Relances paiement</p>
                  <p className="text-2xl font-bold text-orange-600">{kpiData.relances_paiement}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openDetailPanel('integrations')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Intégrations actives</p>
                  <p className="text-2xl font-bold">{kpiData.integrations_actives}</p>
                </div>
                <Zap className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides IA */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Actions rapides IA
            </CardTitle>
            <CardDescription>
              Raccourcis intelligents pour les opérations financières
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <AIQuickAction
                label="Créer facture"
                icon={Plus}
                description="Génération automatique IA"
                onClick={() => console.log('Création facture IA')}
              />
              <AIQuickAction
                label="Envoyer relance"
                icon={Send}
                description="Relance intelligente personnalisée"
                onClick={() => console.log('Relance IA')}
              />
              <AIQuickAction
                label="Export compta"
                icon={Download}
                description="Export automatisé IA"
                onClick={() => console.log('Export compta IA')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Composants IA spécialisés Finance */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🤖 Assistants IA Finance
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              Intelligence Artificielle
            </Badge>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Relances automatiques IA */}
            <AIComponent
              title="Relances automatiques IA"
              description="IA gère automatiquement les relances de paiement"
              status="active"
              confidence={91}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Relances envoyées', value: '23' },
                { label: 'Taux succès', value: '78%' }
              ]}
              actions={[
                { label: 'Configurer', icon: Settings, onClick: () => console.log('Config relances IA') },
                { label: 'Analyser', icon: Brain, onClick: () => console.log('Analyse relances') }
              ]}
            />

            {/* Prévisions de cashflow */}
            <AIComponent
              title="Prévisions de cashflow"
              description="IA prédit le cashflow avec historique et saisonnalité"
              status="active"
              confidence={93}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Prévision 30j', value: '234k€' },
                { label: 'Précision', value: '93%' }
              ]}
              actions={[
                { label: 'Prévoir', icon: Target, onClick: () => console.log('Prévision cashflow') },
                { label: 'Configurer', icon: Settings, onClick: () => console.log('Config prévision') }
              ]}
            />

            {/* Détection anomalies comptables */}
            <AIComponent
              title="Détection anomalies comptables"
              description="IA surveille et détecte les anomalies financières"
              status="active"
              confidence={89}
              variant="widget"
              size="md"
              metrics={[
                { label: 'Anomalies détectées', value: '3' },
                { label: 'Corrections auto', value: '2' }
              ]}
              actions={[
                { label: 'Surveiller', icon: AlertCircle, onClick: () => console.log('Surveillance finance') },
                { label: 'Rapports', icon: FileText, onClick: () => console.log('Rapports anomalies') }
              ]}
            />
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Évolution du cashflow */}
          <Card>
            <CardHeader>
              <CardTitle>Évolution du cashflow</CardTitle>
              <CardDescription>
                Entrées, sorties et solde sur 6 mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={evolutionCashflow}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="entrees" stackId="1" stroke="#10b981" fill="#10b981" name="Entrées" />
                    <Area type="monotone" dataKey="sorties" stackId="2" stroke="#ef4444" fill="#ef4444" name="Sorties" />
                    <Line type="monotone" dataKey="solde" stroke="#8884d8" strokeWidth={2} name="Solde" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Répartition des factures */}
          <Card>
            <CardHeader>
              <CardTitle>État des factures</CardTitle>
              <CardDescription>
                Répartition par statut de paiement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={repartitionFactures}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="montant"
                      label={({ statut, nombre }) => `${statut}: ${nombre}`}
                    >
                      {repartitionFactures.map((entry, index) => (
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

        {/* Liste des factures */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Liste des factures + statut
            </CardTitle>
            <CardDescription>
              Suivi détaillé des factures émises
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {facturesData.map((facture, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{facture.numero}</div>
                      <div className="text-sm text-muted-foreground">
                        {facture.client} • {facture.formation}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Échéance: {facture.echeance}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold">{facture.montant}€</div>
                      <div className="text-xs text-muted-foreground">
                        {facture.statut === 'En attente' && 
                          `${Math.ceil((new Date(facture.echeance).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} jours`
                        }
                      </div>
                    </div>
                    <Badge className={getStatutFacture(facture.statut)}>
                      {facture.statut}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {facture.statut === 'En attente' && (
                        <Button variant="ghost" size="sm">
                          <Send className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline des paiements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Timeline des paiements
            </CardTitle>
            <CardDescription>
              Échéances et relances programmées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {relancesPaiement.map((relance, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/10 rounded-r-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="font-medium">Facture {relance.facture} - {relance.client}</div>
                      <div className="text-sm text-muted-foreground">
                        {relance.montant}€ • {relance.jours_retard} jours de retard
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Dernière relance: {relance.derniere_relance}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4 mr-1" />
                      Appeler
                    </Button>
                    <Button size="sm" variant="outline">
                      <Send className="w-4 h-4 mr-1" />
                      Relancer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Intégrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Intégrations actives
            </CardTitle>
            <CardDescription>
              Connexions avec les systèmes comptables et bancaires
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrationsActives.map((integration, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      {integration.type === 'ERP' && <Building className="w-5 h-5 text-purple-600" />}
                      {integration.type === 'Paiement' && <CreditCard className="w-5 h-5 text-purple-600" />}
                      {integration.type === 'Bancaire' && <DollarSign className="w-5 h-5 text-purple-600" />}
                      {integration.type === 'Expert-comptable' && <FileText className="w-5 h-5 text-purple-600" />}
                      {integration.type === 'Déclaratif' && <Receipt className="w-5 h-5 text-purple-600" />}
                    </div>
                    <div>
                      <div className="font-medium">{integration.nom}</div>
                      <div className="text-sm text-muted-foreground">
                        {integration.type} • Sync: {integration.derniere_sync}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatutIntegration(integration.statut)}>
                    {integration.statut}
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
          detailPanel.type === 'factures' ? 'Gestion des factures' :
          detailPanel.type === 'cashflow' ? 'Analyse du cashflow' :
          detailPanel.type === 'integrations' ? 'Intégrations système' :
          'Détails'
        }
        width="lg"
      >
        {renderDetailContent()}
      </DetailPanel>
    </MainLayout>
  );
}
