import React from "react";
import "./LeftArea.css";

const LeftArea: React.FC = () => {
  // Create the specific grid layout
  const gridLayout = [
    [52, 1, 2, 3, 4, 5],
    [51, 53, 54, 55, 56, 57],
    [50, 49, 48, 47, 46, 45],
  ];

  // Numbers that should be red
  const redNumbers = [1, 53, 54, 55, 56, 57];

  return (
    <div className="left-area">
      <div className="left-area-grid">
        {gridLayout.flatMap((row, rowIndex) =>
          row.map((number, colIndex) => {
            const isRed = redNumbers.includes(number);
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
