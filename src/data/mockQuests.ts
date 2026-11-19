import { SubjectCategory } from '../types';

export type AgeTier = 'early' | 'intermediate' | 'advanced';

export function getAgeTier(age: number): AgeTier {
  if (age <= 4) return 'early';
  if (age <= 6) return 'intermediate';
  return 'advanced';
}

export function getAgeTierLabel(age: number): string {
  if (age <= 4) return '4 años • Vocales y Números (1-5)';
  if (age <= 6) return '5-6 años • Letras y Números (1-10)';
  return '7+ años • Nivel Superior';
}

export interface BaseQuestion {
  id: string;
  type: string;
  prompt: string;
  instruction: string;
  hint?: string;
}

export interface NumberRecognitionQuestion extends BaseQuestion {
  type: 'number-recognition';
  targetNumber: number;
  options: number[];
  itemEmoji?: string;
  itemCount?: number;
  visualCue?: string;
}

export interface LetterRecognitionQuestion extends BaseQuestion {
  type: 'letter-recognition';
  targetLetter: string;
  wordExample: string;
  emoji: string;
  options: string[];
  displayWord?: string;
  audioCue?: string;
  mode: 'vowel' | 'initial-consonant' | 'missing-letter' | 'find-letter';
}

export interface CountingQuestion extends BaseQuestion {
  type: 'counting';
  itemEmoji: string;
  itemName: string;
  count: number;
  options: number[];
}

export interface AdditionQuestion extends BaseQuestion {
  type: 'addition';
  itemEmoji: string;
  leftCount: number;
  rightCount: number;
  correctAnswer: number;
  options: number[];
  operator?: '+' | '-' | '×';
  showNumericCard?: boolean;
}

export interface MissingNumberQuestion extends BaseQuestion {
  type: 'sequence';
  sequence: (number | string)[];
  correctAnswer: number;
  options: number[];
}

export interface WordScrambleQuestion extends BaseQuestion {
  type: 'word-scramble';
  word: string;
  emoji: string;
  scrambledLetters: string[];
  spanishTranslation?: string;
}

export interface PhonicsMatchQuestion extends BaseQuestion {
  type: 'phonics-match';
  targetWord: string;
  targetEmoji: string;
  options: { word: string; emoji: string }[];
  correctWord: string;
}

export interface RhymeQuestion extends BaseQuestion {
  type: 'rhyme';
  seedWord: string;
  seedEmoji: string;
  options: { word: string; emoji: string; isRhyme: boolean }[];
  correctAnswer: string;
}

