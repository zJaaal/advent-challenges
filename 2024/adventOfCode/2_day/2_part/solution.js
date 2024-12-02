import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
The engineers are trying to figure out which reports are safe.
The Red-Nosed reactor safety systems can only tolerate levels that are either gradually increasing or gradually decreasing.
So, a report only counts as safe if both of the following are true:

The levels are either all increasing or all decreasing.
Any two adjacent levels differ by at least one and at most three.

Now we can have a tolerance of one wrong number
*/
const MAX_TOLERANCE = 1; // We can remove at most one number

function checkReport(report, tolerance = 0) {
  // TIL: The direction of the sequence is obtained by comparing the first number with the last one
  const sequenceDirection = report.at(0) > report.at(-1) ? -1 : 1;

  return report.every((_, curr) => {
    if (curr === report.length - 1) return true; // Final number edge case

    const next = curr + 1;
    const diff = Math.abs(report[next] - report[curr]);

    const pairDirection = report[curr] > report[next] ? -1 : 1;

    // If the difference is not between 1 and 3 or the direction is not the same
    // We can try by removing the current or the next number
    if (diff < 1 || diff > 3 || pairDirection !== sequenceDirection) {
      // If we have already exhausted the tolerance, we can return false, because we should not remove more numbers
      if (tolerance == MAX_TOLERANCE) {
        return false;
      }

      const reportWithoutCurr = report
        .slice(0, curr)
        .concat(report.slice(curr + 1));

      const reportWithoutNext = report
        .slice(0, next)
        .concat(report.slice(next + 1));

      return (
        checkReport(reportWithoutCurr, tolerance + 1) ||
        checkReport(reportWithoutNext, tolerance + 1)
      );
    }

    return true; // The difference is between 1 and 3 and the direction is the same
  });
}
function solution(input) {
  const reports = input.split('\n').map((line) => line.split(' ').map(Number));

  return reports.filter((report) => checkReport(report)).length;
}

console.log(solution(input));
// console.log(solution(testInput));
