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
}

const LudoBoard: React.FC<LudoBoardProps> = ({ diceValue }) => {
  return (
    <div className="ludo-container">
      <div className="ludo-board">
        {/* Center of the board */}
        <BoardCenter />
        {/* Path areas around the board */}
        <LeftArea />
        <RightArea />
        <TopArea />
        <BottomArea />

        {/* Player bases (home areas) */}
        <Base color="red" />
        <Base color="green" />
        <Base color="yellow" />
        <Base color="blue" />
      </div>

      <div className="game-controls">
        <div className="dice-value">Current Roll: {diceValue}</div>
      </div>
    </div>
  );
};

export default LudoBoard;
