import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, Trophy, ArrowRight, Flame } from 'lucide-react';
import { fireCelebrationConfetti, fireStarSparkles } from '../../utils/confetti';
import { soundEffects } from '../../utils/audio';
import { TactileButton } from '../common/TactileButton';

interface VictoryModalProps {
  score: number;
  maxScore: number;
  starsEarned: number;
  onContinue: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  score,
  maxScore,
  starsEarned,
  onContinue,
}) => {
  const { currentProfile, streakDays, settings } = useApp();

  useEffect(() => {
    fireCelebrationConfetti();
    fireStarSparkles();
    soundEffects.playFanfare(settings.soundEffectsEnabled);
  }, [settings.soundEffectsEnabled]);

  const percentage = Math.round((score / maxScore) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2340]/65 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-center card-elevation-2 border border-[#FFC857]/30 animate-pop">
        {/* Animated Trophy / Character Emote */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="w-24 h-24 rounded-full bg-[#FFF5E8] flex items-center justify-center text-5xl shadow-inner border-2 border-amber-200 animate-bouncy">
            {currentProfile.avatar}
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#FFC857] flex items-center justify-center text-white shadow-md border-2 border-white">
            <Trophy className="w-5 h-5 text-[#7B5800]" />
          </div>
        </div>

        {/* Victory Headline */}
        <h2 className="text-2xl font-heading font-extrabold text-[#1F2340]">
          ¡Misión Cumplida!
        </h2>
        <p className="text-sm text-gray-500 mt-1 font-medium">
          ¡Trabajo espectacular, {currentProfile.name}!
        </p>

        {/* Stars Earned Callout */}
        <div className="my-5 p-4 rounded-2xl bg-[#FFFDF7] border-2 border-[#FFC857]/40 flex items-center justify-around shadow-sm">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-[#7B5800] font-heading font-extrabold text-2xl">
              +{starsEarned} <Star className="w-6 h-6 fill-[#FFC857] text-[#FFC857]" />
            </div>
            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">
              Estrellas
            </div>
          </div>

          <div className="w-[1px] h-10 bg-gray-200" />

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-[#FF9F1C] font-heading font-extrabold text-2xl">
              {streakDays} <Flame className="w-6 h-6 fill-[#FF9F1C] text-[#FF9F1C]" />
            </div>
            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">
              Días de Racha
            </div>
          </div>
        </div>

        {/* Accuracy Meter */}
        <div className="bg-gray-50 rounded-2xl p-3 mb-6 flex items-center justify-between text-xs font-semibold text-gray-600">
          <span>Puntaje de aciertos</span>
          <span className="font-heading font-extrabold text-[#4C5CD0] text-sm">
            {score}/{maxScore} ({percentage}%)
          </span>
        </div>

        {/* Continue Button in thumb-friendly lower zone (min 56px height) */}
        <TactileButton
          type="button"
          variant="primary"
          size="lg"
          fullWidth
          className="min-h-[56px]"
          onClick={onContinue}
        >
          <span>Reclamar Estrellas y Continuar</span>
          <ArrowRight className="w-5 h-5" />
        </TactileButton>
      </div>
    </div>
  );
};
