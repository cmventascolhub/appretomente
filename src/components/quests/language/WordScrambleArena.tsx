import React from 'react';
import { WordScrambleQuestion } from '../../../data/mockQuests';
import { Globe, RotateCcw } from 'lucide-react';

interface LetterItem {
  id: number;
  char: string;
}

interface WordScrambleArenaProps {
  question: WordScrambleQuestion;
  assembledLetters: string[];
  availableLetters: LetterItem[];
  isAnswerChecked: boolean;
  onLetterTap: (letter: LetterItem) => void;
  onResetLetters: () => void;
}

export const WordScrambleArena: React.FC<WordScrambleArenaProps> = ({
  question,
  assembledLetters,
  availableLetters,
  isAnswerChecked,
  onLetterTap,
  onResetLetters,
}) => {
  return (
    <div className="mb-6">
      <div className="bg-[#FFF5E8] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center border border-[#FF9F1C]/20 mb-6">
        <span className="text-6xl mb-3 animate-bouncy select-none">
          {question.emoji}
        </span>

        {question.spanishTranslation && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-amber-200 text-xs font-bold text-[#8C5200] mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>En Español: {question.spanishTranslation}</span>
          </div>
        )}

        {/* Assembled Letters Tray */}
        <div className="flex items-center gap-2 sm:gap-3 min-h-[64px] p-2 bg-white rounded-2xl border-2 border-dashed border-[#FF9F1C]/40 shadow-inner">
          {Array.from({ length: question.word.length }).map((_, i) => {
            const letter = assembledLetters[i];
            return (
              <div
                key={i}
                className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex items-center justify-center font-heading font-extrabold text-2xl transition-all ${
                  letter
                    ? 'bg-[#FF9F1C] text-white shadow-md animate-pop'
                    : 'bg-gray-100 text-transparent'
                }`}
              >
                {letter || ''}
              </div>
            );
          })}
        </div>

        {assembledLetters.length > 0 && !isAnswerChecked && (
          <button
            type="button"
            onClick={onResetLetters}
            className="mt-3 flex items-center gap-1 text-xs font-bold text-[#FF9F1C] hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset letters
          </button>
        )}
      </div>

      {/* Letter selection pool */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {availableLetters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onLetterTap(item)}
            className="w-14 h-16 sm:w-16 sm:h-18 rounded-2xl btn-tactile-white font-heading font-extrabold text-2xl text-[#1F2340] cursor-pointer"
          >
            {item.char}
          </button>
        ))}
      </div>
    </div>
  );
};
