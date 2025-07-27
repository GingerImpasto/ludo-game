import React from 'react';
import './LudoBoard.css';

interface BaseProps {
  color: 'red' | 'green' | 'yellow' | 'blue';
}

const Base: React.FC<BaseProps> = ({ color }) => {
  return (
    <div className={`base ${color}`}>
      <div className="pawn-position p1"></div>
      <div className="pawn-position p2"></div>
      <div className="pawn-position p3"></div>
      <div className="pawn-position p4"></div>
    </div>
  );
};

export default Base;