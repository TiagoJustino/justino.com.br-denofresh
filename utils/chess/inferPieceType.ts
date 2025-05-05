export const inferPieceType = (move: string) => {
  let pieceType = move.charAt(0);
  if (pieceType >= "a" && pieceType <= "h") {
    return "p";
  }
  pieceType = pieceType.toLowerCase();
  if (pieceType === "o") {
    return "K";
  }
  return pieceType.toUpperCase();
};
