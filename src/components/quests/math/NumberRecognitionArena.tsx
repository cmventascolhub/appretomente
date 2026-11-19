import React from 'react';
import { NumberRecognitionQuestion } from '../../../data/mockQuests';
import { Volume2 } from 'lucide-react';
import { soundEffects } from '../../../utils/audio';

interface NumberRecognitionArenaProps {
  question: NumberRecognitionQuestion;
  selectedOption: number | null;
  onSelectOption: (val: number) => void;
  isAnswerChecked: boolean;
  onSpeak: (text: string) => void;
}

export const NumberRecognitionArena: React.FC<NumberRecognitionArenaProps> = ({
  question,
  selectedOption,
  onSelectOption,
  isAnswerChecked,
  onSpeak,
}) => {
  const [tappedItemIndices, setTappedItemIndices] = React.useState<number[]>([]);

  const handleItemTap = (idx: number) => {
    soundEffects.playPop(true);
    if (!tappedItemIndices.includes(idx)) {
      setTappedItemIndices((prev) => [...prev, idx]);
    }
  };

  const hasItems = question.itemCount && question.itemCount > 0 && question.itemEmoji;

  return (
    <div className="mb-6">
      {/* Central Visual Showcase */}
      <div className="bg-[#E9F9F7] rounded-3xl p-6 text-center border-2 border-[#2EC4B6]/25 shadow-sm mb-6">
        {hasItems && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4 min-h-[90px]">
            {Array.from({ length: question.itemCount! }).map((_, i) => {
              const isTapped = tappedItemIndices.includes(i);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleItemTap(i)}
                  className={`relative text-5xl sm:text-6xl p-2 transition-transform active:scale-90 cursor-pointer select-none ${
                    isTapped ? 'scale-110 drop-shadow-md' : 'hover:scale-105'
                  }`}
                  title="Toca para contar"
                >
                  {question.itemEmoji}
                  {isTapped && (
                    <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#2EC4B6] text-white text-xs font-heading font-extrabold flex items-center justify-center shadow-md animate-pop">
                      {tappedItemIndices.indexOf(i) + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Audio prompt button for little ones */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-teal-200 shadow-sm">
          <span className="text-sm font-bold text-[#147D73]">
            {question.visualCue || '¡Escucha y toca el número correcto!'}
          </span>
          <button
            type="button"
            onClick={() => onSpeak(`Número ${question.targetNumber}. ${question.prompt}`)}
            className="p-1.5 rounded-full bg-teal-50 text-[#2EC4B6] hover:bg-teal-100 transition-colors cursor-pointer"
            title="Escuchar número"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Number Selection Buttons - Extra Large for 4 and 5 year olds */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {question.options.map((opt, idx) => {
          const isSelected = selectedOption === opt;
          // Soft playful card accents
          const colorStyles = [
            'border-teal-300 hover:border-teal-400',
            'border-amber-300 hover:border-amber-400',
            'border-indigo-300 hover:border-indigo-400',
            'border-rose-300 hover:border-rose-400',
          ][idx % 4];

          return (
            <button
              key={opt}
              type="button"
              disabled={isAnswerChecked}
              onClick={() => {
                onSelectOption(opt);
                onSpeak(`Número ${opt}`);
              }}
              className={`min-h-[84px] sm:min-h-[96px] rounded-2xl flex flex-col items-center justify-center p-3 border-2 transition-all cursor-pointer font-heading font-extrabold active:scale-95 ${
                isSelected
                  ? 'bg-[#2EC4B6] text-white border-[#2EC4B6] shadow-lg scale-105 ring-4 ring-teal-200'
                  : `bg-white text-[#1F2340] shadow-sm hover:shadow-md ${colorStyles}`
              }`}
            >
              <span className="text-3xl sm:text-4xl">{opt}</span>
              <span className={`text-[11px] font-bold mt-1 ${isSelected ? 'text-teal-100' : 'text-gray-400'}`}>
                {opt === 1 ? 'uno' : opt === 2 ? 'dos' : opt === 3 ? 'tres' : opt === 4 ? 'cuatro' : opt === 5 ? 'cinco' : opt === 6 ? 'seis' : opt === 7 ? 'siete' : opt === 8 ? 'ocho' : opt === 9 ? 'nueve' : 'diez'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
