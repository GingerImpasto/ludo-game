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

const HOME_ENTRANCE = {
  red: 51,
  green: 12,
  yellow: 25,
  blue: 38,
};

const HOME_PATHS = {
  red: [52, 53, 54, 55],
  green: [56, 57, 58, 59],
  yellow: [60, 61, 62, 63],
  blue: [64, 65, 66, 67],
};

const WINNING_POSITION = 68;

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
  currentPlayer: "red" | "green" | "yellow" | "blue"; // Added this line
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
        if (pawn.isHome) return state.diceValue === 6;
        if (pawn.isFinished) return false;
        if (pawn.pathIndex !== undefined) {
          const remaining =
            HOME_PATHS[state.currentPlayer].length - pawn.pathIndex;
          return state.diceValue <= remaining;
        }
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

  const movePawn = useCallback(
    (pawnIndex: number) => {
      if (!state.hasRolledDice || winner) return;

      let extraTurn = false; // Declare this variable outside setState

      setState((prev) => {
        const currentPlayer = prev.currentPlayer;
        const updatedPlayers = { ...prev.players };
        const playerState = { ...updatedPlayers[currentPlayer] };

        const updatedPawns = [...playerState.pawns];
        const pawn = { ...updatedPawns[pawnIndex] };

        // Starting movement (leave home)
        if (pawn.isHome && prev.diceValue === 6) {
          updatedPawns[pawnIndex] = {
            ...pawn,
            position: START_POSITIONS[currentPlayer],
            isHome: false,
            pathIndex: undefined,
          };
          extraTurn = true; // Set the external variable
        }
        // Home path movement
        else if (pawn.pathIndex !== undefined && pawn.pathIndex >= 0) {
          const newPathIndex = pawn.pathIndex + prev.diceValue;
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
          let newPosition = pawn.position + prev.diceValue;

          // Handle board wrap-around (52 spaces total)
          if (newPosition > 52) {
            newPosition -= 52;
          }

          // Check for home entrance
          if (newPosition === HOME_ENTRANCE[currentPlayer]) {
            updatedPawns[pawnIndex] = {
              ...pawn,
              position: newPosition,
              pathIndex: 0, // Start of home path
            };
            extraTurn = true; // Set the external variable
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
          hasRolledDice: !extraTurn, // Player gets another turn if they rolled 6 or entered home path
        };
      });

      setSelectedPawn(null);
      checkForWinner(state.currentPlayer);

      // Use the extraTurn variable here
      if (!extraTurn) {
        switchPlayer();
      }
    },
    [
      state.hasRolledDice,
      state.currentPlayer,
      state.players,
      winner,
      checkForWinner,
      switchPlayer,
    ]
  );

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
    currentPlayer: state.currentPlayer, // Added this line
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
