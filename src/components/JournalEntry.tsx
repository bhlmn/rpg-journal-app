import React, { useState } from 'react';
import { Book, Smile, Meh, Frown } from 'lucide-react';
import { useStore } from '../store/useStore';

export function JournalEntry() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<'happy' | 'neutral' | 'sad'>('neutral');
  const addJournalEntry = useStore((state) => state.addJournalEntry);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addJournalEntry({
      title,
      content,
      mood,
      associatedQuests: [],
    });

    setTitle('');
    setContent('');
    setMood('neutral');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-600/20 rounded-full">
          <Book className="w-6 h-6 text-purple-400" />
        </div>
        <h2 className="text-xl font-bold">New Journal Entry</h2>
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Entry Title"
        className="w-full bg-white/5 border border-purple-600/20 rounded-lg p-3 text-white placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts..."
        rows={4}
        className="w-full bg-white/5 border border-purple-600/20 rounded-lg p-3 text-white placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <div className="flex items-center gap-4">
        <span className="text-sm text-purple-300">Mood:</span>
        <div className="flex gap-2">
          {[
            { icon: Smile, value: 'happy' as const },
            { icon: Meh, value: 'neutral' as const },
            { icon: Frown, value: 'sad' as const },
          ].map(({ icon: Icon, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => setMood(value)}
              className={`p-2 rounded-full transition-colors ${
                mood === value
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 text-purple-300 hover:bg-white/10'
              }`}
            >
              <Icon className="w-6 h-6" />
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        Save Entry
      </button>
    </form>
  );
}