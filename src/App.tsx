// App.tsx
import { GameProvider } from "./context/GameContext";
import LudoBoard from "./components/board/LudoBoard";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <GameProvider>
        <LudoBoard />
      </GameProvider>
    </div>
  );
}

export default App;
