import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { GameMode } from '../types';

const MODES: {
  id: GameMode;
  label: string;
  icon: string;
  desc: string;
  hebrewInfo: string;
  tag: string;
}[] = [
  {
    id: 'en-he',
    label: 'Memory',
    icon: '🃏',
    desc: 'Flip cards to match English words with their Hebrew translations',
    hebrewInfo: 'הופכים קלפים ומחפשים זוגות — מילה באנגלית מול התרגום שלה בעברית.',
    tag: 'Classic',
  },
  {
    id: 'fill-blank',
    label: 'Sentence Quiz',
    icon: '✏️',
    desc: 'Read a sentence and pick the missing word from 4 choices',
    hebrewInfo: 'קוראים משפט עם מקום ריק — ובוחרים את המילה הנכונה מתוך 4 אפשרויות.',
    tag: 'Quiz',
  },
];

export function ModeSelectScreen() {
  const { state, dispatch } = useGame();
  const [playerCount, setPlayerCount] = useState<1 | 2>(state.playerCount);
  const [names, setNames] = useState(['', '']);
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [openInfo, setOpenInfo] = useState<GameMode | null>(null);

  const handleContinue = () => {
    if (!selectedMode) return;
    dispatch({ type: 'SET_MODE', mode: selectedMode });
    if (selectedMode === 'en-he') {
      dispatch({ type: 'SET_PLAYER_COUNT', count: playerCount });
      if (playerCount === 2 && (names[0] || names[1])) {
        dispatch({
          type: 'SET_PLAYER_NAMES',
          names: [names[0] || 'Player 1', names[1] || 'Player 2'],
        });
      }
    }
    dispatch({ type: 'SET_SCREEN', screen: 'difficulty-select' });
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-8" style={{ background: '#0e0d0b' }}>
      <button
        onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'home' })}
        className="self-start text-sm mb-8 transition-colors"
        style={{ color: '#6b6760' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#f0ede6')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#6b6760')}
      >
        ← Back
      </button>

      <div className="max-w-xl mx-auto w-full flex-1 flex flex-col">
        <h2
          className="font-bold uppercase mb-1"
          style={{ fontSize: '1.75rem', letterSpacing: '-0.02em', color: '#f0ede6' }}
        >
          Game Mode
        </h2>
        <p className="mb-8 text-sm" style={{ color: '#6b6760' }}>How do you want to play?</p>

        {/* Mode cards */}
        <div className="flex flex-col gap-3 mb-8">
          {MODES.map((mode) => {
            const isSelected = selectedMode === mode.id;
            const isInfoOpen = openInfo === mode.id;

            return (
              <div key={mode.id} className="flex flex-col gap-2">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => { setSelectedMode(mode.id); setOpenInfo(null); }}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedMode(mode.id)}
                  className="relative px-5 py-4 rounded-xl cursor-pointer transition-all duration-150
                    hover:scale-[1.01] active:scale-[0.99] select-none"
                  style={{
                    background: isSelected ? 'rgba(212,255,0,0.08)' : '#191714',
                    border: `1.5px solid ${isSelected ? '#d4ff00' : 'rgba(240,237,230,0.10)'}`,
                  }}
                >
                  {/* Tag pill */}
                  <span
                    className="absolute top-3 right-12 text-[10px] font-bold uppercase tracking-widest
                      px-2 py-0.5 rounded-full"
                    style={{
                      background: isSelected ? 'rgba(212,255,0,0.15)' : 'rgba(240,237,230,0.07)',
                      color: isSelected ? '#d4ff00' : '#6b6760',
                    }}
                  >
                    {mode.tag}
                  </span>

                  {/* Info button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenInfo(openInfo === mode.id ? null : mode.id);
                    }}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center
                      justify-center text-xs font-bold transition-all"
                    style={{
                      background: isInfoOpen ? '#d4ff00' : 'rgba(240,237,230,0.1)',
                      color: isInfoOpen ? '#0e0d0b' : '#6b6760',
                    }}
                    aria-label="מה זה?"
                  >
                    i
                  </button>

                  <div className="flex items-center gap-3 pr-20">
                    <span className="text-2xl">{mode.icon}</span>
                    <div>
                      <div
                        className="font-bold text-base"
                        style={{ color: isSelected ? '#d4ff00' : '#f0ede6' }}
                      >
                        {mode.label}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: '#6b6760' }}>
                        {mode.desc}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hebrew info */}
                {isInfoOpen && (
                  <div
                    className="px-4 py-3 rounded-lg text-sm leading-relaxed slide-up"
                    style={{
                      background: 'rgba(212,255,0,0.05)',
                      border: '1px solid rgba(212,255,0,0.2)',
                      color: '#d4ff00',
                      direction: 'rtl',
                      fontFamily: 'system-ui, sans-serif',
                    }}
                  >
                    {mode.hebrewInfo}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Players — only for memory mode */}
        {selectedMode === 'en-he' && (
          <div className="mb-8 slide-up">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#6b6760' }}>
              Players
            </div>
            <div className="flex gap-2">
              {([1, 2] as const).map((n) => (
                <button
                  key={n}
                  onClick={() => setPlayerCount(n)}
                  className="flex-1 py-3 rounded-lg border font-semibold text-sm transition-all"
                  style={
                    playerCount === n
                      ? { background: 'rgba(212,255,0,0.1)', borderColor: '#d4ff00', color: '#d4ff00' }
                      : { background: '#191714', borderColor: 'rgba(240,237,230,0.1)', color: '#6b6760' }
                  }
                >
                  {n === 1 ? '🧑 Solo' : '👥 1 vs 1'}
                </button>
              ))}
            </div>

            {playerCount === 2 && (
              <div className="flex gap-2 mt-3 slide-up">
                {[0, 1].map((i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={`Player ${i + 1}`}
                    value={names[i]}
                    onChange={(e) => {
                      const next = [...names];
                      next[i] = e.target.value;
                      setNames(next);
                    }}
                    className="flex-1 px-3 py-2.5 rounded-lg text-sm outline-none transition-colors"
                    style={{
                      background: '#191714',
                      border: '1.5px solid rgba(240,237,230,0.1)',
                      color: '#f0ede6',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#d4ff00')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(240,237,230,0.1)')}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-auto">
          <button
            onClick={handleContinue}
            disabled={!selectedMode}
            className="w-full py-4 rounded-xl font-bold text-base uppercase tracking-wide
              transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
            style={
              selectedMode
                ? { background: '#d4ff00', color: '#0e0d0b' }
                : { background: '#191714', color: '#3a3832', cursor: 'not-allowed' }
            }
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
