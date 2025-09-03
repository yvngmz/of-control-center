'use client';

/**
 * Panneau de détail réutilisable qui s'ouvre à droite
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface DetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: 'sm' | 'md' | 'lg' | 'xl';
}

export function DetailPanel({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  width = 'md' 
}: DetailPanelProps) {
  const widthClasses = {
    sm: 'w-80',
    md: 'w-96',
    lg: 'w-[500px]',
    xl: 'w-[600px]'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed top-0 right-0 h-full ${widthClasses[width]} bg-background border-l shadow-2xl z-50 overflow-y-auto`}
          >
            <Card className="h-full rounded-none border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b sticky top-0 bg-background z-10">
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                {children}
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
