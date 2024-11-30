import input from '../input.js';
console.clear();

/*
Here are a few more examples:

bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 5
nppdvjthqldpwncqszvftbrmjlhg: first marker after character 6
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 10
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 11
How many characters need to be processed before the first start-of-packet marker is detected?
 */
function solution(input) {
  let inputArray = input.split('');

  for (let i = 0; i < inputArray.length - 4; i++) {
    if (new Set(inputArray.slice(i, i + 4)).size == 4) {
      return i + 4;
    }
  }
  return input;
}

console.log(solution(input));
