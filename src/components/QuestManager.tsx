import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Quest } from '../types';

const initialFormData = {
  title: '',
  description: '',
  type: 'daily' as const,
  xpReward: 100,
};

export function QuestManager() {
  const { quests, addQuest, editQuest, deleteQuest } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;
    
    if (editingId) {
      editQuest(editingId, formData);
      setEditingId(null);
    } else {
      addQuest(formData);
      setIsAdding(false);
    }
    setFormData(initialFormData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleXPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const xp = parseInt(value);
    if (value === '') {
      setFormData((prev) => ({ ...prev, xpReward: 0 }));
    } else if (!isNaN(xp) && xp >= 0) {
      setFormData((prev) => ({ ...prev, xpReward: xp }));
    }
  };

  const startEditing = (quest: Quest) => {
    setEditingId(quest.id);
    setFormData({
      title: quest.title,
      description: quest.description,
      type: quest.type,
      xpReward: quest.xpReward,
    });
    setIsAdding(false);
  };

  const cancelForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData(initialFormData);
  };

  const QuestForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Quest Title"
        className="w-full bg-white/5 border border-purple-600/20 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Description"
        className="w-full bg-white/5 border border-purple-600/20 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <div className="flex gap-4">
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="bg-white/5 border border-purple-600/20 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="daily">Daily Quest</option>
          <option value="achievement">Achievement</option>
        </select>
        <input
          type="number"
          name="xpReward"
          min="0"
          value={formData.xpReward}
          onChange={handleXPChange}
          placeholder="XP Reward"
          className="w-24 bg-white/5 border border-purple-600/20 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!formData.title.trim() || !formData.description.trim()}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={cancelForm}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </form>
  );

  const QuestList = () => (
    <div className="space-y-2">
      {quests.map((quest) => (
        <div
          key={quest.id}
          className="flex items-center justify-between gap-2 p-2 bg-white/5 rounded-lg"
        >
          <div className="flex-1">
            <h3 className="font-medium">{quest.title}</h3>
            <p className="text-sm text-purple-300">{quest.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => startEditing(quest)}
              className="p-1 text-purple-300 hover:text-purple-100"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => deleteQuest(quest.id)}
              className="p-1 text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mb-6">
      {!isAdding && !editingId && (
        <>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg mb-4"
          >
            <Plus className="w-4 h-4" />
            Add New Quest
          </button>
          <QuestList />
        </>
      )}
      {(isAdding || editingId) && <QuestForm />}
    </div>
  );
}