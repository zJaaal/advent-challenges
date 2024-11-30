import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
Looking up, its view is not blocked; it can see 1 tree (of height 3).
Looking left, its view is blocked immediately;
it can see only 1 tree (of height 5, right next to it).
Looking right, its view is not blocked; it can see 2 trees.
Looking down, its view is blocked eventually;
it can see 2 trees (one of height 3, then the tree of height 5 that blocks its view).
A tree's scenic score is found by multiplying together its viewing distance in each of the four directions.
For this tree, this is 4 (found by multiplying 1 * 1 * 2 * 2).
 */

function countLeft(input, y, x) {
  let result = 0;
  for (let i = x - 1; i > -1; i--) {
    ++result;
    if (input[y][x] <= input[y][i]) break;
  }

  return result;
}
function countRigth(input, y, x) {
  let result = 0;
  for (let i = x + 1; i < input[0].length; i++) {
    ++result;

    if (input[y][x] <= input[y][i]) break;
  }

  return result;
}
function countTop(input, y, x) {
  let result = 0;
  for (let i = y - 1; i > -1; i--) {
    ++result;
    if (input[y][x] <= input[i][x]) break;
  }

  return result;
}
function countDown(input, y, x) {
  let result = 0;
  for (let i = y + 1; i < input.length; i++) {
    ++result;
    if (input[y][x] <= input[i][x]) break;
  }

  return result;
}

function solution(input) {
  let inputArray = input.split('\n').map((x) => x.split(''));
  let result = [];

  for (let i = 1; i < inputArray[0].length - 1; i++) {
    for (let j = 1; j < inputArray.length - 1; j++) {
      let scenicScore =
        countRigth(inputArray, j, i) *
        countLeft(inputArray, j, i) *
        countTop(inputArray, j, i) *
        countDown(inputArray, j, i);

      result.push(scenicScore);
    }
  }

  return result.sort((x, y) => x - y).pop();
}

console.log(solution(input));
// console.log(solution(testInput));
