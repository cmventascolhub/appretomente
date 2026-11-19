import React from 'react';
import { Check } from 'lucide-react';

interface QuestFeedbackProps {
  isCorrect: boolean;
  successTitle?: string;
  successSubtitle?: string;
  encouragementTitle?: string;
  encouragementSubtitle?: string;
  accentColor?: string;
}

export const QuestFeedback: React.FC<QuestFeedbackProps> = ({
  isCorrect,
  successTitle = 'Splendid Work!',
  successSubtitle = 'You found the exact answer!',
  encouragementTitle = 'Good Effort! Keep Going!',
  encouragementSubtitle = 'Every challenge makes your brain stronger!',
  accentColor = '#2EC4B6',
}) => {
  return (
    <div
      className={`mt-4 p-4 rounded-2xl flex items-center gap-3 animate-pop ${
        isCorrect
          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
          : 'bg-amber-50 text-amber-900 border border-amber-200'
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold shadow-sm">
        {isCorrect ? (
          <Check className="w-5 h-5" style={{ color: accentColor }} />
        ) : (
          '💡'
        )}
      </div>
      <div>
        <div className="font-heading font-extrabold text-sm">
          {isCorrect ? successTitle : encouragementTitle}
        </div>
        <div className="text-xs">
          {isCorrect ? successSubtitle : encouragementSubtitle}
        </div>
      </div>
    </div>
  );
};
