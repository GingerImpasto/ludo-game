// ColorTriangle.tsx
import React from "react";
import Pawn from "../game/Pawn";

interface ColorTriangleProps {
  color: "red" | "green" | "yellow" | "blue";
  pawnPositions: Array<{ left: string; top: string }>;
}

const ColorTriangle: React.FC<ColorTriangleProps> = ({
  color,
  pawnPositions,
}) => {
  return (
    <div className={`color-arrow ${color}`}>
      {pawnPositions.map((pos, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: pos.left,
            top: pos.top,
            transform: "translate(-50%, -50%)",
            width: "20%",
            height: "20%",
          }}
        >
          <Pawn color={color} position="board" />
        </div>
      ))}
    </div>
  );
};

export default ColorTriangle;
