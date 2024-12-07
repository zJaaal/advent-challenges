import { input, testInput } from '../input.js';
import fs from 'fs';
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

// The answer is 1984, my code is off by 148 loops (2132), I'm going to check the loops to see if I can find the error
// Im burning out. I'll drop this and probably re-take it when I can.
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

  // Validate in each step if is possible to go to an already visited cell putting an obstruction in the next cell,
  // if that's the case, we need to add the obstruction symbol (Not needed but I want to see) and count as a loop
  while (true) {
    const newRow = row + dx;
    const newCol = col + dy;

    if (map[newRow] === undefined || map[newRow][newCol] === undefined) {
      return undefined;
    }

    if (map[newRow][newCol] === '#' || map[newRow][newCol] === 'O') {
      if (visited[`${newRow}-${newCol}`]?.includes(direction)) {
        map[newRow][newCol] = 'C';
        return map;
      }

      visited[`${newRow}-${newCol}`] = visited[`${newRow}-${newCol}`]
        ? visited[`${newRow}-${newCol}`] + direction
        : direction;

      return move(
        map,
        row,
        col,
        currentDirection[direction],
        structuredClone(visited),
        includesObstacle
      );
    } else {
      const mapCopy = map.map((row) => row.slice());

      if (!includesObstacle) {
        mapCopy[newRow][newCol] = 'O';
        if (!loops[`${newRow}-${newCol}`]) {
          // console.log('CHECKING LOOP', loops[`${newCol}-${newRow}`]);
          const loop = move(
            mapCopy,
            row,
            col,
            currentDirection[direction],
            structuredClone(visited),
            true
          );

          if (loop) {
            console.log('LOOP', Object.keys(loops).length);
            console.log('----------------------------------');

            // console.log(loop);

            loops[`${newRow}-${newCol}`] = loop;

            // fs.appendFileSync('loops.txt', loop + '\n\n\n');
          }
        }
      }

      map[newRow][newCol] = direction; // This way i can know if the guard has passed through this cell and the direction it was facing

      row = newRow;
      col = newCol;
    }
  }
}

function solution(input) {
  fs.writeFileSync('loops.txt', '');
  let globalVisited = {};
  const map = input.split('\n').map((row) => row.split(''));

  const startRow = map.findIndex((row) => row.includes('^'));
  const startCol = map[startRow].indexOf('^');

  move(map, startRow, startCol, '^', globalVisited, false);

  return Object.keys(loops).length;
}

console.log(solution(input));
// console.log(solution(testInput));
