import { Board } from './board.ts';
import { castlingKingSide } from './castlingKingSide.ts';
import { castlingQueenSide } from './castlingQueenSide.ts';
import { inferPieceType } from './inferPieceType.ts';
import { getPossibleOrigins } from './getPossibleOrigins.ts';
import { algebricToCoords } from './algebricToCoords.ts';
import { isLegal } from './isLegal.ts';
import { applyMoveInternal } from './applyMoveInternal.ts';
import { isWhiteInCheck } from './isWhiteInCheck.ts';
import { isBlackInCheck } from './isBlackInCheck.ts';
import { printBoard } from './printBoard.ts';

export const applyMove = (board: Board, move: string) => {
  const white = !!move.match(/^[1-9][0-9]*\./);
  let isPromotion = false;
  let promotionPiece = '';
  move = move.replace(/[+#]?[?!]*$/, '');
  if (move.charAt(move.length - 2) == '=') {
    isPromotion = true;
    promotionPiece = move.charAt(move.length - 1);
  }
  move = move.replace(/^[1-9][0-9]*\./, '').replace(/=.$/, '');
  if (move == 'O-O') {
    return castlingKingSide(board, white);
  }
  if (move == 'O-O-O') {
    return castlingQueenSide(board, white);
  }
  // TODO: handle promotions
  let originRank, originFile;
  let piece = inferPieceType(move);
  const targetSquare = move.slice(-2);
  const isTaking = move.charAt(move.length - 3) == 'x';
  const originRankLetter = move.charAt(move.length - (isTaking ? 4 : 3));
  const originRankNumber = parseInt(originRankLetter ?? '0');
  const originFileLetter = move.charAt(move.length - (isTaking ? 4 : 3));
  const originFileNumber = (originFileLetter?.charCodeAt(0) ?? 0) - 97;
  if (originRankNumber >= 1 && originRankNumber <= 8) {
    originRank = originRankNumber;
  }
  if (originFileNumber >= 0 && originFileNumber <= 7) {
    originFile = originFileNumber + 1;
  }
  const possibleOrigins = getPossibleOrigins(
    board,
    piece,
    white,
    originRank,
    originFile,
  );
  const targetCoords = algebricToCoords(targetSquare);
  let legalOrigins = possibleOrigins.filter((origin) => isLegal(origin, targetCoords, board, piece, white));
  if (legalOrigins.length > 1) {
    legalOrigins = legalOrigins.filter((origin) => {
      console.log(
        `origin:${JSON.stringify(origin)}, targetCoords:${
          JSON.stringify(targetCoords)
        }, piece:${piece}, white:${white}`,
      );
      const tempBoard = applyMoveInternal(
        board,
        white,
        targetCoords,
        origin,
        piece,
      );
      printBoard(tempBoard);
      if (white) {
        console.log(`isWhiteInCheck:${isWhiteInCheck(tempBoard)}`);
        return !isWhiteInCheck(tempBoard);
      }
      console.log(`isBlackInCheck:${isBlackInCheck(tempBoard)}`);
      return !isBlackInCheck(tempBoard);
    });
  }

  if (legalOrigins.length == 1) {
    if (isPromotion) {
      piece = promotionPiece;
    }
    const originCoords = legalOrigins[0];
    return applyMoveInternal(board, white, targetCoords, originCoords, piece);
  }
  console.log(`applyMove: legalOrigins:${JSON.stringify(legalOrigins)}`);
  Deno.exit(1);
};
