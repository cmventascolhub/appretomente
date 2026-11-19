import React from 'react';
import { PhonicsMatchQuestion } from '../../../data/mockQuests';
import { Volume2 } from 'lucide-react';

interface PhonicsMatchArenaProps {
  question: PhonicsMatchQuestion;
  selectedWord: string | null;
  onSelectWord: (word: string) => void;
  onSpeak: (word: string) => void;
}

export const PhonicsMatchArena: React.FC<PhonicsMatchArenaProps> = ({
  question,
  selectedWord,
  onSelectWord,
  onSpeak,
}) => {
  return (
    <div className="mb-6">
      <div className="bg-[#FFF5E8] rounded-3xl p-6 text-center border border-[#FF9F1C]/20 mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-amber-200 mb-2 shadow-sm">
          <span className="font-heading font-extrabold text-2xl text-[#8C5200]">
            {question.targetWord}
          </span>
          <button
            type="button"
            onClick={() => onSpeak(question.targetWord)}
            className="p-1 rounded-full text-[#FF9F1C] hover:bg-amber-50 cursor-pointer"
            title="Listen"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
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
