import React from "react";
import "./LeftArea.css";
import { gridLayout, specialCells } from "../../config/gameConfig";

const LeftArea: React.FC = () => {
  return (
    <div className="left-area">
      <div className="left-area-grid">
        {gridLayout.leftArea.flatMap((row, rowIndex) =>
          row.map((number, colIndex) => {
            const isRed = specialCells.redNumbers.includes(number);
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`left-area-cell ${isRed ? "red-cell" : ""}`}
              >
                {number}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LeftArea;
