import React, { useState } from 'react';
import {
  getMathQuests,
  getAgeTierLabel,
  CountingQuestion,
  AdditionQuestion,
  MissingNumberQuestion,
  NumberRecognitionQuestion,
} from '../../data/mockQuests';
import { useApp } from '../../context/AppContext';
import { useSpeech } from '../../hooks/useSpeech';
import { useQuestSession } from '../../hooks/useQuestSession';
import { QuestHeader } from '../common/QuestHeader';
import { ProgressBar } from '../common/ProgressBar';
import { TactileButton } from '../common/TactileButton';
import { QuestFeedback } from '../common/QuestFeedback';
import { NumberRecognitionArena } from './math/NumberRecognitionArena';
import { CountingArena } from './math/CountingArena';
import { AdditionArena } from './math/AdditionArena';
import { SequenceArena } from './math/SequenceArena';
import { HelpCircle, ArrowRight, Check } from 'lucide-react';
import { soundEffects } from '../../utils/audio';

interface MathQuestProps {
  onComplete: (score: number, maxScore: number, starsEarned: number) => void;
  onExit: () => void;
}

export const MathQuest: React.FC<MathQuestProps> = ({ onComplete, onExit }) => {
  const { settings, subjectStats, currentProfile } = useApp();
  const { speak } = useSpeech();
  const decks = getMathQuests(currentProfile.age);
  const currentLevel = Math.min(subjectStats.math.level, decks.length);
  const deck = decks[currentLevel - 1] || decks[0];

  const {
    questionIndex,
    isAnswerChecked,
    isCorrect,
    isLastQuestion,
    checkAnswer,
    nextQuestion,
  } = useQuestSession({
    totalQuestions: deck.questions.length,
    starsReward: deck.starsReward,
    soundEnabled: settings.soundEffectsEnabled,
    onComplete,
  });

  const [tappedItems, setTappedItems] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);

  const question = deck.questions[questionIndex];

  const handleItemTap = (idx: number) => {
    soundEffects.playPop(settings.soundEffectsEnabled);
    if (!tappedItems.includes(idx)) {
      setTappedItems((prev) => [...prev, idx]);
    }
  };

  const handleSelectOption = (val: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(val);
    soundEffects.playPop(settings.soundEffectsEnabled);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;

    let correct = false;
    if (question.type === 'counting') {
      correct = selectedOption === (question as CountingQuestion).count;
    } else if (question.type === 'addition') {
      correct = selectedOption === (question as AdditionQuestion).correctAnswer;
    } else if (question.type === 'sequence') {
      correct = selectedOption === (question as MissingNumberQuestion).correctAnswer;
    } else if (question.type === 'number-recognition') {
      correct = selectedOption === (question as NumberRecognitionQuestion).targetNumber;
    }

    checkAnswer(correct);
  };

  const handleNext = () => {
    nextQuestion(() => {
      setSelectedOption(null);
      setTappedItems([]);
      setShowHint(false);
    });
  };

  const options: number[] = 'options' in question ? (question.options as number[]) : [];

  return (
    <div className="w-full max-w-2xl mx-auto py-2">
      <QuestHeader
        subject="math"
        title={deck.title}
        subtitle={`Pregunta ${questionIndex + 1} de ${deck.questions.length} • Nivel ${deck.level} (${getAgeTierLabel(currentProfile.age)})`}
        onQuit={onExit}
      />

      <ProgressBar
        progressPercent={(questionIndex / deck.questions.length) * 100}
        color="#2EC4B6"
        heightClass="h-3"
        className="mb-6"
      />

      <div className="bg-white rounded-3xl p-6 sm:p-8 card-elevation-1 border-t-4 border-[#2EC4B6] mb-6 animate-pop">
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1F2340]">
            {question.prompt}
          </h3>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            {question.instruction}
          </p>
        </div>

        {question.type === 'number-recognition' && (
          <NumberRecognitionArena
            question={question as NumberRecognitionQuestion}
            selectedOption={selectedOption}
            onSelectOption={handleSelectOption}
            isAnswerChecked={isAnswerChecked}
            onSpeak={(text) => {
              soundEffects.playPop(settings.soundEffectsEnabled);
              speak(text);
            }}
          />
        )}

        {question.type === 'counting' && (
          <CountingArena
            question={question as CountingQuestion}
            tappedItems={tappedItems}
            onItemTap={handleItemTap}
          />
        )}

        {question.type === 'addition' && (
          <AdditionArena
            question={question as AdditionQuestion}
            selectedOption={selectedOption}
          />
        )}

        {question.type === 'sequence' && (
          <SequenceArena
            question={question as MissingNumberQuestion}
            selectedOption={selectedOption}
          />
        )}

        {/* Options floor for counting, addition, sequence */}
        {question.type !== 'number-recognition' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {options.map((opt) => {
              const isSelected = selectedOption === opt;
              let btnVariant: 'white' | 'math' = 'white';
              let customStyle = '';

              if (isAnswerChecked) {
                const isTargetCorrect =
                  (question.type === 'counting' && opt === (question as CountingQuestion).count) ||
                  (question.type === 'addition' && opt === (question as AdditionQuestion).correctAnswer) ||
                  (question.type === 'sequence' && opt === (question as MissingNumberQuestion).correctAnswer);

                if (isTargetCorrect) {
                  btnVariant = 'math';
                } else if (isSelected && !isTargetCorrect) {
                  customStyle = 'bg-red-100 text-red-700 border-red-300';
                }
              } else if (isSelected) {
                customStyle = 'bg-[#2EC4B6]/20 border-2 border-[#2EC4B6] text-[#0B635B]';
              }

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelectOption(opt)}
                  className={`min-h-[56px] rounded-2xl font-heading font-extrabold text-2xl transition-all cursor-pointer ${
                    btnVariant === 'math'
                      ? 'btn-tactile-math'
                      : customStyle || 'btn-tactile-white text-[#1F2340]'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* Primary Action Button placed in lower thumb zone */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="min-h-[44px] flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#2EC4B6] transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{showHint ? 'Ocultar Pista' : '¿Necesitas una pista?'}</span>
          </button>

          {!isAnswerChecked ? (
            <TactileButton
              type="button"
              variant="math"
              size="md"
              disabled={selectedOption === null}
              onClick={handleCheckAnswer}
              className="w-full sm:w-auto min-h-[52px]"
            >
              <Check className="w-4 h-4" />
              <span>Comprobar Respuesta</span>
            </TactileButton>
          ) : (
            <TactileButton
              type="button"
              variant="primary"
              size="md"
              onClick={handleNext}
              className="w-full sm:w-auto min-h-[52px]"
            >
              <span>{isLastQuestion ? 'Terminar Misión' : 'Siguiente Pregunta'}</span>
              <ArrowRight className="w-4 h-4" />
            </TactileButton>
          )}
        </div>

        {showHint && (
          <div className="mt-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 font-medium animate-fadeIn">
            💡 Tómate tu tiempo: Cuenta en voz alta señalando con el dedo cada objeto.
          </div>
        )}

        {isAnswerChecked && (
          <QuestFeedback
            isCorrect={isCorrect}
            successTitle="¡Excelente Conteo!"
            successSubtitle="¡Encontraste la respuesta exacta!"
            encouragementTitle="¡Buen intento! Sigue adelante"
            encouragementSubtitle="Cada intento fortalece tu cerebro matemático."
            accentColor="#2EC4B6"
          />
        )}
      </div>
    </div>
  );
};
