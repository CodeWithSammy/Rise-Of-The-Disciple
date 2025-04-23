"use client";

import { usePlayer } from '@/contexts/player-context';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SkillTreeVisual } from './skill-tree-visual';
import { Code, Book, Dumbbell, Swords, ChevronRight as ChessKnight } from 'lucide-react';

export function SkillTreesSection() {
  const { playerStats } = usePlayer();

  return (
    <Card className="bg-black bg-opacity-70 border border-purple-900">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white">Skill Trees</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="coding" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-900">
            <TabsTrigger value="coding" className="data-[state=active]:bg-purple-900">
              <Code className="mr-2 h-4 w-4" />
              Coding
            </TabsTrigger>
            <TabsTrigger value="bible" className="data-[state=active]:bg-purple-900">
              <Book className="mr-2 h-4 w-4" />
              Bible
            </TabsTrigger>
            <TabsTrigger value="calisthenics" className="data-[state=active]:bg-purple-900">
              <Dumbbell className="mr-2 h-4 w-4" />
              Fitness
            </TabsTrigger>
            <TabsTrigger value="mma" className="data-[state=active]:bg-purple-900">
              <Swords className="mr-2 h-4 w-4" />
              MMA
            </TabsTrigger>
            <TabsTrigger value="chess" className="data-[state=active]:bg-purple-900">
              <ChessKnight className="mr-2 h-4 w-4" />
              Chess
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="coding">
            <SkillTreeVisual 
              skillId="coding"
              level={playerStats.skills.find(s => s.id === 'coding')?.level || 1}
              nodes={[
                { id: 1, title: "Variables & Types", level: 1, x: 50, y: 20 },
                { id: 2, title: "Functions", level: 1, x: 150, y: 20 },
                { id: 3, title: "Control Flow", level: 1, x: 250, y: 20 },
                { id: 4, title: "Data Structures", level: 2, x: 100, y: 100 },
                { id: 5, title: "Algorithms", level: 2, x: 200, y: 100 },
                { id: 6, title: "OOP Concepts", level: 3, x: 150, y: 180 },
                { id: 7, title: "Design Patterns", level: 4, x: 100, y: 260 },
                { id: 8, title: "Clean Code", level: 4, x: 200, y: 260 },
                { id: 9, title: "Full Stack Dev", level: 5, x: 150, y: 340 }
              ]}
              edges={[
                { source: 1, target: 4 },
                { source: 2, target: 4 },
                { source: 2, target: 5 },
                { source: 3, target: 5 },
                { source: 4, target: 6 },
                { source: 5, target: 6 },
                { source: 6, target: 7 },
                { source: 6, target: 8 },
                { source: 7, target: 9 },
                { source: 8, target: 9 }
              ]}
            />
          </TabsContent>
          
          <TabsContent value="bible">
            <SkillTreeVisual 
              skillId="bible"
              level={playerStats.skills.find(s => s.id === 'bible')?.level || 1}
              nodes={[
                { id: 1, title: "Daily Reading", level: 1, x: 50, y: 20 },
                { id: 2, title: "Memorization", level: 1, x: 150, y: 20 },
                { id: 3, title: "Prayer", level: 1, x: 250, y: 20 },
                { id: 4, title: "Book Studies", level: 2, x: 100, y: 100 },
                { id: 5, title: "Topical Studies", level: 2, x: 200, y: 100 },
                { id: 6, title: "Meditation", level: 3, x: 150, y: 180 },
                { id: 7, title: "Teaching", level: 4, x: 100, y: 260 },
                { id: 8, title: "Application", level: 4, x: 200, y: 260 },
                { id: 9, title: "Discipleship", level: 5, x: 150, y: 340 }
              ]}
              edges={[
                { source: 1, target: 4 },
                { source: 2, target: 4 },
                { source: 2, target: 5 },
                { source: 3, target: 5 },
                { source: 4, target: 6 },
                { source: 5, target: 6 },
                { source: 6, target: 7 },
                { source: 6, target: 8 },
                { source: 7, target: 9 },
                { source: 8, target: 9 }
              ]}
            />
          </TabsContent>
          
          <TabsContent value="calisthenics">
            <SkillTreeVisual 
              skillId="calisthenics"
              level={playerStats.skills.find(s => s.id === 'calisthenics')?.level || 1}
              nodes={[
                { id: 1, title: "Push-ups", level: 1, x: 50, y: 20 },
                { id: 2, title: "Pull-ups", level: 1, x: 150, y: 20 },
                { id: 3, title: "Squats", level: 1, x: 250, y: 20 },
                { id: 4, title: "Dips", level: 2, x: 100, y: 100 },
                { id: 5, title: "Leg Raises", level: 2, x: 200, y: 100 },
                { id: 6, title: "Muscle-ups", level: 3, x: 150, y: 180 },
                { id: 7, title: "Handstands", level: 4, x: 100, y: 260 },
                { id: 8, title: "Front Lever", level: 4, x: 200, y: 260 },
                { id: 9, title: "Planche", level: 5, x: 150, y: 340 }
              ]}
              edges={[
                { source: 1, target: 4 },
                { source: 2, target: 4 },
                { source: 2, target: 5 },
                { source: 3, target: 5 },
                { source: 4, target: 6 },
                { source: 5, target: 6 },
                { source: 6, target: 7 },
                { source: 6, target: 8 },
                { source: 7, target: 9 },
                { source: 8, target: 9 }
              ]}
            />
          </TabsContent>
          
          <TabsContent value="mma">
            <SkillTreeVisual 
              skillId="mma"
              level={playerStats.skills.find(s => s.id === 'mma')?.level || 1}
              nodes={[
                { id: 1, title: "Stance", level: 1, x: 50, y: 20 },
                { id: 2, title: "Jab", level: 1, x: 150, y: 20 },
                { id: 3, title: "Cross", level: 1, x: 250, y: 20 },
                { id: 4, title: "Hooks", level: 2, x: 100, y: 100 },
                { id: 5, title: "Footwork", level: 2, x: 200, y: 100 },
                { id: 6, title: "Combinations", level: 3, x: 150, y: 180 },
                { id: 7, title: "Takedowns", level: 4, x: 100, y: 260 },
                { id: 8, title: "Submissions", level: 4, x: 200, y: 260 },
                { id: 9, title: "Ground Game", level: 5, x: 150, y: 340 }
              ]}
              edges={[
                { source: 1, target: 4 },
                { source: 2, target: 4 },
                { source: 2, target: 5 },
                { source: 3, target: 5 },
                { source: 4, target: 6 },
                { source: 5, target: 6 },
                { source: 6, target: 7 },
                { source: 6, target: 8 },
                { source: 7, target: 9 },
                { source: 8, target: 9 }
              ]}
            />
          </TabsContent>
          
          <TabsContent value="chess">
            <SkillTreeVisual 
              skillId="chess"
              level={playerStats.skills.find(s => s.id === 'chess')?.level || 1}
              nodes={[
                { id: 1, title: "Basic Rules", level: 1, x: 50, y: 20 },
                { id: 2, title: "Piece Values", level: 1, x: 150, y: 20 },
                { id: 3, title: "Check & Mate", level: 1, x: 250, y: 20 },
                { id: 4, title: "Opening Theory", level: 2, x: 100, y: 100 },
                { id: 5, title: "Tactics", level: 2, x: 200, y: 100 },
                { id: 6, title: "Middle Game", level: 3, x: 150, y: 180 },
                { id: 7, title: "End Game", level: 4, x: 100, y: 260 },
                { id: 8, title: "Strategy", level: 4, x: 200, y: 260 },
                { id: 9, title: "Master Level", level: 5, x: 150, y: 340 }
              ]}
              edges={[
                { source: 1, target: 4 },
                { source: 2, target: 4 },
                { source: 2, target: 5 },
                { source: 3, target: 5 },
                { source: 4, target: 6 },
                { source: 5, target: 6 },
                { source: 6, target: 7 },
                { source: 6, target: 8 },
                { source: 7, target: 9 },
                { source: 8, target: 9 }
              ]}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}