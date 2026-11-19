import React from 'react';
import { SubjectCategory } from '../../types';
import { SUBJECT_CONFIGS } from '../../constants/theme';
import { ArrowLeft } from 'lucide-react';

interface QuestHeaderProps {
  subject: SubjectCategory;
  title: string;
  subtitle: string;
  onQuit: () => void;
}

export const QuestHeader: React.FC<QuestHeaderProps> = ({
  subject,
  title,
  subtitle,
  onQuit,
}) => {
  const config = SUBJECT_CONFIGS[subject];
  const iconEmoji =
    subject === 'math' ? '🔢' : subject === 'language' ? '🔤' : subject === 'memory' ? '🔮' : '🧩';

  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      {/* Prominent, accessible Back Button */}
      <button
        type="button"
        onClick={onQuit}
        className="min-h-[48px] px-3.5 py-2.5 rounded-2xl bg-white border border-[#4C5CD0]/15 text-[#1F2340] hover:bg-gray-50 flex items-center gap-2 font-heading font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
        aria-label="Volver a Aventuras"
      >
        <ArrowLeft className="w-4 h-4 text-[#4C5CD0]" />
        <span>Atrás</span>
      </button>

      {/* Title & Level Indicator */}
      <div className="flex items-center gap-2 text-right">
        <div>
          <h2 className="text-base sm:text-lg font-heading font-extrabold text-[#1F2340] leading-tight">
            {title}
          </h2>
          <div className="text-[11px] text-gray-500 font-medium">{subtitle}</div>
        </div>
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0"
          style={{ backgroundColor: `${config.color}20`, color: config.textColor }}
        >
          {iconEmoji}
        </div>
      </div>
    </div>
  );
};
