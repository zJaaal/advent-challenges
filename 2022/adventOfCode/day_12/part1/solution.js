import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
This path reaches the goal in 31 steps, the fewest possible.

What is the fewest steps required to move
from your current position to the location that should get the best signal?
 */

let start, end;

let calculateDistance = (node, end) =>
  Math.sqrt((node.x - end.x) ** 2 + (node.y - end.y) ** 2);

let steps = [
  [-1, 0], //up
  [1, 0], // down
  [0, 1], //right
  [0, -1], // left
];

function solution(input) {
  let heightMap = input.split('\n').map((x) => x.split(''));

  heightMap = heightMap
    .map((row, y) => {
      return row.map((col, x) => {
        let height =
          col == 'S'
            ? 1
            : col == 'E'
            ? 'z'.charCodeAt(0) - 96
            : col.charCodeAt(0) - 96;
        let node = {
          x,
          y,
          height,
          neighbors: [],
          gScore: 0,
          fScore: Infinity,
        };
        if (col == 'S') start = node;
        else if (col == 'E') end = node;
        return node;
      });
    })
    .map((row, _, heightMap) => {
      row.map((node) => {
        steps.forEach((point) => {
          if (
            node.y + point[0] >= 0 &&
            node.y + point[0] <= heightMap.length - 1 &&
            node.x + point[1] >= 0 &&
            node.x + point[1] <= heightMap[0].length - 1
          ) {
            let neighbor = heightMap[node.y + point[0]][node.x + point[1]];
            if (neighbor) node.neighbors.push(neighbor);
          }
        });
      });
    });

  let open = [start];

  while (open.length) {
    let next = open.sort((x, y) => y.fScore - x.fScore).pop();
    next.neighbors.forEach((neighbor) => {
      if (neighbor.height - next.height < 2) {
        let newGScore = next.gScore + 1;

        if (newGScore < neighbor.gScore || neighbor.gScore == 0) {
          neighbor.gScore = newGScore;
          neighbor.fScore = newGScore + calculateDistance(next, end);
          if (
            !open.find((node) => node.x == neighbor.x && node.y == neighbor.y)
          )
            open.push(neighbor);
        }
      }
    });
  }

  return end.gScore;
}

console.log(solution(input));
// console.log(solution(testInput));
