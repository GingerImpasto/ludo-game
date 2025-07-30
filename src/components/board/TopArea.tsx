// TopArea.tsx
import React from "react";
import "./TopArea.css";
import {
  gridLayout,
  specialCells,
  HOME_ENTRANCE,
  STAR_CELLS,
} from "../../config/gameConfig";
import Pawn from "../game/Pawn";
import { useBoardPawns, usePawnHandlers } from "../../utils/pawnUtils";
import type { PawnColor } from "../game/Pawn";

const TopArea: React.FC = () => {
  const allPawns = useBoardPawns();
  const { handlePawnClick, activePawns, selectedPawn, currentPlayer } =
    usePawnHandlers();

  return (
    <div className="top-area">
      <div className="top-area-grid">
        {gridLayout.topArea.flatMap((row, rowIndex) =>
          row.map((cellNumber, colIndex) => {
            const isGreen = specialCells.greenCells.includes(cellNumber);
            const isStarCell = cellNumber === STAR_CELLS.green;
            const isHomeEntrance = cellNumber === HOME_ENTRANCE.green;
            const pawnsInCell = allPawns.filter(
              (pawn) => pawn.position === cellNumber
            );

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`top-area-cell 
                  ${isGreen ? "green-cell" : ""}
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

export default TopArea;
