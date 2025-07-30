// gameLogic.ts
import { specialCells } from "../config/gameConfig";

// Game configuration (unchanged)
export const START_POSITIONS = {
  red: 1,
  green: 14,
  yellow: 27,
  blue: 40,
};

export const HOME_ENTRANCE = {
  red: 51,
  green: 12,
  yellow: 25,
  blue: 38,
};

export const HOME_PATHS = {
  red: [53, 54, 55, 56, 57],
  green: [58, 59, 60, 61, 62],
  yellow: [63, 64, 65, 66, 67],
  blue: [68, 69, 70, 71, 72],
};

export const WINNING_POSITION = 73;

// Safe cells configuration (unchanged)
export const SAFE_CELLS = [
  ...Object.values(START_POSITIONS),
  ...Object.values(HOME_ENTRANCE),
  ...specialCells.redNumbers,
  ...specialCells.greenCells,
  ...specialCells.blueCells,
  ...specialCells.rightHighlight,
  9, 22, 35, 48, // Middle safe spots
];

// PlayerState and GameState interfaces (unchanged)
export interface PlayerState {
  pawns: {
    position: number;
    isHome: boolean;
    isFinished: boolean;
    pathIndex?: number;
  }[];
}

export interface GameState {
  diceValue: number;
  currentPlayer: "red" | "green" | "yellow" | "blue";
  players: {
    red: PlayerState;
    green: PlayerState;
    yellow: PlayerState;
    blue: PlayerState;
  };
  hasRolledDice: boolean;
  consecutiveSixes: number;
}

// getInitialGameState (unchanged)
export const getInitialGameState = (): GameState => ({
  diceValue: 1,
  currentPlayer: "red",
  hasRolledDice: false,
  consecutiveSixes: 0,
  players: {
    red: {
      pawns: Array(4).fill({
        position: -1,
        isHome: true,
        isFinished: false,
        pathIndex: -1,
      }),
    },
    green: {
      pawns: Array(4).fill({
        position: -1,
        isHome: true,
        isFinished: false,
        pathIndex: -1,
      }),
    },
    yellow: {
      pawns: Array(4).fill({
        position: -1,
        isHome: true,
        isFinished: false,
        pathIndex: -1,
      }),
    },
    blue: {
      pawns: Array(4).fill({
        position: -1,
        isHome: true,
        isFinished: false,
        pathIndex: -1,
      }),
    },
  },
});

// rollDice (unchanged)
export const rollDice = () => Math.floor(Math.random() * 6) + 1;

// getActivePawns (unchanged)
export const getActivePawns = (
  state: GameState,
  winner: string | null,
  currentPlayer: GameState["currentPlayer"]
) => {
  if (winner) return [];

  const playerState = state.players[currentPlayer];
  
  return playerState.pawns
    .map((pawn, index) => ({ ...pawn, index }))
    .filter((pawn) => {
      if (pawn.isHome) return state.diceValue === 6;
      if (pawn.isFinished) return false;
      if (pawn.pathIndex !== undefined) {
        const remaining = HOME_PATHS[currentPlayer].length - pawn.pathIndex;
        return state.diceValue <= remaining;
      }
      return true;
    })
    .map((pawn) => pawn.index);
};

// checkForWinner (unchanged)
export const checkForWinner = (
  players: GameState["players"],
  player: keyof GameState["players"]
) => {
  return players[player].pawns.every((p) => p.isFinished);
};

// getNextPlayer (unchanged)
export const getNextPlayer = (currentPlayer: GameState["currentPlayer"]) => {
  const playersOrder: GameState["currentPlayer"][] = [
    "red",
    "green",
    "yellow",
    "blue",
  ];
  const currentIndex = playersOrder.indexOf(currentPlayer);
  return playersOrder[(currentIndex + 1) % playersOrder.length];
};

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
    const newStep = (pawn.pathIndex || 0) + state.diceValue;

    if (newStep < homePath.length) {
      updatedPawns[pawnIndex] = {
        ...pawn,
        position: homePath[newStep],
        pathIndex: newStep,
      };
      extraTurn = state.diceValue === 6;
    } else {
      updatedPawns[pawnIndex] = {
        ...pawn,
        isFinished: true,
        position: WINNING_POSITION,
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
        if (stepsIntoHome <= homePath.length) {
          updatedPawns[pawnIndex] = {
            ...pawn,
            position: homePath[stepsIntoHome - 1],
            pathIndex: stepsIntoHome - 1,
          };
          extraTurn = state.diceValue === 6;
        } else {
          updatedPawns[pawnIndex] = {
            ...pawn,
            isFinished: true,
            position: WINNING_POSITION,
          };
        }
      } else {
        // Land exactly on entrance
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