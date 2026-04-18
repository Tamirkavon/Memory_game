import { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, GameAction } from '../types';

const initialState: GameState = {
  screen: 'home',
  gameMode: null,
  category: null,
  difficulty: 'easy',
  playerCount: 1,
  players: [{ name: 'Player 1', score: 0 }],
  currentPlayerIndex: 0,
  cards: [],
  flippedCardIds: [],
  matchedPairIds: [],
  moves: 0,
  elapsedSeconds: 0,
  isProcessing: false,
  gameStarted: false,
  activeCategories: [],
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, screen: action.screen };

    case 'SET_MODE':
      return { ...state, gameMode: action.mode };

    case 'SET_CATEGORY':
      return { ...state, category: action.category };

    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.difficulty };

    case 'SET_PLAYER_COUNT':
      return {
        ...state,
        playerCount: action.count,
        players:
          action.count === 1
            ? [{ name: 'Player 1', score: 0 }]
            : [
                { name: 'Player 1', score: 0 },
                { name: 'Player 2', score: 0 },
              ],
      };

    case 'SET_PLAYER_NAMES':
      return {
        ...state,
        players: state.players.map((p, i) => ({
          ...p,
          name: action.names[i] || p.name,
        })),
      };

    case 'START_GAME':
      return {
        ...state,
        cards: action.cards,
        activeCategories: action.activeCategories,
        flippedCardIds: [],
        matchedPairIds: [],
        moves: 0,
        elapsedSeconds: 0,
        currentPlayerIndex: 0,
        players: state.players.map((p) => ({ ...p, score: 0 })),
        isProcessing: false,
        gameStarted: true,
        screen: 'game',
      };

    case 'FLIP_CARD': {
      if (state.isProcessing) return state;
      if (state.flippedCardIds.length >= 2) return state;
      if (state.flippedCardIds.includes(action.cardId)) return state;

      const card = state.cards.find((c) => c.id === action.cardId);
      if (!card || card.isMatched || card.isFlipped) return state;

      const newFlipped = [...state.flippedCardIds, action.cardId];
      const newCards = state.cards.map((c) =>
        c.id === action.cardId ? { ...c, isFlipped: true } : c
      );

      return {
        ...state,
        cards: newCards,
        flippedCardIds: newFlipped,
        isProcessing: newFlipped.length === 2,
      };
    }

    case 'MATCH_FOUND': {
      const newMatchedPairIds = [...state.matchedPairIds, action.pairId];
      const newCards = state.cards.map((c) =>
        c.pairId === action.pairId ? { ...c, isMatched: true, isFlipped: true } : c
      );
      const newPlayers = state.players.map((p, i) =>
        i === state.currentPlayerIndex ? { ...p, score: p.score + 1 } : p
      );
      const isGameOver = newMatchedPairIds.length === state.cards.length / 2;

      return {
        ...state,
        cards: newCards,
        matchedPairIds: newMatchedPairIds,
        flippedCardIds: [],
        moves: state.moves + 1,
        players: newPlayers,
        isProcessing: false,
        screen: isGameOver ? 'victory' : state.screen,
        gameStarted: isGameOver ? false : state.gameStarted,
      };
    }

    case 'MISMATCH': {
      const flippedIds = state.flippedCardIds;
      const newCards = state.cards.map((c) =>
        flippedIds.includes(c.id) ? { ...c, isFlipped: false } : c
      );
      const nextPlayer =
        state.playerCount === 2
          ? (state.currentPlayerIndex + 1) % 2
          : state.currentPlayerIndex;

      return {
        ...state,
        cards: newCards,
        flippedCardIds: [],
        moves: state.moves + 1,
        currentPlayerIndex: nextPlayer,
        isProcessing: false,
      };
    }

    case 'TICK':
      return { ...state, elapsedSeconds: state.elapsedSeconds + 1 };

    case 'QUIZ_FINISH':
      return {
        ...state,
        matchedPairIds: Array.from({ length: action.correct }, (_, i) => `q${i}`),
        moves: action.total,
        elapsedSeconds: action.elapsedSeconds,
        screen: 'victory',
        gameStarted: false,
      };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

