import input from '../input.js';
console.clear();

/*
In the above example, the first two pairs (2-4,6-8 and 2-3,4-5)
don't overlap, while the remaining four pairs
(5-7,7-9, 2-8,3-7, 6-6,4-6, and 2-6,4-8) do overlap:

5-7,7-9 overlaps in a single section, 7.
2-8,3-7 overlaps all of the sections 3 through 7.
6-6,4-6 overlaps in a single section, 6.
2-6,4-8 overlaps in sections 4, 5, and 6.
So, in this example, the number of overlapping assignment pairs is 4.

In how many assignment pairs do the ranges overlap?
*/

function solution(input) {
  let inputArray = input.split('\n');
  let result = 0;

  inputArray.forEach((pair) => {
    let pairs = pair.split(',');
    let firstRange = {
      lower: pairs[0].split('-')[0] >> 0,
      upper: pairs[0].split('-')[1] >> 0,
    };
    let secondRange = {
      lower: pairs[1].split('-')[0] >> 0,
      upper: pairs[1].split('-')[1] >> 0,
    };
    if (
      firstRange.lower <= secondRange.upper &&
      secondRange.lower <= firstRange.upper
    )
      ++result;
  });
  return result;
}

console.log(solution(input));
