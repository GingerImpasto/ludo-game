import React from "react";
import "./RightArea.css";

const RightArea: React.FC = () => {
  // Create the custom grid layout
  const gridLayout = [
    [19, 20, 21, 22, 23, 24], // Row 1
    [67, 66, 65, 64, 63, 25], // Row 2
    [31, 30, 29, 28, 27, 26], // Row 3
  ];

  // Flatten the array for rendering
  const gridItems = gridLayout.flat();

  return (
    <div className="right-area">
      <div className="right-area-grid">
        {gridItems.map((number) => (
          <div
            key={number}
            className={`right-area-cell ${
              number === 27 || (number >= 63 && number <= 67) ? "highlight" : ""
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
