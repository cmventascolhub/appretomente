import React from 'react';
import { AchievementBadge } from '../../types';
import { ProgressBar } from '../common/ProgressBar';

interface BadgesListProps {
  achievements: AchievementBadge[];
}

export const BadgesList: React.FC<BadgesListProps> = ({ achievements }) => {
  return (
    <div className="space-y-4 animate-fadeIn">
      <p className="text-sm text-gray-500 mb-4">
        Earn badges by conquering learning quests and building daily streaks!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((ach) => {
          const progressPercent = Math.min(
            100,
            (ach.currentCount / ach.requiredCount) * 100
          );

          return (
            <div
              key={ach.id}
              className={`bg-white rounded-3xl p-5 card-elevation-1 border flex items-start gap-4 transition-all ${
                ach.unlocked
                  ? 'border-[#FFC857]/40 shadow-sm'
                  : 'border-gray-100 opacity-75'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-inner ${
                  ach.unlocked
                    ? 'bg-[#FFF5E8] border border-amber-200'
                    : 'bg-gray-100 border border-gray-200 grayscale'
                }`}
              >
                {ach.icon}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-extrabold text-sm text-[#1F2340]">
                    {ach.title}
                  </h3>
                  {ach.unlocked && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                      Earned
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {ach.description}
                </p>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>
                      {Math.min(ach.currentCount, ach.requiredCount)}/{ach.requiredCount}
                    </span>
                  </div>
                  <ProgressBar
                    progressPercent={progressPercent}
                    color="#FFC857"
                    heightClass="h-2"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
