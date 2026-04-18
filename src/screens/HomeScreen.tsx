import { useGame } from '../context/GameContext';

export function HomeScreen() {
  const { dispatch } = useGame();

  return (
    <div
      className="min-h-screen flex flex-col justify-center px-6 py-10 relative overflow-hidden"
      style={{ background: '#0e0d0b' }}
    >
      {/* Subtle lime glow — top right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(212,255,0,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-lg">
        {/* Icon */}
        <div className="mb-6">
          <span className="text-5xl">⚡</span>
        </div>

        {/* Title — left-aligned, bold, no gradient */}
        <h1
          className="font-bold uppercase leading-none mb-4"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 6rem)',
            letterSpacing: '-0.03em',
            color: '#f0ede6',
          }}
        >
          WORD<br />RUSH
        </h1>

        <p className="text-lg mb-12" style={{ color: '#6b6760' }}>
          Level up your English vocabulary
        </p>

        {/* CTA — lime on dark, not a pink gradient */}
        <button
          onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'mode-select' })}
          className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg
            uppercase tracking-wide transition-all duration-150
            hover:scale-[1.03] active:scale-[0.97]"
          style={{ background: '#d4ff00', color: '#0e0d0b' }}
        >
          Play
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
