// Base.tsx (updated)
import React from "react";
import "./Base.css";
import Pawn from "../game/Pawn";

interface BaseProps {
  color: "red" | "green" | "yellow" | "blue";
  onPawnClick?: (pawnNumber: number) => void;
  activePawns?: number[]; // Array of pawn numbers (1-4) that are active/selectable
  selectedPawn?: number | null;
}

const Base: React.FC<BaseProps> = ({
  color,
  onPawnClick,
  activePawns = [1, 2, 3, 4],
  selectedPawn,
}) => {
  return (
    <div className={`base ${color}`}>
      {[1, 2, 3, 4].map((pawnNumber) => (
        <div key={pawnNumber} className="pawn-position">
          <Pawn
            color={color}
            position="base"
            onClick={() => onPawnClick && onPawnClick(pawnNumber)}
            selected={selectedPawn === pawnNumber}
            disabled={!activePawns.includes(pawnNumber)}
          />
        </div>
      ))}
    </div>
  );
};

export default Base;
