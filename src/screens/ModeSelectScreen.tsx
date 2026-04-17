import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { GameMode } from '../types';

const MODES: { id: GameMode; label: string; icon: string; desc: string }[] = [
  { id: 'en-he', label: 'English ↔ Hebrew', icon: '🇮🇱', desc: 'Match words to their Hebrew translation' },
  { id: 'en-emoji', label: 'English ↔ Emoji', icon: '😄', desc: 'Match words to the right emoji' },
  { id: 'en-definition', label: 'Word ↔ Definition', icon: '📖', desc: 'Match words to their English meaning' },
  { id: 'fill-blank', label: 'Fill in the Blank', icon: '✏️', desc: 'Match sentences with missing words' },
];

export function ModeSelectScreen() {
  const { state, dispatch } = useGame();
  const [playerCount, setPlayerCount] = useState<1 | 2>(state.playerCount);
  const [names, setNames] = useState(['', '']);
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);

  const handleContinue = () => {
    if (!selectedMode) return;
    dispatch({ type: 'SET_MODE', mode: selectedMode });
    dispatch({ type: 'SET_PLAYER_COUNT', count: playerCount });
    if (playerCount === 2 && (names[0] || names[1])) {
      dispatch({
        type: 'SET_PLAYER_NAMES',
        names: [names[0] || 'Player 1', names[1] || 'Player 2'],
      });
    }
    dispatch({ type: 'SET_SCREEN', screen: 'category-select' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      <button
        onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'home' })}
        className="self-start text-white/40 hover:text-white/70 transition-colors mb-6"
      >
        ← Back
      </button>

      <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-white">
        Choose Game Mode
      </h2>
      <p className="text-white/40 mb-8">Pick how you want to match cards</p>

      {/* Mode cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-10">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className={`p-5 rounded-2xl border-2 text-left transition-all duration-200
              hover:scale-[1.02] active:scale-[0.98]
              ${selectedMode === mode.id
                ? 'border-coral bg-coral/10 shadow-lg shadow-coral/20'
                : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{mode.icon}</span>
              <span className="font-semibold text-lg text-white">{mode.label}</span>
            </div>
            <p className="text-white/40 text-sm">{mode.desc}</p>
          </button>
        ))}
      </div>

      {/* Player count */}
      <div className="w-full max-w-2xl mb-8">
        <h3 className="text-lg font-semibold text-white/70 mb-3">Players</h3>
        <div className="flex gap-3">
          <button
            onClick={() => setPlayerCount(1)}
            className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all
              ${playerCount === 1
                ? 'border-teal bg-teal/10 text-teal'
                : 'border-white/10 text-white/40 hover:border-white/20'
              }`}
          >
            🧑 Solo
          </button>
          <button
            onClick={() => setPlayerCount(2)}
            className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all
              ${playerCount === 2
                ? 'border-teal bg-teal/10 text-teal'
                : 'border-white/10 text-white/40 hover:border-white/20'
              }`}
          >
            👥 1 vs 1
          </button>
        </div>

        {/* Player names for 2P */}
        {playerCount === 2 && (
          <div className="flex gap-3 mt-4 slide-up">
            <input
              type="text"
              placeholder="Player 1 name"
              value={names[0]}
              onChange={(e) => setNames([e.target.value, names[1]])}
              className="flex-1 px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl
                text-white placeholder:text-white/30 focus:border-coral focus:outline-none"
            />
            <input
              type="text"
              placeholder="Player 2 name"
              value={names[1]}
              onChange={(e) => setNames([names[0], e.target.value])}
              className="flex-1 px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl
                text-white placeholder:text-white/30 focus:border-teal focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Continue */}
      <button
        onClick={handleContinue}
        disabled={!selectedMode}
        className={`px-10 py-3 rounded-xl font-bold text-lg transition-all duration-200
          ${selectedMode
            ? 'bg-gradient-to-r from-coral to-coral-dark text-white hover:scale-105 active:scale-95 shadow-lg shadow-coral/30'
            : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
      >
        Continue →
      </button>
    </div>
  );
}
