import { useGame } from '../context/GameContext';
import { Difficulty } from '../types';
import { generateCards } from '../utils/cardGenerator';

const DIFFICULTIES: { id: Difficulty; label: string; pairs: number; color: string; icon: string }[] = [
  { id: 'easy', label: 'Easy', pairs: 12, color: 'from-mint to-mint-dark border-mint shadow-mint/30', icon: '🌱' },
  { id: 'medium', label: 'Medium', pairs: 18, color: 'from-amber to-amber-dark border-amber shadow-amber/30', icon: '🔥' },
  { id: 'hard', label: 'Hard', pairs: 24, color: 'from-coral to-coral-dark border-coral shadow-coral/30', icon: '💀' },
];

export function DifficultySelectScreen() {
  const { state, dispatch } = useGame();

  const handleSelect = (diff: Difficulty) => {
    if (!state.category || !state.gameMode) return;
    dispatch({ type: 'SET_DIFFICULTY', difficulty: diff });
    const cards = generateCards(state.category, state.gameMode, diff);
    dispatch({ type: 'START_GAME', cards });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <button
        onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'category-select' })}
        className="self-start text-white/40 hover:text-white/70 transition-colors mb-6"
      >
        ← Back
      </button>

      <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-white">
        Choose Difficulty
      </h2>
      <p className="text-white/40 mb-2">
        {state.category?.icon} {state.category?.name}
      </p>
      <p className="text-white/30 text-sm mb-10">
        More pairs = more challenge!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
        {DIFFICULTIES.map((diff, i) => (
          <button
            key={diff.id}
            onClick={() => handleSelect(diff.id)}
            className={`flex-1 p-6 rounded-2xl border-2 bg-gradient-to-br
              font-bold text-white text-center transition-all duration-200
              hover:scale-105 active:scale-95 shadow-lg bounce-in ${diff.color}`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <span className="text-4xl block mb-2">{diff.icon}</span>
            <span className="text-2xl block mb-1">{diff.label}</span>
            <span className="text-white/60 text-sm font-normal">
              {diff.pairs} pairs · {diff.pairs * 2} cards
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
