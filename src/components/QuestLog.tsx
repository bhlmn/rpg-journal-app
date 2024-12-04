import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Quest } from '../types';

export function QuestLog() {
  const { quests, completeQuest } = useStore();

  const dailyQuests = quests.filter((q) => q.type === 'daily');
  const achievements = quests.filter((q) => q.type === 'achievement');

  const QuestItem = ({ quest }: { quest: Quest }) => (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
      <button
        onClick={() => !quest.completed && completeQuest(quest.id)}
        className="text-purple-300 hover:text-purple-100 transition-colors"
      >
        {quest.completed ? (
          <CheckCircle className="w-6 h-6" />
        ) : (
          <Circle className="w-6 h-6" />
        )}
      </button>
      <div className="flex-1">
        <h3 className="font-medium">{quest.title}</h3>
        <p className="text-sm text-purple-300">{quest.description}</p>
      </div>
      <div className="text-yellow-400 text-sm font-medium">
        +{quest.xpReward} XP
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-3">Daily Quests</h2>
        <div className="space-y-2">
          {dailyQuests.map((quest) => (
            <QuestItem key={quest.id} quest={quest} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Achievements</h2>
        <div className="space-y-2">
          {achievements.map((quest) => (
            <QuestItem key={quest.id} quest={quest} />
          ))}
        </div>
      </div>
    </div>
  );
}