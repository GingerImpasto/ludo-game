// LeftArea.tsx
import React, { useMemo } from "react";
import "./LeftArea.css";
import { gridLayout, specialCells } from "../../config/gameConfig";
import Pawn from "../game/Pawn";
import type { PawnColor } from "../game/Pawn";
import { useGame } from "../../context/GameContext";

const LeftArea: React.FC = () => {
  const { state, movePawn, activePawns, selectPawn, selectedPawn } = useGame();

  // Memoize the pawns array to optimize performance
  const allPawns = useMemo(() => {
    return [
      ...state.players.red.pawns.map((p, i) => ({
        ...p,
        color: "red" as const,
        player: "red",
        index: i,
      })),
      ...state.players.green.pawns.map((p, i) => ({
        ...p,
        color: "green" as const,
        player: "green",
        index: i,
      })),
      ...state.players.yellow.pawns.map((p, i) => ({
        ...p,
        color: "yellow" as const,
        player: "yellow",
        index: i,
      })),
      ...state.players.blue.pawns.map((p, i) => ({
        ...p,
        color: "blue" as const,
        player: "blue",
        index: i,
      })),
    ].filter((pawn) => !pawn.isHome && !pawn.isFinished);
  }, [state.players]); // Recompute when players' pawns change

  const handlePawnClick = (pawn: (typeof allPawns)[0]) => {
    if (pawn.player !== state.currentPlayer) return;
    const isActive = activePawns.includes(pawn.index);
    if (isActive) {
      movePawn(pawn.index);
    } else {
      selectPawn(pawn.index);
    }
  };

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
                {pawnsInCell.map((pawn, i) => {
                  const isCurrentPlayer = pawn.player === state.currentPlayer;
                  const isActive = activePawns.includes(pawn.index);
                  const isSelected = selectedPawn === pawn.index;

                  return (
                    <Pawn
                      key={`${pawn.player}-${pawn.index}`} // Unique key for each pawn
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
