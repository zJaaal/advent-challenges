import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
AAAA
BBCD
BBCC
EEEC
This 4x4 arrangement includes garden plots growing five different types of plants (labeled A, B, C, D, and E), each grouped into their own region.

In order to accurately calculate the cost of the fence around a single region, you need to know that region's area and perimeter.

The area of a region is simply the number of garden plots the region contains.
The above map's type A, B, and C plants are each in a region of area 4. The type E plants are in a region of area 3; the type D plants are in a region of area 1.

Each garden plot is a square and so has four sides.
The perimeter of a region is the number of sides of garden plots in the region that do not touch another garden plot in the same region.
The type A and C plants are each in a region with perimeter 10.
The type B and E plants are each in a region with perimeter 8.
The lone D plot forms its own region with perimeter 4.
 */

const directions = [
  [-1, 0], // up
  [1, 0], // down
  [0, 1], // right
  [0, -1], // left
];

function traverse(garden, currPos, visited = {}) {
  const [y, x] = currPos;
  let values = {
    plant: garden[y][x],
    plantCount: 1,
    perimeter: 0,
  };

  let plant = garden[y][x];

  for (let i = 0; i < directions.length; i++) {
    const [dy, dx] = directions[i];

    const [newY, newX] = [y + dy, x + dx];

    if (garden[newY] && garden[newY][newX]) {
      if (garden[newY][newX] === plant) {
        // Only visit if it's the same plant, we want to traverse an area of same plants
        if (visited[`${newY}-${newX}`]) {
          continue;
        }
        visited[`${newY}-${newX}`] = true;

        // Get the values for the new area
        const newValues = traverse(garden, [newY, newX], visited);

        // Add the new values to the current values
        values = {
          ...values,
          plantCount: values.plantCount + newValues.plantCount,
          perimeter: values.perimeter + newValues.perimeter,
        };
      } else {
        // If it is another plant sum the perimeter
        values = {
          ...values,
          perimeter: values.perimeter + 1,
        };
      }
    } else {
      // If it is the edge of the garden sum the perimeter
      values = {
        ...values,
        perimeter: values.perimeter + 1,
      };
    }
  }

  return values;
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

  return plants.reduce((acc, current) => {
    return acc + current.plantCount * current.perimeter;
  }, 0);
}

// console.log(solution(input), '\n1421958');
// console.log(solution(testInput), '\n1930');
