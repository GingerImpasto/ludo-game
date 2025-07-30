// LeftArea.tsx
import React from "react";
import "./LeftArea.css";
import {
  gridLayout,
  specialCells,
  HOME_ENTRANCE,
  STAR_CELLS,
} from "../../config/gameConfig";
import Pawn from "../game/Pawn";
import { useBoardPawns, usePawnHandlers } from "../../utils/pawnUtils";
import type { PawnColor } from "../game/Pawn";

const LeftArea: React.FC = () => {
  const allPawns = useBoardPawns();
  const { handlePawnClick, activePawns, selectedPawn, currentPlayer } =
    usePawnHandlers();

  return (
    <div className="left-area">
      <div className="left-area-grid">
        {gridLayout.leftArea.flatMap((row, rowIndex) =>
          row.map((cellNumber, colIndex) => {
            const isRed = specialCells.redNumbers.includes(cellNumber);
            const isStarCell = cellNumber === STAR_CELLS.red;
            const isHomeEntrance = cellNumber === HOME_ENTRANCE.red;
            const pawnsInCell = allPawns.filter(
              (pawn) => pawn.position === cellNumber
            );

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`left-area-cell 
                  ${isRed ? "red-cell" : ""}
                  ${isStarCell ? "star-cell" : ""}
                  ${isHomeEntrance ? "home-entrance" : ""}
                `}
              >
                {pawnsInCell.map((pawn) => {
                  const isCurrentPlayer = pawn.player === currentPlayer;
                  const isActive = activePawns.includes(pawn.index);
                  const isSelected = selectedPawn === pawn.index;

                  return (
                    <Pawn
                      key={`${pawn.player}-${pawn.index}`}
                      color={pawn.color as PawnColor}
                      position="board"
                      onClick={() => handlePawnClick(pawn)}
                      selected={isSelected}
                      disabled={!isCurrentPlayer || !isActive}
                    />
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LeftArea;
