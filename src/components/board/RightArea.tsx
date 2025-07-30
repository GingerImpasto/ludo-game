// RightArea.tsx
import React from "react";
import "./RightArea.css";
import {
  gridLayout,
  specialCells,
  HOME_ENTRANCE,
  STAR_CELLS,
} from "../../config/gameConfig";
import Pawn from "../game/Pawn";
import { useBoardPawns, usePawnHandlers } from "../../utils/pawnUtils";
import type { PawnColor } from "../game/Pawn";

const RightArea: React.FC = () => {
  const allPawns = useBoardPawns();
  const { handlePawnClick, activePawns, selectedPawn, currentPlayer } =
    usePawnHandlers();

  return (
    <div className="right-area">
      <div className="right-area-grid">
        {gridLayout.rightArea.flatMap((row, rowIndex) =>
          row.map((cellNumber, colIndex) => {
            const isHighlighted = specialCells.yellowCells.includes(cellNumber);
            const isStarCell = cellNumber === STAR_CELLS.yellow;
            const isHomeEntrance = cellNumber === HOME_ENTRANCE.yellow;
            const pawnsInCell = allPawns.filter(
              (pawn) => pawn.position === cellNumber
            );

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`right-area-cell 
                  ${isHighlighted ? "highlight" : ""}
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

export default RightArea;
