// gameLogic.ts
import { 
  HOME_PATHS,
  PLAYERS_ORDER
} from "../config/gameConfig";

// PlayerState and GameState interfaces
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

// getInitialGameState
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

// rollDice
export const rollDice = () => Math.floor(Math.random() * 6) + 1;

// getActivePawns
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

// checkForWinner
export const checkForWinner = (
  players: GameState["players"],
  player: keyof GameState["players"]
) => {
  return players[player].pawns.every((p) => p.isFinished);
};

// getNextPlayer
export const getNextPlayer = (currentPlayer: GameState["currentPlayer"]) => {
  const currentIndex = PLAYERS_ORDER.indexOf(currentPlayer);
  return PLAYERS_ORDER[(currentIndex + 1) % PLAYERS_ORDER.length];
};