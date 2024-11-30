import { input, stacks } from '../input.js';
console.clear();

/*
The Elves just need to know which crate will end up on top of each stack;
in this example, the top crates are C in stack 1, M in stack 2, and Z in stack 3,
so you should combine these together and give the Elves the message CMZ.

After the rearrangement procedure completes, what crate ends up on top of each stack?
 */
function solution(input, stacks) {
  let steps = inputToSteps(input);

  steps.forEach((step) => {
    let moving = stacks[step[1] - 1].splice(-step[0]).reverse();
    stacks[step[2] - 1].push(...moving);
  });

  return stacks.map((stack) => stack.pop()).join('');
}

//step[0] quantity
//step[1] from
//step[2] to
function inputToSteps(input) {
  const inputArray = input.split('\n');
  return inputArray.map((step) => step.match(/\d+/g));
}

console.log(solution(input, stacks));
