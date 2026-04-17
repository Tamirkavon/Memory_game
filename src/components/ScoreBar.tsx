import { useGame } from '../context/GameContext';
import { formatTime } from '../hooks/useTimer';

export function ScoreBar() {
  const { state } = useGame();
  const totalPairs = state.cards.length / 2;

  if (state.playerCount === 1) {
    return (
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <Stat label="Time" value={formatTime(state.elapsedSeconds)} />
          <Stat label="Moves" value={String(state.moves)} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm">
            {state.matchedPairIds.length}/{totalPairs}
          </span>
          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal to-mint rounded-full transition-all duration-300"
              style={{
                width: `${(state.matchedPairIds.length / totalPairs) * 100}%`,
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
        color="coral"
      />
      <div className="flex flex-col items-center">
        <span className="text-white/40 text-xs">Moves: {state.moves}</span>
        <span className="text-white/40 text-xs">
          {state.matchedPairIds.length}/{totalPairs}
        </span>
      </div>
      <PlayerBadge
        name={state.players[1].name}
        score={state.players[1].score}
        isActive={state.currentPlayerIndex === 1}
        color="teal"
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-white/50 text-xs uppercase tracking-wider">
        {label}
      </span>
      <span className="text-white font-semibold text-lg tabular-nums">
        {value}
      </span>
    </div>
  );
}

const PLAYER_COLORS: Record<string, { border: string; bg: string; text: string }> = {
  coral: { border: '#ff6b6b', bg: 'rgba(255,107,107,0.1)', text: '#ff6b6b' },
  teal: { border: '#00d2d3', bg: 'rgba(0,210,211,0.1)', text: '#00d2d3' },
};

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
  const c = PLAYER_COLORS[color] || PLAYER_COLORS.coral;

  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-xl border-2 transition-all duration-300
        ${isActive ? 'active-player' : ''}`}
      style={
        isActive
          ? { borderColor: c.border, backgroundColor: c.bg }
          : { borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)' }
      }
    >
      <span
        className="font-semibold"
        style={{ color: isActive ? c.text : 'rgba(255,255,255,0.6)' }}
      >
        {name}
      </span>
      <span
        className={`text-2xl font-bold ${score > 0 ? 'score-pop' : ''}`}
        style={{ color: isActive ? 'white' : 'rgba(255,255,255,0.4)' }}
        key={score}
      >
        {score}
      </span>
    </div>
  );
}
