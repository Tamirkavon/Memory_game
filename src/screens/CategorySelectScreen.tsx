import { useGame } from '../context/GameContext';
import { categories } from '../data/categories';
import { Category } from '../types';

const CATEGORY_COLORS: Record<string, string> = {
  school: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 hover:border-blue-400',
  clothing: 'from-pink-500/20 to-pink-600/10 border-pink-500/30 hover:border-pink-400',
  home: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 hover:border-orange-400',
  hobbies: 'from-green-500/20 to-green-600/10 border-green-500/30 hover:border-green-400',
  actions: 'from-red-500/20 to-red-600/10 border-red-500/30 hover:border-red-400',
  feelings: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 hover:border-purple-400',
  technology: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 hover:border-cyan-400',
  food: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 hover:border-yellow-400',
};

export function CategorySelectScreen() {
  const { dispatch } = useGame();

  const handleSelect = (cat: Category) => {
    dispatch({ type: 'SET_CATEGORY', category: cat });
    dispatch({ type: 'SET_SCREEN', screen: 'difficulty-select' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      <button
        onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'mode-select' })}
        className="self-start text-white/40 hover:text-white/70 transition-colors mb-6"
      >
        ← Back
      </button>

      <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-white">
        Pick a Topic
      </h2>
      <p className="text-white/40 mb-8">Choose what words to practice</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat)}
            className={`group p-5 rounded-2xl border-2 bg-gradient-to-br
              transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]
              bounce-in ${CATEGORY_COLORS[cat.id] || 'border-white/10'}`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="text-4xl block mb-3">{cat.icon}</span>
            <span className="font-semibold text-white text-sm block">
              {cat.name}
            </span>
            <span className="text-white/40 text-xs block mt-1" dir="rtl">
              {cat.nameHebrew}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
