import { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';

export function useTimer() {
  const { state, dispatch } = useGame();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (state.gameStarted && state.screen === 'game') {
      intervalRef.current = window.setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.gameStarted, state.screen, dispatch]);
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
