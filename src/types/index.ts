export type GameMode = 'en-he' | 'fill-blank';

export type Difficulty = 'easy' | 'medium' | 'hard';

export const PAIR_COUNTS: Record<Difficulty, number> = {
  easy: 12,
  medium: 18,
  hard: 24,
};

export interface WordEntry {
  id: string;
  english: string;
  hebrew: string;
  emoji: string;
  definition: string;
  sentence: string;
}

export interface Category {
  id: string;
  name: string;
  nameHebrew: string;
  icon: string;
  color: string;
  words: WordEntry[];
}

export interface GameCard {
  id: string;
  pairId: string;
  content: string;
  type: 'question' | 'answer';
  isFlipped: boolean;
  isMatched: boolean;
  isRtl: boolean;
}

export interface Player {
  name: string;
  score: number;
}

export type Screen =
  | 'home'
  | 'mode-select'
  | 'category-select'
  | 'difficulty-select'
  | 'game'
  | 'victory';

export interface ActiveCategory {
  icon: string;
  name: string;
}

export interface GameState {
  screen: Screen;
  gameMode: GameMode | null;
  category: Category | null;
  difficulty: Difficulty;
  playerCount: 1 | 2;
  players: Player[];
  currentPlayerIndex: number;
  cards: GameCard[];
  flippedCardIds: string[];
  matchedPairIds: string[];
  moves: number;
  elapsedSeconds: number;
  isProcessing: boolean;
  gameStarted: boolean;
  activeCategories: ActiveCategory[];
}

export type GameAction =
  | { type: 'SET_SCREEN'; screen: Screen }
  | { type: 'SET_MODE'; mode: GameMode }
  | { type: 'SET_CATEGORY'; category: Category }
  | { type: 'SET_DIFFICULTY'; difficulty: Difficulty }
  | { type: 'SET_PLAYER_COUNT'; count: 1 | 2 }
  | { type: 'SET_PLAYER_NAMES'; names: string[] }
  | { type: 'START_GAME'; cards: GameCard[]; activeCategories: ActiveCategory[] }
  | { type: 'FLIP_CARD'; cardId: string }
  | { type: 'MATCH_FOUND'; pairId: string }
  | { type: 'MISMATCH' }
  | { type: 'TICK' }
  | { type: 'QUIZ_FINISH'; correct: number; total: number; elapsedSeconds: number }
  | { type: 'RESET' };
