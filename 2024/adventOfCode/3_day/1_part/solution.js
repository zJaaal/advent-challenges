import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/**
 * It seems like the goal of the program is just to multiply some numbers.
 * It does that with instructions like mul(X,Y), where X and Y are each 1-3 digit numbers.
 * For instance, mul(44,46) multiplies 44 by 46 to get a result of 2024.
 * Similarly, mul(123,4) would multiply 123 by 4.
 *
 * However, because the program's memory has been corrupted, there are also many invalid
 * characters that should be ignored, even if they look like part of a mul instruction.
 * Sequences like mul(4*, mul(6,9!, ?(12,34), or mul ( 2 , 4 ) do nothing.
 */

function solution(input) {
  const OPERANDS = new RegExp(/\d{1,3}/g);
  const instructions = input.match(/mul\(\d{1,3},\d{1,3}\)/g);

  return instructions.reduce((acc, curr) => {
    const [left, right] = curr.match(OPERANDS);

    return acc + Number(left) * Number(right);
  }, 0);
}

console.log(solution(input));
// console.log(solution(testInput));
