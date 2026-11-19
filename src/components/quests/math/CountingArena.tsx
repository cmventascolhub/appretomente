import React from 'react';
import { CountingQuestion } from '../../../data/mockQuests';

interface CountingArenaProps {
  question: CountingQuestion;
  tappedItems: number[];
  onItemTap: (index: number) => void;
}

export const CountingArena: React.FC<CountingArenaProps> = ({
  question,
  tappedItems,
  onItemTap,
}) => {
  return (
    <div className="mb-8">
      <div className="bg-[#E9F9F7] rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-center gap-4 min-h-[160px] border border-[#2EC4B6]/20">
        {Array.from({ length: question.count }).map((_, i) => {
          const isTapped = tappedItems.includes(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => onItemTap(i)}
              className={`relative text-4xl sm:text-5xl p-2 transition-transform active:scale-90 select-none cursor-pointer ${
                isTapped ? 'scale-110 drop-shadow-md' : 'opacity-90 hover:scale-105'
              }`}
            >
              {question.itemEmoji}
              {isTapped && (
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#2EC4B6] text-white text-xs font-heading font-extrabold flex items-center justify-center shadow-md animate-pop">
                  {tappedItems.indexOf(i) + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="text-center text-xs text-gray-400 mt-2 font-medium">
        💡 Tip: Touch each item above to count along! ({tappedItems.length} tapped)
      </div>
    </div>
  );
};