export interface PatternQuestion extends BaseQuestion {
  type: 'pattern';
  sequence: string[];
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface OddOneOutQuestion extends BaseQuestion {
  type: 'odd-one-out';
  options: { text: string; emoji: string; isOdd: boolean; reason: string }[];
  correctReason: string;
}

export interface BalanceQuestion extends BaseQuestion {
  type: 'balance';
  leftSide: { count: number; weightPerUnit: number; emoji: string; label?: string };
  rightSide: { count: number; weightPerUnit: number; emoji: string; label?: string };
  questionType: 'heavier' | 'lighter' | 'equal';
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface QuestDeck {
  id: string;
  subject: SubjectCategory;
  level: number;
  ageTier: AgeTier;
  title: string;
  description: string;
  starsReward: number;
  questions: (
    | NumberRecognitionQuestion
    | LetterRecognitionQuestion
    | CountingQuestion
    | AdditionQuestion
    | MissingNumberQuestion
    | WordScrambleQuestion
    | PhonicsMatchQuestion
    | RhymeQuestion
    | PatternQuestion
    | OddOneOutQuestion
    | BalanceQuestion
  )[];
}

// ==========================================
// 1. MATEMÁTICAS POR EDAD
// ==========================================

export const MATH_QUESTS_EARLY: QuestDeck[] = [
  {
    id: 'math-early-1',
    subject: 'math',
    level: 1,
    ageTier: 'early',
    title: 'Descubre y Reconoce los Números (1 al 5)',
    description: 'Aprende a reconocer los números del 1 al 5 con tarjetas grandes e imágenes.',
    starsReward: 5,
    questions: [
      {
        id: 'me-1',
        type: 'number-recognition',
        prompt: '¿Dónde está el número 3?',
        instruction: 'Toca la tarjeta con el número 3.',
        visualCue: '¡Hay 3 estrellas brillantes para ti!',
        itemEmoji: '⭐',
        itemCount: 3,
        targetNumber: 3,
        options: [1, 2, 3, 5],
      },
      {
        id: 'me-2',
        type: 'number-recognition',
        prompt: 'Toca el número 1 para el conejito 🐰',
        instruction: 'El conejito tiene 1 zanahoria. Toca el número 1.',
        visualCue: '¡Una rica zanahoria!',
        itemEmoji: '🥕',
        itemCount: 1,
        targetNumber: 1,
        options: [1, 2, 4, 5],
      },
      {
        id: 'me-3',
        type: 'counting',
        prompt: '¿Cuántos patitos nadan en el agua?',
        instruction: 'Toca cada patito con tu dedito para contarlo.',
        itemEmoji: '🦆',
        itemName: 'patito',
        count: 2,
        options: [1, 2, 3, 4],
      },
      {
        id: 'me-4',
        type: 'number-recognition',
        prompt: '¿Cuál es el número 4 entre los globos?',
        instruction: 'Toca la tarjeta del número 4.',
        visualCue: '¡4 globos que vuelan alto!',
        itemEmoji: '🎈',
        itemCount: 4,
        targetNumber: 4,
        options: [2, 3, 4, 5],
      },
      {
        id: 'me-5',
        type: 'number-recognition',
        prompt: '¡Encuentra el número 5 en el cielo!',
        instruction: 'Toca el número 5 como los dedos de tu mano.',
        visualCue: '¡5 destellos mágicos!',
        itemEmoji: '✨',
        itemCount: 5,
        targetNumber: 5,
        options: [2, 3, 4, 5],
      },
    ],
  },
  {
    id: 'math-early-2',
    subject: 'math',
    level: 2,
    ageTier: 'early',
    title: 'Pequeño Conteo Táctil (1 a 4)',
    description: 'Toca y cuenta animalitos y frutas con guía visual paso a paso.',
    starsReward: 6,
    questions: [
      {
        id: 'me-6',
        type: 'counting',
        prompt: '¿Cuántas manzanas rojas hay en la canasta?',
        instruction: 'Toca cada manzanita con tu dedo: 1, 2, 3.',
        itemEmoji: '🍎',
        itemName: 'manzana',
        count: 3,
        options: [1, 2, 3, 4],
      },
      {
        id: 'me-7',
        type: 'number-recognition',
        prompt: '¿Dónde está el número 2 de los ositos?',
        instruction: 'Toca el número 2.',
        visualCue: '¡Dos ositos tiernos para abrazar!',
        itemEmoji: '🧸',
        itemCount: 2,
        targetNumber: 2,
        options: [1, 2, 3, 4],
      },
      {
        id: 'me-8',
        type: 'counting',
        prompt: '¡Cuenta las deliciosas fresas!',
        instruction: 'Toca las 4 fresitas una por una.',
        itemEmoji: '🍓',
        itemName: 'fresa',
        count: 4,
        options: [2, 3, 4, 5],
      },
    ],
  },
];

export const MATH_QUESTS_INTERMEDIATE: QuestDeck[] = [
  {
    id: 'math-mid-1',
    subject: 'math',
    level: 1,
    ageTier: 'intermediate',
    title: 'Reconoce Números del 1 al 10 y Cuenta (5-6 años)',
    description: 'Afianza los números del 6 al 10 con reconocimiento visual y conteo.',
    starsReward: 6,
    questions: [
      {
        id: 'mm-1',
        type: 'number-recognition',
        prompt: '¿Cuál es el número 7 entre las estrellas?',
        instruction: 'Identifica y toca la tarjeta con el número 7.',
        visualCue: '¡7 estrellas brillantes!',
        itemEmoji: '⭐',
        itemCount: 7,
        targetNumber: 7,
        options: [5, 6, 7, 8],
      },
      {
        id: 'mm-2',
        type: 'counting',
        prompt: '¿Cuántos autitos veloces hay en la pista?',
        instruction: 'Toca cada auto para contar con precisión.',
        itemEmoji: '🚗',
        itemName: 'auto',
        count: 6,
        options: [4, 5, 6, 7],
      },
      {
        id: 'mm-3',
        type: 'number-recognition',
        prompt: '¿Dónde está el gran número 10 de la nave?',
        instruction: 'Toca el número 10.',
        visualCue: '¡El número 10 para despegar!',
        itemEmoji: '🚀',
        itemCount: 0,
        targetNumber: 10,
        options: [7, 8, 9, 10],
      },
      {
        id: 'mm-4',
        type: 'counting',
        prompt: '¡Cuenta las mariposas mágicas del jardín!',
        instruction: 'Toca las mariposas en la pantalla.',
        itemEmoji: '🦋',
        itemName: 'mariposa',
        count: 5,
        options: [3, 4, 5, 6],
      },
      {
        id: 'mm-5',
        type: 'number-recognition',
        prompt: '¿Cuál es el número 8 en la colmena?',
        instruction: 'Toca la tarjeta del número 8.',
        visualCue: '¡8 tarros de rica miel!',
        itemEmoji: '🍯',
        itemCount: 8,
        targetNumber: 8,
        options: [6, 7, 8, 9],
      },
    ],
  },
  {
    id: 'math-mid-2',
    subject: 'math',
    level: 2,
    ageTier: 'intermediate',
    title: 'Sumas Visuales y Recta Numérica (5-6 años)',
    description: 'Primeras sumas con objetos concretos y números que faltan en la serie.',
    starsReward: 7,
    questions: [
      {
        id: 'mm-6',
        type: 'sequence',
        prompt: '¿Qué número falta en este tren numérico?',
        instruction: 'Sigue el conteo: 1, 2, 3, ?, 5',
        sequence: [1, 2, 3, '?', 5],
        correctAnswer: 4,
        options: [3, 4, 5, 6],
      },
      {
        id: 'mm-7',
        type: 'addition',
        prompt: '2 manzanas rojas más 2 manzanas verdes, ¿cuántas son?',
        instruction: 'Junta y cuenta todas las manzanas (2 + 2).',
        itemEmoji: '🍎',
        leftCount: 2,
        rightCount: 2,
        correctAnswer: 4,
        options: [3, 4, 5, 6],
      },
      {
        id: 'mm-8',
        type: 'sequence',
        prompt: '¿Qué número sigue en la fila de amigos?',
        instruction: 'Observa: 5, 6, 7, ?, 9',
        sequence: [5, 6, 7, '?', 9],
        correctAnswer: 8,
        options: [6, 7, 8, 10],
      },
      {
        id: 'mm-9',
        type: 'addition',
        prompt: '3 patitos en el agua más 2 patitos en la hierba, ¿cuántos hay?',
        instruction: 'Suma los dos grupos de patitos (3 + 2).',
        itemEmoji: '🦆',
        leftCount: 3,
        rightCount: 2,
        correctAnswer: 5,
        options: [4, 5, 6, 7],
      },
    ],
  },
];

export const MATH_QUESTS_ADVANCED: QuestDeck[] = [
  {
    id: 'math-adv-1',
    subject: 'math',
    level: 1,
    ageTier: 'advanced',
    title: 'Cálculo Mental y Dos Dígitos (7+ años)',
    description: 'Resuelve operaciones aritméticas de dos dígitos con agilidad mental.',
    starsReward: 8,
    questions: [
      {
        id: 'ma-1',
        type: 'addition',
        prompt: '14 manzanas verdes + 11 manzanas rojas, ¿cuál es el total?',
        instruction: 'Suma las unidades y decenas: 14 + 11.',
        itemEmoji: '🍏',
        leftCount: 14,
        rightCount: 11,
        correctAnswer: 25,
        options: [23, 24, 25, 26],
        showNumericCard: true,
      },
      {
        id: 'ma-2',
        type: 'addition',
        prompt: '23 gemas estelares + 12 gemas celestes, ¿cuántas suman?',
        instruction: 'Calcula mentalmente: 23 + 12.',
        itemEmoji: '💎',
        leftCount: 23,
        rightCount: 12,
        correctAnswer: 35,
        options: [33, 34, 35, 36],
        showNumericCard: true,
      },
      {
        id: 'ma-3',
        type: 'addition',
        prompt: 'Había 30 globos y se fueron 12. ¿Cuántos globos quedan? (30 - 12)',
        instruction: 'Resta 12 de 30 para encontrar el remanente.',
        itemEmoji: '🎈',
        leftCount: 30,
        rightCount: 12,
        operator: '-',
        correctAnswer: 18,
        options: [16, 17, 18, 19],
        showNumericCard: true,
      },
    ],
  },
  {
    id: 'math-adv-2',
    subject: 'math',
    level: 2,
    ageTier: 'advanced',
    title: 'Series Numéricas y Multiplicación (7+ años)',
    description: 'Descifra secuencias con saltos de 5 y 10, y descubre productos de grupos.',
    starsReward: 9,
    questions: [
      {
        id: 'ma-4',
        type: 'sequence',
        prompt: '¿Qué número completa la serie de 5 en 5?',
        instruction: 'Descubre el número faltante: 15, 20, 25, ?, 35',
        sequence: [15, 20, 25, '?', 35],
        correctAnswer: 30,
        options: [28, 29, 30, 32],
      },
      {
        id: 'ma-5',
        type: 'addition',
        prompt: '3 escuadrones con 4 cohetes espaciales cada uno. ¿Cuántos hay en total? (3 × 4)',
        instruction: 'Calcula la multiplicación: 3 grupos de 4 cohetes.',
        itemEmoji: '🚀',
        leftCount: 3,
        rightCount: 4,
        operator: '×',
        correctAnswer: 12,
        options: [10, 11, 12, 14],
        showNumericCard: true,
      },
      {
        id: 'ma-6',
        type: 'sequence',
        prompt: '¿Qué número completa la serie de decenas?',
        instruction: 'Observa el incremento de 10 en 10: 20, 30, 40, ?, 60',
        sequence: [20, 30, 40, '?', 60],
        correctAnswer: 50,
        options: [45, 48, 50, 55],
      },
    ],
  },
];

export function getMathQuests(age: number): QuestDeck[] {
  const tier = getAgeTier(age);
  if (tier === 'early') return MATH_QUESTS_EARLY;
  if (tier === 'intermediate') return MATH_QUESTS_INTERMEDIATE;
  return MATH_QUESTS_ADVANCED;
}

// ==========================================
// 2. PALABRAS & FONÉTICA POR EDAD
// ==========================================

export const LANGUAGE_QUESTS_EARLY: QuestDeck[] = [
  {
    id: 'lang-early-1',
    subject: 'language',
    level: 1,
    ageTier: 'early',
    title: 'El Jardín de las Vocales (A, E, I, O, U)',
    description: 'Reconoce las 5 vocales mágicas con imágenes grandes y sonidos claros.',
    starsReward: 5,
    questions: [
      {
        id: 'le-1',
        type: 'letter-recognition',
        prompt: 'Toca la letra A de Avión ✈️',
        instruction: 'Mira el avión en el cielo y encuentra la letra A.',
        targetLetter: 'A',
        wordExample: 'Avión',
        emoji: '✈️',
        displayWord: '_ V I Ó N',
        options: ['A', 'E', 'O', 'U'],
        mode: 'vowel',
        audioCue: 'Avión. Toca la letra A.',
      },
      {
        id: 'le-2',
        type: 'letter-recognition',
        prompt: '¿Con qué vocal empieza OSO? 🐻',
        instruction: 'Escucha el sonido inicial y toca la letra O.',
        targetLetter: 'O',
        wordExample: 'Oso',
        emoji: '🐻',
        displayWord: '_ S O',
        options: ['O', 'A', 'E', 'U'],
        mode: 'vowel',
        audioCue: 'Oso. Empieza con la letra O.',
      },
      {
        id: 'le-3',
        type: 'letter-recognition',
        prompt: 'Busca la letra E de Estrella ⭐',
        instruction: 'Toca la letra E que brilla en el cielo.',
        targetLetter: 'E',
        wordExample: 'Estrella',
        emoji: '⭐',
        displayWord: '_ S T R E L L A',
        options: ['E', 'I', 'O', 'A'],
        mode: 'vowel',
        audioCue: 'Estrella. Toca la letra E.',
      },
      {
        id: 'le-4',
        type: 'letter-recognition',
        prompt: 'Toca la vocal I de Isla 🏝️',
        instruction: 'Encuentra la letra I.',
        targetLetter: 'I',
        wordExample: 'Isla',
        emoji: '🏝️',
        displayWord: '_ S L A',
        options: ['I', 'A', 'E', 'U'],
        mode: 'vowel',
        audioCue: 'Isla. Toca la letra I.',
      },
      {
        id: 'le-5',
        type: 'letter-recognition',
        prompt: '¡Encuentra la vocal U de Uvas! 🍇',
        instruction: 'Toca la letra U de las uvas dulces.',
        targetLetter: 'U',
        wordExample: 'Uvas',
        emoji: '🍇',
        displayWord: '_ V A S',
        options: ['U', 'O', 'A', 'E'],
        mode: 'vowel',
        audioCue: 'Uvas. Toca la letra U.',
      },
    ],
  },
  {
    id: 'lang-early-2',
    subject: 'language',
    level: 2,
    ageTier: 'early',
    title: 'Primeros Sonidos con Imágenes (3-4 años)',
    description: 'Identifica la letra inicial y relaciona palabras cotidianas con su dibujo.',
    starsReward: 6,
    questions: [
      {
        id: 'le-6',
        type: 'letter-recognition',
        prompt: '¿Con qué vocal empieza OJO? 👁️',
        instruction: 'Toca la letra O.',
        targetLetter: 'O',
        wordExample: 'Ojo',
        emoji: '👁️',
        displayWord: '_ J O',
        options: ['O', 'E', 'A', 'I'],
        mode: 'vowel',
        audioCue: 'Ojo. Empieza con la vocal O.',
      },
      {
        id: 'le-7',
        type: 'letter-recognition',
        prompt: 'Toca la letra A de Abejita 🐝',
        instruction: 'Encuentra la letra A de la abeja.',
        targetLetter: 'A',
        wordExample: 'Abeja',
        emoji: '🐝',
        displayWord: '_ B E J A',
        options: ['A', 'U', 'I', 'O'],
        mode: 'vowel',
        audioCue: 'Abeja. Toca la letra A.',
      },
      {
        id: 'le-8',
        type: 'phonics-match',
        prompt: '¿Qué dibujo es este SOL radiante?',
        instruction: 'Toca la imagen del SOL.',
        targetWord: 'SOL',
        targetEmoji: '☀️',
        correctWord: 'SOL',
        options: [
          { word: 'SOL', emoji: '☀️' },
          { word: 'PAN', emoji: '🥖' },
          { word: 'OJO', emoji: '👁️' },
          { word: 'PEZ', emoji: '🐟' },
        ],
      },
    ],
  },
];

export const LANGUAGE_QUESTS_INTERMEDIATE: QuestDeck[] = [
  {
    id: 'lang-mid-1',
    subject: 'language',
    level: 1,
    ageTier: 'intermediate',
    title: 'Letras Iniciales: M, P, S, L, T (5-6 años)',
    description: 'Reconoce las primeras consonantes clave asociadas a objetos familiares.',
    starsReward: 6,
    questions: [
      {
        id: 'lm-1',
        type: 'letter-recognition',
        prompt: '¿Con qué letra empieza PELOTA? ⚽',
        instruction: 'Escucha el sonido de la P y toca la letra correcta.',
        targetLetter: 'P',
        wordExample: 'Pelota',
        emoji: '⚽',
        displayWord: '_ E L O T A',
        options: ['P', 'M', 'S', 'L'],
        mode: 'initial-consonant',
        audioCue: 'Pelota. Empieza con la letra P.',
      },
      {
        id: 'lm-2',
        type: 'letter-recognition',
        prompt: '¿Con qué letra empieza MANZANA? 🍎',
        instruction: 'Escucha el sonido Mmm y toca la letra M.',
        targetLetter: 'M',
        wordExample: 'Manzana',
        emoji: '🍎',
        displayWord: '_ A N Z A N A',
        options: ['M', 'P', 'T', 'L'],
        mode: 'initial-consonant',
        audioCue: 'Manzana. Empieza con la letra M.',
      },
      {
        id: 'lm-3',
        type: 'letter-recognition',
        prompt: '¿Con qué letra empieza SOL? ☀️',
        instruction: 'Sssssol... Toca la letra S.',
        targetLetter: 'S',
        wordExample: 'Sol',
        emoji: '☀️',
        displayWord: '_ O L',
        options: ['S', 'M', 'L', 'P'],
        mode: 'initial-consonant',
        audioCue: 'Sol. Empieza con la letra S.',
      },
      {
        id: 'lm-4',
        type: 'letter-recognition',
        prompt: '¿Con qué letra empieza LUNA? 🌙',
        instruction: 'Llluna... Toca la letra L.',
        targetLetter: 'L',
        wordExample: 'Luna',
        emoji: '🌙',
        displayWord: '_ U N A',
        options: ['L', 'S', 'P', 'T'],
        mode: 'initial-consonant',
        audioCue: 'Luna. Empieza con la letra L.',
      },
      {
        id: 'lm-5',
        type: 'letter-recognition',
        prompt: '¿Con qué letra empieza TORTUGA? 🐢',
        instruction: 'Toca la letra T.',
        targetLetter: 'T',
        wordExample: 'Tortuga',
        emoji: '🐢',
        displayWord: '_ O R T U G A',
        options: ['T', 'P', 'M', 'S'],
        mode: 'initial-consonant',
        audioCue: 'Tortuga. Empieza con la letra T.',
      },
    ],
  },
  {
    id: 'lang-mid-2',
    subject: 'language',
    level: 2,
    ageTier: 'intermediate',
    title: 'Completa la Letra Faltante (5-6 años)',
    description: 'Descubre qué vocal o consonante falta para completar palabras cotidianas.',
    starsReward: 7,
    questions: [
      {
        id: 'lm-6',
        type: 'letter-recognition',
        prompt: 'Completa la palabra SOL ☀️: S _ L',
        instruction: '¿Qué letra falta en medio para formar SOL?',
        targetLetter: 'O',
        wordExample: 'Sol',
        emoji: '☀️',
        displayWord: 'S _ L',
        options: ['O', 'A', 'E', 'U'],
        mode: 'missing-letter',
        audioCue: 'Sol. Falta la vocal O en el centro.',
      },
      {
        id: 'lm-7',
        type: 'letter-recognition',
        prompt: 'Completa la palabra PATO 🦆: P _ T O',
        instruction: '¿Qué letra falta para decir PATO?',
        targetLetter: 'A',
        wordExample: 'Pato',
        emoji: '🦆',
        displayWord: 'P _ T O',
        options: ['A', 'E', 'O', 'I'],
        mode: 'missing-letter',
        audioCue: 'Pato. Falta la letra A.',
      },
      {
        id: 'lm-8',
        type: 'letter-recognition',
        prompt: 'Completa la palabra LUNA 🌙: L _ N A',
        instruction: '¿Qué letra falta para decir LUNA?',
        targetLetter: 'U',
        wordExample: 'Luna',
        emoji: '🌙',
        displayWord: 'L _ N A',
        options: ['U', 'O', 'A', 'E'],
        mode: 'missing-letter',
        audioCue: 'Luna. Falta la letra U.',
      },
      {
        id: 'lm-9',
        type: 'letter-recognition',
        prompt: 'Completa la palabra MONO 🐒: M _ N O',
        instruction: '¿Qué letra falta para decir MONO?',
        targetLetter: 'O',
        wordExample: 'Mono',
        emoji: '🐒',
        displayWord: 'M _ N O',
        options: ['O', 'A', 'I', 'U'],
        mode: 'missing-letter',
        audioCue: 'Mono. Falta la letra O.',
      },
    ],
  },
];

export const LANGUAGE_QUESTS_ADVANCED: QuestDeck[] = [
  {
    id: 'lang-adv-1',
    subject: 'language',
    level: 1,
    ageTier: 'advanced',
    title: 'Desafío Léxico y Ortográfico Superior (7+ años)',
    description: 'Palabras complejas de 6 a 8 letras, vocabulario rico y relaciones léxicas.',
    starsReward: 8,
    questions: [
      {
        id: 'la-1',
        type: 'word-scramble',
        prompt: '¡Ordena las letras para nombrar este cuerpo del sistema solar!',
        instruction: 'Descifra la palabra de 7 letras: P - L - A - N - E - T - A',
        word: 'PLANETA',
        emoji: '🪐',
        spanishTranslation: 'Planeta',
        scrambledLetters: ['N', 'P', 'E', 'L', 'A', 'T', 'A'],
      },
      {
        id: 'la-2',
        type: 'phonics-match',
        prompt: 'El astronauta surcó la galaxia a bordo de su veloz...',
        instruction: 'Identifica la palabra precisa que completa la misión cósmica.',
        targetWord: 'COHETE',
        targetEmoji: '🚀',
        correctWord: 'COHETE',
        options: [
          { word: 'COHETE', emoji: '🚀' },
          { word: 'COMETA', emoji: '☄️' },
          { word: 'PLANETA', emoji: '🪐' },
          { word: 'ESTRELLA', emoji: '⭐' },
        ],
      },
      {
        id: 'la-3',
        type: 'rhyme',
        prompt: '¿Qué palabra poética rima con CORAZÓN?',
        instruction: 'Busca la rima asonante/consonante perfecta: -CIÓN / -ZÓN',
        seedWord: 'CORAZÓN',
        seedEmoji: '💖',
        correctAnswer: 'CANCIÓN',
        options: [
          { word: 'CANCIÓN', emoji: '🎵', isRhyme: true },
          { word: 'VIENTO', emoji: '💨', isRhyme: false },
          { word: 'UNIVERSO', emoji: '🌌', isRhyme: false },
          { word: 'BRÚJULA', emoji: '🧭', isRhyme: false },
        ],
      },
      {
        id: 'la-4',
        type: 'word-scramble',
        prompt: '¡Descifra esta palabra mágica que brilla en el firmamento nocturno!',
        instruction: 'Ordena las 8 letras: E - S - T - R - E - L - L - A',
        word: 'ESTRELLA',
        emoji: '⭐',
        spanishTranslation: 'Estrella',
        scrambledLetters: ['T', 'E', 'L', 'S', 'R', 'A', 'E', 'L'],
      },
    ],
  },
];

export function getLanguageQuests(age: number): QuestDeck[] {
  const tier = getAgeTier(age);
  if (tier === 'early') return LANGUAGE_QUESTS_EARLY;
  if (tier === 'intermediate') return LANGUAGE_QUESTS_INTERMEDIATE;
  return LANGUAGE_QUESTS_ADVANCED;
}

// ==========================================
// 3. LÓGICA DETECTIVE POR EDAD
// ==========================================

export const LOGIC_QUESTS_EARLY: QuestDeck[] = [
  {
    id: 'logic-early-1',
    subject: 'logic',
    level: 1,
    ageTier: 'early',
    title: 'Descubrimiento de Formas y Colores (3-4 años)',
    description: 'Patrones alternados simples e identificación visual evidente.',
    starsReward: 5,
    questions: [
      {
        id: 'loge-1',
        type: 'pattern',
        prompt: '¿Qué figura sigue en este ritmo de colores?',
        instruction: 'Mira el orden: Estrella, Corazón, Estrella, Corazón...',
        sequence: ['⭐', '💖', '⭐', '💖', '?'],
        options: ['⭐', '💖', '🍀', '🚀'],
        correctAnswer: '⭐',
        explanation: '¡El ritmo se repite: Estrella, Corazón, Estrella!',
      },
      {
        id: 'loge-2',
        type: 'odd-one-out',
        prompt: '¿Cuál elemento NO es una fruta deliciosa?',
        instruction: 'Toca el objeto que no pertenece al grupo de comida.',
        correctReason: '¡La pelota es un juguete, mientras las otras son frutas para comer!',
        options: [
          { text: 'Manzana', emoji: '🍎', isOdd: false, reason: 'Fruta' },
          { text: 'Plátano', emoji: '🍌', isOdd: false, reason: 'Fruta' },
          { text: 'Pelota', emoji: '⚽', isOdd: true, reason: 'Juguete' },
          { text: 'Fresa', emoji: '🍓', isOdd: false, reason: 'Fruta' },
        ],
      },
      {
        id: 'loge-3',
        type: 'pattern',
        prompt: '¿Qué animalito completa la fila?',
        instruction: 'Oso, Conejo, Oso, Conejo...',
        sequence: ['🐻', '🐰', '🐻', '🐰', '?'],
        options: ['🐻', '🐰', '🦁', '🦉'],
        correctAnswer: '🐻',
        explanation: '¡El Oso sigue al Conejito en esta fila!',
      },
      {
        id: 'loge-4',
        type: 'balance',
        prompt: '¿Cuál lado del balancín es más pesado?',
        instruction: 'Compara el elefante gigante con el ratoncito.',
        leftSide: { count: 1, weightPerUnit: 100, emoji: '🐘', label: 'Elefante' },
        rightSide: { count: 1, weightPerUnit: 2, emoji: '🐭', label: 'Ratón' },
        questionType: 'heavier',
        options: ['Lado Izquierdo (Elefante)', 'Lado Derecho (Ratón)', 'Pesan lo mismo'],
        correctAnswer: 'Lado Izquierdo (Elefante)',
        explanation: '¡El elefante pesado inclina la balanza con fuerza!',
      },
    ],
  },
];

export const LOGIC_QUESTS_INTERMEDIATE: QuestDeck[] = [
  {
    id: 'logic-mid-1',
    subject: 'logic',
    level: 1,
    ageTier: 'intermediate',
    title: 'Detective de Patrones y Categorías (5-6 años)',
    description: 'Patrones dobles A-A-B y clasificación por medio y hábitat.',
    starsReward: 6,
    questions: [
      {
        id: 'logm-1',
        type: 'pattern',
        prompt: '¿Qué color completa el patrón de bloques dobles?',
        instruction: 'Azul, Azul, Amarillo, Azul, Azul...',
        sequence: ['🔵', '🔵', '🟡', '🔵', '🔵', '?'],
        options: ['🟡', '🔵', '🟢', '🔴'],
        correctAnswer: '🟡',
        explanation: '¡El patrón es dos azules y uno amarillo: Azul, Azul, Amarillo!',
      },
      {
        id: 'logm-2',
        type: 'odd-one-out',
        prompt: '¿Cuál vehículo NO viaja por el aire?',
        instruction: 'Fíjate por dónde se desplaza cada medio de transporte.',
        correctReason: '¡El barco navega por el mar, mientras los otros 3 vuelan por el cielo!',
        options: [
          { text: 'Avión', emoji: '✈️', isOdd: false, reason: 'Aire' },
          { text: 'Cohete', emoji: '🚀', isOdd: false, reason: 'Aire' },
          { text: 'Barco', emoji: '🚢', isOdd: true, reason: 'Agua' },
          { text: 'Helicóptero', emoji: '🚁', isOdd: false, reason: 'Aire' },
        ],
      },
      {
        id: 'logm-3',
        type: 'pattern',
        prompt: '¿Qué animal sigue en la ronda de tres amigos?',
        instruction: 'León, Mono, Elefante, León, Mono...',
        sequence: ['🦁', '🐵', '🐘', '🦁', '🐵', '?'],
        options: ['🐘', '🦁', '🐵', '🐻'],
        correctAnswer: '🐘',
        explanation: '¡El trío se repite: León, Mono y finalmente Elefante!',
      },
      {
        id: 'logm-4',
        type: 'balance',
        prompt: '¿Cuál lado de la balanza pesa más?',
        instruction: 'Compara 1 sandía gigante con 2 manzanas pequeñas.',
        leftSide: { count: 1, weightPerUnit: 25, emoji: '🍉', label: '1 Sandía Grande' },
        rightSide: { count: 2, weightPerUnit: 3, emoji: '🍎', label: '2 Manzanas' },
        questionType: 'heavier',
        options: ['Lado Izquierdo (Sandía)', 'Lado Derecho (Manzanas)', 'Pesan lo mismo'],
        correctAnswer: 'Lado Izquierdo (Sandía)',
        explanation: '¡La sandía grande pesa mucho más que dos manzanitas!',
      },
    ],
  },
];

export const LOGIC_QUESTS_ADVANCED: QuestDeck[] = [
  {
    id: 'logic-adv-1',
    subject: 'logic',
    level: 1,
    ageTier: 'advanced',
    title: 'Deducción Multivariable y Balanzas Numéricas (7+ años)',
    description: 'Patrones geométricos crecientes, taxonomía biológica y equilibrio de masas.',
    starsReward: 8,
    questions: [
      {
        id: 'loga-1',
        type: 'pattern',
        prompt: '¿Qué figura completa esta progresión geométrica creciente?',
        instruction: 'Observa cómo aumenta cada grupo: 🔺 🟢 | 🔺🔺 🟢🟢 | 🔺🔺🔺 ...',
        sequence: ['🔺', '🟢', '🔺', '🔺', '🟢', '🟢', '🔺', '🔺', '🔺', '?'],
        options: ['🟢', '🔺', '⭐', '🟦'],
        correctAnswer: '🟢',
        explanation: '¡Cada ronda añade un elemento más: 1 y 1, 2 y 2, 3 y 3!',
      },
      {
        id: 'loga-2',
        type: 'odd-one-out',
        prompt: '¿Cuál ser vivo NO pertenece al grupo biológico de los mamíferos?',
        instruction: 'Tres son mamíferos (respiran aire y amamantan a sus crías) y uno es un ave.',
        correctReason: '¡El Pingüino es un ave ovípara (pone huevos), mientras que el Delfín, la Ballena y el Murciélago son mamíferos!',
        options: [
          { text: 'Delfín', emoji: '🐬', isOdd: false, reason: 'Mamífero marino' },
          { text: 'Ballena', emoji: '🐋', isOdd: false, reason: 'Mamífero marino' },
          { text: 'Murciélago', emoji: '🦇', isOdd: false, reason: 'Mamífero volador' },
          { text: 'Pingüino', emoji: '🐧', isOdd: true, reason: 'Ave no voladora' },
        ],
      },
      {
        id: 'loga-3',
        type: 'pattern',
        prompt: '¿Qué número completa la serie de potencias binarias en el laboratorio?',
        instruction: 'Cada valor se duplica: 2, 4, 8, 16, ?',
        sequence: ['2', '4', '8', '16', '?'],
        options: ['24', '30', '32', '36'],
        correctAnswer: '32',
        explanation: '¡El doble de 16 es 32 (16 × 2 = 32)!',
      },
      {
        id: 'loga-4',
        type: 'balance',
        prompt: '¿Cuál lado pesa más en esta balanza de carga espacial?',
        instruction: 'Izquierda: 2 cofres de 6 kg (12 kg). Derecha: 3 cajas de 4 kg (12 kg).',
        leftSide: { count: 2, weightPerUnit: 6, emoji: '📦', label: '2 cofres de 6 kg (12 kg)' },
        rightSide: { count: 3, weightPerUnit: 4, emoji: '📦', label: '3 cajas de 4 kg (12 kg)' },
        questionType: 'equal',
        options: ['Lado Izquierdo', 'Lado Derecho', '¡Pesan lo mismo (Equilibrados)!'],
        correctAnswer: '¡Pesan lo mismo (Equilibrados)!',
        explanation: '¡2 × 6 kg = 12 kg y 3 × 4 kg = 12 kg! Ambos lados tienen exactamente el mismo peso.',
      },
    ],
  },
];

export function getLogicQuests(age: number): QuestDeck[] {
  const tier = getAgeTier(age);
  if (tier === 'early') return LOGIC_QUESTS_EARLY;
  if (tier === 'intermediate') return LOGIC_QUESTS_INTERMEDIATE;
  return LOGIC_QUESTS_ADVANCED;
}

// ==========================================
// 4. MEMORIA POR EDAD
// ==========================================

export const MEMORY_CARDS_SETS = [
  { id: '1', emoji: '🦊', label: 'Zorro' },
  { id: '2', emoji: '🐼', label: 'Panda' },
  { id: '3', emoji: '🐬', label: 'Delfín' },
  { id: '4', emoji: '🦉', label: 'Búho' },
  { id: '5', emoji: '🚀', label: 'Cohete' },
  { id: '6', emoji: '🌈', label: 'Arcoíris' },
];

export function getMemoryCardPairsCount(age: number): number {
  const tier = getAgeTier(age);
  if (tier === 'early') return 3; // 6 cartas (3 parejas)
  if (tier === 'intermediate') return 4; // 8 cartas (4 parejas)
  return 6; // 12 cartas (6 parejas) - Nivel Superior
}

export function getMelodyEchoConfig(age: number) {
  const tier = getAgeTier(age);
  if (tier === 'early') {
    return { initialLength: 2, maxRounds: 2, stepNoteDelay: 700 };
  }
  if (tier === 'intermediate') {
    return { initialLength: 3, maxRounds: 3, stepNoteDelay: 600 };
  }
  // Advanced 7+
  return { initialLength: 4, maxRounds: 4, stepNoteDelay: 450 };
}

export const SIMON_COLORS = [
  { id: 'indigo', name: 'Índigo Real', color: '#4C5CD0', freq: 523.25, emoji: '🔷' },
  { id: 'gold', name: 'Oro Radiante', color: '#FFC857', freq: 659.25, emoji: '⭐' },
  { id: 'mint', name: 'Menta Fresca', color: '#2EC4B6', freq: 783.99, emoji: '🍀' },
  { id: 'amethyst', name: 'Violeta Amatista', color: '#845EC2', freq: 1046.5, emoji: '🔮' },
];

// Fallback exported arrays for backward compatibility
export const MATH_QUESTS = MATH_QUESTS_INTERMEDIATE;
export const LANGUAGE_QUESTS = LANGUAGE_QUESTS_INTERMEDIATE;
export const LOGIC_QUESTS = LOGIC_QUESTS_INTERMEDIATE;
