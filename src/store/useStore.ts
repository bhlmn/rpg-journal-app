import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Quest, JournalEntry, Character, WorldSettings, AdventureProgress } from '../types';

interface State {
  character: Character;
  quests: Quest[];
  journalEntries: JournalEntry[];
  worldSettings: WorldSettings | null;
  adventureProgress: AdventureProgress;
  addQuest: (quest: Omit<Quest, 'id' | 'completed'>) => void;
  editQuest: (id: string, quest: Partial<Quest>) => void;
  deleteQuest: (id: string) => void;
  completeQuest: (questId: string) => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => void;
  createWorld: (settings: WorldSettings) => void;
  progressAdventure: () => void;
  resetDailyQuests: () => void;
}

const ADVENTURE_STEPS = [
  {
    id: 1,
    title: 'Create Your World',
    description: 'Define the parameters of your fantasy world',
    completed: false,
    available: true,
  },
  {
    id: 2,
    title: 'First Steps',
    description: 'Take your first steps into your new world',
    completed: false,
    available: false,
  },
  {
    id: 3,
    title: 'Character Creation',
    description: 'Create your adventure character',
    completed: false,
    available: false,
  },
  {
    id: 4,
    title: 'The Journey Begins',
    description: 'Start your first quest in the world',
    completed: false,
    available: false,
  },
];

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      character: {
        level: 1,
        xp: 0,
        title: 'Novice Explorer',
        unlockedAchievements: [],
        lastAdventureDate: null,
      },
      quests: [],
      journalEntries: [],
      worldSettings: null,
      adventureProgress: {
        currentStep: 1,
        worldCreated: false,
        characterCreated: false,
        firstInteractionComplete: false,
        steps: ADVENTURE_STEPS,
      },
      addQuest: (quest) =>
        set((state) => ({
          quests: [
            ...state.quests,
            { ...quest, id: crypto.randomUUID(), completed: false },
          ],
        })),
      editQuest: (id, questUpdate) =>
        set((state) => ({
          quests: state.quests.map((q) =>
            q.id === id ? { ...q, ...questUpdate } : q
          ),
        })),
      deleteQuest: (id) =>
        set((state) => ({
          quests: state.quests.filter((q) => q.id !== id),
        })),
      completeQuest: (questId) =>
        set((state) => {
          const quest = state.quests.find((q) => q.id === questId);
          if (!quest) return state;

          const newXp = state.character.xp + quest.xpReward;
          const newLevel = Math.floor(newXp / 1000) + 1;

          return {
            quests: state.quests.map((q) =>
              q.id === questId ? { ...q, completed: true } : q
            ),
            character: {
              ...state.character,
              xp: newXp,
              level: newLevel,
            },
          };
        }),
      addJournalEntry: (entry) =>
        set((state) => ({
          journalEntries: [
            {
              ...entry,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
            },
            ...state.journalEntries,
          ],
        })),
      createWorld: (settings) =>
        set((state) => ({
          worldSettings: settings,
          adventureProgress: {
            ...state.adventureProgress,
            worldCreated: true,
            steps: state.adventureProgress.steps.map((step) =>
              step.id === 1
                ? { ...step, completed: true }
                : step.id === 2
                ? { ...step, available: true }
                : step
            ),
          },
        })),
      progressAdventure: () =>
        set((state) => {
          const today = new Date().toDateString();
          if (state.character.lastAdventureDate === today) {
            return state;
          }

          const currentStep = state.adventureProgress.currentStep;
          const nextStep = currentStep + 1;

          return {
            character: {
              ...state.character,
              lastAdventureDate: today,
            },
            adventureProgress: {
              ...state.adventureProgress,
              currentStep: nextStep,
              steps: state.adventureProgress.steps.map((step) =>
                step.id === currentStep
                  ? { ...step, completed: true }
                  : step.id === nextStep
                  ? { ...step, available: true }
                  : step
              ),
            },
          };
        }),
      resetDailyQuests: () =>
        set((state) => ({
          quests: state.quests.map((q) =>
            q.type === 'daily' ? { ...q, completed: false } : q
          ),
        })),
    }),
    {
      name: 'rpg-journal-storage',
    }
  )
);