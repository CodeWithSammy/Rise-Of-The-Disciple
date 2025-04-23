"use client";

import { useQuests } from '@/contexts/quest-context';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuestItem } from './quest-item';
import { Target, Calendar, Zap } from 'lucide-react';

interface QuestLogSectionProps {
  compact?: boolean;
}

export function QuestLogSection({ compact = false }: QuestLogSectionProps) {
  const { dailyQuests, weeklyQuests, randomQuests, generateRandomQuest } = useQuests();

  return (
    <Card className="bg-black bg-opacity-70 border border-purple-900">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <Target className="mr-2 h-5 w-5 text-purple-500" />
          Quest Log
        </CardTitle>
        {!compact && (
          <Button 
            onClick={generateRandomQuest} 
            size="sm" 
            className="bg-purple-700 hover:bg-purple-600 text-white"
          >
            <Zap className="mr-2 h-4 w-4" />
            Random Quest
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900">
            <TabsTrigger value="daily" className="data-[state=active]:bg-purple-900">
              <Calendar className="mr-2 h-4 w-4" />
              Daily
            </TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-purple-900">
              <Calendar className="mr-2 h-4 w-4" />
              Weekly
            </TabsTrigger>
            <TabsTrigger value="random" className="data-[state=active]:bg-purple-900">
              <Zap className="mr-2 h-4 w-4" />
              Random
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className={compact ? "max-h-60 overflow-y-auto" : ""}>
            <div className="space-y-2">
              {dailyQuests.length > 0 ? (
                dailyQuests.map((quest) => (
                  <QuestItem key={quest.id} quest={quest} />
                ))
              ) : (
                <p className="text-gray-400 text-center py-6">No daily quests available</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="weekly" className={compact ? "max-h-60 overflow-y-auto" : ""}>
            <div className="space-y-2">
              {weeklyQuests.length > 0 ? (
                weeklyQuests.map((quest) => (
                  <QuestItem key={quest.id} quest={quest} />
                ))
              ) : (
                <p className="text-gray-400 text-center py-6">No weekly quests available</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="random" className={compact ? "max-h-60 overflow-y-auto" : ""}>
            <div className="space-y-2">
              {randomQuests.length > 0 ? (
                randomQuests.map((quest) => (
                  <QuestItem key={quest.id} quest={quest} />
                ))
              ) : (
                <p className="text-gray-400 text-center py-6">
                  No random quests yet. Click "Random Quest" to generate one!
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}