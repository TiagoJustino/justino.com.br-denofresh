import { Board } from "./board.ts";

export const isPieceBlack = (board: Board, coords: number[]) => {
  const [y, x] = coords;
  if (board[y][x] === " ") {
    return false;
  }
  return board[y][x].toLowerCase() === board[y][x];
};
