import { input, part2TestInput as testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
After simulating the rope,
you can count up all of the positions the tail visited at least once.
In this diagram, s again marks the starting position
(which the tail also visited) and # marks other positions the tail visited:

..##..
...##.
.####.
....#.
s###..
So, there are 13 positions the tail visited at least once.

Simulate your complete hypothetical series of motions.
How many positions does the tail of the rope visit at least once?
 */

let headMovement = {
  U: (lastPosition) => [lastPosition[0], lastPosition[1] + 1],
  D: (lastPosition) => [lastPosition[0], lastPosition[1] - 1],
  R: (lastPosition) => [lastPosition[0] + 1, lastPosition[1]],
  L: (lastPosition) => [lastPosition[0] - 1, lastPosition[1]],
};

let tailMovement = {
  U: (headPosition) => [headPosition[0], headPosition[1] - 1],
  D: (headPosition) => [headPosition[0], headPosition[1] + 1],
  R: (headPosition) => [headPosition[0] - 1, headPosition[1]],
  L: (headPosition) => [headPosition[0] + 1, headPosition[1]],
};
let calculateDistance = (x1, x2, y1, y2) =>
  Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

function solution(input) {
  let headPositions = [[0, 0]];
  let tailPositions = [[0, 0]];
  let differentTailPossitions = [[0, 0]];
  let inputArray = input.split('\n');

  inputArray.forEach((cmd) => {
    let [direction, value] = cmd.split(' ');

    for (let i = 0; i < +value; i++) {
      headPositions.push(headMovement[direction](headPositions.at(-1)));
      let currentHead = headPositions.at(-1);
      let currentTail = tailPositions.at(-1);
      let distance = calculateDistance(
        currentHead[0],
        currentTail[0],
        currentHead[1],
        currentTail[1]
      );
      if (distance == 2 || distance == 2.23606797749979) {
        tailPositions.push(tailMovement[direction](currentHead));
        if (
          !differentTailPossitions.some(
            (x) =>
              x[0] == tailPositions.at(-1)[0] && x[1] == tailPositions.at(-1)[1]
          )
        )
          differentTailPossitions.push(tailPositions.at(-1));
      }
    }
  });

  return differentTailPossitions.length;
}

console.log(solution(input));
// console.log(solution(testInput));
