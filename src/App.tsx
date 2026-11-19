import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { HeaderHUD } from './components/HeaderHUD';
import { Navigation } from './components/Navigation';
import { AdventureHub } from './components/AdventureHub';
import { QuestArena } from './components/quests/QuestArena';
import { ParentPortal } from './components/ParentPortal';
import { TrophyRoom } from './components/TrophyRoom';
import { ParentGateModal } from './components/ParentGateModal';
import { DailySparkModal } from './components/DailySparkModal';
import { OfflineNotice } from './components/common/OfflineNotice';
import { EditProfileModal } from './components/profile/EditProfileModal';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#1F2340] flex flex-col font-sans selection:bg-[#4C5CD0]/20 selection:text-[#4C5CD0]">
      {/* Offline Status Reassurance Banner */}
      <OfflineNotice />

      {/* Top HUD */}
      <HeaderHUD />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'adventure' && <AdventureHub />}
        {currentView === 'quest' && <QuestArena />}
        {currentView === 'parent-portal' && <ParentPortal />}
        {currentView === 'trophy' && <TrophyRoom />}
      </main>

      {/* Bottom Navigation */}
      <Navigation />

      {/* Global Modals */}
      <ParentGateModal />
      <DailySparkModal />
      <EditProfileModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
