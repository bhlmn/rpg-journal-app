import React, { useState } from 'react';
import { Compass, Wand2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { WorldSettings } from '../types';

export function WorldCreation() {
  const { createWorld, worldSettings, adventureProgress } = useStore();
  const [formData, setFormData] = useState<WorldSettings>({
    name: '',
    climate: 'temperate',
    magic: 'high',
    technology: 'medieval',
    dangers: [],
    description: '',
  });
  const [danger, setDanger] = useState('');

  if (worldSettings || !adventureProgress.steps[0].available) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) return;
    createWorld(formData);
  };

  const addDanger = () => {
    if (danger.trim() && formData.dangers.length < 3) {
      setFormData({
        ...formData,
        dangers: [...formData.dangers, danger.trim()],
      });
      setDanger('');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-600/20 rounded-full">
          <Compass className="w-6 h-6 text-purple-400" />
        </div>
        <h2 className="text-xl font-bold">Create Your World</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="World Name"
          className="w-full bg-white/5 border border-purple-600/20 rounded-lg p-3 text-white"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={formData.climate}
            onChange={(e) => setFormData({ ...formData, climate: e.target.value as WorldSettings['climate'] })}
            className="bg-white/5 border border-purple-600/20 rounded-lg p-3 text-white"
          >
            <option value="tropical">Tropical</option>
            <option value="temperate">Temperate</option>
            <option value="arctic">Arctic</option>
            <option value="desert">Desert</option>
          </select>

          <select
            value={formData.magic}
            onChange={(e) => setFormData({ ...formData, magic: e.target.value as WorldSettings['magic'] })}
            className="bg-white/5 border border-purple-600/20 rounded-lg p-3 text-white"
          >
            <option value="high">High Magic</option>
            <option value="low">Low Magic</option>
            <option value="none">No Magic</option>
          </select>

          <select
            value={formData.technology}
            onChange={(e) => setFormData({ ...formData, technology: e.target.value as WorldSettings['technology'] })}
            className="bg-white/5 border border-purple-600/20 rounded-lg p-3 text-white"
          >
            <option value="medieval">Medieval</option>
            <option value="renaissance">Renaissance</option>
            <option value="steampunk">Steampunk</option>
          </select>
        </div>

        <div>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={danger}
              onChange={(e) => setDanger(e.target.value)}
              placeholder="Add a danger (max 3)"
              className="flex-1 bg-white/5 border border-purple-600/20 rounded-lg p-3 text-white"
            />
            <button
              type="button"
              onClick={addDanger}
              disabled={formData.dangers.length >= 3}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-4 rounded-lg"
            >
              Add
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {formData.dangers.map((d, i) => (
              <span
                key={i}
                className="bg-purple-600/20 text-purple-200 px-3 py-1 rounded-full text-sm"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your world..."
          rows={4}
          className="w-full bg-white/5 border border-purple-600/20 rounded-lg p-3 text-white"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Create World
        </button>
      </form>
    </div>
  );
}