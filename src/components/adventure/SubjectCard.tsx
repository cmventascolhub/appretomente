import React from 'react';
import { SubjectCategory, SubjectStats } from '../../types';
import { SUBJECT_CONFIGS } from '../../constants/theme';
import { TactileButton, TactileVariant } from '../common/TactileButton';
import { Star, Play, Calculator, BookOpen, Brain, Compass, Sparkles } from 'lucide-react';

interface SubjectCardProps {
  subjectKey: SubjectCategory;
  stats: SubjectStats;
  onStartQuest: (subject: SubjectCategory) => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subjectKey,
  stats,
  onStartQuest,
}) => {
  const config = SUBJECT_CONFIGS[subjectKey];

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="w-6 h-6" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6" />;
      case 'Brain':
        return <Brain className="w-6 h-6" />;
      case 'Compass':
        return <Compass className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div
      className="bg-white rounded-3xl p-6 card-elevation-1 border-t-4 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
      style={{ borderTopColor: config.color }}
    >
      <div>
        {/* Top Subject Tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
              style={{ backgroundColor: config.color }}
            >
              {getSubjectIcon(config.iconName)}
            </div>
            <div>
              <span
                className="inline-block text-[11px] font-heading font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${config.color}20`,
                  color: config.textColor,
                }}
              >
                Nivel {stats.level}
              </span>
              <h3 className="text-lg font-heading font-extrabold text-[#1F2340] leading-tight">
                {config.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-xs font-heading font-bold text-gray-700">
            <Star className="w-3.5 h-3.5 fill-[#FFC857] text-[#FFC857]" />
            <span>{stats.starsEarned}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {config.description}
        </p>

        {/* Skills badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {config.skillsTaught.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-gray-50 text-gray-600 border border-gray-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Tactile Action Button in lower thumb zone (min 52px height) */}
      <TactileButton
        type="button"
        variant={subjectKey as TactileVariant}
        size="md"
        fullWidth
        onClick={() => onStartQuest(subjectKey)}
        className="min-h-[52px]"
      >
        <Play className="w-4 h-4 fill-white" />
        <span>Iniciar Aventura</span>
      </TactileButton>
    </div>
  );
};
