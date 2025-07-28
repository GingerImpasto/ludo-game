import React from "react";
import "./TopArea.css";

const TopArea: React.FC = () => {
  // 6 rows x 3 columns with the specified numbering
  const gridNumbers = [
    [11, 12, 13], // Row 1
    [10, 58, 14], // Row 2
    [9, 59, 15], // Row 3
    [8, 60, 16], // Row 4
    [7, 61, 17], // Row 5
    [6, 62, 18], // Row 6
  ];

  // Flatten the 2D array for rendering
  const gridItems = gridNumbers.flat();
  const greenCells = [14, 58, 59, 60, 61, 62]; // Middle column numbers

  return (
    <div className="top-area">
      <div className="top-area-grid">
        {gridItems.map((number) => (
          <div
            key={number}
            className={`top-area-cell ${
              greenCells.includes(number) ? "green" : ""
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
