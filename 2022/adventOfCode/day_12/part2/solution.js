import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
Same but now any height = 1 can be the starting point
 */

let start, end;

let calculateDistance = (node, end) =>
  Math.sqrt((node.x - end.x) ** 2 + (node.y - end.x) ** 2);

let steps = [
  [-1, 0], //up
  [1, 0], // down
  [0, 1], //right
  [0, -1], // left
];

function solution(input) {
  let heightMap = input.split('\n').map((x) => x.split(''));

  let open = [];
  let result = [];
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
      return row.map((node) => {
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
        if (node.height == 1) open.push([node]);
        return node;
      });
    });

  open.forEach((queue) => {
    while (queue.length) {
      let next = queue.sort((x, y) => y.fScore - x.fScore).pop();
      next.neighbors.forEach((neighbor) => {
        if (neighbor.height - next.height < 2) {
          let newGScore = next.gScore + 1;

          if (newGScore < neighbor.gScore || neighbor.gScore == 0) {
            neighbor.gScore = newGScore;
            neighbor.fScore = newGScore + calculateDistance(next, end);
            if (
              !queue.find(
                (node) => node.x == neighbor.x && node.y == neighbor.y
              )
            )
              queue.push(neighbor);
          }
        }
      });
    }

    if (end.gScore) result.push(end.gScore);

    //Reset all values
    heightMap.forEach((row) =>
      row.forEach((node) => {
        node.gScore = 0;
        node.fScore = Infinity;
      })
    );
  });

  return result.sort((x, y) => y - x).pop();
}

// console.log(solution(input));
console.log(solution(testInput));
