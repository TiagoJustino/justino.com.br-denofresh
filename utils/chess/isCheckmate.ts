import { Board } from './board.ts';
import { isWhiteInCheck } from './isWhiteInCheck.ts';
import { isBlackInCheck } from './isBlackInCheck.ts';
import { getAllowedMoves } from './getAllowedMoves.ts';
import { applyMoveInternal } from './applyMoveInternal.ts';

/**
 * Checks if the current player is checkmated.
 * @param board The current state of the chess board.
 * @param isWhiteTurn True if it's White's turn, false if it's Black's turn.
 * @returns True if the current player is checkmated, false otherwise.
 */
export function isCheckmate(board: Board, isWhiteTurn: boolean): boolean {
  // 1. Determine if the current player's king is in check.
  // If the king is not in check, it cannot be checkmate.
  const kingCurrentlyInCheck = isWhiteTurn ? isWhiteInCheck(board) : isBlackInCheck(board);

  if (!kingCurrentlyInCheck) {
    return false; // Not checkmate if the king is not in check
  }

  // 2. Iterate through all pieces of the current player.
  // For each piece, generate all its pseudo-legal moves.
  // For each move, simulate it and see if the king is still in check.
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];

      if (piece === ' ') {
        continue; // Skip empty squares
      }

      const isPieceWhite = piece === piece.toUpperCase();

      // Check if the piece belongs to the current player
      if ((isWhiteTurn && !isPieceWhite) || (!isWhiteTurn && isPieceWhite)) {
        continue; // Piece belongs to the opponent, skip
      }

      const origin: [number, number] = [r, c];
      const pseudoLegalMoves = getAllowedMoves(board, r, c);

      // 3. For each pseudo-legal move, simulate it.
      for (const destiny of pseudoLegalMoves) {
        // Create a deep copy of the original board for this simulation.
        // This ensures each move is tested from the original check position.
        const tempBoardForMove = JSON.parse(JSON.stringify(board));

        // Apply the move to the temporary board.
        // applyMoveInternal is assumed to handle piece movement, captures,
        // and special moves like pawn promotion (e.g., defaulting to Queen),
        // en passant, and castling if getAllowedMoves generates them.
        const boardAfterMove = applyMoveInternal(
          tempBoardForMove,
          isWhiteTurn,
          destiny, // [destRow, destCol]
          origin, // [origRow, origCol]
          piece, // The character representing the moving piece (e.g., 'P', 'n')
        );

        // 4. After the move, check if the current player's king is still in check.
        const kingStillInCheckAfterMove = isWhiteTurn ? isWhiteInCheck(boardAfterMove) : isBlackInCheck(boardAfterMove);

        if (!kingStillInCheckAfterMove) {
          // Found a legal move that gets the king out of check.
          // Therefore, it's not checkmate.
          return false;
        }
      }
    }
  }

  // 5. If the loops complete, it means no piece of the current player
  // has any legal move that can get the king out of check.
  // Since the king was initially in check (step 1), this is checkmate.
  return true;
}
