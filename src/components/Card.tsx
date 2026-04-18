import { GameCard } from '../types';

interface CardProps {
  card: GameCard;
  onClick: (id: string) => void;
  categoryColor: string;
}

export function Card({ card, onClick }: CardProps) {
  const isRevealed = card.isFlipped || card.isMatched;

  return (
    <div
      className="card-container w-full aspect-square cursor-pointer select-none"
      onClick={() => !isRevealed && onClick(card.id)}
    >
      <div className={`card-inner ${isRevealed ? 'flipped' : ''}`}>
        {/* Back (face-down) */}
        <div
          className="card-back card-back-pattern transition-all duration-200"
          style={{
            border: '1.5px solid rgba(240,237,230,0.10)',
            ...((!isRevealed) ? {} : {}),
          }}
        >
          <span style={{ color: '#6b6760', fontSize: '1.5rem' }}>?</span>
        </div>

        {/* Front (face-up) */}
        <div
          className="card-front p-1.5 sm:p-2 text-center"
          style={{
            border: card.isMatched
              ? '1.5px solid #00e676'
              : '1.5px solid rgba(240,237,230,0.15)',
            background: card.isMatched ? 'rgba(0,230,118,0.06)' : '#191714',
          }}
        >
          <div
            className={`flex items-center justify-center w-full h-full ${
              card.isRtl ? 'direction-rtl' : ''
            }`}
            dir={card.isRtl ? 'rtl' : undefined}
          >
            <span
              className={`leading-tight font-medium ${getTextSize(card.content)}`}
              style={{
                color: card.isMatched
                  ? '#00e676'
                  : card.type === 'answer'
                  ? '#d4ff00'
                  : '#f0ede6',
              }}
            >
              {card.content}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTextSize(content: string): string {
  if (content.length === 1 || content.length === 2) return 'text-3xl sm:text-4xl'; // emoji
  if (content.length <= 8) return 'text-sm sm:text-base';
  if (content.length <= 15) return 'text-xs sm:text-sm';
  return 'text-[10px] sm:text-xs';
}
