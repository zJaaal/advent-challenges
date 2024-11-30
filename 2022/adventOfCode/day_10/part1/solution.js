import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
Find the signal strength during the
20th, 60th, 100th, 140th, 180th, and 220th cycles.
What is the sum of these six signal strengths?
 */
let noop = 1;
let addx = 2;
function solution(input) {
  let cycle = 0;
  let result = 1;
  let inputArray = input.split('\n');

  let currentMilestone = 20;
  let resultArray = [];

  for (let i = 0; i < inputArray.length; i++) {
    let cmd = inputArray[i];
    let cmdArray = cmd.split(' ');
    if (cmdArray[0] == 'noop') {
      if (cycle == currentMilestone) {
        resultArray.push(result * cycle);
        currentMilestone += 40;
      }
      cycle += noop;
    }
    if (cmdArray[0] == 'addx') {
      for (let i = 0; i < 2; i++) {
        ++cycle;
        if (cycle == currentMilestone) {
          resultArray.push(result * cycle);
          currentMilestone += 40;
        }
        if (i == 1) result += Number(cmdArray[1]);
      }
    }
  }

  return resultArray.reduce((acc, curr) => (acc += curr));
}

console.log(solution(input));
// console.log(solution(testInput));
