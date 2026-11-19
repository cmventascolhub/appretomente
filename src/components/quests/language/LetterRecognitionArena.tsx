import React from 'react';
import { LetterRecognitionQuestion } from '../../../data/mockQuests';
import { Volume2 } from 'lucide-react';

interface LetterRecognitionArenaProps {
  question: LetterRecognitionQuestion;
  selectedLetter: string | null;
  onSelectLetter: (letter: string) => void;
  isAnswerChecked: boolean;
  onSpeak: (text: string) => void;
}

export const LetterRecognitionArena: React.FC<LetterRecognitionArenaProps> = ({
  question,
  selectedLetter,
  onSelectLetter,
  isAnswerChecked,
  onSpeak,
}) => {
  const handleAudioPrompt = () => {
    if (question.audioCue) {
      onSpeak(question.audioCue);
    } else {
      onSpeak(`${question.wordExample}. Letra ${question.targetLetter}`);
    }
  };

  return (
    <div className="mb-6">
      {/* Central Visual Showcase */}
      <div className="bg-[#FFF5E8] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center border-2 border-[#FF9F1C]/25 shadow-sm mb-6">
        <span className="text-6xl sm:text-7xl mb-3 animate-bouncy select-none filter drop-shadow">
          {question.emoji}
        </span>

        {/* Display Word / Missing Letter Slot */}
        {question.displayWord ? (
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-2xl border-2 border-dashed border-amber-300 shadow-sm mb-3">
            {question.displayWord.split(' ').map((segment, idx) => {
              if (segment === '_') {
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center justify-center min-w-[38px] h-10 px-2 rounded-xl bg-amber-100 border-2 border-amber-400 font-heading font-extrabold text-2xl text-[#8C5200] animate-pulse"
                  >
                    {selectedLetter || '?'}
                  </span>
                );
              }
              return (
                <span key={idx} className="font-heading font-extrabold text-2xl text-[#1F2340] tracking-wider">
                  {segment}
                </span>
              );
            })}
          </div>
        ) : (
          <div className="text-xl font-heading font-extrabold text-[#8C5200] mb-2">
            {question.wordExample}
          </div>
        )}

        {/* Pronunciation & Audio Cue */}
        <button
          type="button"
          onClick={handleAudioPrompt}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white hover:bg-amber-50 border border-amber-200 text-xs font-bold text-[#8C5200] shadow-xs transition-colors cursor-pointer"
        >
          <Volume2 className="w-4 h-4 text-[#FF9F1C]" />
          <span>Toca para escuchar: &quot;{question.wordExample}&quot;</span>
        </button>
      </div>

      {/* Big Letter Buttons - Optimized for 4 and 5 year olds */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {question.options.map((letter, idx) => {
          const isSelected = selectedLetter === letter;
          const cardAccents = [
            'border-amber-300 hover:border-amber-400',
            'border-teal-300 hover:border-teal-400',
            'border-indigo-300 hover:border-indigo-400',
            'border-rose-300 hover:border-rose-400',
          ][idx % 4];

          return (
            <button
              key={letter}
              type="button"
              disabled={isAnswerChecked}
              onClick={() => {
                onSelectLetter(letter);
                onSpeak(`Letra ${letter}`);
              }}
              className={`min-h-[84px] sm:min-h-[96px] rounded-2xl flex flex-col items-center justify-center p-3 border-2 transition-all cursor-pointer font-heading font-extrabold active:scale-95 ${
                isSelected
                  ? 'bg-[#FF9F1C] text-white border-[#FF9F1C] shadow-lg scale-105 ring-4 ring-amber-200'
                  : `bg-white text-[#1F2340] shadow-sm hover:shadow-md ${cardAccents}`
              }`}
            >
              <span className="text-3xl sm:text-4xl">{letter}</span>
              <span className={`text-[11px] font-bold mt-1 ${isSelected ? 'text-amber-100' : 'text-gray-400'}`}>
                {question.mode === 'vowel' ? 'vocal' : 'letra'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
