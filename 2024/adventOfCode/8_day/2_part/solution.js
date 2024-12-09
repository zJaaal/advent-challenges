import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
The signal only applies its nefarious effect at specific antinodes based on the
resonant frequencies of the antennas. In particular, an antinode occurs at any
point that is perfectly in line with two antennas of the same frequency - but
only when one of the antennas is twice as far away as the other. This means that
for any pair of antennas with the same frequency, there are two antinodes, one
on either side of them.

We found out that the harmonics makes the antinode appear at any point of the grid
 */

let visitedPoints = {};

function findShiftedPoints(point1, point2, xLimit, yLimit) {
  // Calculate the direction vector between point1 and point2
  const dx = point2[0] - point1[0];
  const dy = point2[1] - point1[1];

  // Calculate the distance between the two points
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Normalize the direction vector
  const unitVector = [dx / distance, dy / distance];
  // Compute adjacent points for both input points using the distance
  let adjacentPoint1 = [
    [
      point1[0] - unitVector[0] * distance,
      point1[1] - unitVector[1] * distance,
    ],
  ];

  while (
    adjacentPoint1.at(-1)[0] >= 0 &&
    adjacentPoint1.at(-1)[1] >= 0 &&
    adjacentPoint1.at(-1)[0] < xLimit &&
    adjacentPoint1.at(-1)[1] < yLimit
  ) {
    adjacentPoint1.push([
      adjacentPoint1.at(-1)[0] - unitVector[0] * distance,
      adjacentPoint1.at(-1)[1] - unitVector[1] * distance,
    ]);
  }

  let adjacentPoint2 = [
    [
      point2[0] + unitVector[0] * distance,
      point2[1] + unitVector[1] * distance,
    ],
  ];

  while (
    adjacentPoint2.at(-1)[0] >= 0 &&
    adjacentPoint2.at(-1)[1] >= 0 &&
    adjacentPoint2.at(-1)[0] < xLimit &&
    adjacentPoint2.at(-1)[1] < yLimit
  ) {
    adjacentPoint2.push([
      adjacentPoint2.at(-1)[0] + unitVector[0] * distance,
      adjacentPoint2.at(-1)[1] + unitVector[1] * distance,
    ]);
  }

  // Round to nearest integers for matrix coordinates
  adjacentPoint1 = adjacentPoint1.map(([x, y]) => [
    Math.round(x),
    Math.round(y),
  ]);
  adjacentPoint2 = adjacentPoint2.map(([x, y]) => [
    Math.round(x),
    Math.round(y),
  ]);

  return [adjacentPoint1, adjacentPoint2];
}

function scanMap(map, point) {
  for (let i = point[1]; i < map.length; i++) {
    for (let j = i == point[1] ? point[0] + 1 : 0; j < map[i].length; j++) {
      // console.log(map[i][j], point);
      if (map[i][j] == map[point[1]][point[0]]) {
        // console.log('found');
        // console.log(point, i, j, map[i][j]);

        const [points1, points2] = findShiftedPoints(
          point,
          [j, i],
          map[0].length,
          map.length
        );

        // console.log(points1, points2);

        // console.log(point1, point2);

        for (let point1 of points1) {
          if (map[point1[1]]?.[point1[0]] && !visitedPoints[point1.join('-')]) {
            visitedPoints[point1.join('-')] = true;
          }

          if (map[point1[1]]?.[point1[0]] == '.') {
            map[point1[1]][point1[0]] = '#';
          }
        }

        for (let point2 of points2) {
          if (map[point2[1]]?.[point2[0]] && !visitedPoints[point2.join('-')]) {
            visitedPoints[point2.join('-')] = true;
          }

          if (map[point2[1]]?.[point2[0]] == '.') {
            map[point2[1]][point2[0]] = '#';
          }
        }
      }
    }
  }
}

function solution(input) {
  const antennasMap = input.split('\n').map((row) => row.split(''));

  for (let i = 0; i < antennasMap.length; i++) {
    for (let j = 0; j < antennasMap[i].length; j++) {
      if (antennasMap[i][j] !== '.' && antennasMap[i][j] !== '#') {
        // console.log('----------');
        // console.log('----------', i, j, antennasMap[i][j]);
        visitedPoints[[j, i].join('-')] = true;
        scanMap(antennasMap, [j, i]);
        // console.log(antennasMap.map((row) => row.join('')).join('\n'));
      }
    }
  }

  console.log(antennasMap.map((row) => row.join('')).join('\n'));

  return Object.keys(visitedPoints).length;
}

console.log(solution(input));
// console.log(solution(testInput));
