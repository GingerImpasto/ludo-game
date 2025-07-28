// LudoBoard.tsx
import React from "react";
import "./LudoBoard.css";
import Base from "./Base";
import BoardCenter from "./BoardCenter";
import LeftArea from "./LeftArea";
import RightArea from "./RightArea";
import TopArea from "./TopArea";
import BottomArea from "./BottomArea";

interface LudoBoardProps {
  diceValue: number;
  rollDice: () => void;
}

const LudoBoard: React.FC<LudoBoardProps> = ({ diceValue, rollDice }) => {
  return (
    <div className="ludo-container">
      <div className="ludo-board">
        {/* Center of the board */}
        <div className="board-center">
          <BoardCenter />
        </div>

        {/* Path areas around the board */}
        <div className="left-area">
          <LeftArea />
        </div>
        <div className="right-area">
          <RightArea />
        </div>
        <div className="top-area">
          <TopArea />
        </div>
        <div className="bottom-area">
          <BottomArea />
        </div>

        {/* Player bases (home areas) */}
        <div className="base-container red">
          <Base color="red" />
        </div>
        <div className="base-container green">
          <Base color="green" />
        </div>
        <div className="base-container blue">
          <Base color="blue" />
        </div>
        <div className="base-container yellow">
          <Base color="yellow" />
        </div>
      </div>

      <div className="game-controls">
        <h3 className="dice-label">Current Roll</h3>
        <div className="dice-value">{diceValue}</div>
        <button onClick={rollDice} className="dice-button">
          Roll Dice
        </button>
      </div>
    </div>
  );
};

export default LudoBoard;
