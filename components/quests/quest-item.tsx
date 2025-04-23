"use client";

import { useState } from 'react';
import { useQuests } from '@/contexts/quest-context';
import { Quest } from '@/contexts/quest-context';
import { Button } from '@/components/ui/button';
import { Check, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestItemProps {
  quest: Quest;
}

export function QuestItem({ quest }: QuestItemProps) {
  const { completeQuest } = useQuests();
  const [isHovered, setIsHovered] = useState(false);

  const handleComplete = () => {
    completeQuest(quest.id);
  };

  return (
    <div 
      className={cn(
        "p-4 rounded-md border border-purple-900 transition-all duration-200",
        quest.completed 
          ? "bg-green-900 bg-opacity-20 border-green-800" 
          : isHovered 
            ? "bg-purple-900 bg-opacity-30" 
            : "bg-gray-900 bg-opacity-50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={cn(
            "font-medium text-lg", 
            quest.completed ? "text-green-400 line-through" : "text-white"
          )}>
            {quest.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">{quest.description}</p>
          <div className="flex items-center mt-2">
            <span className="text-amber-400 text-xs font-medium">
              +{quest.xpReward} XP
            </span>
            {quest.skillId && (
              <span className="ml-2 px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                {quest.skillId.charAt(0).toUpperCase() + quest.skillId.slice(1)}
              </span>
            )}
          </div>
        </div>
        <div>
          {quest.completed ? (
            <span className="inline-flex items-center rounded-full bg-green-900 bg-opacity-40 px-2 py-1 text-xs font-medium text-green-400">
              <Check className="mr-1 h-3 w-3" />
              Completed
            </span>
          ) : (
            <Button 
              onClick={handleComplete}
              size="sm" 
              className="bg-purple-700 hover:bg-purple-600 text-white"
            >
              Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}