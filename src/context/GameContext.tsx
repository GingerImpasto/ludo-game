// GameContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

interface PlayerState {
  pawns: {
    position: number; // position on the board
    isHome: boolean;
    isFinished: boolean;
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
}

interface GameContextType {
  state: GameState;
  rollDice: () => void;
  movePawn: (pawnIndex: number) => void;
  switchPlayer: () => void;
  selectPawn: (pawnIndex: number) => void;
  selectedPawn: number | null;
  activePawns: number[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<GameState>({
    diceValue: 1,
    currentPlayer: "red",
    players: {
      red: {
        pawns: Array(4).fill({ position: -1, isHome: true, isFinished: false }),
      },
      green: {
        pawns: Array(4).fill({ position: -1, isHome: true, isFinished: false }),
      },
      yellow: {
        pawns: Array(4).fill({ position: -1, isHome: true, isFinished: false }),
      },
      blue: {
        pawns: Array(4).fill({ position: -1, isHome: true, isFinished: false }),
      },
    },
  });

  const [selectedPawn, setSelectedPawn] = useState<number | null>(null);

  const rollDice = useCallback(() => {
    const newValue = Math.floor(Math.random() * 6) + 1;
    setState((prev) => ({
      ...prev,
      diceValue: newValue,
    }));
    // Clear selection when rolling dice
    setSelectedPawn(null);
  }, []);

  const activePawns = useMemo(() => {
    const playerState = state.players[state.currentPlayer];
    return playerState.pawns
      .map((pawn, index) => ({ ...pawn, index }))
      .filter((pawn) => {
        // Pawns at home can move out if dice is 6
        if (pawn.isHome) return state.diceValue === 6;
        // Pawns on board can move if they're not finished
        return !pawn.isFinished;
      })
      .map((pawn) => pawn.index);
  }, [state]);

  const movePawn = useCallback(
    (pawnIndex: number) => {
      if (selectedPawn === null) return;

      setState((prev) => {
        const currentPlayer = prev.currentPlayer;
        const updatedPawns = [...prev.players[currentPlayer].pawns];
        const pawn = updatedPawns[pawnIndex];

        // Basic movement logic
        const newPosition =
          pawn.position === -1 ? 0 : pawn.position + prev.diceValue;

        updatedPawns[pawnIndex] = {
          ...pawn,
          position: newPosition,
          isHome: false,
        };

        return {
          ...prev,
          players: {
            ...prev.players,
            [currentPlayer]: {
              ...prev.players[currentPlayer],
              pawns: updatedPawns,
            },
          },
        };
      });

      // Clear selection after move
      setSelectedPawn(null);
    },
    [selectedPawn]
  );

  const switchPlayer = useCallback(() => {
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
        diceValue: 1, // Reset dice after turn
      };
    });
    // Clear selection when switching players
    setSelectedPawn(null);
  }, []);

  const selectPawn = useCallback(
    (pawnIndex: number) => {
      console.log(`Selected pawn ${pawnIndex} for ${state.currentPlayer}`);
      setSelectedPawn(pawnIndex);
    },
    [state.currentPlayer]
  );

  const contextValue: GameContextType = {
    state,
    rollDice,
    movePawn,
    switchPlayer,
    selectPawn,
    selectedPawn,
    activePawns,
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
