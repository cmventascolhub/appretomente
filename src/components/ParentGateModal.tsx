import React, { useState, useId } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export const ParentGateModal: React.FC = () => {
  const { isParentGateOpen, closeParentGate, unlockParentPortal, settings } = useApp();
  const inputId = useId();

  // Simple multiplication problem easy for adults
  const [num1] = useState(() => Math.floor(Math.random() * 5) + 4); // 4-8
  const [num2] = useState(() => Math.floor(Math.random() * 4) + 3); // 3-6
  const correctAnswer = num1 * num2;

  const [inputVal, setInputVal] = useState('');
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isParentGateOpen) return null;

  const handleVerify = () => {
    if (!inputVal.trim()) {
      setErrorDetails('Por favor ingresa tu respuesta antes de continuar.');
      soundEffects.playSoftBoop(settings.soundEffectsEnabled);
      return;
    }

    setIsVerifying(true);
    setErrorDetails(null);

    // Visual verification state feedback
    setTimeout(() => {
      const parsed = parseInt(inputVal.trim(), 10);
      if (parsed === correctAnswer) {
        soundEffects.playCorrect(settings.soundEffectsEnabled);
        setIsVerifying(false);
        unlockParentPortal();
      } else {
        soundEffects.playSoftBoop(settings.soundEffectsEnabled);
        setIsVerifying(false);
        setErrorDetails(
          `La respuesta ${parsed} no es correcta para ${num1} × ${num2}. Intenta multiplicar de nuevo.`
        );
        setInputVal('');
      }
    }, 350);
  };

  const handleKeyPress = (digit: string) => {
    soundEffects.playPop(settings.soundEffectsEnabled);
    if (digit === 'C') {
      setInputVal('');
      setErrorDetails(null);
    } else if (digit === 'OK') {
      handleVerify();
    } else {
      if (inputVal.length < 3) {
        setInputVal((prev) => prev + digit);
        setErrorDetails(null);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2340]/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-[#4C5CD0]/15 card-elevation-2 animate-pop">
        {/* Close Button - min 48px touch */}
        <button
          type="button"
          onClick={closeParentGate}
          className="absolute top-3 right-3 min-w-[48px] min-h-[48px] flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
          aria-label="Cerrar verificación"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-4 pt-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#4C5CD0]/10 flex items-center justify-center text-[#4C5CD0] mb-2 shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-heading font-extrabold text-[#1F2340]">
            Verificación para Adultos
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Resuelve esta operación rápida para entrar a la Zona de Padres
          </p>
        </div>

        {/* Challenge Box */}
        <div className="bg-[#FFFDF7] border-2 border-[#4C5CD0]/20 rounded-2xl p-4 text-center mb-4 shadow-sm">
          <div className="text-2xl font-heading font-extrabold text-[#1F2340] tracking-wide">
            {num1} × {num2} = ?
          </div>

          <div className="mt-2">
            <label htmlFor={inputId} className="sr-only">Tu respuesta</label>
            <input
              id={inputId}
              type="text"
              inputMode="numeric"
              readOnly
              value={inputVal}
              placeholder={`Ej: ${correctAnswer}`}
              className="w-full text-center text-2xl font-bold font-heading py-2.5 rounded-xl border border-gray-200 bg-white shadow-inner focus:outline-none tracking-widest text-[#1F2340]"
            />
          </div>

          {errorDetails && (
            <div className="text-xs text-red-600 mt-2 font-medium flex items-center justify-center gap-1.5 bg-red-50 p-2 rounded-xl border border-red-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
              <span>{errorDetails}</span>
            </div>
          )}
        </div>

        {/* Keypad with comfortable thumb buttons (min 48px height) */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'OK'].map((key) => {
            const isOk = key === 'OK';
            const isClear = key === 'C';

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleKeyPress(key)}
                disabled={isVerifying}
                className={`min-h-[50px] rounded-xl font-heading font-bold text-base transition-all select-none cursor-pointer flex items-center justify-center ${
                  isOk
                    ? 'btn-tactile-primary col-span-1 text-white'
                    : isClear
                    ? 'btn-tactile-white text-gray-600'
                    : 'btn-tactile-white text-[#1F2340]'
                }`}
              >
                {isOk ? (
                  isVerifying ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <CheckCircle className="w-5 h-5" />
                  )
                ) : (
                  key
                )}
              </button>
            );
          })}
        </div>

        {/* Back / Cancel button */}
        <button
          type="button"
          onClick={closeParentGate}
          className="w-full min-h-[48px] py-2 text-center text-xs font-semibold text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
        >
          ← Cancelar y volver a Aventuras
        </button>
      </div>
    </div>
  );
};
