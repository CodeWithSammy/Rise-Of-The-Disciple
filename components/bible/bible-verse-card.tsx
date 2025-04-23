"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, BookPlus } from 'lucide-react';
import { usePlayer } from '@/contexts/player-context';

interface BibleVerseCardProps {
  reference: string;
  text: string;
}

export function BibleVerseCard({ reference, text }: BibleVerseCardProps) {
  const { addXP } = usePlayer();
  const [reflected, setReflected] = useState(false);
  
  const handleReflect = () => {
    // Award XP for reflecting on the verse
    addXP(25, 'bible');
    setReflected(true);
  };
  
  return (
    <Card className="bg-black bg-opacity-70 border border-purple-900">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-purple-500" />
          Bible Verse: For Today
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 text-center">
          <p className="text-xl font-serif text-white italic mb-2">
            {text}
          </p>
          <p className="text-amber-400 text-right">
            {reference}
          </p>
        </div>
        
        <div className="mt-4">
          {reflected ? (
            <div className="bg-green-900 bg-opacity-20 border border-green-800 rounded-md p-3 text-center">
              <p className="text-green-400 text-sm">
                You've reflected on this verse today (+25 XP)
              </p>
            </div>
          ) : (
            <Button 
              onClick={handleReflect} 
              className="w-full bg-purple-700 hover:bg-purple-600"
            >
              <BookPlus className="mr-2 h-4 w-4" />
              Reflect on this verse (+25 XP)
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}