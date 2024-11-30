//220 points

function checkJump(heights) {
  let length = heights.length;
  return (
    heights.reduce(
      (directions, x, i, array) => (
        (array = directions.length),
        i != length - 1 &&
          x < heights[i + 1] &&
          directions[array - 1] != 'UP' &&
          directions.push('UP'),
        i != length - 1 &&
          x > heights[i + 1] &&
          directions[array - 1] != 'DOWN' &&
          directions.push('DOWN'),
        directions
      ),
      []
    ).length == 2
  );
}
console.log(checkJump([1, 1000, 900, 800]));
