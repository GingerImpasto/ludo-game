// moveLogic.ts
import type { GameState } from "./gameLogic";
import { 
  START_POSITIONS, 
  HOME_ENTRANCE, 
  HOME_PATHS, 
  WINNING_POSITION, 
  SAFE_CELLS 
} from "../config/gameConfig";

export const movePawnLogic = (
  state: GameState,
  pawnIndex: number,
  currentPlayer: GameState["currentPlayer"]
) => {
  let extraTurn = false;
  let capturedPawn = false;

  const updatedPlayers = { ...state.players };
  const playerState = { ...updatedPlayers[currentPlayer] };
  const updatedPawns = [...playerState.pawns];
  const pawn = { ...updatedPawns[pawnIndex] };

  // --- Movement Logic ---
  // 1. Starting movement (leave home)
  if (pawn.isHome && state.diceValue === 6) {
    updatedPawns[pawnIndex] = {
      ...pawn,
      position: START_POSITIONS[currentPlayer],
      isHome: false,
      pathIndex: undefined,
    };
    extraTurn = true;
  }
  // 2. Home path movement
  else if (pawn.pathIndex !== undefined) {
    const homePath = HOME_PATHS[currentPlayer];
    const newStep = pawn.pathIndex + state.diceValue;

    if (newStep < homePath.length) {
      updatedPawns[pawnIndex] = {
        ...pawn,
        position: homePath[newStep - 1],
        pathIndex: newStep,
      };
      extraTurn = state.diceValue === 6;
    } 
    else if (newStep === homePath.length) {
      updatedPawns[pawnIndex] = {
        ...pawn,
        isFinished: true,
        position: WINNING_POSITION,
      };
    }
    else {
      // Don't move if it would go past the winning position
      updatedPawns[pawnIndex] = {
        ...pawn,
        position: homePath[homePath.length - 1],
        pathIndex: homePath.length,
      };
    }
  }
  // 3. Regular board movement (including home entrance)
  else {
    let newPosition = pawn.position + state.diceValue;
    const homeEntrance = HOME_ENTRANCE[currentPlayer];
    const homePath = HOME_PATHS[currentPlayer];

    // Check if we're passing or landing on home entrance
    const willPassEntrance = pawn.position < homeEntrance && newPosition >= homeEntrance;
    const isExactlyAtEntrance = newPosition === homeEntrance;

    if (willPassEntrance || isExactlyAtEntrance) {
      const stepsToEntrance = homeEntrance - pawn.position;
      const stepsIntoHome = state.diceValue - stepsToEntrance;

      if (stepsIntoHome > 0) {
        if (stepsIntoHome < homePath.length) {
          updatedPawns[pawnIndex] = {
            ...pawn,
            position: homePath[stepsIntoHome - 1],
            pathIndex: stepsIntoHome,
          };
          extraTurn = state.diceValue === 6;
        } 
        else if (stepsIntoHome === homePath.length) {
          updatedPawns[pawnIndex] = {
            ...pawn,
            isFinished: true,
            position: WINNING_POSITION,
          };
        }
        else {
          // Don't move if it would go past the winning position
          updatedPawns[pawnIndex] = {
            ...pawn,
            position: homePath[homePath.length - 1],
            pathIndex: homePath.length,
          };
        }
      } else {
        // Land exactly on entrance (index 0)
        updatedPawns[pawnIndex] = {
          ...pawn,
          position: homeEntrance,
          pathIndex: 0,
        };
        extraTurn = state.diceValue === 6;
      }
    } 
    else {
      // Normal board movement with wrap-around
      if (newPosition > 52) newPosition -= 52;

      updatedPawns[pawnIndex] = {
        ...pawn,
        position: newPosition,
      };

      // Capture logic
      if (!SAFE_CELLS.includes(newPosition)) {
        Object.entries(updatedPlayers).forEach(([color, otherPlayer]) => {
          if (color === currentPlayer) return;

          otherPlayer.pawns.forEach((otherPawn, otherPawnIndex) => {
            if (
              !otherPawn.isHome &&
              !otherPawn.isFinished &&
              otherPawn.position === newPosition
            ) {
              updatedPlayers[color as keyof typeof updatedPlayers].pawns[otherPawnIndex] = {
                ...otherPawn,
                position: -1,
                isHome: true,
              };
              capturedPawn = true;
            }
          });
        });
      }
      extraTurn = state.diceValue === 6 || capturedPawn;
    }
  }

  // Update state
  updatedPlayers[currentPlayer] = {
    ...playerState,
    pawns: updatedPawns,
  };

  return {
    players: updatedPlayers,
    hasRolledDice: !(extraTurn || capturedPawn),
    extraTurn: extraTurn || capturedPawn,
    capturedPawn,
  };
};