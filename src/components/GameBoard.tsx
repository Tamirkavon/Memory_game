import { useGame } from '../context/GameContext';
import { useGameLogic } from '../hooks/useGameLogic';
import { Card } from './Card';

export function GameBoard() {
  const { state } = useGame();
  const { flipCard } = useGameLogic();

  const cols = getGridCols(state.cards.length);

  return (
    <div
      className={`grid gap-2 sm:gap-3 w-full max-w-4xl mx-auto px-2 ${cols}`}
    >
      {state.cards.map((card, i) => (
        <div
          key={card.id}
          className="bounce-in w-full"
          style={{ animationDelay: `${i * 20}ms` }}
        >
          <Card
            card={card}
            onClick={flipCard}
            categoryColor={state.category?.color ?? ''}
          />
        </div>
      ))}
    </div>
  );
}

function getGridCols(cardCount: number): string {
  switch (cardCount) {
    case 24:
      return 'grid-cols-4 sm:grid-cols-6';
    case 36:
      return 'grid-cols-4 sm:grid-cols-6';
    case 48:
      return 'grid-cols-6 sm:grid-cols-8';
    default:
      return 'grid-cols-4 sm:grid-cols-6';
  }
}
