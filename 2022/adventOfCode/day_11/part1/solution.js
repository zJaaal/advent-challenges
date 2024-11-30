import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
Figure out which monkeys to chase by counting how many items they inspect over 20 rounds.
What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans?
 */

let rounds = 20;
function solution(input) {
  for (let i = 0; i++ < rounds; ) {
    input.forEach((monkey) => {
      while (monkey.items.length) {
        monkey.inspections += 1;
        let newValue = monkey.operation(monkey.items.shift());
        let monkeyIndex = monkey.test(newValue);
        input[monkeyIndex].items.push(newValue);
      }
    });
  }
  let result = input
    .map((x) => x.inspections)
    .sort((x, y) => y - x)
    .slice(0, 2);
  return result[0] * result[1];
}

console.log(solution(input));
// console.log(solution(testInput));
