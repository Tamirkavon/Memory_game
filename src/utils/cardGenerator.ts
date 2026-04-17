import { Category, Difficulty, GameCard, GameMode, PAIR_COUNTS, WordEntry } from '../types';
import { categories } from '../data/categories';
import { shuffle } from './shuffle';

export function generateCards(
  category: Category,
  mode: GameMode,
  difficulty: Difficulty
): GameCard[] {
  const pairCount = PAIR_COUNTS[difficulty];

  // Get words — if category doesn't have enough, pull from others
  let words = [...category.words];
  if (words.length < pairCount) {
    const otherWords = categories
      .filter((c) => c.id !== category.id)
      .flatMap((c) => c.words);
    const extra = shuffle(otherWords).slice(0, pairCount - words.length);
    words = [...words, ...extra];
  }
  words = shuffle(words).slice(0, pairCount);

  const cards: GameCard[] = [];

  words.forEach((word) => {
    const pair = createPair(word, mode);
    cards.push(pair.question, pair.answer);
  });

  return shuffle(cards);
}

function createPair(
  word: WordEntry,
  mode: GameMode
): { question: GameCard; answer: GameCard } {
  const pairId = word.id;

  let questionContent: string;
  let answerContent: string;
  let questionRtl = false;
  let answerRtl = false;

  switch (mode) {
    case 'en-he':
      questionContent = word.english;
      answerContent = word.hebrew;
      answerRtl = true;
      break;
    case 'en-emoji':
      questionContent = word.english;
      answerContent = word.emoji;
      break;
    case 'en-definition':
      questionContent = word.english;
      answerContent = word.definition;
      break;
    case 'fill-blank':
      questionContent = word.sentence;
      answerContent = word.english;
      break;
  }

  return {
    question: {
      id: `${pairId}-q`,
      pairId,
      content: questionContent,
      type: 'question',
      isFlipped: false,
      isMatched: false,
      isRtl: questionRtl,
    },
    answer: {
      id: `${pairId}-a`,
      pairId,
      content: answerContent,
      type: 'answer',
      isFlipped: false,
      isMatched: false,
      isRtl: answerRtl,
    },
  };
}
