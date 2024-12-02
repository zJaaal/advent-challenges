import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
The engineers are trying to figure out which reports are safe.
The Red-Nosed reactor safety systems can only tolerate levels that are either gradually increasing or gradually decreasing.
So, a report only counts as safe if both of the following are true:

The levels are either all increasing or all decreasing.
Any two adjacent levels differ by at least one and at most three.
 */

function solution(input) {
  const reports = input.split('\n').map((line) => line.split(' ').map(Number));

  return reports.filter((report) => {
    let direction = 0;

    return report.every((level, index) => {
      if (index === 0) return true;
      const prevLevel = report[index - 1];

      const currentDirection = level > prevLevel ? 1 : -1;

      if (direction === 0) direction = level > prevLevel ? 1 : -1;

      const difference = Math.abs(level - prevLevel);

      return (
        difference <= 3 && difference > 0 && currentDirection === direction
      );
    });
  }).length;
}

console.log(solution(input));
// console.log(solution(testInput));
