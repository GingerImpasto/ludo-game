import { useState } from 'react';
import './App.css';

function App() {
  const [diceValue, setDiceValue] = useState(1);

  const rollDice = () => {
    setDiceValue(Math.floor(Math.random() * 6) + 1);
  };

  return (
    <div className="ludo-container">
      <h1>Ludo Game</h1>
      
      <div className="ludo-board">
        {/* Center of the board */}
        <div className="center-square"></div>
        
        {/* Player bases (home areas) */}
        <div className="base red"></div>
        <div className="base green"></div>
        <div className="base yellow"></div>
        <div className="base blue"></div>
        
        {/* Paths around the board */}
        <div className="path horizontal top"></div>
        <div className="path vertical right"></div>
        <div className="path horizontal bottom"></div>
        <div className="path vertical left"></div>
        
        {/* Safe zones */}
        <div className="safe-zone red"></div>
        <div className="safe-zone green"></div>
        <div className="safe-zone yellow"></div>
        <div className="safe-zone blue"></div>
      </div>
      
      <div className="game-controls">
        <button onClick={rollDice} className="dice">
          Roll Dice: {diceValue}
        </button>
      </div>
    </div>
  );
}

export default App;