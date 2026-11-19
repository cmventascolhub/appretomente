import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useCardMatch } from '../../../hooks/useCardMatch';
import { TactileButton } from '../../common/TactileButton';

interface CardMatchGameProps {
  soundEnabled: boolean;
  childAge?: number;
  onGameComplete: (score: number, maxScore: number, starsEarned: number) => void;
}

export const CardMatchGame: React.FC<CardMatchGameProps> = ({
  soundEnabled,
  childAge = 5,
  onGameComplete,
}) => {
  const { cards, targetPairs, matchedPairs, moves, isComplete, flipCard, resetCards } =
    useCardMatch(soundEnabled, childAge);

  const gridColsClass =
    cards.length <= 6
      ? 'grid grid-cols-3 gap-3 sm:gap-4'
      : cards.length <= 8
      ? 'grid grid-cols-4 gap-3 sm:gap-4'
      : 'grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3';

  const starsEarned = cards.length <= 6 ? 5 : cards.length <= 8 ? 6 : 8;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 card-elevation-1 border-t-4 border-[#845EC2] mb-6 animate-pop">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-heading font-extrabold text-[#1F2340]">
            ¡Encuentra las Parejas Iguales!
          </h3>
          <p className="text-xs text-gray-500">
            {cards.length > 8
              ? 'Desafío Superior: 12 cartas y 6 parejas animales para recordar.'
              : 'Toca dos tarjetas a la vez para encontrar amigos animales idénticos.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold font-heading px-3 py-1.5 rounded-full bg-[#845EC2]/10 text-[#4E2C83]">
            Parejas: {matchedPairs}/{targetPairs}
          </span>
          <button
            type="button"
            onClick={resetCards}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"
            title="Reiniciar tarjetas"
            aria-label="Reiniciar tarjetas"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards Grid - Responsive according to pairs count */}
      <div className={`${gridColsClass} mb-6`}>
        {cards.map((card, idx) => {
          const isVisible = card.isFlipped || card.isMatched;
          return (
            <button
              key={card.uid}
              type="button"
              onClick={() => flipCard(idx)}
              disabled={card.isMatched}
              className={`h-22 sm:h-26 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 select-none cursor-pointer ${
                isVisible
                  ? 'bg-[#F3ECFA] border-2 border-[#845EC2] shadow-sm transform scale-100'
                  : 'btn-tactile-white text-gray-400'
              }`}
            >
              {isVisible ? (
                <div className="animate-pop text-center">
                  <span className="text-3xl sm:text-4xl block">{card.emoji}</span>
                  <span className="text-[10px] font-bold text-[#4E2C83] mt-1 block">
                    {card.label}
                  </span>
                </div>
              ) : (
                <span className="text-2xl text-[#845EC2]/40 font-heading font-extrabold">
                  ✦
                </span>
              )}
            </button>
          );
        })}
      </div>

      {isComplete && (
        <div className="p-4 rounded-2xl bg-[#F3ECFA] border border-[#845EC2]/30 text-center animate-pop">
          <div className="font-heading font-extrabold text-lg text-[#4E2C83] mb-1">
            ¡Memoria Asombrosa! ¡Todas las parejas encontradas! 🎉
          </div>
          <p className="text-xs text-gray-600 mb-3">Completado en {moves} intentos.</p>
          <TactileButton
            type="button"
            variant="memory"
            size="md"
            onClick={() => onGameComplete(targetPairs, targetPairs, starsEarned)}
            className="w-full sm:w-auto mx-auto min-h-[52px]"
          >
            Reclamar +{starsEarned} Estrellas y Continuar
          </TactileButton>
        </div>
      )}
    </div>
  );
};
