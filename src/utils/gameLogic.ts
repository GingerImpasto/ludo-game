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

export const WINNING_POSITION = 73;

export const HOME_PATHS = {
  red: [53, 54, 55, 56, 57, WINNING_POSITION],
  green: [58, 59, 60, 61, 62, WINNING_POSITION],
  yellow: [63, 64, 65, 66, 67, WINNING_POSITION],
  blue: [68, 69, 70, 71, 72, WINNING_POSITION],
};

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
        return state.diceValue <= remaining || (remaining === 0 && state.diceValue === 1);
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
