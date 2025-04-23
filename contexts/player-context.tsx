"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './auth-context';
import { mockPlayerData } from '@/lib/mock-data';

export interface Skill {
  id: string;
  name: string;
  level: number;
  currentXP: number;
  requiredXP: number;
  progress: number;
}

export interface Streak {
  current: number;
  longest: number;
  lastLoginDate: string;
}

export interface PlayerStats {
  level: number;
  currentXP: number;
  requiredXP: number;
  totalXP: number;
  username: string;
  profilePicture: string;
  streak: Streak;
  joinedDate: string;
  skills: Skill[];
  badges: string[];
  abilities: string[];
}

interface PlayerContextType {
  playerStats: PlayerStats;
  addXP: (amount: number, skillId?: string) => void;
  levelUp: () => void;
  skillLevelUp: (skillId: string) => void;
  updateProfile: (updates: Partial<PlayerStats>) => void;
  progress: number;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [playerStats, setPlayerStats] = useState<PlayerStats>(mockPlayerData);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      // In a real app, we would fetch player data from an API
      setPlayerStats(mockPlayerData);
      setProgress((playerStats.currentXP / playerStats.requiredXP) * 100);
      
      // Check and update streak
      const lastLogin = new Date(playerStats.streak.lastLoginDate);
      const today = new Date();
      const diffDays = Math.floor((today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Consecutive day
        updateStreak(playerStats.streak.current + 1);
      } else if (diffDays > 1) {
        // Streak broken
        updateStreak(0);
      }
      
      // Update last login
      setPlayerStats(prev => ({
        ...prev,
        streak: {
          ...prev.streak,
          lastLoginDate: today.toISOString()
        }
      }));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setProgress((playerStats.currentXP / playerStats.requiredXP) * 100);
  }, [playerStats.currentXP, playerStats.requiredXP]);

  const updateStreak = (newStreak: number) => {
    setPlayerStats(prev => ({
      ...prev,
      streak: {
        ...prev.streak,
        current: newStreak,
        longest: Math.max(newStreak, prev.streak.longest)
      }
    }));
  };

  const addXP = (amount: number, skillId?: string) => {
    setPlayerStats((prev) => {
      let newXP = prev.currentXP + amount;
      let newLevel = prev.level;
      let newRequiredXP = prev.requiredXP;
      
      if (newXP >= prev.requiredXP) {
        newXP = newXP - prev.requiredXP;
        newLevel = prev.level + 1;
        newRequiredXP = Math.floor(prev.requiredXP * 1.5);
      }

      let newSkills = [...prev.skills];
      if (skillId) {
        newSkills = newSkills.map(skill => {
          if (skill.id === skillId) {
            let newSkillXP = skill.currentXP + amount;
            let newSkillLevel = skill.level;
            let newSkillRequiredXP = skill.requiredXP;
            
            if (newSkillXP >= skill.requiredXP) {
              newSkillXP = newSkillXP - skill.requiredXP;
              newSkillLevel = skill.level + 1;
              newSkillRequiredXP = Math.floor(skill.requiredXP * 1.3);
            }
            
            return {
              ...skill,
              currentXP: newSkillXP,
              level: newSkillLevel,
              requiredXP: newSkillRequiredXP,
              progress: (newSkillXP / newSkillRequiredXP) * 100
            };
          }
          return skill;
        });
      }

      return {
        ...prev,
        currentXP: newXP,
        level: newLevel,
        requiredXP: newRequiredXP,
        totalXP: prev.totalXP + amount,
        skills: newSkills
      };
    });
  };

  const levelUp = () => {
    setPlayerStats((prev) => ({
      ...prev,
      level: prev.level + 1,
      currentXP: 0,
      requiredXP: Math.floor(prev.requiredXP * 1.5),
    }));
  };

  const skillLevelUp = (skillId: string) => {
    setPlayerStats((prev) => ({
      ...prev,
      skills: prev.skills.map(skill => {
        if (skill.id === skillId) {
          return {
            ...skill,
            level: skill.level + 1,
            currentXP: 0,
            requiredXP: Math.floor(skill.requiredXP * 1.3),
            progress: 0
          };
        }
        return skill;
      })
    }));
  };

  const updateProfile = (updates: Partial<PlayerStats>) => {
    setPlayerStats(prev => ({
      ...prev,
      ...updates
    }));
  };

  return (
    <PlayerContext.Provider value={{ 
      playerStats, 
      addXP, 
      levelUp, 
      skillLevelUp, 
      updateProfile,
      progress 
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};