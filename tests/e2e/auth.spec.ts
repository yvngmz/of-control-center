/**
 * Tests E2E pour l'authentification
 */

import { test, expect } from '@playwright/test';

test.describe('Authentification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.getByText('OF Control Center')).toBeVisible();
    await expect(page.getByText('Connectez-vous à votre tableau de bord')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Mot de passe')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Se connecter' })).toBeVisible();
  });

  test('should show demo accounts', async ({ page }) => {
    await expect(page.getByText('Comptes de démonstration')).toBeVisible();
    await expect(page.getByText('Administrateur')).toBeVisible();
    await expect(page.getByText('admin@of-control.com')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    await expect(page.getByText('Email invalide')).toBeVisible();
    await expect(page.getByText('Mot de passe requis')).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('admin@of-control.com');
    await page.getByLabel('Mot de passe').fill('demo123');
    await page.getByRole('button', { name: 'Se connecter' }).click();

    // Attendre la redirection vers le dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Bonjour, Admin')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('wrong@email.com');
    await page.getByLabel('Mot de passe').fill('wrongpassword');
    await page.getByRole('button', { name: 'Se connecter' }).click();

    await expect(page.getByText('Identifiants invalides')).toBeVisible();
  });

  test('should fill form when demo account is clicked', async ({ page }) => {
    await page.getByText('Administrateur').click();
    
    await expect(page.getByLabel('Email')).toHaveValue('admin@of-control.com');
    await expect(page.getByLabel('Mot de passe')).toHaveValue('demo123');
  });

  test('should toggle password visibility', async ({ page }) => {
    const passwordInput = page.getByLabel('Mot de passe');
    const toggleButton = page.locator('[data-testid="toggle-password"]').first();
    
    await passwordInput.fill('testpassword');
    
    // Initially password should be hidden
    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Click toggle to show password
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');
    
    // Click toggle to hide password
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Tab to email input
    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Email')).toBeFocused();
    
    // Tab to password input
    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Mot de passe')).toBeFocused();
    
    // Tab to submit button
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Se connecter' })).toBeFocused();
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.getByLabel('Email').fill('admin@of-control.com');
    await page.getByLabel('Mot de passe').fill('demo123');
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    await expect(page).toHaveURL('/dashboard');
    
    // Open user menu and logout
    await page.getByRole('button', { name: 'Admin System' }).click();
    await page.getByText('Se déconnecter').click();
    
    // Should redirect to login page
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Connectez-vous à votre tableau de bord')).toBeVisible();
  });

  test('should persist login state on page refresh', async ({ page }) => {
    // Login
    await page.getByLabel('Email').fill('admin@of-control.com');
    await page.getByLabel('Mot de passe').fill('demo123');
    await page.getByRole('button', { name: 'Se connecter' }).click();
    
    await expect(page).toHaveURL('/dashboard');
    
    // Refresh page
    await page.reload();
    
    // Should still be logged in
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Bonjour, Admin')).toBeVisible();
  });
});
