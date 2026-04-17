import { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { useAudioEngine } from './useAudioEngine';

export function useGameLogic() {
  const { state, dispatch } = useGame();
  const audio = useAudioEngine();
  const timeoutRef = useRef<number | null>(null);

  // Check for match when 2 cards are flipped
  useEffect(() => {
    if (state.flippedCardIds.length !== 2) return;

    const [id1, id2] = state.flippedCardIds;
    const card1 = state.cards.find((c) => c.id === id1);
    const card2 = state.cards.find((c) => c.id === id2);

    if (!card1 || !card2) return;

    const isMatch = card1.pairId === card2.pairId;

    timeoutRef.current = window.setTimeout(
      () => {
        if (isMatch) {
          audio.playMatch();
          dispatch({ type: 'MATCH_FOUND', pairId: card1.pairId });
        } else {
          audio.playMismatch();
          dispatch({ type: 'MISMATCH' });
        }
      },
      isMatch ? 600 : 900
    );

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [state.flippedCardIds, state.cards, dispatch, audio]);

  // Play victory sound
  useEffect(() => {
    if (state.screen === 'victory') {
      audio.playVictory();
    }
  }, [state.screen, audio]);

  const flipCard = (cardId: string) => {
    if (state.isProcessing) return;
    audio.playFlip();
    dispatch({ type: 'FLIP_CARD', cardId });
  };

  return { flipCard, audio };
}
