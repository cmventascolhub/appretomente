import React, { useState } from 'react';
import {
  getLanguageQuests,
  getAgeTierLabel,
  WordScrambleQuestion,
  PhonicsMatchQuestion,
  RhymeQuestion,
  LetterRecognitionQuestion,
} from '../../data/mockQuests';
import { useApp } from '../../context/AppContext';
import { useSpeech } from '../../hooks/useSpeech';
import { useQuestSession } from '../../hooks/useQuestSession';
import { QuestHeader } from '../common/QuestHeader';
import { ProgressBar } from '../common/ProgressBar';
import { TactileButton } from '../common/TactileButton';
import { QuestFeedback } from '../common/QuestFeedback';
import { LetterRecognitionArena } from './language/LetterRecognitionArena';
import { WordScrambleArena } from './language/WordScrambleArena';
import { PhonicsMatchArena } from './language/PhonicsMatchArena';
import { RhymeArena } from './language/RhymeArena';
import { ArrowRight, Check } from 'lucide-react';
import { soundEffects } from '../../utils/audio';

interface LanguageQuestProps {
  onComplete: (score: number, maxScore: number, starsEarned: number) => void;
  onExit: () => void;
}

export const LanguageQuest: React.FC<LanguageQuestProps> = ({ onComplete, onExit }) => {
  const { settings, currentProfile, subjectStats } = useApp();
  const decks = getLanguageQuests(currentProfile.age);
  const currentLevel = Math.min(subjectStats.language.level, decks.length);
  const deck = decks[currentLevel - 1] || decks[0];
  const { speak } = useSpeech();

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

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [assembledLetters, setAssembledLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ id: number; char: string }[]>(() => {
    const q = deck.questions[0];
    if (q.type === 'word-scramble') {
      return (q as WordScrambleQuestion).scrambledLetters.map((char, id) => ({ id, char }));
    }
    return [];
  });

  const question = deck.questions[questionIndex];

  const handleLetterTap = (letterObj: { id: number; char: string }) => {
    if (isAnswerChecked) return;
    soundEffects.playPop(settings.soundEffectsEnabled);
    setAssembledLetters((prev) => [...prev, letterObj.char]);
    setAvailableLetters((prev) => prev.filter((item) => item.id !== letterObj.id));
  };

  const handleResetLetters = () => {
    if (question.type === 'word-scramble') {
      soundEffects.playPop(settings.soundEffectsEnabled);
      setAssembledLetters([]);
      setAvailableLetters(
        (question as WordScrambleQuestion).scrambledLetters.map((char, id) => ({ id, char }))
      );
    }
  };

  const handleSelectWord = (word: string) => {
    if (isAnswerChecked) return;
    setSelectedWord(word);
    soundEffects.playPop(settings.soundEffectsEnabled);
  };

  const handleCheckAnswer = () => {
    let correct = false;
    if (question.type === 'word-scramble') {
      const spelled = assembledLetters.join('');
      correct = spelled === (question as WordScrambleQuestion).word;
    } else if (question.type === 'phonics-match') {
      correct = selectedWord === (question as PhonicsMatchQuestion).correctWord;
    } else if (question.type === 'rhyme') {
      correct = selectedWord === (question as RhymeQuestion).correctAnswer;
    } else if (question.type === 'letter-recognition') {
      correct = selectedWord === (question as LetterRecognitionQuestion).targetLetter;
    }

    checkAnswer(correct);
  };

  const handleNext = () => {
    nextQuestion(() => {
      setSelectedWord(null);
      setAssembledLetters([]);
      const nextQ = deck.questions[questionIndex + 1];
      if (nextQ && nextQ.type === 'word-scramble') {
        setAvailableLetters(
          (nextQ as WordScrambleQuestion).scrambledLetters.map((char, id) => ({ id, char }))
        );
      }
    });
  };

  const isReadyToCheck =
    question.type === 'word-scramble'
      ? assembledLetters.length === (question as WordScrambleQuestion).word.length
      : selectedWord !== null;

  return (
    <div className="w-full max-w-2xl mx-auto py-2">
      <QuestHeader
        subject="language"
        title={deck.title}
        subtitle={`Desafío ${questionIndex + 1} de ${deck.questions.length} • Nivel ${deck.level} (${getAgeTierLabel(currentProfile.age)})`}
        onQuit={onExit}
      />

      <ProgressBar
        progressPercent={(questionIndex / deck.questions.length) * 100}
        color="#FF9F1C"
        heightClass="h-3"
        className="mb-6"
      />

      <div className="bg-white rounded-3xl p-6 sm:p-8 card-elevation-1 border-t-4 border-[#FF9F1C] mb-6 animate-pop">
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1F2340]">
            {question.prompt}
          </h3>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            {question.instruction}
          </p>
        </div>

        {question.type === 'letter-recognition' && (
          <LetterRecognitionArena
            question={question as LetterRecognitionQuestion}
            selectedLetter={selectedWord}
            onSelectLetter={handleSelectWord}
            isAnswerChecked={isAnswerChecked}
            onSpeak={(text) => {
              soundEffects.playPop(settings.soundEffectsEnabled);
              speak(text);
            }}
          />
        )}

        {question.type === 'word-scramble' && (
          <WordScrambleArena
            question={question as WordScrambleQuestion}
            assembledLetters={assembledLetters}
            availableLetters={availableLetters}
            isAnswerChecked={isAnswerChecked}
            onLetterTap={handleLetterTap}
            onResetLetters={handleResetLetters}
          />
        )}

        {question.type === 'phonics-match' && (
          <PhonicsMatchArena
            question={question as PhonicsMatchQuestion}
            selectedWord={selectedWord}
            onSelectWord={handleSelectWord}
            onSpeak={(word) => {
              soundEffects.playPop(settings.soundEffectsEnabled);
              speak(word);
            }}
          />
        )}

        {question.type === 'rhyme' && (
          <RhymeArena
            question={question as RhymeQuestion}
            selectedWord={selectedWord}
            onSelectWord={handleSelectWord}
          />
        )}

        {/* Action Controls in lower thumb zone */}
        <div className="flex items-center justify-end pt-4 border-t border-gray-100">
          {!isAnswerChecked ? (
            <TactileButton
              type="button"
              variant="language"
              size="md"
              disabled={!isReadyToCheck}
              onClick={handleCheckAnswer}
              className="w-full sm:w-auto min-h-[52px]"
            >
              <Check className="w-4 h-4" />
              <span>Comprobar Palabra</span>
            </TactileButton>
          ) : (
            <TactileButton
              type="button"
              variant="primary"
              size="md"
              onClick={handleNext}
              className="w-full sm:w-auto min-h-[52px]"
            >
              <span>{isLastQuestion ? 'Terminar Misión' : 'Siguiente Palabra'}</span>
              <ArrowRight className="w-4 h-4" />
            </TactileButton>
          )}
        </div>

        {isAnswerChecked && (
          <QuestFeedback
            isCorrect={isCorrect}
            successTitle="¡Excelente Fonética!"
            successSubtitle="¡Tu vocabulario y dominio de palabras crece a pasos agigantados!"
            encouragementTitle="¡Sigue practicando!"
            encouragementSubtitle="Pronuncia cada sonido despacio y vuelve a intentarlo."
            accentColor="#FF9F1C"
          />
        )}
      </div>
    </div>
  );
};
