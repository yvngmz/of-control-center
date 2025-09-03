'use client';

/**
 * Formulaire de connexion avec validation
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../../libs/auth/auth-context';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, Eye, EyeOff, Home } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      await login(data);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    }
  };

  const demoAccounts = [
    { email: 'admin@of-control.com', role: 'Administrateur', password: 'demo123' },
    { email: 'direction@of-control.com', role: 'Direction', password: 'demo123' },
    { email: 'pedagogy@of-control.com', role: 'Resp. Pédagogique', password: 'demo123' },
    { email: 'trainer@of-control.com', role: 'Formateur', password: 'demo123' },
    { email: 'sales@of-control.com', role: 'Commercial/Marketing', password: 'demo123' },
    { email: 'csm@of-control.com', role: 'Customer Success', password: 'demo123' },
    { email: 'dpo@of-control.com', role: 'DPO/Conformité', password: 'demo123' },
    { email: 'auditor@of-control.com', role: 'Auditeur', password: 'demo123' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
              <Home className="w-6 h-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold">OF Control Center</CardTitle>
            <CardDescription>
              Connectez-vous à votre tableau de bord
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    className={errors.password ? 'border-destructive' : ''}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>

            {/* Comptes de démonstration */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Comptes de démonstration
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                {demoAccounts.map((account) => (
                  <Button
                    key={account.email}
                    variant="outline"
                    size="sm"
                    className="justify-start text-xs h-auto p-2"
                    onClick={() => {
                      const emailInput = document.getElementById('email') as HTMLInputElement;
                      const passwordInput = document.getElementById('password') as HTMLInputElement;
                      if (emailInput && passwordInput) {
                        emailInput.value = account.email;
                        passwordInput.value = account.password;
                      }
                    }}
                  >
                    <div className="text-left">
                      <div className="font-medium">{account.role}</div>
                      <div className="text-muted-foreground">{account.email}</div>
                    </div>
                  </Button>
                ))}
              </div>

              <div className="text-xs text-muted-foreground text-center">
                Mot de passe pour tous les comptes : <code className="bg-muted px-1 rounded">demo123</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
