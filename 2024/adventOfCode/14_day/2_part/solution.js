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


We found out that after a N quantity of seconds the robots form a Christmas tree shape.

What is the fewest number of seconds that must elapse for the robots to display the Easter egg?
 */

// Real mod to get the final position by accomplishing the rule of warping
function realMod(n, m) {
  return ((n % m) + m) % m;
}

function getQuadrant(x, y, rows, cols) {
  const middleX = (cols - 1) / 2;
  const middleY = (rows - 1) / 2;

  if (x < middleX && y < middleY) return 1;
  if (x > middleX && y < middleY) return 2;
  if (x > middleX && y > middleY) return 3;
  if (x < middleX && y > middleY) return 4;
}

// Compute how much points with symmetry we have
function computeSymmetricPoints(robotsPosition, cols, rows) {
  const center = {
    x: (cols - 1) / 2,
    y: (rows - 1) / 2,
  };

  const symmetricPoint = (x, y) => ({
    x: 2 * center.x - x,
    y: y,
  });

  let symmetricPoints = 0;

  robotsPosition.forEach(({ x, y }) => {
    const symmetric = symmetricPoint(x, y);

    const quadrant = getQuadrant(x, y, rows, cols);

    // We only care about the points in the first and fourth quadrant
    // Since trees are symmetric against the y axis
    if (quadrant === 1 || quadrant === 4)
      if (
        // This is slow and we can optimize it by changing how we parse the data, I truly don't want to refactor this
        robotsPosition.some(
          (robot) => robot.x === symmetric.x && robot.y === symmetric.y
        )
      )
        symmetricPoints++;
  });

  return symmetricPoints;
}

function solution(input, rows, cols, maxSeconds) {
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

  let finalResult = {
    symmetricPoints: -Infinity,
    seconds: 0,
  };

  const simulateMovement = (seconds) => {
    // Move by seconds
    const robotsAfterMovement = robotsPosition.map(({ x, y, vx, vy }) => ({
      x: realMod(x + vx * seconds, cols),
      y: realMod(y + vy * seconds, rows),
    }));

    // By calculating symmetry we can find the tree, since the trees are symmetric
    const symmetricPoints = computeSymmetricPoints(
      robotsAfterMovement,
      cols,
      rows
    );

    if (symmetricPoints > finalResult.symmetricPoints) {
      finalResult = {
        symmetricPoints,
        seconds,
      };
    }
  };

  // In max seconds the cycle repeats
  for (let i = 0; i < maxSeconds; i++) {
    simulateMovement(i);
  }

  return finalResult.seconds;
}
// I pre computed the max seconds to get all the points to were they started, I probably can do the problem without this but it's faster
// I spent half of the day writting a text file with all the movements to see if I could find a pattern, I didn't.
// But I found out that the tree is symmetric against the y axis, so I only need to check symmetric points in the first and fourth quadrant and then get the one with more symmetric points
// This problem was beautiful and I loved it, I'm happy that I solved it
console.log(solution(input, 103, 101, 10402), '\n7584'); // 7584,
// console.log(solution(testInput, 7, 11, 77), '\n3'); // There's no tree shape in this case, which is funny because there's no way to know if you are doing the right thing
