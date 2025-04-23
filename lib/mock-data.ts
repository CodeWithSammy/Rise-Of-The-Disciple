import { PlayerStats } from '@/contexts/player-context';
import { Quest } from '@/contexts/quest-context';

export const mockPlayerData: PlayerStats = {
  level: 1,
  currentXP: 0,
  requiredXP: 100,
  totalXP: 0,
  username: 'Disciple',
  profilePicture: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=200',
  streak: {
    current: 0,
    longest: 0,
    lastLoginDate: new Date().toISOString(),
  },
  joinedDate: new Date().toISOString(),
  skills: [
    {
      id: 'coding',
      name: 'Coding',
      level: 1,
      currentXP: 0,
      requiredXP: 100,
      progress: 0
    },
    {
      id: 'calisthenics',
      name: 'Calisthenics',
      level: 1,
      currentXP: 0,
      requiredXP: 100,
      progress: 0
    },
    {
      id: 'bible',
      name: 'Bible Reading',
      level: 1,
      currentXP: 0,
      requiredXP: 100,
      progress: 0
    },
    {
      id: 'mma',
      name: 'MMA',
      level: 1,
      currentXP: 0,
      requiredXP: 100,
      progress: 0
    },
    {
      id: 'chess',
      name: 'Chess',
      level: 1,
      currentXP: 0,
      requiredXP: 100,
      progress: 0
    }
  ],
  badges: [],
  abilities: ['Beginner\'s Luck']
};

export const mockQuestData: Quest[] = [
  {
    id: 'd1',
    title: 'Complete a coding challenge',
    description: 'Solve at least one algorithm problem on LeetCode or similar platform',
    type: 'daily',
    xpReward: 50,
    skillId: 'coding',
    completed: false
  },
  {
    id: 'd2',
    title: 'Read a Bible chapter',
    description: 'Read one chapter and reflect on its meaning',
    type: 'daily',
    xpReward: 30,
    skillId: 'bible',
    completed: false
  },
  {
    id: 'd3',
    title: 'Complete a workout',
    description: 'Do 3 sets of push-ups, pull-ups, and squats',
    type: 'daily',
    xpReward: 40,
    skillId: 'calisthenics',
    completed: false
  },
  {
    id: 'w1',
    title: 'Memorize five Bible verses',
    description: 'Select five verses and commit them to memory',
    type: 'weekly',
    xpReward: 100,
    skillId: 'bible',
    completed: false
  },
  {
    id: 'w2',
    title: 'Build a small project',
    description: 'Create a small application using your programming skills',
    type: 'weekly',
    xpReward: 150,
    skillId: 'coding',
    completed: false
  }
];

export const mockBibleVerses = [
  {
    reference: 'Psalm 25:1',
    text: 'The LORD is my shepherd; I shall not want.'
  },
  {
    reference: 'Philippians 4:13',
    text: 'I can do all things through Christ who strengthens me.'
  },
  {
    reference: 'Joshua 1:9',
    text: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.'
  },
  {
    reference: 'Proverbs 3:5-6',
    text: 'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.'
  }
];

export const mockArchitectMessages = [
  {
    id: 'm1',
    sender: 'architect',
    content: 'Welcome, Disciple! I am The Architect, your guide on this journey. What would you like to learn today?',
    timestamp: new Date()
  }
];