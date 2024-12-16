import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
It's time again for the Reindeer Olympics!
This year, the big event is the Reindeer Maze, where the Reindeer compete for the lowest score.

You and The Historians arrive to search for the Chief right as the event is about to start.
It wouldn't hurt to watch a little, right?

The Reindeer start on the Start Tile (marked S) facing East and need to reach the End Tile (marked E).
They can move forward one tile at a time (increasing their score by 1 point), but never into a wall (#).
They can also rotate clockwise or counterclockwise 90 degrees at a time (increasing their score by 1000 points).
 */

let calculateDistance = (node, end) =>
  Math.sqrt((node.x - end.x) ** 2 + (node.y - end.y) ** 2);

let steps = {
  up: [-1, 0],
  down: [1, 0],
  right: [0, 1],
  left: [0, -1],
};

const permittedSteps = {
  up: ['right', 'left', 'up'],
  down: ['right', 'left', 'down'],
  right: ['up', 'down', 'right'],
  left: ['up', 'down', 'left'],
};

const getDirection = (currentPos, newPos) => {
  if (currentPos.x === newPos.x) {
    return currentPos.y > newPos.y ? 'up' : 'down';
  } else {
    return currentPos.x > newPos.x ? 'left' : 'right';
  }
};

function solution(input) {
  let start, end;

  const mazeArray = input.split('\n').map((row) => row.split(''));

  let maze = mazeArray.map((row) => row.map((col) => col));

  maze = maze
    .map((row, y) => {
      return row.map((col, x) => {
        let node = {
          x,
          y,
          neighbors: [],
          gScore: Infinity,
          fScore: Infinity,
          char: maze[y][x],
        };
        if (col == 'S') {
          start = node;
          start.gScore = 0;
          start.direction = 'right'; // Reindeer is facing East
        } else if (col == 'E') end = node;
        return node;
      });
    })
    .map((row, _, maze) => {
      return row.map((node) => {
        Object.entries(steps).forEach(([_, point]) => {
          const y = node.y + point[0];
          const x = node.x + point[1];

          if (maze[y] && maze[y][x] && maze[y][x].char !== '#') {
            let neighbor = maze[y][x];
            if (neighbor) node.neighbors.push(neighbor);
          }
        });

        return node;
      });
    });

  // Open list as a priority queue
  let open = [];
  // Use a Map to store the best gScore for each state (x, y, direction)
  let gScore = new Map();

  // Helper function to generate a unique key for each state
  const getStateKey = (x, y, direction) => `${x},${y},${direction}`;

  // Initialize the start state
  const startStateKey = getStateKey(start.x, start.y, start.direction);
  gScore.set(startStateKey, 0);
  open.push({
    node: start,
    direction: start.direction,
    fScore: calculateDistance(start, end),
    gScore: 0,
  });

  while (open.length) {
    // Sort the open list based on fScore
    open.sort((a, b) => b.fScore - a.fScore);
    const current = open.pop();
    const next = current.node;
    const currentDirection = current.direction;

    // Goal check
    if (next.x === end.x && next.y === end.y) {
      return current.gScore;
    }

    next.neighbors.forEach((neighbor) => {
      const direction = getDirection(next, neighbor);

      const sameDirection = direction === currentDirection;
      const turnCost = sameDirection ? 0 : 1000;
      const stepCost = 1;
      const totalCost = current.gScore + turnCost + stepCost;

      const neighborStateKey = getStateKey(neighbor.x, neighbor.y, direction);
      const neighborGScore = gScore.get(neighborStateKey);

      if (neighborGScore === undefined || totalCost < neighborGScore) {
        gScore.set(neighborStateKey, totalCost);
        const fScore = totalCost + calculateDistance(neighbor, end);
        open.push({
          node: neighbor,
          direction: direction,
          fScore: fScore,
          gScore: totalCost,
        });
      }
    });
  }

  // If the end is unreachable
  return -1;
}

console.log(solution(input), '\n82460');
// console.log(solution(testInput), '\n7036');
