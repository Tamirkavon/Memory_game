import { useGame } from '../context/GameContext';
import { useTimer } from '../hooks/useTimer';
import { GameBoard } from '../components/GameBoard';
import { ScoreBar } from '../components/ScoreBar';

export function GameScreen() {
  const { dispatch } = useGame();
  useTimer();

  return (
    <div className="min-h-screen flex flex-col items-center py-4">
      {/* Top bar */}
      <div className="w-full flex items-center justify-between max-w-4xl px-4 mb-2">
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="text-white/30 hover:text-white/60 transition-colors text-sm"
        >
          ✕ Quit
        </button>
      </div>

      <ScoreBar />

      <div className="flex-1 flex items-center py-4">
        <GameBoard />
      </div>
    </div>
  );
}
