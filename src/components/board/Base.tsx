// Base.tsx
import React from "react";
import "./Base.css";
import Pawn from "../game/Pawn";
import { useGame } from "../../context/GameContext";

interface BaseProps {
  color: "red" | "green" | "yellow" | "blue";
}

const Base: React.FC<BaseProps> = ({ color }) => {
  const { state, movePawn, activePawns } = useGame();
  const isCurrentPlayer = state.currentPlayer === color;
  const playerPawns = state.players[color].pawns;

  const handlePawnClick = (pawnIndex: number) => {
    if (isCurrentPlayer && activePawns.includes(pawnIndex)) {
      movePawn(pawnIndex);
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
              disabled={!isCurrentPlayer || !activePawns.includes(pawnIndex)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Base;
