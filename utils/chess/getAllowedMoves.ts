import { Board } from './board.ts';

// Helper function to check if a square is within board boundaries
function isValid(row: number, col: number): boolean {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

// Helper function to check if a square is occupied by an opponent
function isOpponent(board: Board, row: number, col: number, isWhitePiece: boolean): boolean {
  if (!isValid(row, col) || board[row][col] === ' ') {
    return false;
  }
  const targetPiece = board[row][col];
  const targetIsWhite = targetPiece === targetPiece.toUpperCase();
  return isWhitePiece !== targetIsWhite;
}

// Helper function to check if a square is empty
function isEmpty(board: Board, row: number, col: number): boolean {
  return isValid(row, col) && board[row][col] === ' ';
}

export function getAllowedMoves(
  board: Board,
  row: number,
  col: number,
): Array<[number, number]> {
  const moves: Array<[number, number]> = [];
  const piece = board[row][col];

  if (piece === ' ') {
    return moves; // No piece at the square
  }

  const isWhite = piece === piece.toUpperCase();
  const pieceType = piece.toLowerCase();

  // Pawn moves
  if (pieceType === 'p') {
    const direction = isWhite ? -1 : 1;
    const startRow = isWhite ? 6 : 1;

    // Forward one step
    if (isValid(row + direction, col) && isEmpty(board, row + direction, col)) {
      moves.push([row + direction, col]);
      // Forward two steps from start
      if (row === startRow && isValid(row + 2 * direction, col) && isEmpty(board, row + 2 * direction, col)) {
        moves.push([row + 2 * direction, col]);
      }
    }
    // Captures
    const captureCols = [col - 1, col + 1];
    for (const captureCol of captureCols) {
      if (isValid(row + direction, captureCol) && isOpponent(board, row + direction, captureCol, isWhite)) {
        moves.push([row + direction, captureCol]);
      }
    }
    // En passant would be added here
  }

  // Knight moves
  if (pieceType === 'n') {
    const knightMoves: Array<[number, number]> = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];
    for (const [dr, dc] of knightMoves) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (isValid(newRow, newCol) && (isEmpty(board, newRow, newCol) || isOpponent(board, newRow, newCol, isWhite))) {
        moves.push([newRow, newCol]);
      }
    }
  }

  // King moves
  if (pieceType === 'k') {
    const kingMoves: Array<[number, number]> = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    for (const [dr, dc] of kingMoves) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (isValid(newRow, newCol) && (isEmpty(board, newRow, newCol) || isOpponent(board, newRow, newCol, isWhite))) {
        moves.push([newRow, newCol]);
      }
    }
    // Castling would be added here
  }

  // Rook, Bishop, Queen (sliding pieces)
  const slidingPieceDirections: Record<string, Array<[number, number]>> = {
    'r': [[-1, 0], [1, 0], [0, -1], [0, 1]], // Rook: Up, Down, Left, Right
    'b': [[-1, -1], [-1, 1], [1, -1], [1, 1]], // Bishop: Diagonals
    'q': [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1], // Rook directions
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1], // Bishop directions
    ], // Queen: All 8 directions
  };

  if (pieceType === 'r' || pieceType === 'b' || pieceType === 'q') {
    const directions = slidingPieceDirections[pieceType];
    for (const [dr, dc] of directions) {
      for (let i = 1; i < 8; i++) {
        const newRow = row + dr * i;
        const newCol = col + dc * i;

        if (!isValid(newRow, newCol)) {
          break; // Off board
        }

        if (isEmpty(board, newRow, newCol)) {
          moves.push([newRow, newCol]);
        } else {
          if (isOpponent(board, newRow, newCol, isWhite)) {
            moves.push([newRow, newCol]); // Capture opponent
          }
          break; // Blocked by a piece
        }
      }
    }
  }

  return moves;
}
