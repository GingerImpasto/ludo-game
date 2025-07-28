import React from "react";
import "./BottomArea.css";

const BottomArea: React.FC = () => {
  // Still 18 items but now in 6 rows x 3 columns
  const gridItems = Array.from({ length: 18 }, (_, i) => i + 55);

  return (
    <div className="bottom-area">
      <div className="bottom-area-grid">
        {gridItems.map((number) => (
          <div key={number} className="bottom-area-cell">
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomArea;
