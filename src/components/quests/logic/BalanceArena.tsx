import React from 'react';
import { BalanceQuestion } from '../../../data/mockQuests';
import { Scale } from 'lucide-react';

interface BalanceArenaProps {
  question: BalanceQuestion;
  selectedChoice: string | null;
  onSelectChoice: (choice: string) => void;
}

export const BalanceArena: React.FC<BalanceArenaProps> = ({
  question,
  selectedChoice,
  onSelectChoice,
}) => {
  const leftTotalWeight = question.leftSide.count * question.leftSide.weightPerUnit;
  const rightTotalWeight = question.rightSide.count * question.rightSide.weightPerUnit;

  let rotateClass = 'rotate-0';
  let leftYClass = 'translate-y-0';
  let rightYClass = 'translate-y-0';

  if (leftTotalWeight > rightTotalWeight) {
    rotateClass = '-rotate-6';
    leftYClass = '-translate-y-4';
    rightYClass = 'translate-y-2';
  } else if (rightTotalWeight > leftTotalWeight) {
    rotateClass = 'rotate-6';
    leftYClass = 'translate-y-2';
    rightYClass = '-translate-y-4';
  }

  return (
    <div className="mb-6">
      <div className="bg-[#E4F7FC] rounded-3xl p-6 border border-[#00B4D8]/20 mb-6 shadow-inner">
        {/* Seesaw diagram */}
        <div className="flex items-end justify-between max-w-sm mx-auto mb-2 relative min-h-[140px]">
          {/* Left side */}
          <div
            className={`w-32 p-3 bg-white rounded-2xl text-center shadow-md border border-cyan-100 transition-transform duration-300 ${leftYClass}`}
          >
            <div className="flex flex-wrap items-center justify-center gap-1 min-h-[44px]">
              {Array.from({ length: Math.min(question.leftSide.count, 4) }).map((_, i) => (
                <span key={i} className="text-3xl sm:text-4xl">
                  {question.leftSide.emoji}
                </span>
              ))}
            </div>
            <span className="text-xs font-bold text-gray-600 mt-1 block">
              {question.leftSide.label || 'Lado Izquierdo'}
            </span>
          </div>

          {/* Pivot & Fulcrum */}
          <div className="flex flex-col items-center">
            <Scale className="w-8 h-8 text-[#00B4D8] mb-1" />
            <div
              className={`w-36 h-2 bg-[#00B4D8] rounded-full transform origin-center transition-transform duration-300 ${rotateClass}`}
            />
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] border-b-[#005D71]" />
          </div>

          {/* Right side */}
          <div
            className={`w-32 p-3 bg-white rounded-2xl text-center shadow-md border border-cyan-100 transition-transform duration-300 ${rightYClass}`}
          >
            <div className="flex flex-wrap items-center justify-center gap-1 min-h-[44px]">
              {Array.from({ length: Math.min(question.rightSide.count, 4) }).map((_, i) => (
                <span key={i} className="text-3xl sm:text-4xl">
                  {question.rightSide.emoji}
                </span>
              ))}
            </div>
            <span className="text-xs font-bold text-gray-600 mt-1 block">
              {question.rightSide.label || 'Lado Derecho'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {question.options.map((opt) => {
          const isSelected = selectedChoice === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onSelectChoice(opt)}
              className={`py-3.5 px-3 rounded-2xl font-heading font-bold text-sm transition-all cursor-pointer min-h-[52px] ${
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
