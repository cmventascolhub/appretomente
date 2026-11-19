import React from 'react';
import { OddOneOutQuestion } from '../../../data/mockQuests';

interface OddOneOutArenaProps {
  question: OddOneOutQuestion;
  selectedChoice: string | null;
  isAnswerChecked: boolean;
  onSelectChoice: (choice: string) => void;
}

export const OddOneOutArena: React.FC<OddOneOutArenaProps> = ({
  question,
  selectedChoice,
  isAnswerChecked,
  onSelectChoice,
}) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 gap-3 mb-4">
        {question.options.map((opt) => {
          const isSelected = selectedChoice === opt.text;
          let btnStyle = 'btn-tactile-white';

          if (isAnswerChecked) {
            if (opt.isOdd) {
              btnStyle = 'bg-[#00B4D8] text-white border-[#0093B2] shadow-md';
            } else if (isSelected && !opt.isOdd) {
              btnStyle = 'bg-red-100 text-red-700 border-red-300';
            }
          } else if (isSelected) {
            btnStyle = 'bg-[#00B4D8]/20 border-2 border-[#00B4D8] text-[#005D71]';
          }

          return (
            <button
              key={opt.text}
              type="button"
              onClick={() => onSelectChoice(opt.text)}
              className={`min-h-[100px] p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${btnStyle}`}
            >
              <span className="text-4xl">{opt.emoji}</span>
              <span className="font-heading font-bold text-base">{opt.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
