import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
  With the 2 lists, sort them in ascending order and calculate the sum of the absolute differences between the elements of the 2 lists.
 */

function solution(input) {
  const { left, right } = input.split('\n').reduce(
    (acc, pair) => {
      const [left, right] = pair.split('   ');

      return {
        left: [...acc.left, left],
        right: [...acc.right, right],
      };
    },
    {
      left: [],
      right: [],
    }
  );

  const sortedLeft = left.sort((a, b) => a - b);
  const sortedRight = right.sort((a, b) => a - b);

  return sortedLeft.reduce((acc, item, index) => {
    return acc + Math.abs(item - sortedRight[index]);
  }, 0);
}

console.log(solution(input));
// console.log(solution(testInput));
