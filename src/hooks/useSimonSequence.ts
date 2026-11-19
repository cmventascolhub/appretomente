import { useState, useCallback } from 'react';
import { SIMON_COLORS, getMelodyEchoConfig } from '../data/mockQuests';
import { soundEffects } from '../utils/audio';

export function useSimonSequence(soundEnabled: boolean, childAge: number = 5) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerStep, setPlayerStep] = useState<number>(0);
  const [activeColorId, setActiveColorId] = useState<string | null>(null);
  const [sequenceRound, setSequenceRound] = useState(1);
  const [isSequencePlaying, setIsSequencePlaying] = useState(false);
  const [isSequenceComplete, setIsSequenceComplete] = useState(false);

  const config = getMelodyEchoConfig(childAge);

  const playSequenceDemo = useCallback(
    async (seq: number[]) => {
      setIsSequencePlaying(true);
      for (let i = 0; i < seq.length; i++) {
        await new Promise((r) => setTimeout(r, config.stepNoteDelay));
        const colIdx = seq[i];
        const col = SIMON_COLORS[colIdx];
        setActiveColorId(col.id);
        soundEffects.playNote(col.freq, 0.25, soundEnabled);
        await new Promise((r) => setTimeout(r, 320));
        setActiveColorId(null);
      }
      setIsSequencePlaying(false);
    },
    [soundEnabled, config.stepNoteDelay]
  );

  const startSequenceGame = useCallback(() => {
    // Generate initial sequence based on age tier
    const initialSeq: number[] = [];
    for (let i = 0; i < config.initialLength; i++) {
      initialSeq.push(Math.floor(Math.random() * SIMON_COLORS.length));
    }
    setSequence(initialSeq);
    setPlayerStep(0);
    setSequenceRound(1);
    setIsSequenceComplete(false);
    playSequenceDemo(initialSeq);
  }, [config.initialLength, playSequenceDemo]);

  const tapColor = useCallback(
    (colorIdx: number) => {
      if (isSequencePlaying || isSequenceComplete) return;

      const col = SIMON_COLORS[colorIdx];
      soundEffects.playNote(col.freq, 0.2, soundEnabled);
      setActiveColorId(col.id);
      setTimeout(() => setActiveColorId(null), 250);

      if (colorIdx === sequence[playerStep]) {
        const nextStep = playerStep + 1;
        if (nextStep === sequence.length) {
          if (sequenceRound >= config.maxRounds) {
            setIsSequenceComplete(true);
            soundEffects.playStar(soundEnabled);
          } else {
            soundEffects.playCorrect(soundEnabled);
            setSequenceRound((prev) => prev + 1);
            setPlayerStep(0);
            const nextSeq = [...sequence, Math.floor(Math.random() * SIMON_COLORS.length)];
            setSequence(nextSeq);
            setTimeout(() => playSequenceDemo(nextSeq), 800);
          }
        } else {
          setPlayerStep(nextStep);
        }
      } else {
        soundEffects.playSoftBoop(soundEnabled);
        setPlayerStep(0);
        setTimeout(() => playSequenceDemo(sequence), 700);
      }
    },
    [
      isSequencePlaying,
      isSequenceComplete,
      sequence,
      playerStep,
      sequenceRound,
      config.maxRounds,
      soundEnabled,
      playSequenceDemo,
    ]
  );

  return {
    sequence,
    playerStep,
    activeColorId,
    sequenceRound,
    maxRounds: config.maxRounds,
    isSequencePlaying,
    isSequenceComplete,
    startSequenceGame,
    tapColor,
  };
}
