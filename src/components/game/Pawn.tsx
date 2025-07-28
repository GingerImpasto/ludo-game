// Pawn.tsx
import React from "react";
import "./Pawn.css";

interface PawnProps {
  color: "red" | "green" | "yellow" | "blue";
  position?: "base" | "board" | "home";
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

const Pawn: React.FC<PawnProps> = ({
  color,
  position = "base",
  onClick,
  selected = false,
  disabled = false,
}) => {
  const getPawnClass = () => {
    let classes = `pawn pawn-${color}`;
    if (position) classes += ` pawn-${position}`;
    if (selected) classes += " pawn-selected";
    if (disabled) classes += " pawn-disabled";
    return classes;
  };

  return (
    <div
      className={getPawnClass()}
      onClick={!disabled ? onClick : undefined}
      aria-label={`${color} pawn`}
    />
  );
};

export default Pawn;
