import input from '../input.js';
console.clear();

// very set of three lines in your list corresponds to a single group, but each group can have a different badge item type. So, in the above example, the first group's rucksacks are the first three lines:

// vJrwpWtwJgWrhcsFMMfFFhFp
// jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
// PmmdzqPrVvPwwTWBwg
// And the second group's rucksacks are the next three lines:

// wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
// ttgJtRGJQctTZtZT
// CrZsJsPPZsGzwwsLwLmpwMDw
// In the first group, the only item type that appears in all three rucksacks is lowercase r; this must be their badges. In the second group, their badge item type must be Z.

// Priorities for these items must still be found to organize the sticker attachment efforts: here, they are 18 (r) for the first group and 52 (Z) for the second group. The sum of these is 70.

function solution(input) {
  let inputArray = input.split('\n');
  let alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = 0;

  for (let i = 0; i < inputArray.length; i += 3) {
    for (let j = 0; j < inputArray[i].length; j++) {
      let regex = new RegExp(inputArray[i][j]);

      if (
        regex.test(inputArray[i]) &&
        regex.test(inputArray[i + 1]) &&
        regex.test(inputArray[i + 2])
      ) {
        result += alphabet.indexOf(inputArray[i][j]) + 1;
        break;
      }
    }
  }
  return result;
}

console.log(solution(input));
