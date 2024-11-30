import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
This is crazy. But I know how to do it

Its crazy because it's literally rendering things
 */
function solution(input) {
  let cycle = 0;
  let result = 1;
  let CRTResult = [];
  let inputArray = input.split('\n');
  let currentCRT = Array.from({ length: 40 }, (_) => '#');
  let pointer = 0;
  let sprite = [
    '#',
    '#',
    '#',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
  ];
  let currentMilestone = 40;

  for (let i = 0; i < inputArray.length; i++) {
    let cmd = inputArray[i];
    let cmdArray = cmd.split(' ');
    if (cmdArray[0] == 'noop') {
      if (cycle == currentMilestone) {
        currentMilestone += 40;
        pointer = 0;
        CRTResult.push(currentCRT);
        currentCRT = Array.from({ length: 40 }, (_) => '#');
      }

      if (sprite[pointer] == '#' && currentCRT[pointer] == '#')
        currentCRT[pointer] = '#';
      else currentCRT[pointer] = '.';

      ++cycle;
      ++pointer;
    }
    if (cmdArray[0] == 'addx') {
      for (let i = 0; i < 2; i++) {
        if (cycle == currentMilestone) {
          currentMilestone += 40;
          pointer = 0;
          CRTResult.push(currentCRT);
          currentCRT = Array.from({ length: 40 }, (_) => '#');
        }

        if (sprite[pointer] == '#' && currentCRT[pointer] == '#')
          currentCRT[pointer] = '#';
        else currentCRT[pointer] = '.';

        if (i == 1) {
          result += Number(cmdArray[1]);
          sprite = sprite
            .map((x) => (x == '#' ? '.' : x))
            .map((x, i) => {
              if (i == result - 1 || i == result || i == result + 1) return '#';
              else return '.';
            });
        }
        ++cycle;
        ++pointer;
      }
    }
    if (cycle == 240) CRTResult.push(currentCRT);
  }
  return CRTResult;
}

console.log(solution(input));
// console.log(solution(testInput));
