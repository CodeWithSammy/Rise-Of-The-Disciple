"use client";

import React from 'react';
import { AuthProvider } from '@/contexts/auth-context';
import { PlayerProvider } from '@/contexts/player-context';
import { QuestProvider } from '@/contexts/quest-context';


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PlayerProvider>
        <QuestProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </QuestProvider>
      </PlayerProvider>
    </AuthProvider>
  );
}
