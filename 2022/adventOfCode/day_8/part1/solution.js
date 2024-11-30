import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
All of the trees around the edge of the grid are visible
 - since they are already on the edge,
 there are no trees to block the view.
 In this example, that only leaves the interior nine trees to consider:

The top-left 5 is visible from the left and top.
(It isn't visible from the right or bottom since other trees of height 5 are in the way.)
The top-middle 5 is visible from the top and right.
The top-right 1 is not visible from any direction;
for it to be visible, there would need to only be trees of height 0 between it and an edge.
The left-middle 5 is visible, but only from the right.
The center 3 is not visible from any direction;
for it to be visible, there would need to be only trees of at most height 2 between it and an edge.
The right-middle 3 is visible from the right.
In the bottom row, the middle 5 is visible, but the 3 and 4 are not.
With 16 trees visible on the edge and another 5 visible in the interior, a total of 21 trees are visible in this arrangement.

Consider your map; how many trees are visible from outside the grid?
 */

function validateLeft(input, y, x) {
  for (let i = 0; i < x; i++) {
    if (input[y][x] <= input[y][i]) return false;
  }

  return true;
}
function validateRigth(input, y, x) {
  for (let i = x + 1; i < input[0].length; i++) {
    if (input[y][x] <= input[y][i]) return false;
  }

  return true;
}
function validateTop(input, y, x) {
  for (let i = y - 1; i > -1; i--) {
    if (input[y][x] <= input[i][x]) return false;
  }

  return true;
}
function validateDown(input, y, x) {
  for (let i = y + 1; i < input.length; i++) {
    if (input[y][x] <= input[i][x]) return false;
  }

  return true;
}

function solution(input) {
  let inputArray = input.split('\n').map((x) => x.split(''));
  let result = inputArray.length * 2 + (inputArray[0].length - 2) * 2;

  for (let i = 1; i < inputArray[0].length - 1; i++) {
    for (let j = 1; j < inputArray.length - 1; j++) {
      if (
        validateRigth(inputArray, j, i) ||
        validateLeft(inputArray, j, i) ||
        validateTop(inputArray, j, i) ||
        validateDown(inputArray, j, i)
      )
        ++result;
    }
  }

  return result;
}

console.log(solution(input));
// console.log(solution(testInput));
