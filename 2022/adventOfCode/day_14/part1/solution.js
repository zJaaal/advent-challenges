import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
Using your scan, simulate the falling sand.
How many units of sand come to rest before sand starts flowing into the abyss below?
 */

function solution(input) {
  let inputArray = input
    .split('\n')
    .map((line) =>
      line.split('->').map((coors) => coors.split(',').map((num) => +num))
    );

  let xMax = Math.max(...inputArray.flat(2).filter((x) => x > 400));
  let xMin = Math.min(...inputArray.flat(2).filter((x) => x > 400));
  let yMax = Math.max(...inputArray.flat(2).filter((x) => x < 400));

  let simArray = Array.from({ length: yMax + 1 }, (y) =>
    Array.from({ length: xMax - xMin + 1 }, (x) => '.')
  );

  simArray[0][500 - xMin] = '+';

  inputArray.forEach((row) => {
    row.forEach((coors, i) => {
      if (i == row.length - 1) {
        return;
      }

      let nextCoors = row[i + 1];

      let xDiff = coors[0] - nextCoors[0];
      let yDiff = coors[1] - nextCoors[1];

      if (xDiff) {
        let minX = coors[0] > nextCoors[0] ? nextCoors[0] : coors[0];
        let maxX = coors[0] < nextCoors[0] ? nextCoors[0] : coors[0];
        for (let i = minX; i < maxX + 1; i++) {
          simArray[nextCoors[1]][i - xMin] = '#';
        }
      } else if (yDiff) {
        let minY = coors[1] > nextCoors[1] ? nextCoors[1] : coors[1];
        let maxY = coors[1] < nextCoors[1] ? nextCoors[1] : coors[1];
        for (let i = minY; i < maxY + 1; i++) {
          simArray[i][coors[0] - xMin] = '#';
        }
      }
    });
  });

  let sand = 0;
  while (simulateFalling(simArray, 500 - xMin, 0)) ++sand;

  return sand;
}

//It returns true or false if it could put a sand or it overflowed
function simulateFalling(currentArray, currentX, currentY) {
  for (let i = currentY; i < currentArray.length; i++) {
    //The sand overflowed
    if (i + 1 == currentArray.length) return false;

    //We collided
    if (
      currentArray[i + 1][currentX] == '#' ||
      currentArray[i + 1][currentX] == 'O'
    ) {
      //Left down side is fill
      if (
        typeof currentArray[i + 1][currentX - 1] != 'undefined' &&
        currentArray[i + 1][currentX - 1] != '.'
      ) {
        //Rigth down side is fill
        if (
          typeof currentArray[i + 1][currentX + 1] != 'undefined' &&
          currentArray[i + 1][currentX + 1] != '.'
        ) {
          //Set a sand there
          currentArray[i][currentX] = 'O';
          //You can uncomment this line to see how it gets filled
          // console.table(currentArray);
          return true;

          //Down Right side is a "." there's a valid space
        } else if (typeof currentArray[i + 1][currentX + 1] != 'undefined') {
          //Simulate the falling in that point
          return simulateFalling(currentArray, currentX + 1, i + 1);
        }
        //Down Left side is a "." there's a valid space
      } else if (typeof currentArray[i + 1][currentX - 1] != 'undefined') {
        //Simulate the falling in that point
        return simulateFalling(currentArray, currentX - 1, i + 1);
      }

      //If down us is "." keep falling
    } else if (currentArray[i + 1][currentX] == '.') {
      continue;
    }
  }

  return true;
}

// console.table(solution(input));
console.table(solution(testInput));
