// utils/pawnUtils.ts
import { useGame } from "../context/GameContext";
import type { PawnColor } from "../components/game/Pawn";

export interface BoardPawn {
  position: number;
  color: PawnColor;
  player: string;
  index: number;
  isHome: boolean;
  isFinished: boolean;
}

export const useBoardPawns = () => {
  const { state } = useGame();

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
  ].filter((pawn) => !pawn.isHome && !pawn.isFinished) as BoardPawn[];
};

export const usePawnHandlers = () => {
  const { movePawn, activePawns, selectPawn, selectedPawn, state } = useGame();

  const handlePawnClick = (pawn: BoardPawn) => {
    if (pawn.player !== state.currentPlayer) return;
    const isActive = activePawns.includes(pawn.index);
    if (isActive) {
      movePawn(pawn.index);
    } else {
      selectPawn(pawn.index);
    }
  };

  return {
    handlePawnClick,
    activePawns,
    selectedPawn,
    currentPlayer: state.currentPlayer,
  };
};