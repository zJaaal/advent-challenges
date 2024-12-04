import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
"Looks like the Chief's not here. Next!" One of The Historians pulls out a device and pushes the only button on it.
After a brief flash, you recognize the interior of the Ceres monitoring station!

As the search for the Chief continues, a small Elf who lives on the station tugs on your shirt; she'd like to know if you could help her with her word search (your puzzle input).
She only has to find one word: XMAS.

This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words.
It's a little unusual, though, as you don't merely need to find one instance of XMAS - you need to find all of them.
 */

function solution(input) {
  const lettersMatrix = input.split('\n').map((row) => row.split(''));

  // Check all 8 directions from X
  const directions = [
    [-1, -1], // upLeft
    [-1, 1], // upRight
    [1, -1], // downLeft
    [1, 1], // downRight
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ];

  let count = 0;

  for (let rowIndex = 0; rowIndex < lettersMatrix.length; rowIndex++) {
    for (
      let letterIndex = 0;
      letterIndex < lettersMatrix[rowIndex].length;
      letterIndex++
    ) {
      const letter = lettersMatrix[rowIndex][letterIndex];

      // Skip if not X
      if (letter !== 'X') continue;

      const words = directions.map(
        ([rowDelta, colDelta]) =>
          letter +
          lettersMatrix[rowIndex + rowDelta]?.[letterIndex + colDelta] +
          lettersMatrix[rowIndex + 2 * rowDelta]?.[letterIndex + 2 * colDelta] +
          lettersMatrix[rowIndex + 3 * rowDelta]?.[letterIndex + 3 * colDelta]
      );

      // Count XMAS occurrences
      count += words.filter((word) => word === 'XMAS').length;
    }
  }
  return count;
}
console.log(solution(input));
// console.log(solution(testInput));
