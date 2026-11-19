import React from 'react';
import { QuestResult } from '../../types';
import { SUBJECT_CONFIGS } from '../../constants/theme';
import { BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface QuestHistoryListProps {
  questHistory: QuestResult[];
}

export const QuestHistoryList: React.FC<QuestHistoryListProps> = ({ questHistory }) => {
  const { navigateTo } = useApp();

  return (
    <div className="bg-white rounded-3xl p-6 card-elevation-1 border border-[#4C5CD0]/10">
      <h2 className="text-lg font-heading font-extrabold text-[#1F2340] mb-4">
        Historial de Misiones Recientes
      </h2>

      {questHistory.length === 0 ? (
        <div className="text-center py-8 px-4 rounded-2xl bg-gray-50 border border-dashed border-gray-200">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 text-[#4C5CD0] flex items-center justify-center mb-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-sm text-[#1F2340]">
            Aún no hay misiones registradas
          </h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
            Las puntuaciones, precisión y estrellas ganadas en cada aventura aparecerán aquí conforme el niño o niña complete actividades.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('adventure')}
            className="mt-4 px-4 py-2 rounded-xl bg-[#4C5CD0] text-white text-xs font-heading font-bold hover:bg-[#3f4ec0] active:scale-95 transition-all cursor-pointer"
          >
            Comenzar primera misión
          </button>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {questHistory.slice(0, 6).map((item) => {
            const config = SUBJECT_CONFIGS[item.subject];
            return (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: config.color }}
                  >
                    {item.subject.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-heading font-bold text-[#1F2340]">
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-400">{item.date}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-heading font-extrabold text-[#4C5CD0]">
                    Aciertos: {item.score}/{item.maxScore}
                  </div>
                  <div className="text-[11px] text-amber-600 font-semibold">
                    +{item.starsEarned} Estrellas
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
