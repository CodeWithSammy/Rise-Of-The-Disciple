"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './auth-context';
import { usePlayer } from './player-context';
import { mockQuestData } from '@/lib/mock-data';

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'random';
  xpReward: number;
  skillId?: string;
  completed: boolean;
  deadline?: Date;
}

interface QuestContextType {
  quests: Quest[];
  completeQuest: (questId: string) => void;
  dailyQuests: Quest[];
  weeklyQuests: Quest[];
  randomQuests: Quest[];
  generateRandomQuest: () => void;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

export function QuestProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { addXP } = usePlayer();
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      // In a real app, we would fetch quests from an API
      setQuests(mockQuestData);
    }
  }, [isAuthenticated]);

  const completeQuest = (questId: string) => {
    setQuests(quests.map(quest => {
      if (quest.id === questId) {
        // Add XP to player when quest is completed
        addXP(quest.xpReward, quest.skillId);
        return { ...quest, completed: true };
      }
      return quest;
    }));
  };

  const generateRandomQuest = () => {
    const randomQuest: Quest = {
      id: `random-${Date.now()}`,
      title: 'Surprise Challenge',
      description: 'Complete a coding exercise within 30 minutes',
      type: 'random',
      xpReward: Math.floor(Math.random() * 50) + 50,
      skillId: 'coding',
      completed: false,
    };
    
    setQuests([...quests, randomQuest]);
  };

  // Filter quests by type
  const dailyQuests = quests.filter(quest => quest.type === 'daily');
  const weeklyQuests = quests.filter(quest => quest.type === 'weekly');
  const randomQuests = quests.filter(quest => quest.type === 'random');

  return (
    <QuestContext.Provider value={{ 
      quests, 
      completeQuest, 
      dailyQuests, 
      weeklyQuests, 
      randomQuests, 
      generateRandomQuest 
    }}>
      {children}
    </QuestContext.Provider>
  );
}

export const useQuests = () => {
  const context = useContext(QuestContext);
  if (context === undefined) {
    throw new Error('useQuests must be used within a QuestProvider');
  }
  return context;
};