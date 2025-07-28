// App.tsx
import { useState } from "react";
import LudoBoard from "./components/board/LudoBoard";
import "./App.css";

function App() {
  const [diceValue, setDiceValue] = useState(1);

  const rollDice = () => {
    setDiceValue(Math.floor(Math.random() * 6) + 1);
  };

  return (
    <div className="app-container">
      <LudoBoard diceValue={diceValue} rollDice={rollDice} />
    </div>
  );
}

export default App;
