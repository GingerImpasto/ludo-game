// RightArea.tsx
import React from "react";
import "./RightArea.css";
import { gridLayout, specialCells } from "../../config/gameConfig";
import Pawn from "../game/Pawn";
import type { PawnColor } from "../game/Pawn";
import { useGame } from "../../context/GameContext";

const RightArea: React.FC = () => {
  const { state } = useGame();

  // Get all pawns from all players that are on the board (not home or finished)
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
    <div className="right-area">
      <div className="right-area-grid">
        {gridLayout.rightArea.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {row.map((cellNumber, colIndex) => {
              const isHighlighted =
                specialCells.rightHighlight.includes(cellNumber);
              const pawnsInCell = allPawns.filter(
                (pawn) => pawn.position === cellNumber
              );

              return (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={`right-area-cell ${
                    isHighlighted ? "highlight" : ""
                  }`}
                >
                  <span>{cellNumber}</span>
                  <div className="pawns-container">
                    {pawnsInCell.map((pawn, pawnIndex) => (
                      <Pawn
                        key={`pawn-${pawnIndex}`}
                        color={pawn.color as PawnColor}
                        position="board"
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RightArea;
