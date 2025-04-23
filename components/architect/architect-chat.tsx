"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Send, Brain } from 'lucide-react';
import { mockArchitectMessages } from '@/lib/mock-data';

interface Message {
  id: string;
  sender: 'user' | 'architect';
  content: string;
  timestamp: Date;
}

export function ArchitectChat() {
  const [messages, setMessages] = useState<Message[]>(mockArchitectMessages);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `m${messages.length + 1}`,
      sender: 'user',
      content: newMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    
    // Simulate Architect response
    setTimeout(() => {
      const architectResponse: Message = {
        id: `m${messages.length + 2}`,
        sender: 'architect',
        content: getArchitectResponse(newMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, architectResponse]);
    }, 1000);
  };
  
  const getArchitectResponse = (msg: string): string => {
    // Simple response logic - in a real app this would connect to GPT API
    if (msg.toLowerCase().includes('quest')) {
      return "I've created a new custom quest for you: 'Master the Frontend'. Complete it to earn 100 XP for your Coding skill.";
    } else if (msg.toLowerCase().includes('bible') || msg.toLowerCase().includes('verse')) {
      return "The Bible teaches us that with faith as small as a mustard seed, we can move mountains. Would you like me to help you with a Bible study plan?";
    } else if (msg.toLowerCase().includes('workout') || msg.toLowerCase().includes('exercise')) {
      return "For your fitness goals, I recommend focusing on a progressive calisthenics routine. Start with 3 sets of 10 push-ups, 5 pull-ups, and 15 squats.";
    } else {
      return "I'm here to guide your growth journey. Ask me about creating custom quests, getting advice for your skills, or generating challenges to test your abilities.";
    }
  };
  
  return (
    <Card className="bg-black bg-opacity-70 border border-purple-900 h-[calc(100vh-300px)] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <Brain className="mr-2 h-5 w-5 text-purple-500" />
          The Architect
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-purple-700 text-white'
                    : 'bg-gray-800 text-white'
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask The Architect for guidance..."
            className="flex-1 bg-gray-800 border-gray-700 text-white"
          />
          <Button type="submit" className="bg-purple-700 hover:bg-purple-600">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}