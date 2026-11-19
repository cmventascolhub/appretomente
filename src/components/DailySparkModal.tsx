import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getAgeTier, getAgeTierLabel } from '../data/mockQuests';
import { X, Sparkles, Star, CheckCircle, ArrowRight, Award, ArrowLeft } from 'lucide-react';
import { soundEffects } from '../utils/audio';
import { fireCelebrationConfetti } from '../utils/confetti';
import { TactileButton } from './common/TactileButton';

export const DailySparkModal: React.FC = () => {
  const { isDailySparkOpen, closeDailySpark, completeQuest, settings, currentProfile } = useApp();
  const [step, setStep] = useState<'intro' | 'step1' | 'step2' | 'finished'>('intro');

  const [step1Answer, setStep1Answer] = useState<number | null>(null);
  const [step2Answer, setStep2Answer] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  if (!isDailySparkOpen) return null;

  const ageTier = getAgeTier(currentProfile.age);
  const tierLabel = getAgeTierLabel(currentProfile.age);

  // Age-Adapted Challenge Definitions
  const challengeConfig =
    ageTier === 'early'
      ? {
          step1: {
            title: '¿Cuántas gemas brillantes cayeron del cometa?',
            instruction: 'Toca las 4 gemas para contarlas con tu dedo.',
            count: 4,
            isNumeric: false,
            options: [2, 3, 4, 5],
            correct: 4,
            errorTip: '¡Casi! Toca despacio cada una de las 4 gemas.',
          },
          step2: {
            title: '¿Qué astro sigue en este ritmo de luz?',
            instruction: 'Observa: Sol, Luna, Sol, Luna...',
            sequence: ['☀️', '🌙', '☀️', '🌙', '❓'],
            options: ['☀️', '🌙', '🌸'],
            correct: '☀️',
            errorTip: 'El ritmo se repite: Sol, Luna, Sol, Luna... ¡sigue el Sol!',
          },
        }
      : ageTier === 'intermediate'
      ? {
          step1: {
            title: '¿Cuántas gemas mágicas hay en la constelación?',
            instruction: 'Cuenta las gemas en la pantalla.',
            count: 6,
            isNumeric: false,
            options: [4, 5, 6, 7],
            correct: 6,
            errorTip: 'Cuenta despacio: hay 6 gemas en total.',
          },
          step2: {
            title: '¿Qué figura completa la constelación doble?',
            instruction: 'Fíjate en el patrón: Luna, Luna, Estrella...',
            sequence: ['🌙', '🌙', '⭐', '🌙', '🌙', '❓'],
            options: ['⭐', '🌙', '☀️'],
            correct: '⭐',
            errorTip: 'El ritmo es dos Lunas y una Estrella: Luna, Luna, Estrella.',
          },
        }
      : {
          // Advanced (7+ years)
          step1: {
            title: 'Cálculo Mental Cósmico: 14 + 8',
            instruction: '14 cometas espaciales ☄️ más 8 estrellas de plasma ⭐ = ¿cuántas en total?',
            count: 14,
            isNumeric: true,
            leftNum: 14,
            rightNum: 8,
            options: [20, 21, 22, 23],
            correct: 22,
            errorTip: 'Pista de cálculo: 14 + 6 = 20, más 2 = 22.',
          },
          step2: {
            title: '¿Qué número completa la serie de propulsión?',
            instruction: 'Observa la serie que avanza de 3 en 3: 3, 6, 9, 12, ?',
            sequence: ['3', '6', '9', '12', '❓'],
            options: ['14', '15', '16', '18'],
            correct: '15',
            errorTip: 'Avanza de 3 en 3: 12 + 3 = 15.',
          },
        };

  const handleStep1Submit = (val: number) => {
    setStep1Answer(val);
    if (val === challengeConfig.step1.correct) {
      soundEffects.playCorrect(settings.soundEffectsEnabled);
      setIsError(false);
      setTimeout(() => setStep('step2'), 500);
    } else {
      soundEffects.playSoftBoop(settings.soundEffectsEnabled);
      setIsError(true);
    }
  };

  const handleStep2Submit = (shape: string) => {
    setStep2Answer(shape);
    if (shape === challengeConfig.step2.correct) {
      soundEffects.playFanfare(settings.soundEffectsEnabled);
      fireCelebrationConfetti();
      completeQuest('math', 1, 1, 4, 25);
      completeQuest('logic', 1, 1, 4, 20);
      setIsError(false);
      setStep('finished');
    } else {
      soundEffects.playSoftBoop(settings.soundEffectsEnabled);
      setIsError(true);
    }
  };

  const handleResetAndClose = () => {
    setStep('intro');
    setStep1Answer(null);
    setStep2Answer(null);
    closeDailySpark();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2340]/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#FF9F1C]/20 card-elevation-2 animate-pop overflow-hidden">
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FF9F1C] via-[#FFC857] to-[#2EC4B6]" />

        {/* Clear Top Back/Close Button - min 48px touch */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-3 right-3 min-w-[48px] min-h-[48px] flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
          aria-label="Cerrar reto diario"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'intro' && (
          <div className="text-center py-2">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-[#FFF5E8] flex items-center justify-center text-3xl shadow-inner border border-amber-200 mb-3 animate-bouncy">
              <Sparkles className="w-8 h-8 text-[#FF9F1C]" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF9F1C]/15 text-[#8C5200] text-xs font-bold font-heading mb-2">
              <Star className="w-3.5 h-3.5 fill-[#FFC857] text-[#FFC857]" />
              {currentProfile.name} • {tierLabel}
            </div>

            <h2 className="text-2xl font-heading font-extrabold text-[#1F2340]">
              Reto Diario: Caza Estelar
            </h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Desafío rápido de <strong>Conteo/Cálculo</strong> y{' '}
              <strong>Lógica de Patrones</strong> adaptado a tu edad ({currentProfile.age} años) para ganar <strong>+8 Estrellas de bonificación</strong>.
            </p>

            <div className="mt-5 p-4 rounded-2xl bg-[#FFFDF7] border border-[#FF9F1C]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🚀</span>
                <div className="text-left">
                  <div className="text-xs font-bold text-gray-500 uppercase">Nivel de Reto</div>
                  <div className="text-sm font-bold text-[#1F2340]">{tierLabel}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-heading font-extrabold text-[#FF9F1C]">
                +8 Estrellas <Star className="w-4 h-4 fill-[#FFC857] text-[#FFC857]" />
              </div>
            </div>

            {/* Main Action in lower thumb area */}
            <TactileButton
              type="button"
              variant="secondary"
              size="lg"
              fullWidth
              className="mt-6 min-h-[56px]"
              onClick={() => {
                soundEffects.playPop(settings.soundEffectsEnabled);
                setStep('step1');
              }}
            >
              <span>¡Comenzar Reto ({currentProfile.name})!</span>
              <ArrowRight className="w-5 h-5" />
            </TactileButton>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-3 w-full min-h-[44px] text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              ← Volver a Aventuras
            </button>
          </div>
        )}

        {step === 'step1' && (
          <div className="text-center py-2">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 mb-3">
              <button
                type="button"
                onClick={() => setStep('intro')}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700 cursor-pointer min-h-[36px]"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Atrás
              </button>
              <span className="text-[#2EC4B6]">Paso 1 de 2 • {tierLabel}</span>
            </div>

            <h3 className="text-lg font-heading font-extrabold text-[#1F2340] mb-2">
              {challengeConfig.step1.title}
            </h3>
            <p className="text-xs text-gray-500 mb-4 font-medium">
              {challengeConfig.step1.instruction}
            </p>

            {challengeConfig.step1.isNumeric ? (
              /* Higher-level numeric arithmetic representation */
              <div className="bg-[#E9F9F7] rounded-2xl p-5 mb-4 flex items-center justify-center gap-3 border border-[#2EC4B6]/20">
                <div className="px-4 py-2 rounded-xl bg-white shadow-sm border border-teal-100 flex items-center gap-2">
                  <span className="text-2xl">☄️</span>
                  <span className="text-2xl font-heading font-extrabold text-[#0B635B]">
                    {challengeConfig.step1.leftNum}
                  </span>
                </div>
                <span className="text-2xl font-heading font-extrabold text-[#2EC4B6]">+</span>
                <div className="px-4 py-2 rounded-xl bg-white shadow-sm border border-teal-100 flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="text-2xl font-heading font-extrabold text-[#0B635B]">
                    {challengeConfig.step1.rightNum}
                  </span>
                </div>
                <span className="text-2xl font-heading font-extrabold text-[#2EC4B6]">=</span>
                <div className="w-14 h-12 rounded-xl bg-white border-2 border-dashed border-[#2EC4B6] flex items-center justify-center text-xl font-heading font-extrabold text-[#0B635B]">
                  {step1Answer !== null ? step1Answer : '?'}
                </div>
              </div>
            ) : (
              /* Visual items counting representation */
              <div className="bg-[#E9F9F7] rounded-2xl p-5 mb-4 flex flex-wrap items-center justify-center gap-3 border border-[#2EC4B6]/20">
                {Array.from({ length: challengeConfig.step1.count }).map((_, i) => (
                  <span key={i} className="text-3xl animate-pop select-none filter drop-shadow-sm">
                    💎
                  </span>
                ))}
              </div>
            )}

            {/* Thumb friendly choice buttons (min 52px height) */}
            <div className="grid grid-cols-4 gap-2 mb-2">
              {challengeConfig.step1.options.map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleStep1Submit(num)}
                  className={`min-h-[52px] rounded-xl font-heading font-extrabold text-xl transition-all cursor-pointer ${
                    step1Answer === num && num === challengeConfig.step1.correct
                      ? 'bg-[#2EC4B6] text-white shadow-md'
                      : 'btn-tactile-white text-[#1F2340]'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {isError && (
              <p className="text-xs text-red-500 font-semibold mt-2">
                {challengeConfig.step1.errorTip}
              </p>
            )}
          </div>
        )}

        {step === 'step2' && (
          <div className="text-center py-2">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 mb-3">
              <button
                type="button"
                onClick={() => setStep('step1')}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700 cursor-pointer min-h-[36px]"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Atrás
              </button>
              <span className="text-[#00B4D8]">Paso 2 de 2 • Patrón Lógico</span>
            </div>

            <h3 className="text-lg font-heading font-extrabold text-[#1F2340] mb-2">
              {challengeConfig.step2.title}
            </h3>
            <p className="text-xs text-gray-500 mb-4 font-medium">
              {challengeConfig.step2.instruction}
            </p>

            <div className="bg-[#E4F7FC] rounded-2xl p-4 mb-4 flex items-center justify-center gap-2 border border-[#00B4D8]/20">
              {challengeConfig.step2.sequence.map((item, idx) => (
                <div
                  key={idx}
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold ${
                    item === '❓'
                      ? 'bg-white border-2 border-dashed border-[#00B4D8] text-[#00B4D8]'
                      : 'bg-white shadow-sm border border-cyan-100 text-[#1F2340]'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Large thumb targets */}
            <div className={`grid ${challengeConfig.step2.options.length === 4 ? 'grid-cols-4' : 'grid-cols-3'} gap-2 sm:gap-3 mb-2`}>
              {challengeConfig.step2.options.map((symbol) => (
                <button
                  key={symbol}
                  type="button"
                  onClick={() => handleStep2Submit(symbol)}
                  className={`min-h-[56px] rounded-xl font-heading font-bold text-2xl transition-all cursor-pointer ${
                    step2Answer === symbol && symbol === challengeConfig.step2.correct
                      ? 'bg-[#00B4D8] text-white shadow-md'
                      : 'btn-tactile-white text-[#1F2340]'
                  }`}
                >
                  {symbol}
                </button>
              ))}
            </div>

            {isError && (
              <p className="text-xs text-red-500 font-semibold mt-2">
                {challengeConfig.step2.errorTip}
              </p>
            )}
          </div>
        )}

        {step === 'finished' && (
          <div className="text-center py-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-[#FFC857]/20 flex items-center justify-center text-4xl mb-4 border border-[#FFC857]/40 shadow-md">
              <Award className="w-12 h-12 text-[#FF9F1C]" />
            </div>

            <h3 className="text-2xl font-heading font-extrabold text-[#1F2340]">
              ¡Reto Diario Completado!
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              ¡Excelente trabajo de {currentProfile.name} superando el reto de {currentProfile.age} años!
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFF5E8] border border-amber-300 my-4 text-[#8C5200] font-heading font-extrabold text-base">
              <Star className="w-5 h-5 fill-[#FFC857] text-[#FFC857]" /> +8 Estrellas agregadas
            </div>

            <TactileButton
              type="button"
              variant="primary"
              size="lg"
              fullWidth
              className="mt-2 min-h-[56px]"
              onClick={handleResetAndClose}
            >
              <CheckCircle className="w-5 h-5" />
              <span>Volver a Aventuras</span>
            </TactileButton>
          </div>
        )}
      </div>
    </div>
  );
};
