import React from 'react';
import { CharacterPanel } from './components/CharacterPanel';
import { QuestLog } from './components/QuestLog';
import { JournalEntry } from './components/JournalEntry';
import { JournalLog } from './components/JournalLog';
import { QuestManager } from './components/QuestManager';
import { WorldCreation } from './components/WorldCreation';
import { AdventureProgress } from './components/AdventureProgress';
import { useStore } from './store/useStore';
import { Scroll, Swords } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <CharacterPanel />
            
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-600/20 rounded-full">
                  <Swords className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-xl font-bold">Quest Log</h2>
              </div>
              <QuestManager />
              <QuestLog />
            </div>

            <AdventureProgress />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <WorldCreation />

            <div className="bg-gray-800 rounded-lg p-6">
              <JournalEntry />
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-600/20 rounded-full">
                  <Scroll className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-xl font-bold">Journal Entries</h2>
              </div>
              <JournalLog />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;