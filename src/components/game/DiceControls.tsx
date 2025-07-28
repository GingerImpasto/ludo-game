import React from "react";
import "./DiceControls.css";

interface DiceControlsProps {
  diceValue: number;
  rollDice: () => void;
}

const DiceControls: React.FC<DiceControlsProps> = ({ diceValue, rollDice }) => {
  return (
    <div className="game-controls">
      <h3 className="dice-label">Current Roll</h3>
      <div className="dice-value">{diceValue}</div>
      <button onClick={rollDice} className="dice-button">
        Roll Dice
      </button>
    </div>
  );
};

export default DiceControls;
