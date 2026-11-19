import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  if (typeof window === 'undefined') return;

  const count = 100;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors: ['#4C5CD0', '#FFC857', '#2EC4B6', '#FF9F1C', '#845EC2', '#00B4D8'],
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function fireStarSparkles() {
  if (typeof window === 'undefined') return;

  confetti({
    particleCount: 40,
    angle: 60,
    spread: 55,
    origin: { x: 0.1, y: 0.3 },
    colors: ['#FFC857', '#FFE082', '#FFF59D'],
    shapes: ['star'],
    zIndex: 9999,
  });

  confetti({
    particleCount: 40,
    angle: 120,
    spread: 55,
    origin: { x: 0.9, y: 0.3 },
    colors: ['#FFC857', '#FFE082', '#FFF59D'],
    shapes: ['star'],
    zIndex: 9999,
  });
}
