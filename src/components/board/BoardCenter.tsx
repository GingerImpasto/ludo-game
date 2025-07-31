// BoardCenter.tsx
import React from "react";
import "./BoardCenter.css";
import Pawn from "../game/Pawn";

const BoardCenter: React.FC = () => {
  return (
    <div className="center-square">
      <div className="center-colors">
        <div className="color-arrow red">
          <div
            style={{
              position: "absolute",
              left: "10%", // Adjusted to position at 10% 50% of the triangle
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "20%", // Adjust size as needed
              height: "20%", // Adjust size as needed
            }}
          >
            <Pawn color="red" position="board" />
          </div>
          <div
            style={{
              position: "absolute",
              left: "10%", // Adjusted to position at 10% 50% of the triangle
              top: "25%",
              transform: "translate(-50%, -50%)",
              width: "20%", // Adjust size as needed
              height: "20%", // Adjust size as needed
            }}
          >
            <Pawn color="red" position="board" />
          </div>
          <div
            style={{
              position: "absolute",
              left: "10%", // Adjusted to position at 10% 50% of the triangle
              top: "75%",
              transform: "translate(-50%, -50%)",
              width: "20%", // Adjust size as needed
              height: "20%", // Adjust size as needed
            }}
          >
            <Pawn color="red" position="board" />
          </div>
          <div
            style={{
              position: "absolute",
              left: "25%", // Adjusted to position at 10% 50% of the triangle
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "20%", // Adjust size as needed
              height: "20%", // Adjust size as needed
            }}
          >
            <Pawn color="red" position="board" />
          </div>
        </div>
        <div className="color-arrow green"></div>
        <div className="color-arrow yellow"></div>
        <div className="color-arrow blue"></div>
      </div>
    </div>
  );
};

export default BoardCenter;
