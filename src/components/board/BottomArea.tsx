// BottomArea.tsx
import React from "react";
import "./BottomArea.css";
import {
  gridLayout,
  specialCells,
  HOME_ENTRANCE,
  STAR_CELLS,
} from "../../config/gameConfig";
import Pawn from "../game/Pawn";
import { useBoardPawns, usePawnHandlers } from "../../utils/pawnUtils";
import type { PawnColor } from "../game/Pawn";

const BottomArea: React.FC = () => {
  const allPawns = useBoardPawns();
  const { handlePawnClick, activePawns, selectedPawn, currentPlayer } =
    usePawnHandlers();

  return (
    <div className="bottom-area">
      <div className="bottom-area-grid">
        {gridLayout.bottomArea.map((cellNumber) => {
          const isBlue = specialCells.blueCells.includes(cellNumber);
          const isStarCell = cellNumber === STAR_CELLS.blue;
          const isHomeEntrance = cellNumber === HOME_ENTRANCE.blue;
          const pawnsInCell = allPawns.filter(
            (pawn) => pawn.position === cellNumber
          );

          return (
            <div
              key={cellNumber}
              className={`bottom-area-cell 
                ${isBlue ? "blue-cell" : ""}
                ${isStarCell ? "star-cell" : ""}
                ${isHomeEntrance ? "home-entrance" : ""}
              `}
            >
              <div className="pawns-container">
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomArea;
