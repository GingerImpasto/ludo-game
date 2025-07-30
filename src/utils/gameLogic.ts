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
  red: [52, 53, 54, 55],
  green: [56, 57, 58, 59],
  yellow: [60, 61, 62, 63],
  blue: [64, 65, 66, 67],
};

export const WINNING_POSITION = 68;

// Safe cells configuration combining all special positions
export const SAFE_CELLS = [
  ...Object.values(START_POSITIONS),
  ...Object.values(HOME_ENTRANCE),
  ...specialCells.redNumbers,
  ...specialCells.greenCells,
  ...specialCells.blueCells,
  ...specialCells.rightHighlight,
  9,
  22,
  35,
  48, // Middle safe spots
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
}

export const getInitialGameState = (): GameState => ({
  diceValue: 1,
  currentPlayer: "red",
  hasRolledDice: false,
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
      if (pawn.isHome) return state.diceValue === 6;
      if (pawn.isFinished) return false;
      if (pawn.pathIndex !== undefined) {
        const remaining = HOME_PATHS[currentPlayer].length - pawn.pathIndex;
        return state.diceValue <= remaining;
      }
      // Don't allow moving from safe cells if other options exist
      const isSafe = SAFE_CELLS.includes(pawn.position);
      const hasNonSafeOptions = playerState.pawns.some(
        (p, i) =>
          !p.isHome &&
          !p.isFinished &&
          !SAFE_CELLS.includes(p.position) &&
          i !== pawn.index
      );
      return !(isSafe && hasNonSafeOptions);
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

  // Starting movement (leave home)
  if (pawn.isHome && state.diceValue === 6) {
    updatedPawns[pawnIndex] = {
      ...pawn,
      position: START_POSITIONS[currentPlayer],
      isHome: false,
      pathIndex: undefined,
    };
    extraTurn = true;
  }
  // Home path movement
  else if (pawn.pathIndex !== undefined && pawn.pathIndex >= 0) {
    const newPathIndex = pawn.pathIndex + state.diceValue;
    if (newPathIndex < HOME_PATHS[currentPlayer].length) {
      updatedPawns[pawnIndex] = {
        ...pawn,
        position: HOME_PATHS[currentPlayer][newPathIndex],
        pathIndex: newPathIndex,
      };
    } else {
      updatedPawns[pawnIndex] = {
        ...pawn,
        isFinished: true,
        position: WINNING_POSITION,
      };
    }
  }
  // Regular board movement
  else {
    let newPosition = pawn.position + state.diceValue;

    // Handle board wrap-around (52 spaces total)
    if (newPosition > 52) {
      newPosition -= 52;
    }

    // Check for home entrance
    if (newPosition === HOME_ENTRANCE[currentPlayer]) {
      updatedPawns[pawnIndex] = {
        ...pawn,
        position: newPosition,
        pathIndex: 0,
      };
      extraTurn = true;
    } else {
      // Check for collisions
      const isSafeCell = SAFE_CELLS.includes(newPosition);

      // Check all other players' pawns for collisions
      Object.entries(updatedPlayers).forEach(([color, otherPlayer]) => {
        if (color === currentPlayer) return;

        otherPlayer.pawns.forEach((otherPawn, otherPawnIndex) => {
          if (
            !otherPawn.isHome &&
            !otherPawn.isFinished &&
            otherPawn.position === newPosition &&
            !isSafeCell
          ) {
            // Capture the opponent's pawn
            updatedPlayers[color as keyof typeof updatedPlayers].pawns[
              otherPawnIndex
            ] = {
              ...otherPawn,
              position: -1,
              isHome: true,
              pathIndex: undefined,
            };
            capturedPawn = true;
          }
        });
      });

      updatedPawns[pawnIndex] = {
        ...pawn,
        position: newPosition,
      };
    }
  }

  updatedPlayers[currentPlayer] = {
    ...playerState,
    pawns: updatedPawns,
  };

  return {
    players: updatedPlayers,
    hasRolledDice: !extraTurn && !capturedPawn,
    extraTurn,
    capturedPawn,
  };
};