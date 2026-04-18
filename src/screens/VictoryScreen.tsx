import { useGame } from '../context/GameContext';
import { formatTime } from '../hooks/useTimer';
import { generateCards } from '../utils/cardGenerator';
import { Confetti } from '../components/Confetti';

export function VictoryScreen() {
  const { state, dispatch } = useGame();

  const isQuiz = state.gameMode === 'fill-blank';

  // Quiz: matchedPairIds.length = correct answers, moves = total questions
  // Memory: matchedPairIds.length = pairs found, moves = total attempts
  const correct = state.matchedPairIds.length;
  const total = state.moves;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 100;

  const handlePlayAgain = () => {
    if (!state.gameMode) return;
    if (state.gameMode === 'fill-blank') {
      // Quiz regenerates its own questions on mount — just re-enter game screen
      dispatch({ type: 'START_GAME', cards: [], activeCategories: [] });
    } else {
      const { cards, activeCategories } = generateCards(state.gameMode, state.difficulty);
      dispatch({ type: 'START_GAME', cards, activeCategories });
    }
  };

  const handleNewGame = () => {
    dispatch({ type: 'RESET' });
  };

  // 2-player winner logic (memory mode only)
  const is2P = state.playerCount === 2 && !isQuiz;
  const p0 = state.players[0];
  const p1 = state.players[1];
  const winner = is2P
    ? p0.score > p1.score ? p0 : p1.score > p0.score ? p1 : null
    : null;
  const isTie = is2P && p0.score === p1.score;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      style={{ background: '#0e0d0b' }}
    >
      <Confetti />

      <div className="relative z-10 w-full max-w-sm">
        {/* Icon */}
        <div className="mb-5 bounce-in text-center">
          <span className="text-6xl">
            {is2P ? (isTie ? '🤝' : '🏆') : isQuiz ? '⚡' : '🎉'}
          </span>
        </div>

        {/* Title */}
        <h2
          className="font-bold uppercase text-center mb-6 bounce-in"
          style={{
            fontSize: '2.25rem',
            letterSpacing: '-0.03em',
            color: '#f0ede6',
            animationDelay: '80ms',
          }}
        >
          {is2P
            ? isTie ? "It's a Tie!" : `${winner?.name} Wins!`
            : isQuiz ? 'Quiz Done!' : 'You Did It!'}
        </h2>

        {/* Stats card */}
        <div
          className="rounded-2xl p-6 mb-6 bounce-in"
          style={{
            background: '#191714',
            border: '1px solid rgba(240,237,230,0.08)',
            animationDelay: '160ms',
          }}
        >
          {is2P ? (
            <div className="flex justify-around">
              <PlayerStat name={p0.name} score={p0.score} color="#d4ff00" isWinner={winner === p0} />
              <div style={{ width: '1px', background: 'rgba(240,237,230,0.08)' }} />
              <PlayerStat name={p1.name} score={p1.score} color="#00e676" isWinner={winner === p1} />
            </div>
          ) : isQuiz ? (
            <div className="grid grid-cols-3 gap-4">
              <StatBox label="Correct" value={`${correct}/${total}`} accent />
              <StatBox label="Score" value={`${accuracy}%`} accent />
              <StatBox label="Time" value={formatTime(state.elapsedSeconds)} />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              <StatBox label="Time" value={formatTime(state.elapsedSeconds)} />
              <StatBox label="Moves" value={String(total)} />
              <StatBox label="Accuracy" value={`${accuracy}%`} accent />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 bounce-in" style={{ animationDelay: '280ms' }}>
          <button
            onClick={handlePlayAgain}
            className="flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wide
              transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: '#d4ff00', color: '#0e0d0b' }}
          >
            Play Again
          </button>
          <button
            onClick={handleNewGame}
            className="flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wide
              transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: '#191714',
              border: '1.5px solid rgba(240,237,230,0.12)',
              color: '#6b6760',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#f0ede6')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#6b6760')}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#6b6760' }}>{label}</p>
      <p
        className="text-2xl font-bold"
        style={{ color: accent ? '#d4ff00' : '#f0ede6' }}
      >
        {value}
      </p>
    </div>
  );
}

function PlayerStat({
  name,
  score,
  color,
  isWinner,
}: {
  name: string;
  score: number;
  color: string;
  isWinner: boolean;
}) {
  return (
    <div className="text-center px-4">
      <p className="text-xs mb-1" style={{ color: isWinner ? color : '#6b6760' }}>
        {isWinner ? '👑 ' : ''}{name}
      </p>
      <p className="text-4xl font-bold" style={{ color: '#f0ede6' }}>{score}</p>
      <p className="text-xs mt-1" style={{ color: '#6b6760' }}>pairs</p>
    </div>
  );
}
