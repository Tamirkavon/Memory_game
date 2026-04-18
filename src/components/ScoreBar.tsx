import { useGame } from '../context/GameContext';
import { formatTime } from '../hooks/useTimer';

export function ScoreBar() {
  const { state } = useGame();
  const totalPairs = state.cards.length / 2;

  if (state.playerCount === 1) {
    return (
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center gap-5">
          <Stat label="Time" value={formatTime(state.elapsedSeconds)} />
          <Stat label="Moves" value={String(state.moves)} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs tabular-nums" style={{ color: '#6b6760' }}>
            {state.matchedPairIds.length}/{totalPairs}
          </span>
          <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: '#231f1a' }}>
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${(state.matchedPairIds.length / totalPairs) * 100}%`,
                background: '#d4ff00',
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // 2 player
  return (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-4 py-3">
      <PlayerBadge
        name={state.players[0].name}
        score={state.players[0].score}
        isActive={state.currentPlayerIndex === 0}
        color="#d4ff00"
      />
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xs tabular-nums" style={{ color: '#6b6760' }}>
          {state.matchedPairIds.length}/{totalPairs} pairs
        </span>
        <span className="text-xs tabular-nums" style={{ color: '#6b6760' }}>
          {state.moves} moves
        </span>
      </div>
      <PlayerBadge
        name={state.players[1].name}
        score={state.players[1].score}
        isActive={state.currentPlayerIndex === 1}
        color="#00e676"
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-wider" style={{ color: '#6b6760' }}>
        {label}
      </span>
      <span className="font-semibold tabular-nums" style={{ color: '#f0ede6' }}>
        {value}
      </span>
    </div>
  );
}

function PlayerBadge({
  name,
  score,
  isActive,
  color,
}: {
  name: string;
  score: number;
  isActive: boolean;
  color: string;
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-300"
      style={
        isActive
          ? { borderColor: color, background: `${color}14` }
          : { borderColor: 'rgba(240,237,230,0.08)', background: '#191714' }
      }
    >
      <span
        className="font-semibold text-sm"
        style={{ color: isActive ? color : '#6b6760' }}
      >
        {name}
      </span>
      <span
        className={`text-2xl font-bold ${score > 0 ? 'score-pop' : ''}`}
        style={{ color: isActive ? '#f0ede6' : '#3a3832' }}
        key={score}
      >
        {score}
      </span>
    </div>
  );
}
