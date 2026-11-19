import React from 'react';
import { MissingNumberQuestion } from '../../../data/mockQuests';

interface SequenceArenaProps {
  question: MissingNumberQuestion;
  selectedOption: number | null;
}

export const SequenceArena: React.FC<SequenceArenaProps> = ({
  question,
  selectedOption,
}) => {
  return (
    <div className="mb-8">
      <div className="bg-[#E9F9F7] rounded-3xl p-6 flex items-center justify-center gap-2 sm:gap-3 border border-[#2EC4B6]/20">
        {question.sequence.map((item, idx) => (
          <div
            key={idx}
            className={`w-12 h-14 sm:w-16 sm:h-18 rounded-2xl flex items-center justify-center font-heading font-extrabold text-xl sm:text-2xl shadow-sm ${
              item === '?'
                ? 'bg-white border-2 border-dashed border-[#2EC4B6] text-[#2EC4B6]'
                : 'bg-white border border-[#2EC4B6]/20 text-[#1F2340]'
            }`}
          >
            {item === '?' && selectedOption !== null ? selectedOption : item}
          </div>
        ))}
      </div>
    </div>
  );
};
