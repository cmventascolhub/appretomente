import React, { useState } from 'react';
import {
  getLogicQuests,
  getAgeTierLabel,
  PatternQuestion,
  OddOneOutQuestion,
  BalanceQuestion,
} from '../../data/mockQuests';
import { useApp } from '../../context/AppContext';
import { useQuestSession } from '../../hooks/useQuestSession';
import { QuestHeader } from '../common/QuestHeader';
import { ProgressBar } from '../common/ProgressBar';
import { TactileButton } from '../common/TactileButton';
import { QuestFeedback } from '../common/QuestFeedback';
import { PatternArena } from './logic/PatternArena';
import { OddOneOutArena } from './logic/OddOneOutArena';
import { BalanceArena } from './logic/BalanceArena';
import { ArrowRight, Check } from 'lucide-react';
import { soundEffects } from '../../utils/audio';

interface LogicQuestProps {
  onComplete: (score: number, maxScore: number, starsEarned: number) => void;
  onExit: () => void;
}

export const LogicQuest: React.FC<LogicQuestProps> = ({ onComplete, onExit }) => {
  const { settings, currentProfile, subjectStats } = useApp();
  const decks = getLogicQuests(currentProfile.age);
  const currentLevel = Math.min(subjectStats.logic.level, decks.length);
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

  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const question = deck.questions[questionIndex];

  const handleSelectChoice = (choice: string) => {
    if (isAnswerChecked) return;
    setSelectedChoice(choice);
    soundEffects.playPop(settings.soundEffectsEnabled);
  };

  const handleCheckAnswer = () => {
    if (!selectedChoice) return;

    let correct = false;
    if (question.type === 'pattern') {
      correct = selectedChoice === (question as PatternQuestion).correctAnswer;
    } else if (question.type === 'odd-one-out') {
      const oddItem = (question as OddOneOutQuestion).options.find((o) => o.isOdd);
      correct = selectedChoice === oddItem?.text;
    } else if (question.type === 'balance') {
      correct = selectedChoice === (question as BalanceQuestion).correctAnswer;
    }

    checkAnswer(correct);
  };

  const handleNext = () => {
    nextQuestion(() => {
      setSelectedChoice(null);
    });
  };

  const getExplanation = () => {
    if (question.type === 'odd-one-out') {
      return (question as OddOneOutQuestion).correctReason;
    }
    if (question.type === 'pattern') {
      return (question as PatternQuestion).explanation;
    }
    if (question.type === 'balance') {
      return (question as BalanceQuestion).explanation || '¡Compara cuidadosamente el peso de ambos lados!';
    }
    return '';
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-2">
      <QuestHeader
        subject="logic"
        title={deck.title}
        subtitle={`Acertijo ${questionIndex + 1} de ${deck.questions.length} • Nivel ${deck.level} (${getAgeTierLabel(currentProfile.age)})`}
        onQuit={onExit}
      />

      <ProgressBar
        progressPercent={(questionIndex / deck.questions.length) * 100}
        color="#00B4D8"
        heightClass="h-3"
        className="mb-6"
      />

      <div className="bg-white rounded-3xl p-6 sm:p-8 card-elevation-1 border-t-4 border-[#00B4D8] mb-6 animate-pop">
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1F2340]">
            {question.prompt}
          </h3>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            {question.instruction}
          </p>
        </div>

        {question.type === 'pattern' && (
          <PatternArena
            question={question as PatternQuestion}
            selectedChoice={selectedChoice}
            onSelectChoice={handleSelectChoice}
          />
        )}

        {question.type === 'odd-one-out' && (
          <OddOneOutArena
            question={question as OddOneOutQuestion}
            selectedChoice={selectedChoice}
            isAnswerChecked={isAnswerChecked}
            onSelectChoice={handleSelectChoice}
          />
        )}

        {question.type === 'balance' && (
          <BalanceArena
            question={question as BalanceQuestion}
            selectedChoice={selectedChoice}
            onSelectChoice={handleSelectChoice}
          />
        )}

        {/* Action Controls in lower thumb zone */}
        <div className="flex items-center justify-end pt-4 border-t border-gray-100">
          {!isAnswerChecked ? (
            <TactileButton
              type="button"
              variant="logic"
              size="md"
              disabled={!selectedChoice}
              onClick={handleCheckAnswer}
              className="w-full sm:w-auto min-h-[52px]"
            >
              <Check className="w-4 h-4" />
              <span>Comprobar Deducción</span>
            </TactileButton>
          ) : (
            <TactileButton
              type="button"
              variant="primary"
              size="md"
              onClick={handleNext}
              className="w-full sm:w-auto min-h-[52px]"
            >
              <span>{isLastQuestion ? 'Terminar Misión' : 'Siguiente Acertijo'}</span>
              <ArrowRight className="w-4 h-4" />
            </TactileButton>
          )}
        </div>

        {isAnswerChecked && (
          <QuestFeedback
            isCorrect={isCorrect}
            successTitle="¡Deducción Brillante!"
            successSubtitle={getExplanation()}
            encouragementTitle="¡Buen intento!"
            encouragementSubtitle={getExplanation()}
            accentColor="#00B4D8"
          />
        )}
      </div>
    </div>
  );
};
