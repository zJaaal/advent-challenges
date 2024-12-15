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

Now all tokens in the map are as twice as big as before
If the tile is #, the new map contains ## instead.
If the tile is O, the new map contains [] instead.
If the tile is ., the new map contains .. instead.
If the tile is @, the new map contains @. instead.
 */

const directions = {
  '^': [-1, 0], // Up
  v: [1, 0], // Down
  '>': [0, 1], // Right
  '<': [0, -1], // Left
};

const EDGES_REGEX = /\[|\]/;

// Tbh I won't document this, is way too complex and it's all logic that is explained in the problem description
// Personal note: Look at your notes, you made some diagrams while writting this
function canMoveBox(matrix, box, move) {
  const { leftEdge, rightEdge } = box;

  const [rowDirection, colDirection] = directions[move];

  const boxNewPosition = {
    leftEdge: [leftEdge[0] + rowDirection, leftEdge[1] + colDirection],
    rightEdge: [rightEdge[0] + rowDirection, rightEdge[1] + colDirection],
  };

  if (move == '<' || move == '>') {
    if (
      matrix[boxNewPosition.leftEdge[0]]?.[boxNewPosition.leftEdge[1]] ===
        '.' ||
      matrix[boxNewPosition.rightEdge[0]]?.[boxNewPosition.rightEdge[1]] === '.'
    ) {
      matrix[boxNewPosition.leftEdge[0]][boxNewPosition.leftEdge[1]] = '[';
      matrix[boxNewPosition.rightEdge[0]][boxNewPosition.rightEdge[1]] = ']';

      move == '<' && (matrix[rightEdge[0]][rightEdge[1]] = '.');
      move == '>' && (matrix[leftEdge[0]][leftEdge[1]] = '.');

      return true;
    }

    if (
      (move == '<' &&
        matrix[boxNewPosition.leftEdge[0]]?.[boxNewPosition.leftEdge[1]] ==
          ']') ||
      (move == '>' &&
        matrix[boxNewPosition.rightEdge[0]]?.[boxNewPosition.rightEdge[1]] ==
          '[')
    ) {
      let result = false;

      if (move == '<') {
        const boxToPush = {
          leftEdge: [
            boxNewPosition.leftEdge[0],
            boxNewPosition.leftEdge[1] - 1,
          ],

          rightEdge: [boxNewPosition.rightEdge[0], boxNewPosition.leftEdge[1]],
        };

        result = canMoveBox(matrix, boxToPush, move);
      } else {
        const boxToPush = {
          leftEdge: [boxNewPosition.leftEdge[0], boxNewPosition.rightEdge[1]],
          rightEdge: [
            boxNewPosition.rightEdge[0],
            boxNewPosition.rightEdge[1] + 1,
          ],
        };

        result = canMoveBox(matrix, boxToPush, move);
      }

      if (result) {
        matrix[boxNewPosition.leftEdge[0]][boxNewPosition.leftEdge[1]] = '[';
        matrix[boxNewPosition.rightEdge[0]][boxNewPosition.rightEdge[1]] = ']';

        move == '<' && (matrix[box.rightEdge[0]][box.rightEdge[1]] = '.');
        move == '>' && (matrix[box.leftEdge[0]][box.leftEdge[1]] = '.');
      }

      return result;
    } else {
      return false;
    }
  }
  if (move == '^' || move == 'v') {
    if (
      matrix[boxNewPosition.leftEdge[0]]?.[boxNewPosition.leftEdge[1]] ===
        '#' ||
      matrix[boxNewPosition.rightEdge[0]]?.[boxNewPosition.rightEdge[1]] === '#'
    )
      return false;

    if (
      matrix[boxNewPosition.leftEdge[0]]?.[boxNewPosition.leftEdge[1]] ===
        '.' &&
      matrix[boxNewPosition.rightEdge[0]]?.[boxNewPosition.rightEdge[1]] === '.'
    ) {
      matrix[boxNewPosition.leftEdge[0]][boxNewPosition.leftEdge[1]] = '[';
      matrix[boxNewPosition.rightEdge[0]][boxNewPosition.rightEdge[1]] = ']';

      matrix[box.leftEdge[0]][box.leftEdge[1]] = '.';
      matrix[box.rightEdge[0]][box.rightEdge[1]] = '.';

      return true;
    } else if (
      EDGES_REGEX.test(
        matrix[boxNewPosition.leftEdge[0]]?.[boxNewPosition.leftEdge[1]]
      ) ||
      EDGES_REGEX.test(
        matrix[boxNewPosition.rightEdge[0]]?.[boxNewPosition.rightEdge[1]]
      )
    ) {
      let result = false;

      if (
        (matrix[boxNewPosition.leftEdge[0]]?.[boxNewPosition.leftEdge[1]] !==
          '[' ||
          matrix[boxNewPosition.rightEdge[0]]?.[boxNewPosition.rightEdge[1]] !==
            ']') &&
        move == '^'
      ) {
        const leftBoxToPush = {
          leftEdge: [
            boxNewPosition.leftEdge[0],
            boxNewPosition.leftEdge[1] - 1, // - 1
          ],
          rightEdge: [boxNewPosition.leftEdge[0], boxNewPosition.leftEdge[1]],
        };

        const rightBoxToPush = {
          leftEdge: [boxNewPosition.rightEdge[0], boxNewPosition.rightEdge[1]],
          rightEdge: [
            boxNewPosition.rightEdge[0],
            boxNewPosition.rightEdge[1] + 1, // + 1
          ],
        };

        if (
          matrix[boxNewPosition.rightEdge[0]]?.[boxNewPosition.rightEdge[1]] ===
          '.'
        ) {
          result = canMoveBox(matrix, leftBoxToPush, move);
        } else if (
          matrix[boxNewPosition.leftEdge[0]]?.[boxNewPosition.leftEdge[1]] ===
          '.'
        ) {
          result = canMoveBox(matrix, rightBoxToPush, move);
        } else {
          // I need to revert changes if one of the boxes can't move
          const matrixCopy = matrix.map((row) => [...row]);

          // My architecture is bad so i have to precompute the result
          const leftBoxResult = canMoveBox(matrixCopy, leftBoxToPush, move);
          const rightBoxResult = canMoveBox(matrixCopy, rightBoxToPush, move);

          if (leftBoxResult && rightBoxResult) {
            result =
              canMoveBox(matrix, leftBoxToPush, move) &&
              canMoveBox(matrix, rightBoxToPush, move);
          }
        }
      } else if (
        (matrix[boxNewPosition.leftEdge[0]]?.[boxNewPosition.leftEdge[1]] !==
          '[' ||
          matrix[boxNewPosition.rightEdge[0]]?.[boxNewPosition.rightEdge[1]] !==
            ']') &&
        move == 'v'
      ) {
        const leftBoxToPush = {
          leftEdge: [
            boxNewPosition.leftEdge[0],
            boxNewPosition.leftEdge[1] - 1, // - 1
          ],
          rightEdge: [boxNewPosition.leftEdge[0], boxNewPosition.leftEdge[1]],
        };

        const rightBoxToPush = {
          leftEdge: [boxNewPosition.rightEdge[0], boxNewPosition.rightEdge[1]],
          rightEdge: [
            boxNewPosition.rightEdge[0],
            boxNewPosition.rightEdge[1] + 1, // + 1
          ],
        };

        if (
          matrix[boxNewPosition.rightEdge[0]]?.[boxNewPosition.rightEdge[1]] ===
          '.'
        ) {
          result = canMoveBox(matrix, leftBoxToPush, move);
        } else if (
          matrix[boxNewPosition.leftEdge[0]]?.[boxNewPosition.leftEdge[1]] ===
          '.'
        ) {
          result = canMoveBox(matrix, rightBoxToPush, move);
        } else {
          // I need to revert changes if one of the boxes can't move
          const matrixCopy = matrix.map((row) => [...row]);

          // My architecture is bad so i have to precompute the result
          const leftBoxResult = canMoveBox(matrixCopy, leftBoxToPush, move);
          const rightBoxResult = canMoveBox(matrixCopy, rightBoxToPush, move);

          if (leftBoxResult && rightBoxResult) {
            result =
              canMoveBox(matrix, leftBoxToPush, move) &&
              canMoveBox(matrix, rightBoxToPush, move);
          }
        }
      } else {
        result = canMoveBox(matrix, boxNewPosition, move);
      }

      if (result) {
        matrix[boxNewPosition.leftEdge[0]][boxNewPosition.leftEdge[1]] = '[';
        matrix[boxNewPosition.rightEdge[0]][boxNewPosition.rightEdge[1]] = ']';

        matrix[box.leftEdge[0]][box.leftEdge[1]] = '.';
        matrix[box.rightEdge[0]][box.rightEdge[1]] = '.';
      }

      return result;
    }

    return false;
  }

  return false;
}

