// gameLogic.ts
import { specialCells } from "../config/gameConfig";

// Game configuration
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

// Safe cells configuration combining all special positions
export const SAFE_CELLS = [
  ...Object.values(START_POSITIONS),
  ...Object.values(HOME_ENTRANCE),
  ...specialCells.redNumbers,
  ...specialCells.greenCells,
  ...specialCells.blueCells,
  ...specialCells.rightHighlight,
  9, 22, 35, 48, // Middle safe spots
];

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

export const rollDice = () => Math.floor(Math.random() * 6) + 1;

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
      // Basic movement rules only
      if (pawn.isHome) return state.diceValue === 6;
      if (pawn.isFinished) return false;
      if (pawn.pathIndex !== undefined) {
        const remaining = HOME_PATHS[currentPlayer].length - pawn.pathIndex;
        return state.diceValue <= remaining;
      }
      return true; // Allow all other moves
    })
    .map((pawn) => pawn.index);
};

export const checkForWinner = (
  players: GameState["players"],
  player: keyof GameState["players"]
) => {
  return players[player].pawns.every((p) => p.isFinished);
};

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
  // 2. Home path movement (including extra moves from entrance)
  else if (pawn.pathIndex !== undefined || pawn.position === HOME_ENTRANCE[currentPlayer]) {
    const homePath = HOME_PATHS[currentPlayer];
    const currentStep = pawn.position === HOME_ENTRANCE[currentPlayer] 
      ? 0  // At entrance: start counting from step 0
      : (pawn.pathIndex || 0) + 1; // Convert zero-index to step count

    const newStep = currentStep + state.diceValue;

    if (newStep <= homePath.length) {
      updatedPawns[pawnIndex] = {
        ...pawn,
        position: homePath[newStep - 1], // Convert back to zero-index
        pathIndex: newStep - 1,
      };
      // Grant extra turn if landing on entrance (for future moves)
      if (pawn.position === HOME_ENTRANCE[currentPlayer]) extraTurn = true;
    } else {
      // Win if overshooting home path
      updatedPawns[pawnIndex] = {
        ...pawn,
        isFinished: true,
        position: WINNING_POSITION,
      };
    }
  }
  // 3. Regular board movement
  else {
    let newPosition = pawn.position + state.diceValue;
    const homeEntrance = HOME_ENTRANCE[currentPlayer];

    // Handle board wrap-around (52 spaces)
    if (newPosition > 52) newPosition -= 52;

    // Check for home entrance crossing
    if (pawn.position < homeEntrance && newPosition >= homeEntrance) {
      const stepsToEntrance = homeEntrance - pawn.position;
      const stepsIntoHome = state.diceValue - stepsToEntrance;

      if (stepsIntoHome === 0) {
        // Land exactly on entrance
        updatedPawns[pawnIndex] = {
          ...pawn,
          position: homeEntrance,
          pathIndex: 0, // Ready to enter home path
        };
        extraTurn = true;
      } 
      else if (stepsIntoHome > 0) {
        // Move into home path
        const homePath = HOME_PATHS[currentPlayer];
        if (stepsIntoHome <= homePath.length) {
          updatedPawns[pawnIndex] = {
            ...pawn,
            position: homePath[stepsIntoHome - 1],
            pathIndex: stepsIntoHome - 1,
          };
        } else {
          // Win if overshooting
          updatedPawns[pawnIndex] = {
            ...pawn,
            isFinished: true,
            position: WINNING_POSITION,
          };
        }
      }
    } 
    else {
      // Normal movement (no home path interaction)
      updatedPawns[pawnIndex] = {
        ...pawn,
        position: newPosition,
      };

      // Capture logic (only on non-safe cells)
      if (!SAFE_CELLS.includes(newPosition)) {
        Object.entries(updatedPlayers).forEach(([color, otherPlayer]) => {
          if (color === currentPlayer) return;

          otherPlayer.pawns.forEach((otherPawn, otherPawnIndex) => {
            if (
              !otherPawn.isHome &&
              !otherPawn.isFinished &&
              otherPawn.position === newPosition
            ) {
              // Send opponent's pawn home
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
    }
  }

  // Update state
  updatedPlayers[currentPlayer] = {
    ...playerState,
    pawns: updatedPawns,
  };

  return {
    players: updatedPlayers,
    hasRolledDice: !extraTurn && !capturedPawn, // End turn unless extra move granted
    extraTurn,
    capturedPawn,
  };
};