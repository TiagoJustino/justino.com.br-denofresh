import { Board } from "./board.ts";

export const getPossibleOrigins = (
  board: Board,
  piece: string,
  white: boolean,
  rank?: number,
  file?: number,
) => {
  const originX = 8 - (rank ?? 0);
  const originY = (file ?? 0) - 1;
  const possibleOrigins = [];
  const boardPiece = white ? piece.toUpperCase() : piece.toLowerCase();
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = board[i][j];
      if (rank) {
        if (square == boardPiece && i == originX) {
          possibleOrigins.push([i, j]);
        }
      } else if (file) {
        if (square == boardPiece && j == originY) {
          possibleOrigins.push([i, j]);
        }
      } else if (square == boardPiece) {
        possibleOrigins.push([i, j]);
      }
    }
  }
  return possibleOrigins;
};
