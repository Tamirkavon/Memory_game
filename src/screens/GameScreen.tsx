import { useGame } from '../context/GameContext';
import { useTimer } from '../hooks/useTimer';
import { GameBoard } from '../components/GameBoard';
import { ScoreBar } from '../components/ScoreBar';

export function GameScreen() {
  const { state, dispatch } = useGame();
  useTimer();

  return (
    <div
      className="min-h-screen flex flex-col items-center py-4"
      style={{ background: '#0e0d0b' }}
    >
      {/* Top bar */}
      <div className="w-full flex items-center justify-between max-w-4xl px-4 mb-2">
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="text-sm transition-colors"
          style={{ color: '#6b6760' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#f0ede6')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6b6760')}
        >
          ✕ Quit
        </button>
      </div>

      <ScoreBar />

      {/* Active category badges */}
      {state.activeCategories.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap px-4 pb-1">
          {state.activeCategories.map((cat) => (
            <span
              key={cat.name}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(240,237,230,0.07)', color: '#6b6760' }}
            >
              {cat.icon} {cat.name}
            </span>
          ))}
        </div>
      )}

      <div className="flex-1 flex items-center justify-center py-4 w-full">
        <GameBoard />
      </div>
    </div>
  );
}
