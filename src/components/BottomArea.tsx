import React from "react";
import "./BottomArea.css";

const BottomArea: React.FC = () => {
  const gridItems = Array.from({ length: 18 }, (_, i) => i + 55);
  const blueCells = [56, 59, 62, 65, 67, 68];

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
