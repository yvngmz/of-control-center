'use client';

/**
 * Composant IA spécialisé avec design dégradé bleu-violet-mauve
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { Progress } from './progress';
import { Sparkles, Zap, Brain, Star, Bot, Eye, Settings } from 'lucide-react';

interface AIComponentProps {
  title: string;
  description?: string;
  status: 'active' | 'processing' | 'completed' | 'error';
  confidence?: number;
  metrics?: {
    label: string;
    value: string | number;
    trend?: 'up' | 'down' | 'stable';
  }[];
  actions?: {
    label: string;
    icon?: React.ComponentType<any>;
    onClick?: () => void;
    variant?: 'default' | 'outline' | 'secondary';
  }[];
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'card' | 'widget' | 'alert';
}

export function AIComponent({
  title,
  description,
  status,
  confidence,
  metrics,
  actions,
  children,
  size = 'md',
  variant = 'card'
}: AIComponentProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return { color: 'text-green-600', bg: 'bg-green-100', label: 'Actif' };
      case 'processing':
        return { color: 'text-blue-600', bg: 'bg-blue-100', label: 'En cours' };
      case 'completed':
        return { color: 'text-purple-600', bg: 'bg-purple-100', label: 'Terminé' };
      case 'error':
        return { color: 'text-red-600', bg: 'bg-red-100', label: 'Erreur' };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100', label: 'Inconnu' };
    }
  };

  const statusConfig = getStatusConfig();

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const baseClasses = `
    relative overflow-hidden cursor-pointer transition-all duration-300
    hover:shadow-xl hover:scale-[1.02] 
    bg-gradient-to-br from-blue-50 via-violet-50 to-purple-50
    dark:from-blue-950/30 dark:via-violet-950/30 dark:to-purple-950/30
    border-2 border-transparent hover:border-purple-200
    dark:hover:border-purple-800
  `;

  if (variant === 'widget') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className={`${baseClasses} rounded-xl ${sizeClasses[size]}`}
      >
        {/* Effet de brillance réduit */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full animate-[shimmer_6s_infinite]" />
        
        {/* Icône étoile en arrière-plan */}
        <div className="absolute top-2 right-2 opacity-10">
          <Star className="w-6 h-6 text-purple-400" fill="currentColor" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
              {description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
              )}
            </div>
            <Badge className={`ml-auto ${statusConfig.bg} ${statusConfig.color} border-0`}>
              🤖 IA {statusConfig.label}
            </Badge>
          </div>

          {confidence && (
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Confiance IA</span>
                <span className="font-medium text-purple-600">{confidence}%</span>
              </div>
              <Progress value={confidence} className="h-2" />
            </div>
          )}

          {metrics && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {metrics.map((metric, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-lg font-bold text-purple-600">{metric.value}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {children && (
            <div className="mb-4">
              {children}
            </div>
          )}

          {actions && (
            <div className="flex flex-wrap gap-2">
              {actions.map((action, idx) => {
                const IconComponent = action.icon || Zap;
                return (
                  <Button
                    key={idx}
                    size="sm"
                    variant={action.variant || 'outline'}
                    onClick={action.onClick}
                    className="bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
                  >
                    <IconComponent className="w-4 h-4 mr-1" />
                    {action.label}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
    >
      <Card className={baseClasses}>
        {/* Effet de brillance très réduit */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -skew-x-12 -translate-x-full animate-[shimmer_8s_infinite]" />
        
        {/* Icône étoile en arrière-plan */}
        <div className="absolute top-4 right-4 opacity-8">
          <Star className="w-10 h-10 text-purple-400" fill="currentColor" />
        </div>

        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-900 dark:text-gray-100">{title}</span>
            <Badge className={`ml-auto ${statusConfig.bg} ${statusConfig.color} border-0`}>
              🤖 IA {statusConfig.label}
            </Badge>
          </CardTitle>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>
          )}
        </CardHeader>

        <CardContent className={`relative z-10 ${sizeClasses[size]}`}>
          {confidence && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">Confiance IA</span>
                <span className="font-medium text-purple-600">{confidence}%</span>
              </div>
              <Progress value={confidence} className="h-3" />
            </div>
          )}

          {metrics && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              {metrics.map((metric, idx) => (
                <div key={idx} className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                  <div className="text-xl font-bold text-purple-600">{metric.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</div>
                  {metric.trend && (
                    <div className={`text-xs mt-1 ${
                      metric.trend === 'up' ? 'text-green-600' :
                      metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {metric.trend === 'up' ? '↗️' : metric.trend === 'down' ? '↘️' : '→'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {children && (
            <div className="mb-4">
              {children}
            </div>
          )}

          {actions && (
            <div className="flex flex-wrap gap-2">
              {actions.map((action, idx) => {
                const IconComponent = action.icon || Zap;
                return (
                  <Button
                    key={idx}
                    size="sm"
                    variant={action.variant || 'outline'}
                    onClick={action.onClick}
                    className="bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 border-purple-200"
                  >
                    <IconComponent className="w-4 h-4 mr-1" />
                    {action.label}
                  </Button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Composant spécialisé pour les alertes IA
export function AIAlert({
  title,
  description,
  severity = 'info',
  confidence,
  actionLabel,
  onAction
}: {
  title: string;
  description: string;
  severity?: 'info' | 'warning' | 'error' | 'success';
  confidence?: number;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const severityConfig = {
    info: { bg: 'from-blue-500/20 to-purple-500/20', border: 'border-blue-200', icon: 'text-blue-600' },
    warning: { bg: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-200', icon: 'text-yellow-600' },
    error: { bg: 'from-red-500/20 to-pink-500/20', border: 'border-red-200', icon: 'text-red-600' },
    success: { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-200', icon: 'text-green-600' }
  };

  const config = severityConfig[severity];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`relative p-4 rounded-xl bg-gradient-to-br ${config.bg} border-2 ${config.border} overflow-hidden`}
    >
      {/* Effet de brillance très réduit */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent -skew-x-12 -translate-x-full animate-[shimmer_15s_infinite]" />
      
      {/* Icône étoile */}
      <div className="absolute top-2 right-2 opacity-8">
        <Star className="w-5 h-5 text-purple-400" fill="currentColor" />
      </div>

      <div className="relative z-10 flex items-start gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h4>
            {confidence && (
              <Badge variant="outline" className="text-xs bg-white/80">
                🤖 {confidence}%
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{description}</p>
          
          {actionLabel && onAction && (
            <Button size="sm" onClick={onAction} className="bg-white/80 hover:bg-white dark:bg-gray-800/80">
              <Zap className="w-3 h-3 mr-1" />
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Composant IA pour les métriques
export function AIMetric({
  label,
  value,
  subtitle,
  confidence,
  trend,
  onClick
}: {
  label: string;
  value: string | number;
  subtitle?: string;
  confidence?: number;
  trend?: 'up' | 'down' | 'stable';
  onClick?: () => void;
}) {
  const trendConfig = {
    up: { icon: '📈', color: 'text-green-600' },
    down: { icon: '📉', color: 'text-red-600' },
    stable: { icon: '➡️', color: 'text-gray-600' }
  };

  const trendInfo = trend ? trendConfig[trend] : null;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative p-4 rounded-xl cursor-pointer transition-all duration-300
        bg-gradient-to-br from-blue-50 via-violet-50 to-purple-50
        dark:from-blue-950/50 dark:via-violet-950/50 dark:to-purple-950/50
        border-2 border-purple-200/50 hover:border-purple-300
        dark:border-purple-800/50 dark:hover:border-purple-700
        overflow-hidden
      `}
    >
      {/* Effet de brillance très réduit */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent -skew-x-12 -translate-x-full animate-[shimmer_10s_infinite]" />
      
      {/* Icône étoile */}
      <div className="absolute top-1 right-1 opacity-15">
        <Star className="w-4 h-4 text-purple-400" fill="currentColor" />
      </div>

      <div className="relative z-10 text-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">
          {value}
        </div>
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </div>
        {subtitle && (
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {subtitle}
          </div>
        )}
        {confidence && (
          <div className="text-xs text-purple-600 mt-1">
            🤖 Confiance: {confidence}%
          </div>
        )}
        {trendInfo && (
          <div className={`text-xs mt-1 ${trendInfo.color}`}>
            {trendInfo.icon} Tendance
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Composant IA pour les actions rapides
export function AIQuickAction({
  label,
  icon: IconComponent = Zap,
  description,
  status = 'ready',
  onClick
}: {
  label: string;
  icon?: React.ComponentType<any>;
  description?: string;
  status?: 'ready' | 'processing' | 'completed';
  onClick?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative p-4 rounded-xl cursor-pointer transition-all duration-300
        bg-gradient-to-br from-blue-100 via-violet-100 to-purple-100
        dark:from-blue-900/30 dark:via-violet-900/30 dark:to-purple-900/30
        border-2 border-purple-200 hover:border-purple-300
        dark:border-purple-800 dark:hover:border-purple-700
        hover:shadow-lg overflow-hidden
      `}
    >
      {/* Effet de brillance très réduit */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent -skew-x-12 -translate-x-full animate-[shimmer_12s_infinite]" />
      
      {/* Icône étoile */}
      <div className="absolute top-1 right-1 opacity-10">
        <Star className="w-3 h-3 text-purple-400" fill="currentColor" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
            {label}
          </div>
          {description && (
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {description}
            </div>
          )}
          {status === 'processing' && (
            <div className="text-xs text-purple-600 mt-1 flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              IA en cours...
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
