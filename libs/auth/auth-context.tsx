'use client';

/**
 * Context d'authentification avec RBAC
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState, LoginCredentials } from '../types/auth';
import { hasPermission, canAccessModule } from './rbac';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  canAccessModule: (module: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: null,
  });

  useEffect(() => {
    // Vérifier si un token existe dans le localStorage
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          token,
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // En mode démo, utiliser des données mockées
      const mockUser = await mockLogin(credentials);
      const mockToken = 'mock-jwt-token';
      
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        token: mockToken,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
    });
  };

  const checkPermission = (permission: string): boolean => {
    if (!authState.user) return false;
    return hasPermission(authState.user.role, permission);
  };

  const checkModuleAccess = (module: string): boolean => {
    if (!authState.user) return false;
    return canAccessModule(authState.user.role, module);
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    hasPermission: checkPermission,
    canAccessModule: checkModuleAccess,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Mock login pour le mode démo
async function mockLogin(credentials: LoginCredentials): Promise<User> {
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Utilisateurs de démonstration
  const mockUsers: Record<string, User> = {
    'admin@of-control.com': {
      id: '1',
      email: 'admin@of-control.com',
      firstName: 'Admin',
      lastName: 'System',
      role: 'admin',
      permissions: [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    'direction@of-control.com': {
      id: '2',
      email: 'direction@of-control.com',
      firstName: 'Marie',
      lastName: 'Directrice',
      role: 'direction',
      permissions: [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    'pedagogy@of-control.com': {
      id: '3',
      email: 'pedagogy@of-control.com',
      firstName: 'Pierre',
      lastName: 'Pédagogue',
      role: 'resp_pedagogy',
      permissions: [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    'trainer@of-control.com': {
      id: '4',
      email: 'trainer@of-control.com',
      firstName: 'Sophie',
      lastName: 'Formatrice',
      role: 'trainer',
      permissions: [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    'sales@of-control.com': {
      id: '5',
      email: 'sales@of-control.com',
      firstName: 'Jean',
      lastName: 'Commercial',
      role: 'sales_marketing',
      permissions: [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    'csm@of-control.com': {
      id: '6',
      email: 'csm@of-control.com',
      firstName: 'Laura',
      lastName: 'Success',
      role: 'csm',
      permissions: [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    'dpo@of-control.com': {
      id: '7',
      email: 'dpo@of-control.com',
      firstName: 'David',
      lastName: 'Protection',
      role: 'dpo_compliance',
      permissions: [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    'auditor@of-control.com': {
      id: '8',
      email: 'auditor@of-control.com',
      firstName: 'Anne',
      lastName: 'Auditrice',
      role: 'auditor',
      permissions: [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  const user = mockUsers[credentials.email];
  if (!user || credentials.password !== 'demo123') {
    throw new Error('Identifiants invalides');
  }

  return user;
}
