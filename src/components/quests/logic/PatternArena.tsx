import React from 'react';
import { PatternQuestion } from '../../../data/mockQuests';

interface PatternArenaProps {
  question: PatternQuestion;
  selectedChoice: string | null;
  onSelectChoice: (choice: string) => void;
}

export const PatternArena: React.FC<PatternArenaProps> = ({
  question,
  selectedChoice,
  onSelectChoice,
}) => {
  return (
    <div className="mb-6">
      <div className="bg-[#E4F7FC] rounded-3xl p-6 flex items-center justify-center gap-2 sm:gap-4 border border-[#00B4D8]/20 mb-6">
        {question.sequence.map((symbol, idx) => (
          <div
            key={idx}
            className={`w-14 h-16 rounded-2xl flex items-center justify-center text-3xl font-heading font-extrabold ${
              symbol === '?'
                ? 'bg-white border-2 border-dashed border-[#00B4D8] text-[#00B4D8]'
                : 'bg-white shadow-sm'
            }`}
          >
            {symbol === '?' && selectedChoice ? selectedChoice : symbol}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {question.options.map((opt) => {
          const isSelected = selectedChoice === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onSelectChoice(opt)}
              className={`min-h-[64px] rounded-2xl text-3xl transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#00B4D8] text-white shadow-md'
                  : 'btn-tactile-white text-[#1F2340]'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};
