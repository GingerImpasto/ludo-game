// LeftArea.tsx
import React from "react";
import "./LeftArea.css";
import { gridLayout, specialCells } from "../../config/gameConfig";
import Pawn from "../game/Pawn";
import type { PawnColor } from "../game/Pawn";
import { useGame } from "../../context/GameContext";

const LeftArea: React.FC = () => {
  const { state } = useGame();

  // Get all pawns from all players that are on the board
  const allPawns = [
    ...state.players.red.pawns.map((p) => ({ ...p, color: "red" as const })),
    ...state.players.green.pawns.map((p) => ({
      ...p,
      color: "green" as const,
    })),
    ...state.players.yellow.pawns.map((p) => ({
      ...p,
      color: "yellow" as const,
    })),
    ...state.players.blue.pawns.map((p) => ({ ...p, color: "blue" as const })),
  ].filter((pawn) => !pawn.isHome && !pawn.isFinished);

  return (
    <div className="left-area">
      <div className="left-area-grid">
        {gridLayout.leftArea.flatMap((row, rowIndex) =>
          row.map((cellNumber, colIndex) => {
            const isRed = specialCells.redNumbers.includes(cellNumber);
            const pawnsInCell = allPawns.filter(
              (pawn) => pawn.position === cellNumber
            );

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`left-area-cell ${isRed ? "red-cell" : ""}`}
              >
                {cellNumber}
                {pawnsInCell.map((pawn, i) => (
                  <Pawn
                    key={i}
                    color={pawn.color as PawnColor}
                    position="board"
                  />
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LeftArea;
