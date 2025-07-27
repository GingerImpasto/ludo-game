// BoardCenter.tsx
import React from 'react';
import './BoardCenter.css';

const BoardCenter: React.FC = () => {
  return (
    <div className="center-square">
      <div className="center-colors">
        <div className="color-arrow red"></div>
      </div>
    </div>
  );
};

export default BoardCenter;