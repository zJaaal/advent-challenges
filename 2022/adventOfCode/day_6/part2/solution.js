import input from '../input.js';
console.clear();

/*
A start-of-message marker is just like a start-of-packet marker, except it consists of 14 distinct characters rather than 4.

Here are the first positions of start-of-message markers for all of the above examples:

mjqjpqmgbljsphdztnvjfqwrcgsmlb: first marker after character 19
bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 23
nppdvjthqldpwncqszvftbrmjlhg: first marker after character 23
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 29
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 26
How many characters need to be processed before the first start-of-message marker is detected?
 */
function solution(input) {
  let inputArray = input.split('');

  for (let i = 0; i < inputArray.length - 14; i++) {
    if (new Set(inputArray.slice(i, i + 14)).size == 14) {
      return i + 14;
    }
  }
  return input;
}

console.log(solution(input));
