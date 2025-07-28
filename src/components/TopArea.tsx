import React from "react";
import "./TopArea.css";

const TopArea: React.FC = () => {
  // Still 18 items but now in 6 rows x 3 columns
  const gridItems = Array.from({ length: 18 }, (_, i) => i + 37);

  return (
    <div className="top-area">
      <div className="top-area-grid">
        {gridItems.map((number) => (
          <div key={number} className="top-area-cell">
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArea;
