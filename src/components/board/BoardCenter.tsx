// BoardCenter.tsx
import React from "react";
import "./BoardCenter.css";
import ColorTriangle from "./ColorTriangle";

const BoardCenter: React.FC = () => {
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
        <ColorTriangle color="red" pawnPositions={redPawnPositions} />
        <ColorTriangle color="green" pawnPositions={greenPawnPositions} />
        <ColorTriangle color="yellow" pawnPositions={yellowPawnPositions} />
        <ColorTriangle color="blue" pawnPositions={bluePawnPositions} />
      </div>
    </div>
  );
};

export default BoardCenter;
