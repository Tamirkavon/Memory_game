import { GameCard } from '../types';

interface CardProps {
  card: GameCard;
  onClick: (id: string) => void;
  categoryColor: string;
}

export function Card({ card, onClick, categoryColor }: CardProps) {
  const isRevealed = card.isFlipped || card.isMatched;

  return (
    <div
      className="card-container aspect-square cursor-pointer select-none"
      onClick={() => !isRevealed && onClick(card.id)}
    >
      <div className={`card-inner ${isRevealed ? 'flipped' : ''}`}>
        {/* Back (face-down) */}
        <div
          className={`card-back card-back-pattern border-2 border-white/10 hover:border-white/30
            transition-colors duration-200 ${!isRevealed ? 'hover:scale-[1.03]' : ''}`}
          style={{ transition: 'transform 0.15s ease, border-color 0.2s ease' }}
        >
          <span className="text-2xl sm:text-3xl opacity-40">?</span>
        </div>

        {/* Front (face-up) */}
        <div
          className={`card-front border-2 p-1.5 sm:p-2 text-center
            ${card.isMatched
              ? 'card-matched border-mint bg-navy-light'
              : `border-white/20 bg-navy-light`
            }`}
        >
          <div
            className={`flex items-center justify-center w-full h-full ${
              card.isRtl ? 'direction-rtl' : ''
            }`}
            dir={card.isRtl ? 'rtl' : undefined}
          >
            <span
              className={`leading-tight font-medium ${getTextSize(card.content)}`}
              style={{ color: card.type === 'answer' ? getAnswerColorHex(categoryColor) : 'white' }}
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

function getAnswerColorHex(categoryColor: string): string {
  if (categoryColor.includes('blue')) return '#00d2d3';
  if (categoryColor.includes('pink')) return '#ff6b9d';
  if (categoryColor.includes('orange')) return '#feca57';
  if (categoryColor.includes('green')) return '#26de81';
  if (categoryColor.includes('red')) return '#ff6b6b';
  if (categoryColor.includes('purple')) return '#a855f7';
  if (categoryColor.includes('cyan')) return '#4ecdc4';
  if (categoryColor.includes('yellow')) return '#feca57';
  return '#00d2d3';
}
