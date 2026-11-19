import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getAgeTierLabel } from '../../data/mockQuests';
import { QuestHeader } from '../common/QuestHeader';
import { CardMatchGame } from './memory/CardMatchGame';
import { MelodyEchoGame } from './memory/MelodyEchoGame';

interface MemoryQuestProps {
  onComplete: (score: number, maxScore: number, starsEarned: number) => void;
  onExit: () => void;
}

export const MemoryQuest: React.FC<MemoryQuestProps> = ({ onComplete, onExit }) => {
  const { settings, currentProfile, subjectStats } = useApp();
  const [activeTab, setActiveTab] = useState<'cards' | 'sequence'>('cards');

  return (
    <div className="w-full max-w-2xl mx-auto py-2">
      {/* Reusable Header with age-adapted subtitle */}
      <QuestHeader
        subject="memory"
        title="Reino de Memoria"
        subtitle={`Entrenamiento Cognitivo • Nivel ${subjectStats.memory.level} (${getAgeTierLabel(currentProfile.age)})`}
        onQuit={onExit}
      />

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-[#845EC2]/20 mb-6 shadow-sm">
        <button
          type="button"
          onClick={() => setActiveTab('cards')}
          className={`flex-1 py-2.5 rounded-xl font-heading font-bold text-xs transition-all cursor-pointer ${
            activeTab === 'cards'
              ? 'bg-[#845EC2] text-white shadow-md'
              : 'text-gray-500 hover:text-[#1F2340]'
          }`}
        >
          🃏 Parejas de Cartas
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('sequence')}
          className={`flex-1 py-2.5 rounded-xl font-heading font-bold text-xs transition-all cursor-pointer ${
            activeTab === 'sequence'
              ? 'bg-[#845EC2] text-white shadow-md'
              : 'text-gray-500 hover:text-[#1F2340]'
          }`}
        >
          🎵 Eco Melódico y Luces
        </button>
      </div>

      {/* Focused Games adapted to child's age */}
      {activeTab === 'cards' && (
        <CardMatchGame
          soundEnabled={settings.soundEffectsEnabled}
          childAge={currentProfile.age}
          onGameComplete={onComplete}
        />
      )}

      {activeTab === 'sequence' && (
        <MelodyEchoGame
          soundEnabled={settings.soundEffectsEnabled}
          childAge={currentProfile.age}
          onGameComplete={onComplete}
        />
      )}
    </div>
  );
};
