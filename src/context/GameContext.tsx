// GameContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  START_POSITIONS,
  HOME_ENTRANCE,
  HOME_PATHS,
  WINNING_POSITION,
  SAFE_CELLS,
  getInitialGameState,
  rollDice as rollDiceLogic,
  getActivePawns,
  checkForWinner as checkForWinnerLogic,
  getNextPlayer,
  movePawnLogic,
} from "../utils/gameLogic";
import type { PlayerState, GameState } from "../utils/gameLogic";

// ... rest of the file remains the same

interface GameContextType {
  state: GameState;
  rollDice: () => void;
  movePawn: (pawnIndex: number) => void;
  switchPlayer: () => void;
  selectPawn: (pawnIndex: number) => void;
  selectedPawn: number | null;
  activePawns: number[];
  winner: string | null;
  currentPlayer: "red" | "green" | "yellow" | "blue";
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<GameState>(getInitialGameState());
  const [selectedPawn, setSelectedPawn] = useState<number | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const rollDice = useCallback(() => {
    if (winner) return;

    const newValue = rollDiceLogic();
    setState((prev) => ({
      ...prev,
      diceValue: newValue,
      hasRolledDice: true,
    }));
    setSelectedPawn(null);
  }, [winner]);

  const activePawns = useMemo(
    () => getActivePawns(state, winner, state.currentPlayer),
    [state, winner]
  );

  const checkForWinner = useCallback(
    (player: keyof GameState["players"]) => {
      if (checkForWinnerLogic(state.players, player)) {
        setWinner(player);
      }
    },
    [state.players]
  );

  const switchPlayer = useCallback(() => {
    if (winner) return;

    setState((prev) => ({
      ...prev,
      currentPlayer: getNextPlayer(prev.currentPlayer),
      diceValue: 1,
      hasRolledDice: false,
    }));
    setSelectedPawn(null);
  }, [winner]);

  const movePawn = useCallback(
    (pawnIndex: number) => {
      if (!state.hasRolledDice || winner) return;

      const { players, hasRolledDice, extraTurn, capturedPawn } = movePawnLogic(
        state,
        pawnIndex,
        state.currentPlayer
      );

      setState((prev) => ({
        ...prev,
        players,
        hasRolledDice,
      }));

      setSelectedPawn(null);
      checkForWinner(state.currentPlayer);

      if (!extraTurn && !capturedPawn) {
        switchPlayer();
      }
    },
    [state, winner, checkForWinner, switchPlayer]
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
    currentPlayer: state.currentPlayer,
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
