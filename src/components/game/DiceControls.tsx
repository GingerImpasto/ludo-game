import React, { useEffect } from "react";
import "./DiceControls.css";
import { useGame } from "../../context/GameContext";

const DiceControls: React.FC = () => {
  const { state, rollDice, activePawns, currentPlayer, winner, switchPlayer } =
    useGame();

  const playerColors = {
    red: "#FF5252",
    green: "#4CAF50",
    yellow: "#FFD600",
    blue: "#2196F3",
  };

  const canRollDice = !state.hasRolledDice && !winner;
  const currentColor = playerColors[currentPlayer];
  const noMoves = state.hasRolledDice && activePawns.length === 0 && !winner;

  // Auto-switch after showing "no moves" message
  useEffect(() => {
    if (noMoves) {
      const timer = setTimeout(switchPlayer, 1500);
      return () => clearTimeout(timer);
    }
  }, [noMoves, switchPlayer]);

  return (
    <div
      className="game-controls"
      style={{
        border: `3px solid ${currentColor}`,
        boxShadow: `0 0 12px ${currentColor}33`,
      }}
    >
      <h3 className="dice-label" style={{ color: currentColor }}>
        {currentPlayer.toUpperCase()}'s Turn
      </h3>

      <div className="dice-value" style={{ color: currentColor }}>
        {state.diceValue}
      </div>

      <button
        onClick={rollDice}
        className="dice-button"
        style={{
          backgroundColor: currentColor,
          opacity: canRollDice ? 1 : 0.6,
          cursor: canRollDice ? "pointer" : "not-allowed",
        }}
        disabled={!canRollDice}
      >
        {state.hasRolledDice ? "Turn Ended" : "Roll Dice"}
      </button>

      {noMoves && (
        <p className="no-moves-message">No moves available - passing turn...</p>
      )}

      {winner && (
        <p className="winner-message" style={{ color: currentColor }}>
          {winner.toUpperCase()} WINS!
        </p>
      )}
    </div>
  );
};

export default DiceControls;
