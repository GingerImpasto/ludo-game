// GameContext.tsx
import React, { createContext, useContext, useState, useCallback } from "react";

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

interface PlayerState {
  pawns: {
    position: number; // position on the board
    isHome: boolean;
    isFinished: boolean;
  }[];
}

interface GameContextType {
  state: GameState;
  rollDice: () => void;
  movePawn: (player: keyof GameState["players"], pawnIndex: number) => void;
  switchPlayer: () => void;
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

  const rollDice = useCallback(() => {
    const newValue = Math.floor(Math.random() * 6) + 1;
    setState((prev) => ({
      ...prev,
      diceValue: newValue,
    }));
  }, []);

  const movePawn = useCallback(
    (player: keyof GameState["players"], pawnIndex: number) => {
      setState((prev) => {
        const updatedPawns = [...prev.players[player].pawns];
        const pawn = updatedPawns[pawnIndex];

        // Basic movement logic - you'll need to expand this
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
            [player]: {
              ...prev.players[player],
              pawns: updatedPawns,
            },
          },
        };
      });
    },
    []
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
  }, []);

  return (
    <GameContext.Provider value={{ state, rollDice, movePawn, switchPlayer }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
