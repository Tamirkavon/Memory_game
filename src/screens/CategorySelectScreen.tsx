import { useGame } from '../context/GameContext';
import { categories } from '../data/categories';
import { Category } from '../types';

export function CategorySelectScreen() {
  const { dispatch } = useGame();

  const handleSelect = (cat: Category) => {
    dispatch({ type: 'SET_CATEGORY', category: cat });
    dispatch({ type: 'SET_SCREEN', screen: 'difficulty-select' });
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-8" style={{ background: '#0e0d0b' }}>
      <button
        onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'mode-select' })}
        className="self-start text-sm mb-8 transition-colors"
        style={{ color: '#6b6760' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#f0ede6')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#6b6760')}
      >
        ← Back
      </button>

      <div className="max-w-2xl mx-auto w-full">
        <h2
          className="font-bold uppercase mb-1"
          style={{ fontSize: '1.75rem', letterSpacing: '-0.02em', color: '#f0ede6' }}
        >
          Topic
        </h2>
        <p className="mb-8 text-sm" style={{ color: '#6b6760' }}>What words do you want to practice?</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat)}
              className="p-4 rounded-xl text-left transition-all duration-150
                hover:scale-[1.02] active:scale-[0.98] bounce-in"
              style={{
                background: '#191714',
                border: '1.5px solid rgba(240,237,230,0.10)',
                animationDelay: `${i * 50}ms`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,255,0,0.4)';
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(212,255,0,0.05)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(240,237,230,0.10)';
                (e.currentTarget as HTMLButtonElement).style.background = '#191714';
              }}
            >
              <span className="text-3xl block mb-2">{cat.icon}</span>
              <span
                className="font-semibold text-sm block leading-tight"
                style={{ color: '#f0ede6' }}
              >
                {cat.name}
              </span>
              <span
                className="text-xs block mt-1"
                style={{ color: '#6b6760', direction: 'rtl', textAlign: 'right' }}
              >
                {cat.nameHebrew}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
