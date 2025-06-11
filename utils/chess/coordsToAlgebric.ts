import { Board } from './board.ts';
import { isLegal } from './isLegal.ts';
import { applyMoveInternal } from './applyMoveInternal.ts';
import { isWhiteInCheck } from './isWhiteInCheck.ts';
import { isBlackInCheck } from './isBlackInCheck.ts';
import { isCheckmate } from './isCheckmate.ts'; // Assuming this is the actual Board type from your project.

// Helper function to convert [row, col] coordinates to algebraic square notation (e.g., "e4").
// Assumes row 0 is white's 8th rank (black's 1st), col 0 is 'a' file.
function localCoordsToSquare(row: number, col: number): string {
  const file = String.fromCharCode('a'.charCodeAt(0) + col);
  const rank = String(8 - row);
  return file + rank;
}

export function coordsToAlgebric(
  board: Board,
  origin: [number, number],
  destiny: [number, number],
  isWhiteTurn: boolean,
  promotionSymbol?: string,
): string {
  const movingPiece = board[origin[0]][origin[1]];

  if (!movingPiece) {
    // This should ideally not occur if moves are validated before calling this function.
    console.error('coordsToAlgebric: No piece at origin.', origin);
    return 'ERR_NO_PIECE_AT_ORIGIN'; // Or throw an error
  }

  const pieceType = movingPiece.toLowerCase() == 'p' ? 'p' : movingPiece.toUpperCase();
  const pieceColor = isWhiteTurn ? 'white' : 'black';
  const opponentColor = isWhiteTurn ? 'black' : 'white';

  let notation = '';

  // 1. Handle Castling
  if (pieceType === 'K') {
    const [origR, origC] = origin;
    const [destR, destC] = destiny;
    // King moving two squares horizontally indicates castling.
    if (Math.abs(destC - origC) === 2) {
      notation = (destC > origC) ? 'O-O' : 'O-O-O'; // Kingside or Queenside

      // Check for check/checkmate status after castling.
      let tempBoard = JSON.parse(JSON.stringify(board));
      // makeMoveInternal must correctly handle rook movement during castling.
      tempBoard = applyMoveInternal(tempBoard, isWhiteTurn, destiny, origin, movingPiece);
      if (isCheckmate(tempBoard, isWhiteTurn)) {
        notation += '#';
      } else if (opponentColor == 'white' ? isWhiteInCheck(board) : isBlackInCheck(board)) {
        notation += '+';
      }
      return notation;
    }
  }

  // 2. Handle Regular Moves (Non-Castling)

  // Determine if the move is a capture.
  const targetPieceOnDestiny = board[destiny[0]][destiny[1]];
  let isCapture = targetPieceOnDestiny !== ' ';

  // Special check for en passant: a pawn moving diagonally to an empty square.
  // This assumes the move's legality (including en passant rules) is pre-validated.
  if (
    pieceType === 'p' && destiny[1] !== origin[1] &&
    targetPieceOnDestiny === null
  ) {
    isCapture = true; // En passant is a form of capture.
  }

  // Build the main part of the notation string.
  let movePrefix = '';
  if (pieceType === 'p') {
    if (isCapture) {
      // For pawn captures, use the file of origin (e.g., "e" in "exd5").
      movePrefix = localCoordsToSquare(origin[0], origin[1])[0];
    }
    // Pawn symbol itself is not written (e.g., "e4", not "Pe4").
  } else {
    movePrefix = pieceType; // "N", "B", "R", "Q", "K"

    // Disambiguation for non-pawn pieces (Knights, Bishops, Rooks, Queens).
    // Find other pieces of the same type and color that can also legally move to the destination.
    const ambiguousPiecesOrigins: Array<[number, number]> = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (r === origin[0] && c === origin[1]) continue; // Skip the moving piece itself.

        const otherPiece = board[r][c];
        const otherPieceType = otherPiece.toLowerCase() == 'p' ? 'p' : otherPiece.toUpperCase();
        const otherPieceColor = otherPiece.toUpperCase() == otherPiece ? 'white' : 'black';
        if (
          otherPiece && otherPieceType === pieceType &&
          otherPieceColor === pieceColor
        ) {
          // Check if this 'otherPiece' can legally move to 'destiny'.
          // The 'isWhiteTurn' context is important for b.isMoveLegal.
          if (isLegal([r, c], destiny, board, otherPiece, isWhiteTurn)) {
            ambiguousPiecesOrigins.push([r, c]);
          }
        }
      }
    }

    if (ambiguousPiecesOrigins.length > 0) {
      const originFileChar = localCoordsToSquare(origin[0], origin[1])[0];
      const originRankChar = localCoordsToSquare(origin[0], origin[1])[1];
      let disambiguationStr = '';

      // Check if file of origin is unique among all pieces (moving piece + ambiguous ones) that can move to destiny.
      let fileIsSufficient = true;
      for (const candOrigin of ambiguousPiecesOrigins) {
        if (
          localCoordsToSquare(candOrigin[0], candOrigin[1])[0] ===
            originFileChar
        ) {
          fileIsSufficient = false;
          break;
        }
      }

      if (fileIsSufficient) {
        disambiguationStr = originFileChar;
      } else {
        // File is not sufficient. Check if rank of origin is unique.
        let rankIsSufficient = true;
        for (const candOrigin of ambiguousPiecesOrigins) {
          if (
            localCoordsToSquare(candOrigin[0], candOrigin[1])[1] ===
              originRankChar
          ) {
            rankIsSufficient = false;
            break;
          }
        }
        if (rankIsSufficient) {
          disambiguationStr = originRankChar;
        } else {
          // Neither file nor rank alone is sufficient. Use both.
          disambiguationStr = originFileChar + originRankChar;
        }
      }
      movePrefix += disambiguationStr;
    }
  }
  notation += movePrefix;

  // Add 'x' for captures.
  if (isCapture) {
    notation += 'x';
  }

  // Add destination square.
  notation += localCoordsToSquare(destiny[0], destiny[1]);

  // Handle Pawn Promotion.
  if (pieceType === 'pawn') {
    const promotionRank = isWhiteTurn ? 0 : 7; // Row 0 for White (rank 8), Row 7 for Black (rank 1).
    if (destiny[0] === promotionRank) {
      // The Board object must provide the chosen promotion piece symbol (e.g., 'Q').
      if (promotionSymbol) {
        notation += '=' + promotionSymbol.toUpperCase();
      } else {
        // If promotion choice isn't available, notation is incomplete.
        // This indicates a potential issue with the Board interface or how this function is used.
        // A common default is 'Q', but accurate notation requires the actual choice.
        console.warn(
          'coordsToAlgebric: Pawn promotion occurred, but no promotion choice symbol was provided. Notation may be incomplete or default to Queen if not handled by board simulation.',
        );
        // Example: notation += "=Q"; promotedPieceTypeForSim = 'queen'; (if defaulting)
      }
    }
  }

  // Add Check (+) or Checkmate (#) Suffix.
  // This requires simulating the move on a temporary board.
  let tempBoard = JSON.parse(JSON.stringify(board));
  // makeMoveInternal must handle promotion correctly if promotedPieceTypeForSim is set.
  tempBoard = applyMoveInternal(tempBoard, isWhiteTurn, destiny, origin, movingPiece);
  if (isCheckmate(tempBoard, isWhiteTurn)) {
    notation += '#';
  } else if (opponentColor == 'white' ? isWhiteInCheck(board) : isBlackInCheck(board)) {
    notation += '+';
  }

  return notation;
}
