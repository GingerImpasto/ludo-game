// gameConfig.ts
export const gridLayout = {
  leftArea: [
    [52, 1, 2, 3, 4, 5],
    [51, 53, 54, 55, 56, 57],
    [50, 49, 48, 47, 46, 45],
  ],
  topArea: [
    [11, 12, 13],
    [10, 58, 14],
    [9, 59, 15],
    [8, 60, 16],
    [7, 61, 17],
    [6, 62, 18],
  ],
  rightArea: [
    [19, 20, 21, 22, 23, 24],
    [67, 66, 65, 64, 63, 25],
    [31, 30, 29, 28, 27, 26],
  ],
  bottomArea: [
    44, 72, 32, 43, 71, 33, 42, 70, 34, 41, 69, 35, 40, 68, 36, 39, 38, 37,
  ],
};

export const specialCells = {
  redNumbers: [1, 53, 54, 55, 56, 57],
  greenCells: [14, 58, 59, 60, 61, 62],
  blueCells: [40, 68, 69, 70, 71, 72],
  yellowCells: [27, 63, 64, 65, 66, 67],
};

export const START_POSITIONS = {
  red: 1,
  green: 14,
  yellow: 27,
  blue: 40,
};

export const HOME_ENTRANCE = {
  red: 51,
  green: 12,
  yellow: 25,
  blue: 38,
};

export const STAR_CELLS = {
  red: 48,
  green: 9,
  yellow: 22,
  blue: 35,
};

export const WINNING_POSITION = 73;

export const HOME_PATHS = {
  red: [53, 54, 55, 56, 57, WINNING_POSITION],
  green: [58, 59, 60, 61, 62, WINNING_POSITION],
  yellow: [63, 64, 65, 66, 67, WINNING_POSITION],
  blue: [68, 69, 70, 71, 72, WINNING_POSITION],
};

export const SAFE_CELLS = [
  ...Object.values(START_POSITIONS),
  ...Object.values(HOME_ENTRANCE),
  ...specialCells.redNumbers,
  ...specialCells.greenCells,
  ...specialCells.blueCells,
  ...specialCells.yellowCells,
  9, 22, 35, 48, // Middle safe spots
];

export const PLAYERS_ORDER: Array<'red' | 'green' | 'yellow' | 'blue'> = [
  "red",
  "green",
  "yellow",
  "blue",
];