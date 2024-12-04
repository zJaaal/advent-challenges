import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
Looking for the instructions, you flip over the word search to find that this
isn't actually an XMAS puzzle; it's an X-MAS puzzle in which you're supposed
to find two MAS in the shape of an X.

One way to achieve that is like this:

M.S
.A.
M.S
*/

function solution(input) {
  const lettersMatrix = input.split('\n').map((row) => row.split(''));

  // The 4 possible corners of the current letter
  const cornersDeltas = [
    [-1, -1], // upLeft
    [-1, 1], // upRight
    [1, -1], // downLeft
    [1, 1], // downRight
  ];

  let count = 0;

  for (let rowIndex = 0; rowIndex < lettersMatrix.length; rowIndex++) {
    for (
      let letterIndex = 0;
      letterIndex < lettersMatrix[rowIndex].length;
      letterIndex++
    ) {
      const letter = lettersMatrix[rowIndex][letterIndex];

      // If the letter is not an A, we can skip the current iteration
      if (letter !== 'A') continue;

      // Get the corners of the current letter, which should be A
      const corners = cornersDeltas.map(([rowDelta, colDelta]) => {
        const row = rowIndex + rowDelta;
        const col = letterIndex + colDelta;
        return {
          row,
          col,
          letter: lettersMatrix[row]?.[col],
        };
      });

      // Filter the corners that are M and S
      const lettersM = corners.filter((corner) => corner.letter === 'M');
      const lettersS = corners.filter((corner) => corner.letter === 'S');

      // If we don't have at least two M and two S, we can skip the current iteration
      if (lettersM.length < 2 || lettersS.length < 2) continue;

      // If the two M are adjacent then we can count the XMAS
      count += Number(
        lettersM[0].row === lettersM[1].row ||
          lettersM[0].col === lettersM[1].col
      );
    }
  }
  return count;
}
console.log(solution(input));
// console.log(solution(testInput));
