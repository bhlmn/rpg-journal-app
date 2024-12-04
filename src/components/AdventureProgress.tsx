import React from 'react';
import { MapPin, Lock, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export function AdventureProgress() {
  const { adventureProgress, progressAdventure, character } = useStore();
  const canProgress = character.lastAdventureDate !== new Date().toDateString();

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-600/20 rounded-full">
          <MapPin className="w-6 h-6 text-purple-400" />
        </div>
        <h2 className="text-xl font-bold">Adventure Progress</h2>
      </div>

      <div className="space-y-4">
        {adventureProgress.steps.map((step) => (
          <div
            key={step.id}
            className={`relative flex items-center gap-4 p-4 rounded-lg ${
              step.completed
                ? 'bg-purple-600/20'
                : step.available
                ? 'bg-white/5'
                : 'bg-gray-700/20'
            }`}
          >
            {step.completed ? (
              <CheckCircle className="w-6 h-6 text-purple-400" />
            ) : step.available ? (
              <div className="w-6 h-6 rounded-full border-2 border-purple-400" />
            ) : (
              <Lock className="w-6 h-6 text-gray-500" />
            )}
            <div>
              <h3 className="font-medium">{step.title}</h3>
              <p className="text-sm text-purple-300">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {canProgress && adventureProgress.steps.some((s) => s.available && !s.completed) && (
        <button
          onClick={() => progressAdventure()}
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Progress Adventure
        </button>
      )}
    </div>
  );
}