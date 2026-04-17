import { useGame } from '../context/GameContext';
import { formatTime } from '../hooks/useTimer';
import { generateCards } from '../utils/cardGenerator';
import { Confetti } from '../components/Confetti';

export function VictoryScreen() {
  const { state, dispatch } = useGame();

  const accuracy =
    state.moves > 0
      ? Math.round((state.matchedPairIds.length / state.moves) * 100)
      : 100;

  const handlePlayAgain = () => {
    if (!state.category || !state.gameMode) return;
    const cards = generateCards(state.category, state.gameMode, state.difficulty);
    dispatch({ type: 'START_GAME', cards });
  };

  const handleNewGame = () => {
    dispatch({ type: 'RESET' });
  };

  // 2-player winner logic
  const is2P = state.playerCount === 2;
  const winner = is2P
    ? state.players[0].score > state.players[1].score
      ? state.players[0]
      : state.players[1].score > state.players[0].score
        ? state.players[1]
        : null
    : null;
  const isTie = is2P && state.players[0].score === state.players[1].score;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <Confetti />

      <div className="relative z-10 text-center max-w-md w-full">
        {/* Trophy / Result */}
        <div className="mb-4 bounce-in">
          {is2P ? (
            isTie ? (
              <span className="text-7xl">🤝</span>
            ) : (
              <span className="text-7xl">🏆</span>
            )
          ) : (
            <span className="text-7xl">🎉</span>
          )}
        </div>

        <h2 className="text-4xl font-bold mb-2 bounce-in" style={{ animationDelay: '100ms' }}>
          {is2P
            ? isTie
              ? "It's a Tie!"
              : `${winner?.name} Wins!`
            : 'You Did It!'}
        </h2>

        {/* Stats */}
        <div
          className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6 mb-8 bounce-in"
          style={{ animationDelay: '200ms' }}
        >
          {is2P ? (
            <div className="flex justify-around mb-4">
              <div className="text-center">
                <p className="text-coral font-semibold">{state.players[0].name}</p>
                <p className="text-4xl font-bold text-white mt-1">
                  {state.players[0].score}
                </p>
                <p className="text-white/40 text-sm">pairs</p>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <p className="text-teal font-semibold">{state.players[1].name}</p>
                <p className="text-4xl font-bold text-white mt-1">
                  {state.players[1].score}
                </p>
                <p className="text-white/40 text-sm">pairs</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              <StatBox label="Time" value={formatTime(state.elapsedSeconds)} />
              <StatBox label="Moves" value={String(state.moves)} />
              <StatBox label="Accuracy" value={`${accuracy}%`} />
            </div>
          )}

          <p className="text-white/30 text-sm mt-4">
            Total moves: {state.moves} · {state.matchedPairIds.length} pairs matched
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center bounce-in" style={{ animationDelay: '350ms' }}>
          <button
            onClick={handlePlayAgain}
            className="px-8 py-3 bg-gradient-to-r from-coral to-coral-dark text-white font-bold
              rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-coral/30"
          >
            Play Again
          </button>
          <button
            onClick={handleNewGame}
            className="px-8 py-3 bg-white/10 border border-white/20 text-white font-bold
              rounded-xl hover:bg-white/15 transition-all"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-white/40 text-xs uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  );
}
