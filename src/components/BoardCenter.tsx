// BoardCenter.tsx
import React from 'react';
import './BoardCenter.css';

const BoardCenter: React.FC = () => {
  return (
    <div className="center-square">
      <div className="center-colors">
        <div className="color-triangle red"></div>
        <div className="color-triangle green"></div>
        <div className="color-triangle yellow"></div>
        <div className="color-triangle blue"></div>
      </div>
    </div>
  );
};

export default BoardCenter;