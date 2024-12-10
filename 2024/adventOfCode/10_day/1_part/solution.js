import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
The topographic map indicates the height at each position using a scale from 0 (lowest) to 9 (highest). For example:

0123
1234
8765
9876
Based on un-scorched scraps of the book, you determine that a good hiking trail is as long as possible and has an even, gradual, uphill slope.
For all practical purposes, this means that a hiking trail is any path that starts at height 0, ends at height 9, and always increases by a height of exactly 1 at each step.
Hiking trails never include diagonal steps - only up, down, left, or right (from the perspective of the map).

You look up from the map and notice that the reindeer has helpfully begun to construct a small pile of pencils,
markers, rulers, compasses, stickers, and other equipment you might need to update the map with hiking trails.

A trailhead is any position that starts one or more hiking trails - here, these positions will always have height 0.
Assembling more fragments of pages, you establish that a trailhead's score is the number of 9-height positions reachable from that trailhead via a hiking trail.
In the above example, the single trailhead in the top left corner has a score of 1 because it can reach a single 9 (the one in the bottom left).
 */

const directions = [
  [-1, 0], // up
  [1, 0], // down
  [0, 1], // right
  [0, -1], // left
];

function traverse(map, currPos, visited = {}) {
  const [y, x] = currPos;
  let score = 0;

  for (let i = 0; i < directions.length; i++) {
    const [dy, dx] = directions[i];

    const [newY, newX] = [y + dy, x + dx];

    if (map[newY] && map[newY][newX] - map[y][x] === 1) {
      if (map[newY][newX] === '9') {
        if (visited[`${newY}-${newX}`]) {
        } else {
          visited[`${newY}-${newX}`] = true;

          score += 1;
        }
      } else {
        score += traverse(map, [newY, newX], visited);
      }
    }
  }

  return score;
}

function solution(input) {
  const map = input.split('\n').map((row) => row.split(''));

  let score = 0;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '0') {
        let result = traverse(map, [i, j]);

        score += result;
      }
    }
  }

  return score;
}

// console.log(solution(input), '\n667');
// console.log(solution(testInput), '\n36');
