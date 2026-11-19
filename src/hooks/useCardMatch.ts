import { useState, useEffect, useCallback } from 'react';
import { MEMORY_CARDS_SETS, getMemoryCardPairsCount } from '../data/mockQuests';
import { soundEffects } from '../utils/audio';

export interface CardItem {
  uid: string;
  id: string;
  emoji: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function useCardMatch(soundEnabled: boolean, childAge: number = 5) {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);

  const targetPairs = getMemoryCardPairsCount(childAge);

  const initCards = useCallback(() => {
    const chosen = MEMORY_CARDS_SETS.slice(0, targetPairs);
    const doubled = [...chosen, ...chosen].map((item, idx) => ({
      ...item,
      uid: `${item.id}-${idx}`,
      isFlipped: false,
      isMatched: false,
    }));

    const shuffled = doubled.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedPairs(0);
    setMoves(0);
  }, [targetPairs]);

  useEffect(() => {
    initCards();
  }, [initCards]);

  const flipCard = useCallback(
    (index: number) => {
      if (flippedIndices.length >= 2) return;
      if (cards[index].isFlipped || cards[index].isMatched) return;

      soundEffects.playFlip(soundEnabled);

      const newCards = [...cards];
      newCards[index].isFlipped = true;
      setCards(newCards);

      const newFlipped = [...flippedIndices, index];
      setFlippedIndices(newFlipped);

      if (newFlipped.length === 2) {
        setMoves((prev) => prev + 1);
        const [firstIdx, secondIdx] = newFlipped;
        if (cards[firstIdx].id === cards[secondIdx].id) {
          soundEffects.playCorrect(soundEnabled);
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c, i) =>
                i === firstIdx || i === secondIdx ? { ...c, isMatched: true } : c
              )
            );
            setFlippedIndices([]);
            setMatchedPairs((prev) => {
              const next = prev + 1;
              if (next === targetPairs) {
                soundEffects.playStar(soundEnabled);
              }
              return next;
            });
          }, 400);
        } else {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c, i) =>
                i === firstIdx || i === secondIdx ? { ...c, isFlipped: false } : c
              )
            );
            setFlippedIndices([]);
          }, 900);
        }
      }
    },
    [cards, flippedIndices, soundEnabled, targetPairs]
  );

  return {
    cards,
    targetPairs,
    matchedPairs,
    moves,
    isComplete: matchedPairs === targetPairs,
    flipCard,
    resetCards: initCards,
  };
}
