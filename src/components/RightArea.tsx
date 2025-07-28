import React from "react";
import "./RightArea.css";

const RightArea: React.FC = () => {
  // Create a 6x3 grid with numbers 19-36 (continuing from LeftArea)
  const gridItems = Array.from({ length: 18 }, (_, i) => i + 19);

  return (
    <div className="right-area">
      <div className="right-area-grid">
        {gridItems.map((number) => (
          <div
            key={number}
            className={`right-area-cell ${
              (number >= 25 && number <= 29) || number === 35 ? "highlight" : ""
            }`}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightArea;
