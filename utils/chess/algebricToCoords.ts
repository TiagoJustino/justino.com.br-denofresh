export const algebricToCoords = (square: string) => {
  const letter = square.charAt(0);
  const number = square.charAt(1);
  return [8 - parseInt(number), letter.charCodeAt(0) - 97];
};
