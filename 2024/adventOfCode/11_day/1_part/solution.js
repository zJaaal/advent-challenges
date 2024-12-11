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

How many stones will you have after blinking 25 times?
 */

function evenToTwo(stone) {
  const firstHalf = stone.slice(0, stone.length / 2);
  const secondHalf = stone.slice(stone.length / 2);

  return `${Number(firstHalf)} ${Number(secondHalf)}`;
}

function multiplyBy2024(stone) {
  return Number(stone) * 2024;
}

function blink(stones) {
  return stones.replace(/\d+/g, (match) => {
    const number = Number(match);

    if (!number) return 1;
    if (match.length % 2 === 0) return evenToTwo(match);

    return multiplyBy2024(number);
  });
}

function solution(input) {
  for (let i = 0; i < 25; i++) {
    input = blink(input);
  }

  return input.split(' ').length;
}

console.log(solution(input), '\n198089');
// console.log(solution(testInput), '\n55312');
