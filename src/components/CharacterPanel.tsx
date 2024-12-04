import React from 'react';
import { Shield, Star, Trophy } from 'lucide-react';
import { useStore } from '../store/useStore';

export function CharacterPanel() {
  const character = useStore((state) => state.character);

  return (
    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg p-6 text-white shadow-xl">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-white/10 rounded-full">
          <Shield className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{character.title}</h2>
          <p className="text-purple-200">Level {character.level}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4" />
            <span className="text-sm">Experience</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-yellow-400 h-2 rounded-full transition-all"
              style={{ width: `${(character.xp % 1000) / 10}%` }}
            />
          </div>
          <p className="text-right text-xs mt-1 text-purple-200">
            {character.xp % 1000}/1000 XP
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">Achievements</span>
          </div>
          <p className="text-2xl font-bold">
            {character.unlockedAchievements.length}
          </p>
        </div>
      </div>
    </div>
  );
}