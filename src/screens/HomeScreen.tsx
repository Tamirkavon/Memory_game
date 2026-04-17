import { useGame } from '../context/GameContext';

export function HomeScreen() {
  const { dispatch } = useGame();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-40 h-40 bg-amber/10 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 text-center">
        {/* Logo / Title */}
        <div className="mb-2">
          <span className="text-6xl sm:text-7xl">🧠</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold mb-3 bg-gradient-to-r from-coral via-amber to-teal bg-clip-text text-transparent">
          Memory Game
        </h1>
        <p className="text-white/50 text-lg mb-10">
          Learn English, one match at a time
        </p>

        {/* Play button */}
        <button
          onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'mode-select' })}
          className="group relative px-12 py-4 bg-gradient-to-r from-coral to-coral-dark
            text-white font-bold text-xl rounded-2xl
            hover:scale-105 active:scale-95 transition-all duration-200
            shadow-lg shadow-coral/30 hover:shadow-xl hover:shadow-coral/40"
        >
          Play
          <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Credits */}
        <p className="mt-12 text-white/20 text-sm">
          Made for Shachar 🎓
        </p>
      </div>
    </div>
  );
}
