# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # TypeScript check + Vite build
npm run preview  # Preview production build
```

On this Windows machine, npm may not be in PATH. Use the full path if needed: `"C:/Program Files/nodejs/npm.cmd"`.

## Architecture

English vocabulary memory/matching game for a 7th-grader (Shachar). React 19 + TypeScript + Vite 6 + Tailwind CSS v4. Fully client-side, no backend.

### Screen Flow

`HomeScreen → ModeSelectScreen → CategorySelectScreen → DifficultySelectScreen → GameScreen → VictoryScreen`

Routing is state-driven via `GameContext.screen` — no react-router. `App.tsx` switches on `state.screen` to render the active screen component.

### State Management

Single `useReducer` in `GameContext.tsx`. All game state lives here — screen, mode, category, difficulty, cards, flipped/matched state, player scores, timer. Components dispatch actions (`FLIP_CARD`, `MATCH_FOUND`, `MISMATCH`, `TICK`, etc.).

The `isProcessing` flag in state locks card clicks during the match/mismatch animation delay (managed by `useGameLogic` hook).

### Card Matching Flow

1. User clicks card → dispatches `FLIP_CARD` (guards: not processing, <2 flipped, not already flipped/matched)
2. When 2 cards flipped → `useGameLogic` hook detects this, sets `isProcessing=true`, waits 600ms (match) or 900ms (mismatch)
3. Dispatches `MATCH_FOUND` (increments current player score, checks game-over) or `MISMATCH` (flips cards back, switches turn in 2P)
4. Game-over auto-transitions to victory screen

### Tailwind v4 Specifics

- Uses `@tailwindcss/vite` plugin (not PostCSS)
- `@import "tailwindcss"` syntax in `index.css` (not `@tailwind` directives)
- Custom colors defined in `@theme` block as CSS custom properties
- **Dynamic class names don't work** — `border-${color}` won't generate styles. Use inline `style={{}}` with hex values instead. See `ScoreBar.tsx` (`PLAYER_COLORS` object) and `Card.tsx` (`getAnswerColorHex`) for the pattern.

### Audio

`useAudioEngine` hook uses raw Web Audio API (no libraries). AudioContext is created on first user interaction to satisfy browser autoplay policy. Sounds: flip click, match chime, mismatch buzz, victory fanfare.

### Vocabulary Data

8 categories in `src/data/categories/`, each with ~15 `WordEntry` objects containing `english`, `hebrew`, `emoji`, `definition`, and `sentence` (fill-in-the-blank). For hard mode (24 pairs), `cardGenerator.ts` pulls extra words from other categories.

### Card Rendering

Cards use CSS 3D transforms (`perspective`, `rotateY(180deg)`, `backface-visibility: hidden`) defined in `index.css`. Hebrew content gets `dir="rtl"`. Card text size auto-scales based on content length.
