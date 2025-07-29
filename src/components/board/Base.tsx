// Base.tsx
import React from "react";
import "./Base.css";
import Pawn from "../game/Pawn";
import { useGame } from "../../context/GameContext";

interface BaseProps {
  color: "red" | "green" | "yellow" | "blue";
}

const Base: React.FC<BaseProps> = ({ color }) => {
  const { state, selectPawn, selectedPawn, activePawns, movePawn } = useGame();

  const isCurrentPlayer = state.currentPlayer === color;
  const playerPawns = state.players[color].pawns;

  const handlePawnClick = (pawnIndex: number) => {
    if (isCurrentPlayer && activePawns.includes(pawnIndex)) {
      if (selectedPawn === pawnIndex) {
        // If pawn is already selected, move it
        movePawn(pawnIndex);
      } else {
        // Otherwise select it
        selectPawn(pawnIndex);
      }
    }
  };

  return (
    <div className={`base ${color}`}>
      {playerPawns.map((pawn, pawnIndex) => (
        <div key={pawnIndex} className={`pawn-position ${color}`}>
          {pawn.isHome && (
            <Pawn
              color={color}
              position="base"
              onClick={() => handlePawnClick(pawnIndex)}
              selected={isCurrentPlayer && selectedPawn === pawnIndex}
              disabled={!isCurrentPlayer || !activePawns.includes(pawnIndex)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Base;
