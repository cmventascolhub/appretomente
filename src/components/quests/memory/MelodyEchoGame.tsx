import React, { useEffect } from 'react';
import { SIMON_COLORS } from '../../../data/mockQuests';
import { useSimonSequence } from '../../../hooks/useSimonSequence';
import { TactileButton } from '../../common/TactileButton';

interface MelodyEchoGameProps {
  soundEnabled: boolean;
  childAge?: number;
  onGameComplete: (score: number, maxScore: number, starsEarned: number) => void;
}

export const MelodyEchoGame: React.FC<MelodyEchoGameProps> = ({
  soundEnabled,
  childAge = 5,
  onGameComplete,
}) => {
  const {
    sequence,
    playerStep,
    activeColorId,
    sequenceRound,
    maxRounds,
    isSequencePlaying,
    isSequenceComplete,
    startSequenceGame,
    tapColor,
  } = useSimonSequence(soundEnabled, childAge);

  useEffect(() => {
    startSequenceGame();
  }, [startSequenceGame]);

  const starsEarned = maxRounds <= 2 ? 5 : maxRounds === 3 ? 6 : 8;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 card-elevation-1 border-t-4 border-[#845EC2] mb-6 animate-pop">
      <div className="text-center mb-6">
        <h3 className="text-xl font-heading font-extrabold text-[#1F2340]">
          Eco Melódico y Luces
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {isSequencePlaying
            ? '👂 Escucha y observa la secuencia de luces atentamente...'
            : isSequenceComplete
            ? '🎉 ¡Increíble! ¡Repetiste la melodía completa!'
            : `¡Tu Turno! Toca los colores en orden (Paso ${playerStep + 1} de ${sequence.length})`}
        </p>
      </div>

      {/* 4 Colored Orbs - Large targets */}
      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-6">
        {SIMON_COLORS.map((col, idx) => {
          const isActive = activeColorId === col.id;
          const colorNameSpanish =
            col.id === 'indigo'
              ? 'Índigo'
              : col.id === 'gold'
              ? 'Oro'
              : col.id === 'mint'
              ? 'Menta'
              : 'Violeta';

          return (
            <button
              key={col.id}
              type="button"
              onClick={() => tapColor(idx)}
              disabled={isSequencePlaying || isSequenceComplete}
              className="h-28 rounded-3xl flex flex-col items-center justify-center gap-1 transition-all duration-150 select-none shadow-md active:scale-95 cursor-pointer"
              style={{
                backgroundColor: isActive ? col.color : `${col.color}20`,
                borderColor: col.color,
                borderWidth: '3px',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                boxShadow: isActive ? `0 0 24px ${col.color}` : 'none',
              }}
            >
              <span className="text-3xl">{col.emoji}</span>
              <span
                className="text-xs font-heading font-extrabold"
                style={{ color: isActive ? '#FFFFFF' : col.color }}
              >
                {colorNameSpanish}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-xs font-bold text-gray-400 border-t border-gray-100 pt-4">
        <span>
          Ronda {sequenceRound} de {maxRounds}
        </span>
        <button
          type="button"
          onClick={startSequenceGame}
          className="min-h-[44px] flex items-center text-[#845EC2] hover:underline cursor-pointer"
        >
          Repetir Demostración
        </button>
      </div>

      {isSequenceComplete && (
        <div className="mt-4 p-4 rounded-2xl bg-[#F3ECFA] text-center animate-pop">
          <div className="font-heading font-extrabold text-[#4E2C83] text-lg mb-2">
            ¡Maestro de la Melodía! Recordaste cada nota con precisión.
          </div>
          <TactileButton
            type="button"
            variant="memory"
            size="md"
            onClick={() => onGameComplete(maxRounds, maxRounds, starsEarned)}
            className="w-full sm:w-auto mx-auto min-h-[52px]"
          >
            Reclamar +{starsEarned} Estrellas y Continuar
          </TactileButton>
        </div>
      )}
    </div>
  );
};
