import { Board } from "./board.ts";

const getPiece = (square: string) => {
  if (square == square.toLowerCase()) {
    return square == "p" ? "p" : square.toUpperCase();
  }
  return square == "P" ? "p" : square;
};

export const printBoard = (board: Board) => {
  console.log(
    board.map(
      (row: string[], i: number) =>
        row.map(
          (square: string, j: number) => getPiece(square),
        ).join(""),
    ).join("\n"),
  );
};
