"use client";

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Shield, BookOpen, Dumbbell, Code, Target, LogOut } from 'lucide-react';

interface DashboardHeaderProps {
  activeTab: 'dashboard' | 'skills' | 'quests' | 'journal' | 'architect';
  onChangeTab: (tab: 'dashboard' | 'skills' | 'quests' | 'journal' | 'architect') => void;
}

export function DashboardHeader({ activeTab, onChangeTab }: DashboardHeaderProps) {
  const { logout } = useAuth();

  return (
    <header className="bg-black bg-opacity-95 border-b border-purple-900 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-purple-500" />
          <h1 className="text-2xl font-bold text-white">Rise of the Disciple</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-4">
          <Button
            variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
            className="text-sm"
            onClick={() => onChangeTab('dashboard')}
          >
            Dashboard
          </Button>
          <Button
            variant={activeTab === 'skills' ? 'default' : 'ghost'}
            className="text-sm"
            onClick={() => onChangeTab('skills')}
          >
            Skill Trees
          </Button>
          <Button
            variant={activeTab === 'quests' ? 'default' : 'ghost'}
            className="text-sm"
            onClick={() => onChangeTab('quests')}
          >
            Quests
          </Button>
          <Button
            variant={activeTab === 'architect' ? 'default' : 'ghost'}
            className="text-sm"
            onClick={() => onChangeTab('architect')}
          >
            The Architect
          </Button>
        </nav>
        
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden mt-4 border-t border-purple-900 pt-2">
        <div className="container mx-auto px-4 flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center text-xs"
            onClick={() => onChangeTab('dashboard')}
          >
            <Shield className="h-5 w-5 mb-1" />
            Home
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center text-xs"
            onClick={() => onChangeTab('skills')}
          >
            <Code className="h-5 w-5 mb-1" />
            Skills
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center text-xs"
            onClick={() => onChangeTab('quests')}
          >
            <Target className="h-5 w-5 mb-1" />
            Quests
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center text-xs"
            onClick={() => onChangeTab('architect')}
          >
            <BookOpen className="h-5 w-5 mb-1" />
            Architect
          </Button>
        </div>
      </div>
    </header>
  );
}