import { useEffect, useState } from 'react';

interface Piece {
  id: number;
  left: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
}

const COLORS = ['#ff6b6b', '#feca57', '#00d2d3', '#26de81', '#ff6b9d', '#a855f7', '#4ecdc4'];

export function Confetti() {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    const items: Piece[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 8,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 1.5,
    }));
    setPieces(items);
  }, []);

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}
