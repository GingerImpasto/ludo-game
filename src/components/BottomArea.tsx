// BottomArea.tsx
import React from "react";
import "./BottomArea.css";
import { gridLayout, specialCells } from "../config/gameConfig";

const BottomArea: React.FC = () => {
  return (
    <div className="bottom-area">
      <div className="bottom-area-grid">
        {gridLayout.bottomArea.map((number) => (
          <div
            key={number}
            className={`bottom-area-cell ${
              specialCells.blueCells.includes(number) ? "blue-cell" : ""
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
