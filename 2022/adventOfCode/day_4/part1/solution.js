import input from '../input.js';
console.clear();

// Some of the pairs have noticed that one of their assignments fully contains the other.
// For example, 2-8 fully contains 3-7, and 6-6 is fully contained by 4-6.
// In pairs where one assignment fully contains the other,
// one Elf in the pair would be exclusively cleaning sections their partner
// will already be cleaning, so these seem like the most in need of reconsideration.
// In this example, there are 2 such pairs.

// In how many assignment pairs does one range fully contain the other?

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
    let firstRangeArray = Array.from(
      { length: firstRange.upper - firstRange.lower + 1 },
      (x, i) => (i ? ++firstRange.lower : firstRange.lower)
    );
    let secondRangeArray = Array.from(
      { length: secondRange.upper - secondRange.lower + 1 },
      (x, i) => (i ? ++secondRange.lower : secondRange.lower)
    );

    if (firstRangeArray.length > secondRangeArray.length) {
      if (secondRangeArray.every((x) => firstRangeArray.includes(x))) ++result;
    } else if (firstRangeArray.every((x) => secondRangeArray.includes(x)))
      ++result;
  });
  return result;
}

console.log(solution(input));
