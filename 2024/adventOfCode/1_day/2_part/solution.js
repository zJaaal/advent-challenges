import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
  After the previous task, out protagonist found out that we needed to calculate a similarity score between the 2 lists
  We need to multiply each number by the number of times it appears in the other list and sum the results.
 */

function solution(input) {
  const { left, right } = input.split('\n').reduce(
    (acc, pair) => {
      const [left, right] = pair.split('   ');

      return {
        left: {
          ...acc.left,
          [left]: acc.left[left] ? acc.left[left] + 1 : 1, // Get all the numbers from the left list and count how many times they appear
        },
        right: {
          ...acc.right,
          [right]: acc.right[right] ? acc.right[right] + 1 : 1, // Get all the numbers from the right list and count how many times they appear
        },
      };
    },
    {
      left: {},
      right: {},
    }
  );

  return Object.entries(left).reduce((acc, item) => {
    const [leftId, leftCount] = item;

    const rightCount = right[leftId] ?? 0; // If the number in the left list is not in the right list, we need to consider it as 0

    // Multiply the left number by the times it appears in the right list, but we need to take into consideration that the number in the left can be repeated also in the left list
    return acc + leftCount * Number(leftId) * rightCount;
  }, 0);
}

console.log(solution(input));
// console.log(solution(testInput));
