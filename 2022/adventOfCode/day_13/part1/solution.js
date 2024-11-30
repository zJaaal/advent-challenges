import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
Determine which pairs of packets are already in the right order.
What is the sum of the indices of those pairs?
 */

function solution(input) {
  let result = 0;
  let pair = 1;

  // Iterate through input
  for (let i = 0; i < input.length; i += 2) {
    //IF they are in order, sum the pair value
    result += checkArray(input[i], input[i + 1]) ? pair : 0;
    ++pair;
  }

  return result;
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
