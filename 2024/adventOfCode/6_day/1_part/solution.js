import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
The map shows the current position of the guard with ^ (to indicate the guard is currently facing up from the perspective of the map).
Any obstructions - crates, desks, alchemical reactors, etc. - are shown as #.

Lab guards in 1518 follow a very strict patrol protocol which involves repeatedly following these steps:

If there is something directly in front of you, turn right 90 degrees.
Otherwise, take a step forward.
Following the above protocol, the guard moves up several times until she reaches an obstacle (in this case, a pile of failed suit prototypes):
*/

function move(map, row, col, direction) {
  const directionsDeltas = {
    '^': [-1, 0],
    v: [1, 0],
    '>': [0, 1],
    '<': [0, -1],
  };

  // 90 degrees right
  const currentDirection = {
    '^': '>',
    '>': 'v',
    v: '<',
    '<': '^',
  };

  const [dx, dy] = directionsDeltas[direction];

  while (true) {
    const newRow = row + dx;
    const newCol = col + dy;

    if (map[newRow] === undefined || map[newRow][newCol] === undefined) {
      map[row][col] = 'X';
      return map;
    }

    if (map[newRow][newCol] === '#') {
      return move(map, row, col, currentDirection[direction]);
    } else {
      map[row][col] = 'X';

      row = newRow;
      col = newCol;
      map[row][col] = direction;
    }

    console.log(map.map((row) => row.join('')).join('\n'));
    console.log('----------------------------------');
  }
}

function solution(input) {
  const map = input.split('\n').map((row) => row.split(''));

  const startRow = map.findIndex((row) => row.includes('^'));
  const startCol = map[startRow].indexOf('^');

  const finished = move(map, startRow, startCol, '^');

  return finished
    .map((row) => row.join(''))
    .join('\n')
    .match(/X/g).length;
}

// console.log(solution(input));
console.log(solution(testInput));
