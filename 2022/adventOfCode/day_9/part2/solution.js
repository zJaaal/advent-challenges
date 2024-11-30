import { input, part2TestInput as testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
The same as part 1 but with 9 knots
 */

let calculateDistance = (x1, x2, y1, y2) =>
  Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

const headMovement = {
  U: (lastPosition) => [lastPosition[0], lastPosition[1] + 1],
  D: (lastPosition) => [lastPosition[0], lastPosition[1] - 1],
  R: (lastPosition) => [lastPosition[0] + 1, lastPosition[1]],
  L: (lastPosition) => [lastPosition[0] - 1, lastPosition[1]],
};

const headTailMovement = {
  U: (headPosition) => [headPosition[0], headPosition[1] - 1],
  D: (headPosition) => [headPosition[0], headPosition[1] + 1],
  R: (headPosition) => [headPosition[0] - 1, headPosition[1]],
  L: (headPosition) => [headPosition[0] + 1, headPosition[1]],
};

//Now working, thanks to reddit for some hints
let knotMovement = (currentKnot, currentHead) => {
  let [refX, refY] = [...currentKnot];
  let diffX = Math.abs(currentKnot[0] - currentHead[0]);
  let diffY = Math.abs(currentKnot[1] - currentHead[1]);

  if (diffX < 2 && diffY < 2) return;

  // console.log(currentHead[0], diffX, diffY);

  if (diffX > 1 && !diffY) {
    refX += currentHead[0] - currentKnot[0] > 0 ? 1 : -1;
  } else if (diffY > 1 && !diffX) {
    refY += currentHead[1] - currentKnot[1] > 0 ? 1 : -1;
  } else {
    refX += currentHead[0] - currentKnot[0] > 0 ? 1 : -1;
    refY += currentHead[1] - currentKnot[1] > 0 ? 1 : -1;
  }

  return [refX, refY];
};

function solution(input) {
  //Just for writting the positions of the knots, just works for test input
  //Real input is too big for my current screen
  // let arraySim = Array.from({ length: 30 }, (x) =>
  //   Array.from({ length: 30 }, (x) => '.')
  // );

  let headPositions = [[0, 0]];
  let tailPositions = [
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
  ];
  let differentTailPossitions = [
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
    [[0, 0]],
  ];
  let inputArray = input.split('\n');

  inputArray.forEach((cmd) => {
    let [direction, value] = cmd.split(' ');

    for (let i = 0; i < value; i++) {
      headPositions.push(headMovement[direction](headPositions.at(-1)));
      let currentHead = headPositions.at(-1);
      tailPositions.forEach((tail, i) => {
        let currentTail = tail.at(-1);
        if (!i) {
          let distance = calculateDistance(
            currentHead[0],
            currentTail[0],
            currentHead[1],
            currentTail[1]
          );
          if (distance == 2 || distance == 2.23606797749979) {
            tail.push(headTailMovement[direction](currentHead));
            if (
              !differentTailPossitions[i].some(
                (x) => x[0] == tail.at(-1)[0] && x[1] == tail.at(-1)[1]
              )
            )
              differentTailPossitions[i].push(tail.at(-1));
          }
        } else {
          let newMovement = knotMovement(
            currentTail,
            tailPositions[i - 1].at(-1)
          );

          if (newMovement) {
            tail.push(newMovement);
            if (
              !differentTailPossitions[i].find(
                (x) => x[0] == tail.at(-1)[0] && x[1] == tail.at(-1)[1]
              )
            ) {
              differentTailPossitions[i].push(tail.at(-1));
            }
          }
          //To draw the positions of the knot. Work just for test input
          //Change i value to see a different knot
          if (i == 8) {
            // arraySim[tail.at(-1)[1] + 14][tail.at(-1)[0] + 14] = '#';
          }
        }
      });
    }
  });
  // To draw the positions of the knot. Work just for test input
  // for (let i = 0; i < arraySim.length; i++) console.log(...arraySim[i]);

  return differentTailPossitions.at(-1).length;
}
console.log(solution(input));
// console.log(solution(testInput));
