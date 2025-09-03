'use client';

/**
 * Page du module Administratif/Qualiopi
 */

import { useAuth } from '../../../../libs/auth/auth-context';
import { MainLayout } from '../../../components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Progress } from '../../../components/ui/progress';
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Target, 
  Calendar,
  Download,
  Eye,
  Edit
} from 'lucide-react';
import { redirect } from 'next/navigation';

// Données mockées pour Qualiopi
const qualiopiData = {
  certificationNumber: 'QUAL-2024-001',
  status: 'valid' as const,
  expiryDate: '2027-06-15',
  lastAuditDate: '2024-06-15',
  nextAuditDate: '2025-06-15',
  globalScore: 94.2,
  indicators: [
    {
      id: '1',
      number: '1.1',
      title: 'Conditions d\'information du public sur les prestations',
      status: 'compliant' as const,
      score: 100,
      evidence: ['Catalogue formations 2024.pdf', 'Site web screenshots.pdf'],
      lastUpdated: '2024-03-15'
    },
    {
      id: '2',
      number: '1.2',
      title: 'Identification précise des objectifs des prestations',
      status: 'compliant' as const,
      score: 95,
      evidence: ['Objectifs pédagogiques.pdf', 'Référentiels compétences.pdf'],
      lastUpdated: '2024-03-10'
    },
    {
      id: '3',
      number: '2.1',
      title: 'Analyse du besoin du bénéficiaire',
      status: 'in_progress' as const,
      score: 85,
      evidence: ['Questionnaires besoins.pdf'],
      lastUpdated: '2024-03-20'
    },
    {
      id: '4',
      number: '3.1',
      title: 'Adaptation aux publics bénéficiaires',
      status: 'non_compliant' as const,
      score: 70,
      evidence: [],
      lastUpdated: '2024-02-28'
    }
  ]
};

export default function QualiopiPage() {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-green-500 hover:bg-green-600">Conforme</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">En cours</Badge>;
      case 'non_compliant':
        return <Badge variant="destructive">Non conforme</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'non_compliant':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Qualiopi</h1>
            <p className="text-muted-foreground">
              Suivi de la certification qualité des organismes de formation
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Certification {qualiopiData.certificationNumber}</Badge>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Vue d'ensemble */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Score global</p>
                  <p className="text-2xl font-bold">{qualiopiData.globalScore}%</p>
                </div>
                <Target className="w-8 h-8 text-muted-foreground" />
              </div>
              <Progress value={qualiopiData.globalScore} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Statut</p>
                  <p className="text-2xl font-bold">Valide</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Expiration</p>
                  <p className="text-2xl font-bold">2027</p>
                </div>
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Prochain audit</p>
                  <p className="text-2xl font-bold">2025</p>
                </div>
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Détail des indicateurs */}
        <Tabs defaultValue="indicators" className="space-y-4">
          <TabsList>
            <TabsTrigger value="indicators">Indicateurs</TabsTrigger>
            <TabsTrigger value="evidence">Preuves</TabsTrigger>
            <TabsTrigger value="audits">Audits</TabsTrigger>
          </TabsList>

          <TabsContent value="indicators" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Suivi des 32 indicateurs Qualiopi</CardTitle>
                <CardDescription>
                  État de conformité par indicateur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qualiopiData.indicators.map((indicator) => (
                    <div
                      key={indicator.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        {getStatusIcon(indicator.status)}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              Indicateur {indicator.number}
                            </span>
                            {getStatusBadge(indicator.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {indicator.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Mis à jour le {new Date(indicator.lastUpdated).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="font-medium">{indicator.score}%</p>
                          <p className="text-xs text-muted-foreground">
                            {indicator.evidence.length} preuve(s)
                          </p>
                        </div>
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
          </TabsContent>

          <TabsContent value="evidence" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bibliothèque de preuves</CardTitle>
                <CardDescription>
                  Documents et preuves de conformité
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {qualiopiData.indicators
                    .flatMap(indicator => indicator.evidence)
                    .map((evidence, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <FileText className="w-8 h-8 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{evidence}</p>
                        <p className="text-xs text-muted-foreground">PDF • 2.3 MB</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historique des audits</CardTitle>
                <CardDescription>
                  Suivi des audits de certification et de surveillance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div className="flex-1">
                      <p className="font-medium">Audit de surveillance</p>
                      <p className="text-sm text-muted-foreground">
                        15 juin 2024 • Organisme certificateur AFNOR
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Résultat : Certification maintenue
                      </p>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600">Validé</Badge>
                  </div>

                  <div className="flex items-center gap-4 p-4 border rounded-lg border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
                    <Clock className="w-8 h-8 text-yellow-500" />
                    <div className="flex-1">
                      <p className="font-medium">Prochain audit de surveillance</p>
                      <p className="text-sm text-muted-foreground">
                        15 juin 2025 • Organisme certificateur AFNOR
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Préparation en cours
                      </p>
                    </div>
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">Planifié</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
