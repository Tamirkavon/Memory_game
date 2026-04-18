import { useGame } from '../context/GameContext';
import { Difficulty } from '../types';
import { generateCards } from '../utils/cardGenerator';

const DIFFICULTIES: { id: Difficulty; label: string; pairs: number; desc: string }[] = [
  { id: 'easy', label: 'Easy', pairs: 12, desc: '12 pairs · 24 cards' },
  { id: 'medium', label: 'Medium', pairs: 18, desc: '18 pairs · 36 cards' },
  { id: 'hard', label: 'Hard', pairs: 24, desc: '24 pairs · 48 cards' },
];

export function DifficultySelectScreen() {
  const { state, dispatch } = useGame();

  const handleSelect = (diff: Difficulty) => {
    if (!state.gameMode) return;
    dispatch({ type: 'SET_DIFFICULTY', difficulty: diff });
    const { cards, activeCategories } = generateCards(state.gameMode, diff);
    dispatch({ type: 'START_GAME', cards, activeCategories });
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-8" style={{ background: '#0e0d0b' }}>
      <button
        onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'mode-select' })}
        className="self-start text-sm mb-8 transition-colors"
        style={{ color: '#6b6760' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#f0ede6')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#6b6760')}
      >
        ← Back
      </button>

      <div className="max-w-xl mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="mb-8">
          <h2
            className="font-bold uppercase mb-1"
            style={{ fontSize: '1.75rem', letterSpacing: '-0.02em', color: '#f0ede6' }}
          >
            Difficulty
          </h2>
          <p className="text-sm" style={{ color: '#6b6760' }}>
            מילים מכל הנושאים
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {DIFFICULTIES.map((diff, i) => (
            <button
              key={diff.id}
              onClick={() => handleSelect(diff.id)}
              className="w-full px-5 py-5 rounded-xl text-left transition-all duration-150
                hover:scale-[1.01] active:scale-[0.99] bounce-in"
              style={{
                background: '#191714',
                border: '1.5px solid rgba(240,237,230,0.10)',
                animationDelay: `${i * 80}ms`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#d4ff00';
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(212,255,0,0.06)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(240,237,230,0.10)';
                (e.currentTarget as HTMLButtonElement).style.background = '#191714';
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-bold text-lg"
                  style={{ color: '#f0ede6' }}
                >
                  {diff.label}
                </span>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(240,237,230,0.07)', color: '#6b6760' }}
                >
                  {diff.desc}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
