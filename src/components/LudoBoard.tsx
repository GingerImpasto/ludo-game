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
      </div>
      
      <div className="game-controls">
        <div className="dice-value">Current Roll: {diceValue}</div>
      </div>
    </div>
  );
};

export default LudoBoard;