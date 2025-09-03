'use client';

/**
 * Page du tableau de bord principal
 */

import { useAuth } from '../../../libs/auth/auth-context';
import { MainLayout } from '../../components/layout/main-layout';
import { DashboardOverview } from '../../components/dashboard/dashboard-overview';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect('/');
  }

  return (
    <MainLayout>
      <DashboardOverview userRole={user?.role || ''} />
    </MainLayout>
  );
}
