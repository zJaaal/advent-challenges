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

Now you can time travel and put an obstruction so the guard enters in an infinite loop
You have to compute how many possible loops can be created by the guard
*/

// Code fixed. Answer 1984.
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

let loops = {};
function move(map, row, col, direction, visited, includesObstacle) {
  const [dx, dy] = directionsDeltas[direction];
  const mapCopy = map.map((row) => row.slice());
  const visitedCopy = structuredClone(visited);

  // Validate in each step if is possible to go to an already visited cell putting an obstruction in the next cell,
  // if that's the case, we need to add the obstruction symbol (Not needed but I want to see) and count as a loop
  while (true) {
    const newRow = row + dx;
    const newCol = col + dy;

    if (
      mapCopy[newRow] === undefined ||
      mapCopy[newRow][newCol] === undefined
    ) {
      return undefined;
    }

    if (mapCopy[newRow][newCol] === '#' || mapCopy[newRow][newCol] === 'O') {
      // If we already hitted this obstacle in the same direction we can assume that we are in a loop
      if (visitedCopy[`${newRow}-${newCol}`]?.includes(direction)) {
        mapCopy[newRow][newCol] = 'C';
        return mapCopy.map((row) => row.join('')).join('\n');
      }

      visitedCopy[`${newRow}-${newCol}`] = visitedCopy[`${newRow}-${newCol}`]
        ? visitedCopy[`${newRow}-${newCol}`] + direction
        : direction;

      return move(
        mapCopy,
        row,
        col,
        currentDirection[direction],
        visitedCopy,
        includesObstacle
      );
    } else {
      if (!includesObstacle && (startRow !== newRow || startCol !== newCol)) {
        // The fix is to simulate from the starting point and it makes sense because the apparition of the obstacle requires to reset the visited cells
        // Because the visited cells can change in order and direction

        startingMap[newRow][newCol] = 'O';

        if (!loops[`${newRow}-${newCol}`]) {
          const loop = move(startingMap, startRow, startCol, '^', {}, true);

          if (loop) {
            console.log('-'.repeat(mapCopy.length));
            console.log('LOOP', Object.keys(loops).length + 1);
            console.log('-'.repeat(mapCopy.length));
            // console.log(loop);

            loops[`${newRow}-${newCol}`] = loop;
          }
        }
      }

      mapCopy[newRow][newCol] = direction; // This way i can know if the guard has passed through this cell and the direction it was facing

      row = newRow;
      col = newCol;
    }
  }
}

let startRow, startCol;

function solution(input) {
  const map = input.split('\n').map((row) => row.split(''));

  startRow = map.findIndex((row) => row.includes('^'));
  startCol = map[startRow].indexOf('^');

  move(map, startRow, startCol, '^', {}, false);

  return Object.keys(loops).length;
}

console.log(solution(input));
// console.log(solution(testInput));
