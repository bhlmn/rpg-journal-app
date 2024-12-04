import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { JournalEntryCard } from './JournalEntryCard';

export function JournalLog() {
  const entries = useStore((state) => state.journalEntries);
  const [expandedEntryId, setExpandedEntryId] = useState<string | null>(null);

  const handleEntryClick = (entryId: string) => {
    setExpandedEntryId(expandedEntryId === entryId ? null : entryId);
  };

  // Add click handler to close expanded entry when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        expandedEntryId &&
        !target.closest('.bg-white\\/5')
      ) {
        setExpandedEntryId(null);
      }
    };

    if (expandedEntryId) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [expandedEntryId]);

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <JournalEntryCard
          key={entry.id}
          entry={entry}
          onClick={() => handleEntryClick(entry.id)}
          isExpanded={expandedEntryId === entry.id}
        />
      ))}
      {entries.length === 0 && (
        <p className="text-center text-purple-300">No journal entries yet.</p>
      )}
    </div>
  );
}