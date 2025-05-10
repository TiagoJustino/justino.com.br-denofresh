import { Board } from './board.ts';

export const castlingQueenSide = (board: Board, white: boolean) => {
  const king = white ? 'K' : 'k';
  const rook = white ? 'R' : 'r';
  const kingCoords = white ? [7, 4] : [0, 4];
  const rookCoords = white ? [7, 0] : [0, 0];
  const kingNewCoords = white ? [7, 2] : [0, 2];
  const rookNewCoords = white ? [7, 3] : [0, 3];
  return board.map((row, i) =>
    row.map((square, j) => {
      if (i === kingCoords[0] && j === kingCoords[1]) {
        return ' ';
      }
      if (i === rookCoords[0] && j === rookCoords[1]) {
        return ' ';
      }
      if (i === kingNewCoords[0] && j === kingNewCoords[1]) {
        return king;
      }
      if (i === rookNewCoords[0] && j === rookNewCoords[1]) {
        return rook;
      }
      return square;
    })
  );
};
