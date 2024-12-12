import { input, part2TestInput, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
Under the bulk discount, instead of using the perimeter to calculate the price, you need to use the number of sides each region has.
Each straight section of fence counts as a side, regardless of how long it is.

Consider this example again:

AAAA
BBCD
BBCC
EEEC
The region containing type A plants has 4 sides, as does each of the regions containing plants of type B, D, and E.
However, the more complex region containing the plants of type C has 8 sides!

Using the new method of calculating the per-region price by multiplying the region's area by its number of sides,
regions A through E have prices 16, 16, 32, 4, and 12, respectively, for a total price of 80.
 */

const directions = {
  up: [-1, 0], // up
  down: [1, 0], // down
  right: [0, 1], // right
  left: [0, -1], // left
};

function traverse(garden, currPos, visited = {}, sides = []) {
  const [y, x] = currPos;
  let values = {
    plant: garden[y][x],
    plantCount: 1,
  };

  let plant = garden[y][x];

  for (let direction in directions) {
    const [dy, dx] = directions[direction];

    const [newY, newX] = [y + dy, x + dx];

    if (garden[newY] && garden[newY][newX]) {
      if (garden[newY][newX] === plant) {
        // Only visit if it's the same plant, we want to traverse an area of same plants
        if (visited[`${newY}-${newX}`]) {
          continue;
        }
        visited[`${newY}-${newX}`] = true;

        // Get the values for the new area
        const newValues = traverse(garden, [newY, newX], visited, sides);

        // Add the new values to the current values
        values = {
          ...values,
          plantCount: values.plantCount + newValues.plantCount,
        };
      } else {
        sides.push({
          direction,
          row: newY,
          col: newX,
        });
      }
    } else {
      sides.push({
        direction,
        row: newY,
        col: newX,
      });
    }
  }

  return {
    ...values,
    sides,
  };
}

function checkSides(sides, direction) {
  let sidesCount = 0;

  // If it's up or down
  if (direction === 'up' || direction === 'down') {
    // Sort the sides by row
    let sortedSides = sides.toSorted((a, b) => a.row - b.row);

    // Group the sides by row
    sortedSides = sortedSides.reduce((acc, current) => {
      acc[current.row] ??= [];

      acc[current.row].push(current.col);

      return acc;
    }, {});

    // Check the sides by row
    for (let row in sortedSides) {
      ++sidesCount; // Every row counts as a side

      // Sort the cols
      let sortedCols = sortedSides[row].toSorted((a, b) => a - b);

      // Check if there are more than one side in the row
      for (let i = 0; i < sortedCols.length; i++) {
        const currentAbs = Math.abs(sortedCols[i]);
        const nextAbs = Math.abs(sortedCols[i + 1] ?? 0);

        // A difference of more than 1 means there is a side, because the side is a straight line and should be continued
        if (sortedCols[i + 1] && Math.abs(currentAbs - nextAbs) > 1) {
          sidesCount++;
        }
      }
    }
  } else {
    // If it's right or left

    // Sort the sides by col
    let sortedSides = sides.toSorted((a, b) => a.col - b.col);

    // Group the sides by col
    sortedSides = sortedSides.reduce((acc, current) => {
      acc[current.col] ??= [];

      acc[current.col].push(current.row);

      return acc;
    }, {});

    // Check the sides by col
    for (let col in sortedSides) {
      ++sidesCount; // Every col counts as a side

      // Sort the rows
      let sortedRows = sortedSides[col].toSorted((a, b) => a - b);

      // Check if there are more than one side in the col
      for (let i = 0; i < sortedRows.length; i++) {
        const currentAbs = Math.abs(sortedRows[i]);
        const nextAbs = Math.abs(sortedRows[i + 1] ?? 0);

        // A difference of more than 1 means there is a side, because the side is a straight line and should be continued
        if (sortedRows[i + 1] && Math.abs(currentAbs - nextAbs) > 1) {
          sidesCount++;
        }
      }
    }
  }

  return sidesCount || 1;
}

function solution(input) {
  const garden = input.split('\n').map((row) => row.split(''));

  let plants = [];

  let visited = {};

  for (let i = 0; i < garden.length; i++) {
    for (let j = 0; j < garden[i].length; j++) {
      if (!visited[`${i}-${j}`]) {
        visited[`${i}-${j}`] = true;

        let result = traverse(garden, [i, j], visited);

        plants.push(result);
      }
    }
  }

  // Map the plants to get the sides by directions
  const mappedPlants = plants.map(({ sides }) => {
    return sides.reduce((acc, current) => {
      acc[current.direction] ??= [];

      acc[current.direction].push({
        row: current.row,
        col: current.col,
      });

      return acc;
    }, {});
  });

  // Check the sides and calculate the price
  const totalPrice = mappedPlants.reduce((acc, plant, i) => {
    let sidesCount = 0;
    // Check the sides by direction
    for (let direction in plant) {
      sidesCount += checkSides(plant[direction], direction);
    }
    return acc + sidesCount * plants[i].plantCount;
  }, 0);

  return totalPrice;
}

console.log(solution(input), '\n885394');
// console.log(solution(testInput), '\n1206');
