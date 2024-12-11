import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
As you observe them for a while, you find that the stones have a consistent behavior.
Every time you blink, the stones each simultaneously change according to the first applicable rule in this list:

If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.

If the stone is engraved with a number that has an even number of digits, it is replaced by two stones.
The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone.
(The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)

If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.

How many stones will you have after blinking 75 times?
 */

function evenToTwo(stone) {
  const firstHalf = stone.slice(0, stone.length / 2);
  const secondHalf = stone.slice(stone.length / 2);

  return [firstHalf, secondHalf];
}

function multiplyBy2024(stone) {
  return stone * 2024;
}

const MAX_BLINKS = 75;

const memo = {};

function blink(stone, currentBlink = 1) {
  // Use currentBlink as a key to memoize the result

  const key = `${stone}-${currentBlink}`;

  // If the result is already memoized, return it
  if (memo[key] !== undefined) {
    return memo[key];
  }

  // If the currentBlink is greater than the MAX_BLINKS, return 1, because we are analyzing the last stone
  if (currentBlink > MAX_BLINKS) {
    return 1;
  }

  const number = Number(stone);

  // Initialize the result as 0, since we don't know the result yet
  let result = 0;

  // Compute the result based on the rules
  if (!number) {
    // Just change to one
    result = blink('1', currentBlink + 1);
  } else if (number.toString().length % 2 === 0) {
    const [firstHalf, secondHalf] = evenToTwo(number.toString());

    // Compute the halves and sum them
    result =
      blink(firstHalf, currentBlink + 1) + blink(secondHalf, currentBlink + 1);
  } else {
    // Multiply by 2024
    result = blink(multiplyBy2024(number).toString(), currentBlink + 1);
  }

  // Memoize the result and return it
  memo[key] = result;
  return result;
}

function solution(input) {
  let segments = input.split(' ');

  return segments
    .map((element) => blink(element))
    .reduce((acc, curr) => acc + curr, 0); // Sum the final result for each segment
}

console.log(solution(input), '\n236302670835517');
// console.log(solution(testInput), '\n65601038650482');
