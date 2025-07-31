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
        <div className="color-arrow green">
          <div
            style={{
              position: "absolute",
              left: "30%", // Adjusted to position at 10% 50% of the triangle
              top: "10%",
              transform: "translate(-50%, -50%)",
              width: "20%", // Adjust size as needed
              height: "20%", // Adjust size as needed
            }}
          >
            <Pawn color="green" position="board" />
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%", // Adjusted to position at 10% 50% of the triangle
              top: "10%",
              transform: "translate(-50%, -50%)",
              width: "20%", // Adjust size as needed
              height: "20%", // Adjust size as needed
            }}
          >
            <Pawn color="green" position="board" />
          </div>
          <div
            style={{
              position: "absolute",
              left: "70%", // Adjusted to position at 10% 50% of the triangle
              top: "10%",
              transform: "translate(-50%, -50%)",
              width: "20%", // Adjust size as needed
              height: "20%", // Adjust size as needed
            }}
          >
            <Pawn color="green" position="board" />
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%", // Adjusted to position at 10% 50% of the triangle
              top: "30%",
              transform: "translate(-50%, -50%)",
              width: "20%", // Adjust size as needed
              height: "20%", // Adjust size as needed
            }}
          >
            <Pawn color="green" position="board" />
          </div>
        </div>
        <div className="color-arrow yellow">
          <div
            style={{
              position: "absolute",
              left: "90%", // Adjusted to position at 10% 50% of the triangle
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "20%", // Adjust size as needed
              height: "20%", // Adjust size as needed
            }}
          >
            <Pawn color="yellow" position="board" />
          </div>
          <div
            style={{
              position: "absolute",
              left: "90%", // Adjusted to position at 10% 50% of the triangle
              top: "25%",
              transform: "translate(-50%, -50%)",
              width: "20%", // Adjust size as needed
              height: "20%", // Adjust size as needed
            }}
          >
            <Pawn color="yellow" position="board" />
          </div>
          <div
            style={{
              position: "absolute",
              left: "90%", // Adjusted to position at 10% 50% of the triangle
              top: "75%",
              transform: "translate(-50%, -50%)",
              width: "20%", // Adjust size as needed
              height: "20%", // Adjust size as needed
            }}
          >
            <Pawn color="yellow" position="board" />
          </div>
          <div
            style={{
              position: "absolute",
              left: "75%", // Adjusted to position at 10% 50% of the triangle
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "20%", // Adjust size as needed
              height: "20%", // Adjust size as needed
            }}
          >
            <Pawn color="yellow" position="board" />
          </div>
        </div>
        <div className="color-arrow blue">
          <div
            style={{
              position: "absolute",
              left: "30%", // Adjusted to position at 10% 50% of the triangle
              top: "90%",
              transform: "translate(-50%, -50%)",
              width: "20%", // Adjust size as needed
              height: "20%", // Adjust size as needed
            }}
          >
            <Pawn color="blue" position="board" />
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%", // Adjusted to position at 10% 50% of the triangle
              top: "90%",
              transform: "translate(-50%, -50%)",
              width: "20%", // Adjust size as needed
              height: "20%", // Adjust size as needed
            }}
          >
            <Pawn color="blue" position="board" />
          </div>
          <div
            style={{
              position: "absolute",
              left: "70%", // Adjusted to position at 10% 50% of the triangle
              top: "90%",
              transform: "translate(-50%, -50%)",
              width: "20%", // Adjust size as needed
              height: "20%", // Adjust size as needed
            }}
          >
            <Pawn color="blue" position="board" />
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%", // Adjusted to position at 10% 50% of the triangle
              top: "70%",
              transform: "translate(-50%, -50%)",
              width: "20%", // Adjust size as needed
              height: "20%", // Adjust size as needed
            }}
          >
            <Pawn color="blue" position="board" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCenter;
