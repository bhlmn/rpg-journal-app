export interface Quest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  type: 'daily' | 'achievement';
  xpReward: number;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  mood: 'happy' | 'neutral' | 'sad';
  associatedQuests: string[];
}

export interface Character {
  level: number;
  xp: number;
  title: string;
  unlockedAchievements: string[];
  lastAdventureDate: string | null;
}

export interface WorldSettings {
  name: string;
  climate: 'tropical' | 'temperate' | 'arctic' | 'desert';
  magic: 'high' | 'low' | 'none';
  technology: 'medieval' | 'renaissance' | 'steampunk';
  dangers: string[];
  description: string;
}

export interface AdventureProgress {
  currentStep: number;
  worldCreated: boolean;
  characterCreated: boolean;
  firstInteractionComplete: boolean;
  steps: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    available: boolean;
  }[];
}