import { useCallback } from 'react';

export function useSpeech() {
  const speak = useCallback((text: string, lang = 'es-ES', rate = 0.85) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Graceful fallback if speech synthesis is unavailable
    }
  }, []);

  return { speak };
}
