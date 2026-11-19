import React from 'react';
import { SubjectCategory, SubjectStats } from '../../types';
import { SUBJECT_CONFIGS } from '../../constants/theme';
import { ProgressBar } from '../common/ProgressBar';

interface DisciplineMasteryListProps {
  subjectStats: Record<SubjectCategory, SubjectStats>;
}

export const DisciplineMasteryList: React.FC<DisciplineMasteryListProps> = ({
  subjectStats,
}) => {
  const subjects: SubjectCategory[] = ['math', 'language', 'memory', 'logic'];

  return (
    <div className="bg-white rounded-3xl p-6 card-elevation-1 border border-[#4C5CD0]/10">
      <h2 className="text-lg font-heading font-extrabold text-[#1F2340] mb-1">
        Discipline Mastery & Accuracy
      </h2>
      <p className="text-xs text-gray-500 mb-6">
        Track mastery level and historical precision across core developmental domains
      </p>

      <div className="space-y-6">
        {subjects.map((subKey) => {
          const config = SUBJECT_CONFIGS[subKey];
          const stats = subjectStats[subKey];

          return (
            <div key={subKey} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                  <span className="font-heading font-bold text-[#1F2340]">
                    {config.name}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    • Level {stats.level}
                  </span>
                </div>
                <div className="font-heading font-extrabold text-[#1F2340]">
                  {stats.accuracy}% accuracy{' '}
                  <span className="text-xs text-gray-400">
                    ({stats.questsCompleted} quests)
                  </span>
                </div>
              </div>

              {/* 16px thick rounded progress bar with warm cream trough per spec */}
              <ProgressBar
                progressPercent={stats.accuracy}
                color={config.color}
                heightClass="h-4"
              />

              <div className="flex items-center justify-between text-[11px] text-gray-500">
                <span>Skills: {config.skillsTaught.join(', ')}</span>
                <span>{stats.minutesSpent} mins active</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
