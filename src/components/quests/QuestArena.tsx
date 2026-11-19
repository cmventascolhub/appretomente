import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MathQuest } from './MathQuest';
import { LanguageQuest } from './LanguageQuest';
import { MemoryQuest } from './MemoryQuest';
import { LogicQuest } from './LogicQuest';
import { VictoryModal } from './VictoryModal';

export const QuestArena: React.FC = () => {
  const { activeSubject, quitQuest, completeQuest } = useApp();
  const [startTime] = useState<number>(() => Date.now());
  const [completedStats, setCompletedStats] = useState<{
    score: number;
    maxScore: number;
    starsEarned: number;
  } | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!activeSubject) {
    return null;
  }

  const handleQuestFinished = (score: number, maxScore: number, starsEarned: number) => {
    const elapsedSeconds = Math.max(15, Math.round((Date.now() - startTime) / 1000));
    completeQuest(activeSubject, score, maxScore, starsEarned, elapsedSeconds);
    setCompletedStats({ score, maxScore, starsEarned });
  };

  return (
    <div className="min-h-[calc(100vh-140px)] pb-24 px-4 pt-4">
      {/* Route to specific quest */}
      {activeSubject === 'math' && (
        <MathQuest onComplete={handleQuestFinished} onExit={quitQuest} />
      )}
      {activeSubject === 'language' && (
        <LanguageQuest onComplete={handleQuestFinished} onExit={quitQuest} />
      )}
      {activeSubject === 'memory' && (
        <MemoryQuest onComplete={handleQuestFinished} onExit={quitQuest} />
      )}
      {activeSubject === 'logic' && (
        <LogicQuest onComplete={handleQuestFinished} onExit={quitQuest} />
      )}

      {/* Victory Celebration Modal */}
      {completedStats && (
        <VictoryModal
          score={completedStats.score}
          maxScore={completedStats.maxScore}
          starsEarned={completedStats.starsEarned}
          onContinue={quitQuest}
        />
      )}
    </div>
  );
};
