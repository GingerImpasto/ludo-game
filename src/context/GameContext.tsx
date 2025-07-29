import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

// Game configuration
const START_POSITIONS = {
  red: 1,
  green: 14,
  yellow: 27,
  blue: 40,
};

// const SAFE_SPOTS = [1, 9, 14, 22, 27, 35, 40, 48];
const HOME_ENTRANCE = {
  red: 51,
  green: 12,
  yellow: 25,
  blue: 38,
};
const HOME_PATHS = {
  red: [52, 53, 54, 55],
  green: [13, 26, 39, 52],
  yellow: [26, 39, 52, 13],
  blue: [39, 52, 13, 26],
};
const WINNING_POSITION = 57;

interface PlayerState {
  pawns: {
    position: number;
    isHome: boolean;
    isFinished: boolean;
    pathIndex?: number;
  }[];
}

interface GameState {
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

interface GameContextType {
  state: GameState;
  rollDice: () => void;
  movePawn: (pawnIndex: number) => void;
  switchPlayer: () => void;
  selectPawn: (pawnIndex: number) => void;
  selectedPawn: number | null;
  activePawns: number[];
  winner: string | null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<GameState>({
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

  const [selectedPawn, setSelectedPawn] = useState<number | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const rollDice = useCallback(() => {
    if (winner) return;

    const newValue = Math.floor(Math.random() * 6) + 1;
    setState((prev) => ({
      ...prev,
      diceValue: newValue,
      hasRolledDice: true,
    }));
    setSelectedPawn(null);
  }, [winner]);

  const activePawns = useMemo(() => {
    if (winner) return [];

    const playerState = state.players[state.currentPlayer];
    return playerState.pawns
      .map((pawn, index) => ({ ...pawn, index }))
      .filter((pawn) => {
        // Can move out with a 6
        if (pawn.isHome) return state.diceValue === 6;

        // Can't move if finished
        if (pawn.isFinished) return false;

        // In home path - can only move if exact dice available
        if (pawn.position >= HOME_ENTRANCE[state.currentPlayer]) {
          const remaining =
            HOME_PATHS[state.currentPlayer].length - pawn.pathIndex!;
          return state.diceValue <= remaining;
        }

        // Normal movement
        return true;
      })
      .map((pawn) => pawn.index);
  }, [state, winner]);

  const checkForWinner = useCallback(
    (player: keyof GameState["players"]) => {
      const allFinished = state.players[player].pawns.every(
        (p) => p.isFinished
      );
      if (allFinished) {
        setWinner(player);
      }
    },
    [state.players]
  );

  const movePawn = useCallback(
    (pawnIndex: number) => {
      if (!state.hasRolledDice || winner) return;

      setState((prev) => {
        const currentPlayer = prev.currentPlayer;
        const updatedPlayers = { ...prev.players };
        const playerState = { ...updatedPlayers[currentPlayer] };

        // Create a new array for pawns to ensure state updates properly
        const updatedPawns = [...playerState.pawns];
        const pawn = { ...updatedPawns[pawnIndex] }; // Create new pawn object

        // Moving out of base
        if (pawn.isHome && prev.diceValue === 6) {
          updatedPawns[pawnIndex] = {
            ...pawn,
            position: START_POSITIONS[currentPlayer],
            isHome: false,
            pathIndex: undefined, // Reset path index when leaving base
          };
        }
        // Moving in home path
        else if (pawn.position >= HOME_ENTRANCE[currentPlayer]) {
          const newPathIndex = (pawn.pathIndex || 0) + prev.diceValue;
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
        // Normal movement
        else {
          let newPosition = pawn.position + prev.diceValue;

          // Handle board loop (52 total cells)
          if (newPosition > 52) {
            newPosition -= 52;
          }

          // Check if entering home path
          if (newPosition === HOME_ENTRANCE[currentPlayer]) {
            updatedPawns[pawnIndex] = {
              ...pawn,
              position: newPosition,
              pathIndex: 0,
            };
          } else {
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
          ...prev,
          players: updatedPlayers,
          hasRolledDice: false,
        };
      });

      setSelectedPawn(null);
      checkForWinner(state.currentPlayer);
    },
    [state.hasRolledDice, state.currentPlayer, winner, checkForWinner]
  );

  const switchPlayer = useCallback(() => {
    if (winner) return;

    setState((prev) => {
      const playersOrder: GameState["currentPlayer"][] = [
        "red",
        "green",
        "yellow",
        "blue",
      ];
      const currentIndex = playersOrder.indexOf(prev.currentPlayer);
      const nextIndex = (currentIndex + 1) % playersOrder.length;
      return {
        ...prev,
        currentPlayer: playersOrder[nextIndex],
        diceValue: 1,
        hasRolledDice: false,
      };
    });
    setSelectedPawn(null);
  }, [winner]);

  const selectPawn = useCallback(
    (pawnIndex: number) => {
      if (!state.hasRolledDice || winner) return;
      setSelectedPawn(pawnIndex);
    },
    [state.hasRolledDice, winner]
  );

  const contextValue: GameContextType = {
    state,
    rollDice,
    movePawn,
    switchPlayer,
    selectPawn,
    selectedPawn,
    activePawns,
    winner,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
