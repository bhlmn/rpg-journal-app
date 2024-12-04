import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';
import type { JournalEntry } from '../types';

interface Props {
  entry: JournalEntry;
  onClick: () => void;
  isExpanded: boolean;
}

export function JournalEntryCard({ entry, onClick, isExpanded }: Props) {
  const MoodIcon = ({ mood }: { mood: string }) => {
    switch (mood) {
      case 'happy':
        return <Smile className="w-5 h-5 text-green-400" />;
      case 'sad':
        return <Frown className="w-5 h-5 text-red-400" />;
      default:
        return <Meh className="w-5 h-5 text-yellow-400" />;
    }
  };

  const previewContent = !isExpanded && entry.content.length > 150
    ? `${entry.content.slice(0, 150)}...`
    : entry.content;

  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div 
          className="w-2/3 max-h-[80vh] bg-gray-800 rounded-lg p-6 overflow-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-xl">{entry.title}</h3>
            <MoodIcon mood={entry.mood} />
          </div>
          <p className="text-purple-300 mb-4 whitespace-pre-wrap">{entry.content}</p>
          <p className="text-sm text-purple-400">
            {new Date(entry.timestamp).toLocaleDateString()}
          </p>
          <button
            onClick={onClick}
            className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-lg">{entry.title}</h3>
        <MoodIcon mood={entry.mood} />
      </div>
      <p className="text-purple-300 mb-2 whitespace-pre-wrap">{previewContent}</p>
      <p className="text-sm text-purple-400">
        {new Date(entry.timestamp).toLocaleDateString()}
      </p>
      {entry.content.length > 150 && (
        <button className="text-purple-400 hover:text-purple-300 text-sm mt-2">
          Read more...
        </button>
      )}
    </div>
  );
}