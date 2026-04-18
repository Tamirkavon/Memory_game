import { ActiveCategory, Difficulty, GameCard, GameMode, PAIR_COUNTS, WordEntry } from '../types';
import { categories } from '../data/categories';
import { shuffle } from './shuffle';

export function generateCards(
  mode: GameMode,
  difficulty: Difficulty
): { cards: GameCard[]; activeCategories: ActiveCategory[] } {
  const pairCount = PAIR_COUNTS[difficulty];
  const allWords = categories.flatMap((c) => c.words);
  const words = shuffle(allWords).slice(0, pairCount);

  // Determine which categories appear in the selected words
  const wordToCat = new Map<string, ActiveCategory>();
  categories.forEach((cat) => {
    cat.words.forEach((w) => {
      wordToCat.set(w.id, { icon: cat.icon, name: cat.name });
    });
  });
  const seen = new Set<string>();
  const activeCategories: ActiveCategory[] = [];
  words.forEach((w) => {
    const cat = wordToCat.get(w.id);
    if (cat && !seen.has(cat.name)) {
      seen.add(cat.name);
      activeCategories.push(cat);
    }
  });

  const cards: GameCard[] = [];
  words.forEach((word) => {
    const pair = createPair(word, mode);
    cards.push(pair.question, pair.answer);
  });

  return { cards: shuffle(cards), activeCategories };
}

function createPair(
  word: WordEntry,
  mode: GameMode
): { question: GameCard; answer: GameCard } {
  const pairId = word.id;

  let questionContent: string;
  let answerContent: string;
  let answerRtl = false;

  switch (mode) {
    case 'en-he':
      questionContent = word.english;
      answerContent = word.hebrew;
      answerRtl = true;
      break;
    case 'fill-blank':
      questionContent = word.sentence;
      answerContent = word.english;
      break;
    default:
      questionContent = word.english;
      answerContent = word.hebrew;
      answerRtl = true;
  }

  return {
    question: {
      id: `${pairId}-q`,
      pairId,
      content: questionContent,
      type: 'question',
      isFlipped: false,
      isMatched: false,
      isRtl: false,
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
