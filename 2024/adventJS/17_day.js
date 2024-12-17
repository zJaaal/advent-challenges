console.clear();
console.log('----------------------------------');

/*
The Grinch has been up to his tricks in the North Pole and has planted explosive coal bombs 💣 in the elves' toy factory.
He wants all the toys to be rendered useless, and that's why he has left a grid where some cells have explosive coal (true) and others are empty (false).

The elves need your help to map the dangerous areas.
Each empty cell should display a number indicating how many explosive coal bombs there are in the adjacent positions, including diagonals.
*/
/**
 * @param {boolean[][]} grid
 * @returns {number[][]}
 */
function detectBombs(grid) {
  const DIRECTIONS = [
    [-1, -1], // top left
    [-1, 0], // top
    [-1, 1], // top right
    [0, -1], // left
    [0, 1], // right
    [1, -1], // bottom left
    [1, 0], // bottom
    [1, 1], // bottom right
  ];

  return grid.map((row, i) =>
    row.map((_, j) =>
      DIRECTIONS.reduce((acc, [y, x]) => (acc += ~~grid[i + y]?.[j + x]), 0)
    )
  );
}
console.log(
  detectBombs([
    [true, false, false],
    [false, true, false],
    [false, false, false],
  ])
);
// [
//   [1, 2, 1],
//   [2, 1, 1],
//   [1, 1, 1]
// ]

console.log(
  detectBombs([
    [true, false],
    [false, false],
  ])
);
// [
//   [0, 1],
//   [1, 1]
// ]

console.log(
  detectBombs([
    [true, true],
    [false, false],
    [true, true],
  ])
);
// [
//   [1, 1],
//   [4, 4],
//   [1, 1]
// ]
