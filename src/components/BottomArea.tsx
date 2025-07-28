import React from "react";
import "./BottomArea.css";

const BottomArea: React.FC = () => {
  const gridItems = [
    44, 72, 32, 43, 71, 33, 42, 70, 34, 41, 69, 35, 40, 68, 36, 39, 38, 37,
  ];

  // Blue cells: 40, 68, 69, 70, 71, 72
  const blueCells = [40, 68, 69, 70, 71, 72];

  return (
    <div className="bottom-area">
      <div className="bottom-area-grid">
        {gridItems.map((number) => (
          <div
            key={number}
            className={`bottom-area-cell ${
              blueCells.includes(number) ? "blue-cell" : ""
            }`}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomArea;
