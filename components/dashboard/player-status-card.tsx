"use client";

import { useState } from 'react';
import { usePlayer } from '@/contexts/player-context';
import { useAuth } from '@/contexts/auth-context';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Shield, Calendar, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

export function PlayerStatusCard() {
  const { playerStats, progress, updateProfile } = usePlayer();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || playerStats.username);
  const [newProfilePicture, setNewProfilePicture] = useState(user?.profileImage || playerStats.profilePicture);

  const handleSaveProfile = () => {
    updateProfile({
      username: newUsername,
      profilePicture: newProfilePicture
    });
    setIsEditing(false);
  };

  const joinedDate = new Date(playerStats.joinedDate);
  const daysJoined = Math.floor((new Date().getTime() - joinedDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="mb-8">
      <div className="glass-card rounded-xl relative overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full neon-border bg-gradient-to-br from-[rgba(0,166,255,0.2)] to-[rgba(0,102,204,0.2)] flex items-center justify-center overflow-hidden">
              {isEditing ? (
                <Input
                  type="text"
                  value={newProfilePicture}
                  onChange={(e) => setNewProfilePicture(e.target.value)}
                  placeholder="Profile picture URL"
                  className="glass-input absolute inset-0 z-10 text-white text-xs p-2"
                />
              ) : (
                <img
                  src={user?.profileImage || playerStats.profilePicture}
                  alt={user?.username || playerStats.username}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[rgba(0,166,255,0.2)] backdrop-blur-md text-[#00a6ff] font-bold rounded-full w-10 h-10 flex items-center justify-center border border-[#00a6ff] neon-border">
              {playerStats.level}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                {isEditing ? (
                  <Input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="glass-input max-w-[200px] text-white"
                  />
                ) : (
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {user?.username || playerStats.username}
                  </h2>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  className="text-[#00a6ff] hover:text-[#0066cc] glass-card"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 md:mt-0 text-[#00a6ff] font-semibold">
                {playerStats.currentXP} / {playerStats.requiredXP} XP
              </div>
            </div>
            
            <div className="mb-4">
              <Progress 
                value={progress} 
                className="h-2 bg-[rgba(0,10,20,0.5)] skill-progress" 
                indicatorClassName="bg-gradient-to-r from-[#00a6ff] to-[#0066cc]" 
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 text-center">
              <div className="glass-card rounded-lg p-3 neon-border">
                <div className="text-[#00a6ff] text-2xl font-bold">{playerStats.streak.current}</div>
                <div className="text-xs text-gray-400">Current Streak</div>
              </div>
              <div className="glass-card rounded-lg p-3 neon-border">
                <div className="text-[#00a6ff] text-2xl font-bold">{playerStats.streak.longest}</div>
                <div className="text-xs text-gray-400">Longest Streak</div>
              </div>
              <div className="glass-card rounded-lg p-3 neon-border">
                <div className="text-[#00a6ff] text-2xl font-bold">{daysJoined}</div>
                <div className="text-xs text-gray-400">Days Active</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
              {playerStats.skills.map((skill) => (
                <div key={skill.id} className="glass-card rounded-lg p-3">
                  <div className="text-xs uppercase text-gray-400">{skill.name}</div>
                  <div className="font-bold text-[#00a6ff]">Level {skill.level}</div>
                  <Progress 
                    value={skill.progress} 
                    className="h-1 bg-[rgba(0,10,20,0.5)] mt-1 skill-progress" 
                    indicatorClassName="bg-[#00a6ff]" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}