import React from "react";
import "./LeftArea.css"; // Changed import to use the new CSS file

const LeftArea: React.FC = () => {
  // Create a 6x3 grid with numbers 1-18
  const gridItems = Array.from({ length: 18 }, (_, i) => i + 1);

  return (
    <div className="left-area">
      <div className="left-area-grid">
        {gridItems.map((number) => (
          <div key={number} className="left-area-cell">
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftArea;
