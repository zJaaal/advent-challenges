import input from '../input.js';
console.clear();

// To help prioritize item rearrangement, every item type can be converted to a priority:

// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.
// In the above example, the priority of the item type that appears in both compartments
// of each rucksack is 16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s); the sum of these is 157.

// Find the item type that appears in both compartments of each rucksack.
// What is the sum of the priorities of those item types?

function solution(input) {
  let inputArray = input.split('\n');
  let alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  inputArray = inputArray.reduce((result, item) => {
    let firstHalf = item.slice(0, item.length / 2);
    let secondHalf = item.slice(item.length / 2);

    for (let i = 0; i < firstHalf.length; i++) {
      let regex = new RegExp(firstHalf[i]);

      if (regex.test(firstHalf) && regex.test(secondHalf)) {
        result += alphabet.indexOf(firstHalf[i]) + 1;
        return result;
      }
    }

    return result;
  }, 0);

  return inputArray;
}

console.log(solution(input));
