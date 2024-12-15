import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
You look up to see a vast school of lanternfish swimming past you.
On closer inspection, they seem quite anxious, so you drive your mini submarine over to see if you can help.

Because lanternfish populations grow rapidly, they need a lot of food, and that food needs to be stored somewhere.
That's why these lanternfish have built elaborate warehouse complexes operated by robots!

These lanternfish seem so anxious because they have lost control of the robot that operates one of their most important warehouses!
It is currently running amok, pushing around boxes in the warehouse with no regard for lanternfish logistics or lanternfish inventory management strategies.

Right now, none of the lanternfish are brave enough to swim up to an unpredictable robot so they could shut it off.
However, if you could anticipate the robot's movements, maybe they could find a safe option.

The lanternfish already have a map of the warehouse and a list of movements the robot will attempt to make (your puzzle input).
The problem is that the movements will sometimes fail as boxes are shifted around, making the actual movements of the robot difficult to predict.

The lanternfish use their own custom Goods Positioning System (GPS for short) to track the locations of the boxes.
The GPS coordinate of a box is equal to 100 times its distance from the top edge of the map plus its distance from the left edge of the map.
(This process does not stop at wall tiles; measure all the way to the edges of the map.)

So, the box shown below has a distance of 1 from the top edge of the map and 4 from the left edge of the map, resulting in a GPS coordinate of 100 * 1 + 4 = 104.
 */

const directions = {
  '^': [-1, 0], // Up
  v: [1, 0], // Down
  '>': [0, 1], // Right
  '<': [0, -1], // Left
};

function canMove(matrix, position, move) {
  const [row, col] = position;
  const [rowDirection, colDirection] = directions[move];
  let newRow = row + rowDirection;
  let newCol = col + colDirection;

  if (matrix[newRow] && matrix[newRow][newCol] === 'O') {
    const result = canMove(matrix, [newRow, newCol], move);

    const [rowForBox, colForBox] = [
      newRow + rowDirection,
      newCol + colDirection,
    ];

    // If we can move the box then we move it and replace the last position of the box with an empty space
    result &&
      ((matrix[rowForBox][colForBox] = 'O'), (matrix[newRow][newCol] = '.'));

    return result;
  }

  return matrix[newRow] && matrix[newRow][newCol] === '.';
}

function traverse(matrix, position, move) {
  const [row, col] = position;
  const [rowDirection, colDirection] = directions[move];

  const newRow = row + rowDirection;
  const newCol = col + colDirection;

  if (canMove(matrix, position, move)) {
    matrix[newRow][newCol] = '@';
    matrix[row][col] = '.';
    return [newRow, newCol];
  }

  return position;
}

function solution(input) {
  const [map, moves] = input.split('\n\n');
  let mapMatrix = map.split('\n').map((row) => row.split(''));

  const cleanMoves = moves.replace(/\n/g, '').split('');
  const startRow = mapMatrix.findIndex((row) => row.includes('@'));
  const startCol = mapMatrix[startRow].indexOf('@');

  let currentPosition = [startRow, startCol];

  for (let i = 0; i < cleanMoves.length; i++) {
    currentPosition = traverse(mapMatrix, currentPosition, cleanMoves[i]);
  }

  console.log(mapMatrix.map((row) => row.join('')).join('\n'));

  return mapMatrix.reduce((acc, row, i) => {
    return (
      acc +
      row.reduce((acc, cell, j) => (cell === 'O' ? 100 * i + j : 0) + acc, 0)
    );
  }, 0);
}

console.log(solution(input), '\n1577255');
// console.log(solution(testInput), '\n10092');
