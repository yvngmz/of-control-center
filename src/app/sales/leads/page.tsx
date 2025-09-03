'use client';

/**
 * Page de gestion des prospects (CRM/Marketing)
 */

import { useState } from 'react';
import { useAuth } from '../../../../libs/auth/auth-context';
import { MainLayout } from '../../../components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { 
  UserPlus, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Calendar,
  TrendingUp,
  Users,
  Target,
  DollarSign
} from 'lucide-react';
import { redirect } from 'next/navigation';

// Données mockées pour les prospects
const mockLeads = [
  {
    id: '1',
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@example.com',
    phone: '0123456789',
    source: 'Site web',
    status: 'new' as const,
    score: 85,
    interestedPrograms: ['Développement web', 'UX/UI Design'],
    createdAt: '2024-03-20',
    assignedTo: 'Jean Commercial'
  },
  {
    id: '2',
    firstName: 'Pierre',
    lastName: 'Martin',
    email: 'pierre.martin@example.com',
    phone: '0987654321',
    source: 'LinkedIn',
    status: 'contacted' as const,
    score: 92,
    interestedPrograms: ['Data Science', 'Machine Learning'],
    createdAt: '2024-03-18',
    assignedTo: 'Sophie Marketing'
  },
  {
    id: '3',
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@example.com',
    phone: '0156789123',
    source: 'Référencement',
    status: 'qualified' as const,
    score: 78,
    interestedPrograms: ['Cybersécurité'],
    createdAt: '2024-03-15',
    assignedTo: 'Jean Commercial'
  }
];

const leadStats = {
  total: 247,
  new: 45,
  contacted: 89,
  qualified: 67,
  converted: 32,
  conversionRate: 13.2
};

export default function LeadsPage() {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: 'Nouveau', className: 'bg-blue-500 hover:bg-blue-600' },
      contacted: { label: 'Contacté', className: 'bg-yellow-500 hover:bg-yellow-600' },
      qualified: { label: 'Qualifié', className: 'bg-orange-500 hover:bg-orange-600' },
      converted: { label: 'Converti', className: 'bg-green-500 hover:bg-green-600' },
      lost: { label: 'Perdu', className: 'bg-red-500 hover:bg-red-600' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return config ? (
      <Badge className={config.className}>{config.label}</Badge>
    ) : (
      <Badge variant="secondary">Inconnu</Badge>
    );
  };

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = 
      lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des prospects</h1>
            <p className="text-muted-foreground">
              Suivi et qualification des leads commerciaux
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Nouveau prospect
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total prospects</p>
                  <p className="text-2xl font-bold">{leadStats.total}</p>
                </div>
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nouveaux</p>
                  <p className="text-2xl font-bold">{leadStats.new}</p>
                </div>
                <UserPlus className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Qualifiés</p>
                  <p className="text-2xl font-bold">{leadStats.qualified}</p>
                </div>
                <Target className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taux conversion</p>
                  <p className="text-2xl font-bold">{leadStats.conversionRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et recherche */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un prospect..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="new">Nouveaux</SelectItem>
                  <SelectItem value="contacted">Contactés</SelectItem>
                  <SelectItem value="qualified">Qualifiés</SelectItem>
                  <SelectItem value="converted">Convertis</SelectItem>
                  <SelectItem value="lost">Perdus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des prospects */}
        <Card>
          <CardHeader>
            <CardTitle>Prospects ({filteredLeads.length})</CardTitle>
            <CardDescription>
              Liste des prospects avec leur statut et informations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-primary">
                        {lead.firstName[0]}{lead.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {lead.firstName} {lead.lastName}
                        </span>
                        {getStatusBadge(lead.status)}
                        <Badge variant="outline" className="text-xs">
                          Score: {lead.score}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(lead.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Source: {lead.source} • Assigné à: {lead.assignedTo}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {lead.interestedPrograms.map((program, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {program}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Voir détails
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
