import { Board } from "./board.ts";

export const isPieceWhite = (board: Board, coords: number[]) => {
  const [y, x] = coords;
  if (board[y][x] === " ") {
    return false;
  }
  return board[y][x].toUpperCase() === board[y][x];
};