function canMove(matrix, position, move) {
  const [row, col] = position;
  const [rowDirection, colDirection] = directions[move];
  let newRow = row + rowDirection;
  let newCol = col + colDirection;

  if (matrix[newRow] && EDGES_REGEX.test(matrix[newRow][newCol])) {
    const boxToPush = {
      leftEdge:
        matrix[newRow][newCol] === '['
          ? [newRow, newCol]
          : [newRow, newCol - 1],
      rightEdge:
        matrix[newRow][newCol] === ']'
          ? [newRow, newCol]
          : [newRow, newCol + 1],
    };

    const result = canMoveBox(matrix, boxToPush, move);

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
  let mapMatrix = map.split('\n').map((row) =>
    row
      .replace(/([#O.@])/g, (_, token) => {
        if (token === 'O') return '[]';
        if (token !== '@') return token + token;

        return '@.';
      })
      .split('')
  );

  const cleanMoves = moves.replace(/\n/g, '').split('');
  const startRow = mapMatrix.findIndex((row) => row.includes('@'));
  const startCol = mapMatrix[startRow].indexOf('@');

  let currentPosition = [startRow, startCol];

  for (let i = 0; i < cleanMoves.length; i++) {
    currentPosition = traverse(mapMatrix, currentPosition, cleanMoves[i]);
  }

  return mapMatrix.reduce((acc, row, i) => {
    return (
      acc +
      row.reduce((acc, cell, j) => (cell === '[' ? 100 * i + j : 0) + acc, 0)
    );
  }, 0);
}

console.log(solution(input), '\n1597035');
// console.log(solution(testInput), '\n9021');
