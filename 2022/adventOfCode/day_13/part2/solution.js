import { part2Input as input, part2TestInput as testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
Sort the packages and add this two dividers:
[[2]]
[[6]]
Afterward, locate the divider packets.
To find the decoder key for this distress signal,
you need to determine the indices of the two divider packets and multiply them together.
(The first packet is at index 1, the second packet is at index 2, and so on.)
In this example, the divider packets are 10th and 14th, and so the decoder key is 140.

Organize all of the packets into the correct order.
What is the decoder key for the distress signal?
 */

function solution(input) {
  let lastIndexOfFirstDivider = -1;
  let lastIndexOfSecondDivider = -1;

  //BubbleSort because there's no way to know which goes upper or lower
  //(at least that's my analysis)
  //So we need to check all with all
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (j == input.length - 1) continue;

      //Check the arrays
      if (!checkArray(input[j], input[j + 1])) {
        //Wrong order, so swap them
        let b = input[j + 1];
        input[j + 1] = input[j];
        input[j] = b;
      }
    }
  }

  //This is to look for the dividers that the problem tell us to add
  //Couldn't find a way to know where are them on sorting time
  for (let i = 0; i < input.length; i++) {
    if (lastIndexOfFirstDivider > 0 && lastIndexOfSecondDivider > 0) break;
    if (
      input[i].length == 1 &&
      Array.isArray(input[i][0]) &&
      input[i][0].length == 1
    ) {
      if (input[i][0][0] == 2) lastIndexOfFirstDivider = i + 1;
      if (input[i][0][0] == 6) lastIndexOfSecondDivider = i + 1;
    }
  }

  //Multiply to know the result
  return lastIndexOfFirstDivider * lastIndexOfSecondDivider;
}

//Booleans tell us if the arrays are in the right order
function checkArray(left, right) {
  // If we ran out of length on left
  if (!left.length && right.length) return true;
  // If we ran out of length on right
  if (left.length && !right.length) return false;

  //Check the arrays
  for (let i = 0; i < left.length; i++) {
    //They are not arrays
    if (!Array.isArray(left[i]) && !Array.isArray(right[i])) {
      //If left is bigger then is false
      if (left[i] > right[i]) return false;
      //Else is true
      else if (left[i] < right[i]) return true;
      //If we ran out of right and not of left is false
      else if (left[i + 1] && !right[i + 1]) return false;
      // If we ran out of left but not of right then is true
      else if (!left[i + 1] && right[i + 1]) return true;

      //They are arrays
    } else {
      //Fix the data if they are not arrays
      let newLeft = Array.isArray(left[i]) ? left[i] : [left[i]];
      let newRight = Array.isArray(right[i]) ? right[i] : [right[i]];

      //Check the arrays
      let result = checkArray(newLeft, newRight);

      // If can't tell if they are in the right order continue
      if (result == 'equal') continue;

      //Else return the result
      return result;
    }
  }
  //No way to tell if they are in the wrong or right order
  return 'equal';
}

console.log(solution(input));
// console.log(solution(testInput));
