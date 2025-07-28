// Update LudoBoard.tsx
import React from 'react';
import './LudoBoard.css';
import Base from './Base';
import BoardCenter from './BoardCenter';

interface LudoBoardProps {
  diceValue: number;
}

const LudoBoard: React.FC<LudoBoardProps> = ({ diceValue }) => {
  return (
    <div className="ludo-container">
      <div className="ludo-board">
        {/* Center of the board - now using BoardCenter component */}
        <BoardCenter />
        
        {/* Left area between red and blue bases */}
        <div className="left-area"></div>
        
        {/* Player bases (home areas) */}
        <Base color="red" />
        <Base color="green" />
        <Base color="yellow" />
        <Base color="blue" />
        
        {/* Safe zones */}
        <div className="safe-zone red"></div>
        <div className="safe-zone green"></div>
        <div className="safe-zone yellow"></div>
        <div className="safe-zone blue"></div>
      </div>
      
      <div className="game-controls">
        <div className="dice-value">Current Roll: {diceValue}</div>
      </div>
    </div>
  );
};

export default LudoBoard;