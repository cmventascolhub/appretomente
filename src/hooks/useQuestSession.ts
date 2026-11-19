import { useState, useCallback } from 'react';
import { soundEffects } from '../utils/audio';

interface UseQuestSessionOptions {
  totalQuestions: number;
  starsReward: number;
  soundEnabled: boolean;
  onComplete: (score: number, maxScore: number, starsEarned: number) => void;
}

export function useQuestSession({
  totalQuestions,
  starsReward,
  soundEnabled,
  onComplete,
}: UseQuestSessionOptions) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const checkAnswer = useCallback(
    (correct: boolean) => {
      setIsCorrect(correct);
      setIsAnswerChecked(true);

      if (correct) {
        soundEffects.playCorrect(soundEnabled);
        setScore((prev) => prev + 1);
      } else {
        soundEffects.playSoftBoop(soundEnabled);
      }
    },
    [soundEnabled]
  );

  const nextQuestion = useCallback(
    (onAdvance?: () => void) => {
      if (questionIndex + 1 < totalQuestions) {
        setQuestionIndex((prev) => prev + 1);
        setIsAnswerChecked(false);
        setIsCorrect(false);
        if (onAdvance) onAdvance();
      } else {
        onComplete(score, totalQuestions, starsReward);
      }
    },
    [questionIndex, totalQuestions, score, starsReward, onComplete]
  );

  const resetSession = useCallback(() => {
    setQuestionIndex(0);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setScore(0);
  }, []);

  return {
    questionIndex,
    isAnswerChecked,
    isCorrect,
    score,
    isLastQuestion: questionIndex + 1 >= totalQuestions,
    checkAnswer,
    nextQuestion,
    resetSession,
  };
}
