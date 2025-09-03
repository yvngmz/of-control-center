/**
 * Handlers MSW pour les mocks API en mode démo
 */

import { http, HttpResponse } from 'msw';
import { seedData } from '../data/seed-data';

// Base URL pour les APIs
const API_BASE = '/api';

export const handlers = [
  // Authentification
  http.post(`${API_BASE}/auth/login`, async ({ request }) => {
    const { email, password } = await request.json() as { email: string; password: string };
    
    // Vérifier les identifiants
    const user = seedData.users.find(u => u.email === email);
    if (!user || password !== 'demo123') {
      return HttpResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      user,
      token: 'mock-jwt-token-' + user.id,
      expiresIn: '24h'
    });
  }),

  http.post(`${API_BASE}/auth/logout`, () => {
    return HttpResponse.json({ success: true });
  }),

  http.get(`${API_BASE}/auth/me`, ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Token manquant' },
        { status: 401 }
      );
    }

    // Simuler la vérification du token
    const user = seedData.users[0]; // Par défaut, retourner le premier utilisateur
    return HttpResponse.json({ user });
  }),

  // Utilisateurs
  http.get(`${API_BASE}/users`, () => {
    return HttpResponse.json({
      users: seedData.users,
      total: seedData.users.length
    });
  }),

  http.get(`${API_BASE}/users/:id`, ({ params }) => {
    const user = seedData.users.find(u => u.id === params.id);
    if (!user) {
      return HttpResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }
    return HttpResponse.json({ user });
  }),

  // Données Qualiopi
  http.get(`${API_BASE}/qualiopi`, () => {
    return HttpResponse.json({ data: seedData.qualiopi });
  }),

  http.get(`${API_BASE}/qualiopi/indicators`, () => {
    return HttpResponse.json({ 
      indicators: seedData.qualiopi.indicators,
      total: seedData.qualiopi.indicators.length
    });
  }),

  // Prospects et leads
  http.get(`${API_BASE}/leads`, ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search');
    
    let filteredLeads = [...seedData.leads];
    
    if (status && status !== 'all') {
      filteredLeads = filteredLeads.filter(lead => lead.status === status);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredLeads = filteredLeads.filter(lead =>
        lead.firstName.toLowerCase().includes(searchLower) ||
        lead.lastName.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower)
      );
    }

    return HttpResponse.json({
      leads: filteredLeads,
      total: filteredLeads.length,
      stats: {
        total: seedData.leads.length,
        new: seedData.leads.filter(l => l.status === 'new').length,
        contacted: seedData.leads.filter(l => l.status === 'contacted').length,
        qualified: seedData.leads.filter(l => l.status === 'qualified').length,
        converted: seedData.leads.filter(l => l.status === 'converted').length,
        conversionRate: 13.2
      }
    });
  }),

  http.post(`${API_BASE}/leads`, async ({ request }) => {
    const leadData = await request.json();
    const newLead = {
      id: (seedData.leads.length + 1).toString(),
      ...leadData,
      createdAt: new Date(),
      score: Math.floor(Math.random() * 40) + 60 // Score entre 60 et 100
    };
    
    seedData.leads.push(newLead);
    return HttpResponse.json({ lead: newLead }, { status: 201 });
  }),

  // Campagnes marketing
  http.get(`${API_BASE}/campaigns`, () => {
    return HttpResponse.json({
      campaigns: seedData.campaigns,
      total: seedData.campaigns.length
    });
  }),

  // Apprenants
  http.get(`${API_BASE}/learners`, ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    
    let filteredLearners = [...seedData.learners];
    
    if (status && status !== 'all') {
      filteredLearners = filteredLearners.filter(learner => learner.status === status);
    }

    return HttpResponse.json({
      learners: filteredLearners,
      total: filteredLearners.length,
      stats: {
        total: seedData.learners.length,
        active: seedData.learners.filter(l => l.status === 'active').length,
        graduated: seedData.learners.filter(l => l.status === 'graduated').length,
        dropped: seedData.learners.filter(l => l.status === 'dropped').length,
        averageSatisfaction: 4.3
      }
    });
  }),

  // Programmes
  http.get(`${API_BASE}/programs`, () => {
    return HttpResponse.json({
      programs: seedData.programs,
      total: seedData.programs.length,
      stats: {
        active: seedData.programs.filter(p => p.isActive).length,
        categories: [...new Set(seedData.programs.map(p => p.category))].length
      }
    });
  }),

  // Données financières
  http.get(`${API_BASE}/finance`, ({ request }) => {
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || '2024-Q1';
    
    const financialData = seedData.financial.find(f => f.period === period) || seedData.financial[0];
    
    return HttpResponse.json({ data: financialData });
  }),

  // Conformité
  http.get(`${API_BASE}/compliance`, ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    
    let filteredItems = [...seedData.compliance];
    
    if (type && type !== 'all') {
      filteredItems = filteredItems.filter(item => item.type === type);
    }

    return HttpResponse.json({
      items: filteredItems,
      total: filteredItems.length,
      stats: {
        compliant: filteredItems.filter(i => i.status === 'compliant').length,
        nonCompliant: filteredItems.filter(i => i.status === 'non_compliant').length,
        inReview: filteredItems.filter(i => i.status === 'in_review').length
      }
    });
  }),

  // Intégrations
  http.get(`${API_BASE}/integrations`, () => {
    return HttpResponse.json({
      integrations: seedData.integrations,
      total: seedData.integrations.length,
      stats: {
        active: seedData.integrations.filter(i => i.status === 'active').length,
        error: seedData.integrations.filter(i => i.status === 'error').length,
        inactive: seedData.integrations.filter(i => i.status === 'inactive').length
      }
    });
  }),

  http.post(`${API_BASE}/integrations/:id/sync`, ({ params }) => {
    const integration = seedData.integrations.find(i => i.id === params.id);
    if (!integration) {
      return HttpResponse.json(
        { error: 'Intégration non trouvée' },
        { status: 404 }
      );
    }

    // Simuler une synchronisation
    integration.lastSync = new Date();
    integration.logs.unshift({
      id: (integration.logs.length + 1).toString(),
      timestamp: new Date(),
      level: 'info',
      message: 'Synchronisation manuelle déclenchée avec succès'
    });

    return HttpResponse.json({ 
      success: true,
      integration,
      message: 'Synchronisation démarrée'
    });
  }),

  // Analytics et métriques
  http.get(`${API_BASE}/analytics/dashboard`, () => {
    return HttpResponse.json({
      kpis: {
        totalLearners: 1247,
        activeLearners: 892,
        completionRate: 78.5,
        satisfaction: 4.2,
        revenue: 156780,
        revenueGrowth: 12.3,
        activePrograms: 23,
        qualiopiScore: 94.2
      },
      charts: {
        enrollments: [
          { month: 'Jan', inscriptions: 65, completions: 45, revenue: 12500 },
          { month: 'Fév', inscriptions: 78, completions: 52, revenue: 14200 },
          { month: 'Mar', inscriptions: 90, completions: 68, revenue: 16800 },
          { month: 'Avr', inscriptions: 85, completions: 71, revenue: 15900 },
          { month: 'Mai', inscriptions: 95, completions: 78, revenue: 18200 },
          { month: 'Jun', inscriptions: 110, completions: 89, revenue: 21500 }
        ],
        compliance: [
          { name: 'Conforme', value: 85, color: '#10b981' },
          { name: 'En cours', value: 12, color: '#f59e0b' },
          { name: 'Non conforme', value: 3, color: '#ef4444' }
        ]
      }
    });
  }),

  // Notifications
  http.get(`${API_BASE}/notifications`, () => {
    return HttpResponse.json({
      notifications: [
        {
          id: '1',
          type: 'warning',
          title: 'Audit Qualiopi prévu',
          message: 'L\'audit de surveillance est programmé pour le 15 octobre 2024',
          timestamp: new Date(),
          read: false
        },
        {
          id: '2',
          type: 'success',
          title: 'Mise à jour RGPD terminée',
          message: 'Tous les consentements ont été mis à jour selon les nouvelles directives',
          timestamp: new Date(Date.now() - 86400000), // 1 jour
          read: true
        },
        {
          id: '3',
          type: 'info',
          title: 'Nouvelle intégration disponible',
          message: 'Le connecteur Kairos v2.0 est maintenant disponible',
          timestamp: new Date(Date.now() - 172800000), // 2 jours
          read: false
        }
      ]
    });
  }),

  // Webhook N8N (pour traiter les réponses selon la mémoire)
  http.post(`${API_BASE}/webhook/n8n`, async ({ request }) => {
    const data = await request.json();
    
    // Simuler le traitement du webhook N8N
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return HttpResponse.json({
      status: 'success',
      message: 'Données extraites et traitées avec succès',
      date_generation: new Date().toISOString(),
      google_sheets_link: 'https://docs.google.com/spreadsheets/d/1abc123/edit'
    });
  })
];

export default handlers;
