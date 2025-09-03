/**
 * Tests pour le composant LoginForm
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../login-form';
import { AuthProvider } from '../../../../libs/auth/auth-context';

// Mock pour next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Wrapper avec les providers nécessaires
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <AuthProvider>
      {ui}
    </AuthProvider>
  );
};

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form correctly', () => {
    renderWithProviders(<LoginForm />);
    
    expect(screen.getByText('OF Control Center')).toBeInTheDocument();
    expect(screen.getByText('Connectez-vous à votre tableau de bord')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Se connecter' })).toBeInTheDocument();
  });

  it('shows demo accounts section', () => {
    renderWithProviders(<LoginForm />);
    
    expect(screen.getByText('Comptes de démonstration')).toBeInTheDocument();
    expect(screen.getByText('Administrateur')).toBeInTheDocument();
    expect(screen.getByText('Direction')).toBeInTheDocument();
    expect(screen.getByText('admin@of-control.com')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Se connecter' });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email invalide')).toBeInTheDocument();
      expect(screen.getByText('Mot de passe requis')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: 'Se connecter' });
    
    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email invalide')).toBeInTheDocument();
    });
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);
    
    const passwordInput = screen.getByLabelText('Mot de passe');
    const toggleButton = screen.getByRole('button', { name: '' }); // Le bouton toggle n'a pas de nom accessible
    
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('fills form when demo account is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);
    
    const adminButton = screen.getByText('Administrateur').closest('button');
    if (adminButton) {
      await user.click(adminButton);
    }
    
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Mot de passe') as HTMLInputElement;
    
    expect(emailInput.value).toBe('admin@of-control.com');
    expect(passwordInput.value).toBe('demo123');
  });

  it('shows loading state during login', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Mot de passe');
    const submitButton = screen.getByRole('button', { name: 'Se connecter' });
    
    await user.type(emailInput, 'admin@of-control.com');
    await user.type(passwordInput, 'demo123');
    await user.click(submitButton);
    
    expect(screen.getByText('Connexion...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('shows error message for invalid credentials', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Mot de passe');
    const submitButton = screen.getByRole('button', { name: 'Se connecter' });
    
    await user.type(emailInput, 'wrong@email.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Identifiants invalides')).toBeInTheDocument();
    });
  });

  it('calls onSuccess callback after successful login', async () => {
    const mockOnSuccess = jest.fn();
    const user = userEvent.setup();
    
    renderWithProviders(<LoginForm onSuccess={mockOnSuccess} />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Mot de passe');
    const submitButton = screen.getByRole('button', { name: 'Se connecter' });
    
    await user.type(emailInput, 'admin@of-control.com');
    await user.type(passwordInput, 'demo123');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('has proper accessibility attributes', () => {
    renderWithProviders(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Mot de passe');
    
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('id', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('id', 'password');
    
    // Vérifier que les labels sont correctement associés
    expect(screen.getByLabelText('Email')).toBe(emailInput);
    expect(screen.getByLabelText('Mot de passe')).toBe(passwordInput);
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Mot de passe');
    const submitButton = screen.getByRole('button', { name: 'Se connecter' });
    
    // Navigation avec Tab
    await user.tab();
    expect(emailInput).toHaveFocus();
    
    await user.tab();
    expect(passwordInput).toHaveFocus();
    
    await user.tab();
    expect(submitButton).toHaveFocus();
    
    // Soumission avec Entrée
    await user.type(emailInput, 'admin@of-control.com');
    await user.type(passwordInput, 'demo123');
    await user.keyboard('{Enter}');
    
    expect(screen.getByText('Connexion...')).toBeInTheDocument();
  });
});
