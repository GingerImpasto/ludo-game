// DiceControls.tsx
import React from "react";
import "./DiceControls.css";
import { useGame } from "../../context/GameContext";

const DiceControls: React.FC = () => {
  const { state, rollDice } = useGame();

  return (
    <div className="game-controls">
      <h3 className="dice-label">Current Roll</h3>
      <div className="dice-value">{state.diceValue}</div>
      <button onClick={rollDice} className="dice-button">
        Roll Dice
      </button>
    </div>
  );
};

export default DiceControls;
