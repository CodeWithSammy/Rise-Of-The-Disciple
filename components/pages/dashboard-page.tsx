"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { LoginPage } from './login-page';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { PlayerStatusCard } from '@/components/dashboard/player-status-card';
import { QuestLogSection } from '@/components/quests/quest-log-section';
import { SkillTreesSection } from '@/components/skills/skill-trees-section';
import { BibleVerseCard } from '@/components/bible/bible-verse-card';
import { ArchitectChat } from '@/components/architect/architect-chat';
import { mockBibleVerses } from '@/lib/mock-data';

export function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'skills' | 'quests' | 'journal' | 'architect'>('dashboard');
  
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Get a random Bible verse for the day
  const randomVerse = mockBibleVerses[Math.floor(Math.random() * mockBibleVerses.length)];

  // Render different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'skills':
        return <SkillTreesSection />;
      case 'quests':
        return <QuestLogSection />;
      case 'architect':
        return <ArchitectChat />;
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <BibleVerseCard
                reference={randomVerse.reference}
                text={randomVerse.text}
              />
            </div>
            <div className="lg:col-span-2">
              <QuestLogSection compact />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black bg-opacity-90 text-white">
      <DashboardHeader activeTab={activeTab} onChangeTab={setActiveTab} />
      <DashboardLayout>
        <PlayerStatusCard />
        {renderContent()}
      </DashboardLayout>
    </div>
  );
}