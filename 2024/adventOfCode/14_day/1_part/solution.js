import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
 Each robot's position is given as p=x,y where x represents the number of tiles the robot is from the left wall and y represents the number of tiles from the top wall (when viewed from above).
 So, a position of p=0,0 means the robot is all the way in the top-left corner.

Each robot's velocity is given as v=x,y where x and y are given in tiles per second.
Positive x means the robot is moving to the right, and positive y means the robot is moving down.
So, a velocity of v=1,-2 means that each second, the robot moves 1 tile to the right and 2 tiles up.

The robots outside the actual bathroom are in a space which is 101 tiles wide and 103 tiles tall (when viewed from above).
However, in this example, the robots are in a space which is only 11 tiles wide and 7 tiles tall.

The robots are good at navigating over/under each other (due to a combination of springs, extendable legs, and quadcopters),
so they can share the same tile and don't interact with each other

The Historian can't wait much longer, so you don't have to simulate the robots for very long.
Where will the robots be after 100 seconds?

To determine the safest area, count the number of robots in each quadrant after 100 seconds.
Robots that are exactly in the middle (horizontally or vertically) don't count as being in any quadrant
 */

const SECONDS_TO_SIMULATE = 100;

// Real mod to get the final position by accomplishing the rule of warping
function realMod(n, m) {
  return ((n % m) + m) % m;
}

// Get the quadrant of the robot
function getQuadrant(x, y, rows, cols) {
  const middleX = (cols - 1) / 2;
  const middleY = (rows - 1) / 2;

  if (x < middleX && y < middleY) return 1;
  if (x > middleX && y < middleY) return 2;
  if (x > middleX && y > middleY) return 3;
  if (x < middleX && y > middleY) return 4;
}

function solution(input, rows, cols) {
  const robotsPosition = input.split('\n').map((line) => {
    const [x, y] = line
      .match(/p=(-?\d+),(-?\d+)/)
      .slice(1)
      .map(Number);

    const [vx, vy] = line
      .match(/v=(-?\d+),(-?\d+)/)
      .slice(1)
      .map(Number);

    return { x, y, vx, vy };
  });

  // Simulate the position after SECONDS_TO_SIMULATE and get the final position respecting the warping rule
  const robotsAfterMovement = robotsPosition.map(({ x, y, vx, vy }) => ({
    x: realMod(x + vx * SECONDS_TO_SIMULATE, cols),
    y: realMod(y + vy * SECONDS_TO_SIMULATE, rows),
  }));

  // Count the number of robots in each quadrant
  const robotsPerQuadrant = robotsAfterMovement.reduce((acc, { x, y }) => {
    const quadrant = getQuadrant(x, y, rows, cols);

    quadrant && (acc[quadrant] = ~~acc[quadrant] + 1);

    return acc;
  }, {});

  // Multiply the number of robots in each quadrant
  return Object.values(robotsPerQuadrant).reduce((acc, val) => acc * val, 1);
}

console.log(solution(input, 103, 101), '\n236628054');
// console.log(solution(testInput, 7, 11), '\n12');
