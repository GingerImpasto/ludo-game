import React from 'react';
import './LudoBoard.css';

interface LudoBoardProps {
  diceValue: number;
}

const LudoBoard: React.FC<LudoBoardProps> = ({ diceValue }) => {
  return (
    <div className="ludo-container">
      <h1>Ludo Game</h1>
      
      <div className="ludo-board">
        {/* Center of the board */}
        <div className="center-square"></div>
        
        {/* Player bases (home areas) */}
        <div className="base red">
          <div className="pawn-position p1"></div>
          <div className="pawn-position p2"></div>
          <div className="pawn-position p3"></div>
          <div className="pawn-position p4"></div>
        </div>
        <div className="base green">
          <div className="pawn-position p1"></div>
          <div className="pawn-position p2"></div>
          <div className="pawn-position p3"></div>
          <div className="pawn-position p4"></div>
        </div>
        <div className="base yellow">
          <div className="pawn-position p1"></div>
          <div className="pawn-position p2"></div>
          <div className="pawn-position p3"></div>
          <div className="pawn-position p4"></div>
        </div>
        <div className="base blue">
          <div className="pawn-position p1"></div>
          <div className="pawn-position p2"></div>
          <div className="pawn-position p3"></div>
          <div className="pawn-position p4"></div>
        </div>
        
        {/* Path cells */}
        {Array.from({ length: 52 }).map((_, index) => (
          <div key={`cell-${index}`} className={`path-cell cell-${index}`}></div>
        ))}
        
        {/* Safe zones */}
        <div className="safe-zone red"></div>
        <div className="safe-zone green"></div>
        <div className="safe-zone yellow"></div>
        <div className="safe-zone blue"></div>
        
        {/* Star zones */}
        <div className="star-zone s1"></div>
        <div className="star-zone s2"></div>
        <div className="star-zone s3"></div>
        <div className="star-zone s4"></div>
      </div>
      
      <div className="game-controls">
        <div className="dice-value">Current Roll: {diceValue}</div>
      </div>
    </div>
  );
};

export default LudoBoard;