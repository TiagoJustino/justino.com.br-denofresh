import { Board } from './board.ts';

export const applyMoveInternal = (
  board: Board,
  white: boolean,
  targetCoords: number[],
  originCoords: number[],
  piece: string,
) => {
  const newBoard = board.map((row) => [...row]);
  const [oY, oX] = originCoords;
  const [tY, tX] = targetCoords;
  // handle en passant
  if (
    piece.toLowerCase() == 'p' && board[tY][tX] == ' ' && board[oY][tX] != ' '
  ) {
    newBoard[oY][tX] = ' ';
  }
  newBoard[originCoords[0]][originCoords[1]] = ' ';
  newBoard[targetCoords[0]][targetCoords[1]] = white ? piece.toUpperCase() : piece.toLowerCase();
  return newBoard;
};
