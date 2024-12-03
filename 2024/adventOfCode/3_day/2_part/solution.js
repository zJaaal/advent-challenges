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
 *
 * here are two new instructions you'll need to handle:
 *
 * The do() instruction enables future mul instructions.
 * The don't() instruction disables future mul instructions.
 * Only the most recent do() or don't() instruction applies. At the beginning of the program, mul instructions are enabled.
 */

function solution(input) {
  const CONTROL_INSTRUCTION = new RegExp(/do\(\)|don't\(\)/g);

  const OPERANDS = new RegExp(/\d{1,3}/g);

  const instructions = input.match(/do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/g);

  let enabled = true;

  return instructions.reduce((acc, instruction) => {
    if (instruction.match(CONTROL_INSTRUCTION)) {
      enabled = instruction === 'do()'; // If it's not do() then it's don't()

      return acc;
    }

    if (!enabled) {
      return acc;
    }

    const [left, right] = instruction.match(OPERANDS);

    return acc + Number(left) * Number(right);
  }, 0);
}

console.log(solution(input));
// console.log(solution(testInput));
