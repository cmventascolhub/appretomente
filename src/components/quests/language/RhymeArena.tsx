import React from 'react';
import { RhymeQuestion } from '../../../data/mockQuests';

interface RhymeArenaProps {
  question: RhymeQuestion;
  selectedWord: string | null;
  onSelectWord: (word: string) => void;
}

export const RhymeArena: React.FC<RhymeArenaProps> = ({
  question,
  selectedWord,
  onSelectWord,
}) => {
  return (
    <div className="mb-6">
      <div className="bg-[#FFF5E8] rounded-3xl p-6 text-center border border-[#FF9F1C]/20 mb-6">
        <span className="text-5xl block mb-2">{question.seedEmoji}</span>
        <span className="font-heading font-extrabold text-2xl text-[#8C5200]">
          {question.seedWord}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {question.options.map((opt) => {
          const isSelected = selectedWord === opt.word;
          return (
            <button
              key={opt.word}
              type="button"
              onClick={() => onSelectWord(opt.word)}
              className={`min-h-[90px] p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#FF9F1C] text-white shadow-md'
                  : 'btn-tactile-white text-[#1F2340]'
              }`}
            >
              <span className="text-3xl">{opt.emoji}</span>
              <span className="font-heading font-bold text-sm">{opt.word}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
