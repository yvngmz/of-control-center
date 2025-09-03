'use client';

/**
 * Layout principal du OF Control Center
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../libs/auth/auth-context';
import { MODULES } from '../../../libs/constants/modules';
import { canAccessModule } from '../../../libs/auth/rbac';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight, 
  User, 
  LogOut, 
  Settings,
  Bell,
  Search,
  Home,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { user, logout, canAccessModule: checkModuleAccess } = useAuth();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const accessibleModules = MODULES.filter(module => 
    module.isActive && user && checkModuleAccess(module.type)
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getUserInitials = () => {
    if (!user) return 'U';
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? 'w-full max-w-sm' : 'w-64 min-w-64'} bg-card border-r`}>
      {/* Header */}
      <div className="p-3 md:p-4 border-b">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Home className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-bold text-sm md:text-lg truncate">OF Control Center</h1>
            <p className="text-xs text-muted-foreground truncate">Infrastructure IA</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 md:p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Rechercher..." 
            className="pl-10 text-sm"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2 md:p-4 scrollbar-thin scrollbar-thumb-muted">
        <div className="space-y-1 md:space-y-2">
          {/* Dashboard */}
          <Link href="/dashboard">
            <Button
              variant={pathname === '/dashboard' ? 'default' : 'ghost'}
              className="w-full justify-start gap-2 md:gap-3 h-9 md:h-10 px-2 md:px-3"
              title="Tableau de bord"
            >
              <Home className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs md:text-sm truncate">Tableau de bord</span>
            </Button>
          </Link>

          {/* Modules */}
          {accessibleModules.map((module) => {
            const Icon = require('lucide-react')[module.icon];
            const isActive = pathname === module.path;

            return (
              <div key={module.id}>
                <Link href={module.path || '#'}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className="w-full justify-start gap-2 md:gap-3 h-9 md:h-10 px-2 md:px-3"
                    title={module.name}
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${module.color}`} />
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs md:text-sm truncate">
                      {module.name}
                    </span>
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-3 md:p-4 border-t">
        <div className="flex items-center gap-2 md:gap-3">
          <Avatar className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="text-xs md:text-sm">{getUserInitials()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm font-medium truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-80 sm:w-96">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 md:h-16 border-b bg-card flex items-center justify-between px-3 md:px-4">
          <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden flex-shrink-0">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
            </Sheet>

            {/* Breadcrumb */}
            <div className="hidden sm:block min-w-0 flex-1">
              <nav className="flex items-center space-x-2 text-sm">
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground truncate">
                  Accueil
                </Link>
                {pathname !== '/dashboard' && (
                  <>
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="font-medium truncate">
                      {accessibleModules.find(m => pathname === m.path)?.name || 'Page actuelle'}
                    </span>
                  </>
                )}
              </nav>
            </div>

            {/* Titre mobile */}
            <div className="block sm:hidden min-w-0 flex-1">
              <h1 className="font-semibold text-sm truncate">
                {accessibleModules.find(m => pathname === m.path)?.name || 'OF Control Center'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Bell className="w-4 h-4" />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex-shrink-0"
              title="Changer de thème"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 md:h-9 md:w-9 rounded-full flex-shrink-0">
                  <Avatar className="h-8 w-8 md:h-9 md:w-9">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-xs md:text-sm">{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 md:w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{user?.firstName} {user?.lastName}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="sm:hidden">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-3 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
