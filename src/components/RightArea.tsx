// RightArea.tsx
import React from "react";
import "./RightArea.css";
import { gridLayout, specialCells } from "../config/gameConfig";

const RightArea: React.FC = () => {
  const gridItems = gridLayout.rightArea.flat();

  return (
    <div className="right-area">
      <div className="right-area-grid">
        {gridItems.map((number) => (
          <div
            key={number}
            className={`right-area-cell ${
              specialCells.rightHighlight.includes(number) ? "highlight" : ""
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
