// TopArea.tsx
import React from "react";
import "./TopArea.css";
import { gridLayout, specialCells } from "../../config/gameConfig";

const TopArea: React.FC = () => {
  const gridItems = gridLayout.topArea.flat();

  return (
    <div className="top-area">
      <div className="top-area-grid">
        {gridItems.map((number) => (
          <div
            key={number}
            className={`top-area-cell ${
              specialCells.greenCells.includes(number) ? "green" : ""
            }`}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArea;
