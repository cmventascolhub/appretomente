import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, ArrowLeft } from 'lucide-react';
import { ParentOverviewCards } from './parent/ParentOverviewCards';
import { PedagogicalObservationCard } from './parent/PedagogicalObservationCard';
import { DisciplineMasteryList } from './parent/DisciplineMasteryList';
import { QuestHistoryList } from './parent/QuestHistoryList';
import { ParentSettingsTab } from './parent/ParentSettingsTab';
import { MilestoneCertificate } from './parent/MilestoneCertificate';

export const ParentPortal: React.FC = () => {
  const {
    currentProfile,
    subjectStats,
    questHistory,
    settings,
    updateSettings,
    navigateTo,
    stars,
    streakDays,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'settings' | 'certificate'>('analytics');

  // Compute aggregate metrics
  const totalMinutes = Object.values(subjectStats).reduce((acc, s) => acc + s.minutesSpent, 0);
  const totalQuests = Object.values(subjectStats).reduce((acc, s) => acc + s.questsCompleted, 0);
  const overallAccuracy =
    totalQuests === 0
      ? 0
      : Math.round(
          Object.values(subjectStats).reduce(
            (acc, s) => acc + s.accuracy * s.questsCompleted,
            0
          ) / totalQuests
        );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 pb-28">
      {/* Top Bar with Clear Back Button matching user rule */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#4C5CD0]/10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo('adventure')}
            className="min-h-[48px] px-3.5 py-2.5 rounded-2xl bg-white border border-[#4C5CD0]/15 text-[#1F2340] hover:bg-gray-50 flex items-center gap-2 font-heading font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
            title="Volver a la pantalla de Aventuras"
          >
            <ArrowLeft className="w-4 h-4 text-[#4C5CD0]" />
            <span>Atrás</span>
          </button>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold font-heading text-[#4C5CD0]">
              <Shield className="w-3.5 h-3.5" />
              <span>Panel de Control y Pedagogía</span>
            </div>
            {/* Title explicitly matches button 'Zona de Padres' */}
            <h1 className="text-2xl font-heading font-extrabold text-[#1F2340]">
              Zona de Padres • {currentProfile.name}
            </h1>
          </div>
        </div>

        {/* Tab Switcher - min 48px touch friendly */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-[#4C5CD0]/15 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-[#4C5CD0] text-white shadow-sm'
                : 'text-gray-500 hover:text-[#1F2340]'
            }`}
          >
            Progreso e Informes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#4C5CD0] text-white shadow-sm'
                : 'text-gray-500 hover:text-[#1F2340]'
            }`}
          >
            Configuración
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('certificate')}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
              activeTab === 'certificate'
                ? 'bg-[#4C5CD0] text-white shadow-sm'
                : 'text-gray-500 hover:text-[#1F2340]'
            }`}
          >
            Diploma
          </button>
        </div>
      </div>

      {/* Tab Views */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-fadeIn">
          <ParentOverviewCards
            totalMinutes={totalMinutes}
            totalQuests={totalQuests}
            overallAccuracy={overallAccuracy}
            streakDays={streakDays}
          />
          <PedagogicalObservationCard
            currentProfile={currentProfile}
            subjectStats={subjectStats}
          />
          <DisciplineMasteryList subjectStats={subjectStats} />
          <QuestHistoryList questHistory={questHistory} />
        </div>
      )}

      {activeTab === 'settings' && (
        <ParentSettingsTab settings={settings} updateSettings={updateSettings} />
      )}

      {activeTab === 'certificate' && (
        <MilestoneCertificate
          currentProfile={currentProfile}
          stars={stars}
          soundEnabled={settings.soundEffectsEnabled}
        />
      )}
    </div>
  );
};
