import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Sparkles, Award, Shield } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { currentView, navigateTo, openDailySpark, openParentGate } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#4C5CD0]/10 px-2 py-2 pb-safe shadow-lg">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
        {/* Aventuras */}
        <button
          type="button"
          onClick={() => navigateTo('adventure')}
          className={`min-h-[52px] flex flex-col items-center justify-center gap-1 rounded-2xl transition-all cursor-pointer ${
            currentView === 'adventure' || currentView === 'quest'
              ? 'text-[#4C5CD0] bg-indigo-50/60'
              : 'text-gray-500 hover:text-[#1F2340]'
          }`}
          aria-label="Ir a Aventuras"
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
              currentView === 'adventure' || currentView === 'quest'
                ? 'bg-[#4C5CD0] text-white shadow-sm'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-heading font-bold">Aventuras</span>
        </button>

        {/* Reto Diario */}
        <button
          type="button"
          onClick={openDailySpark}
          className="min-h-[52px] flex flex-col items-center justify-center gap-1 rounded-2xl text-[#FF9F1C] hover:bg-amber-50/60 transition-all cursor-pointer active:scale-95"
          aria-label="Abrir Reto Diario"
        >
          <div className="relative w-8 h-8 rounded-xl bg-[#FF9F1C] text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#FFC857] rounded-full border border-white" />
          </div>
          <span className="text-[11px] font-heading font-bold">Reto Diario</span>
        </button>

        {/* Trofeos */}
        <button
          type="button"
          onClick={() => navigateTo('trophy')}
          className={`min-h-[52px] flex flex-col items-center justify-center gap-1 rounded-2xl transition-all cursor-pointer ${
            currentView === 'trophy'
              ? 'text-[#845EC2] bg-purple-50/60'
              : 'text-gray-500 hover:text-[#1F2340]'
          }`}
          aria-label="Ir a Trofeos"
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
              currentView === 'trophy'
                ? 'bg-[#845EC2] text-white shadow-sm'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            <Award className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-heading font-bold">Trofeos</span>
        </button>

        {/* Zona de Padres */}
        <button
          type="button"
          onClick={() => {
            if (currentView === 'parent-portal') {
              navigateTo('adventure');
            } else {
              openParentGate();
            }
          }}
          className={`min-h-[52px] flex flex-col items-center justify-center gap-1 rounded-2xl transition-all cursor-pointer ${
            currentView === 'parent-portal'
              ? 'text-[#2EC4B6] bg-teal-50/60'
              : 'text-gray-500 hover:text-[#1F2340]'
          }`}
          aria-label="Ir a Zona de Padres"
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
              currentView === 'parent-portal'
                ? 'bg-[#2EC4B6] text-white shadow-sm'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            <Shield className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-heading font-bold">Padres</span>
        </button>
      </div>
    </nav>
  );
};
