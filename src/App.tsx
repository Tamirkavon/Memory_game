import { GameProvider, useGame } from './context/GameContext';
import { HomeScreen } from './screens/HomeScreen';
import { ModeSelectScreen } from './screens/ModeSelectScreen';
import { CategorySelectScreen } from './screens/CategorySelectScreen';
import { DifficultySelectScreen } from './screens/DifficultySelectScreen';
import { GameScreen } from './screens/GameScreen';
import { VictoryScreen } from './screens/VictoryScreen';

function AppRouter() {
  const { state } = useGame();

  switch (state.screen) {
    case 'home':
      return <HomeScreen />;
    case 'mode-select':
      return <ModeSelectScreen />;
    case 'category-select':
      return <CategorySelectScreen />;
    case 'difficulty-select':
      return <DifficultySelectScreen />;
    case 'game':
      return <GameScreen />;
    case 'victory':
      return <VictoryScreen />;
    default:
      return <HomeScreen />;
  }
}

export default function App() {
  return (
    <GameProvider>
      <AppRouter />
    </GameProvider>
  );
}
