'use client';

/**
 * Page d'accueil - Gestion de l'authentification et redirection
 */

import { useAuth } from '../../libs/auth/auth-context';
import { LoginForm } from '../components/auth/login-form';
import { MainLayout } from '../components/layout/main-layout';
import { DashboardOverview } from '../components/dashboard/dashboard-overview';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Rediriger vers le dashboard après connexion
      router.push('/dashboard');
    }
  }, [isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <MainLayout>
      <DashboardOverview userRole={user?.role || ''} />
    </MainLayout>
  );
}
