import { input, stacks } from '../input.js';
console.clear();

/*
Now the crates doesn't go one by one but in a whole stack (just remove the reverse)

After the rearrangement procedure completes, what crate ends up on top of each stack?
 */
function solution(input, stacks) {
  let steps = inputToSteps(input);

  steps.forEach((step) => {
    let moving = stacks[step[1] - 1].splice(-step[0]);
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
