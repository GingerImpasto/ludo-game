// BoardCenter.tsx
import React from "react";
import "./BoardCenter.css";
import ColorTriangle from "./ColorTriangle";
import { useGame } from "../../context/GameContext";

const BoardCenter: React.FC = () => {
  const { state } = useGame();

  // Get the number of finished pawns for each color
  const getFinishedPawnsCount = (color: keyof typeof state.players) => {
    return state.players[color].pawns.filter((p) => p.isFinished).length;
  };

  // Positions for each pawn (we'll only use as many as are finished)
  const redPawnPositions = [
    { left: "10%", top: "50%" },
    { left: "10%", top: "25%" },
    { left: "10%", top: "75%" },
    { left: "25%", top: "50%" },
  ];

  const greenPawnPositions = [
    { left: "30%", top: "10%" },
    { left: "50%", top: "10%" },
    { left: "70%", top: "10%" },
    { left: "50%", top: "30%" },
  ];

  const yellowPawnPositions = [
    { left: "90%", top: "50%" },
    { left: "90%", top: "25%" },
    { left: "90%", top: "75%" },
    { left: "75%", top: "50%" },
  ];

  const bluePawnPositions = [
    { left: "30%", top: "90%" },
    { left: "50%", top: "90%" },
    { left: "70%", top: "90%" },
    { left: "50%", top: "70%" },
  ];

  return (
    <div className="center-square">
      <div className="center-colors">
        <ColorTriangle
          color="red"
          pawnPositions={redPawnPositions.slice(
            0,
            getFinishedPawnsCount("red")
          )}
        />
        <ColorTriangle
          color="green"
          pawnPositions={greenPawnPositions.slice(
            0,
            getFinishedPawnsCount("green")
          )}
        />
        <ColorTriangle
          color="yellow"
          pawnPositions={yellowPawnPositions.slice(
            0,
            getFinishedPawnsCount("yellow")
          )}
        />
        <ColorTriangle
          color="blue"
          pawnPositions={bluePawnPositions.slice(
            0,
            getFinishedPawnsCount("blue")
          )}
        />
      </div>
    </div>
  );
};

export default BoardCenter;
