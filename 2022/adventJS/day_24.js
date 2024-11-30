//Day 24 solved using A*

function canExit(maze) {
  let start, end;

  //To calculate distance to the end
  let calculateDistance = (node, end) =>
    Math.sqrt((node.x - end.x) ** 2 + (node.y - end.y) ** 2);
  //To search neighbors
  let steps = [
    [-1, 0], //up
    [1, 0], // down
    [0, 1], //right
    [0, -1], // left
  ];

  //Array to graph
  maze
    .map((row, y) => {
      return row.map((value, x) => {
        let node = {
          x,
          y,
          value,
          neighbors: [],
          gScore: 0,
          fScore: Infinity,
        };
        if (value == 'S') start = node;
        else if (value == 'E') end = node;
        return node;
      });
    })
    .map((row, _, maze) => {
      row.map((node) => {
        steps.forEach((point) => {
          if (
            node.y + point[0] >= 0 &&
            node.y + point[0] <= maze.length - 1 &&
            node.x + point[1] >= 0 &&
            node.x + point[1] <= maze[0].length - 1
          ) {
            let neighbor = maze[node.y + point[0]][node.x + point[1]];
            if (neighbor) node.neighbors.push(neighbor);
          }
        });
      });
    });

  // Priority Queue
  let open = [start];

  //traverse through nodes
  while (open.length) {
    //Sort by fScore
    let next = open.sort((x, y) => y.fScore - x.fScore).pop();

    //Go through the neighbors
    next.neighbors.forEach((neighbor) => {
      //If its not a wall then we can go through it
      if (neighbor.value != 'W') {
        //New gScore
        let newGScore = next.gScore + 1;

        //If is less than the old one we set the new ones
        if (newGScore < neighbor.gScore || neighbor.gScore == 0) {
          //gScore is the steps we took to get there
          neighbor.gScore = newGScore;

          //fScore is the steps we took plus how much would cost to get to the end if there wasn't walls
          //So fScore is an approximation of how far we are from the end
          neighbor.fScore = newGScore + calculateDistance(next, end);

          //Since is lower, we push it to the priority queue (if it's not there) because now we found a shorter path
          if (
            !open.find((node) => node.x == neighbor.x && node.y == neighbor.y)
          )
            open.push(neighbor);
        }
      }
    });
  }

  //If we found the exit then gScore of end would not be zero

  return !!end.gScore;
}

console.log(
  canExit([
    [' ', ' ', 'W', ' ', 'S'],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'W', ' '],
    ['W', 'W', ' ', 'W', 'W'],
    [' ', ' ', ' ', ' ', 'E'],
  ])
); // -> true

// You can exit because you start at [0, 4]
// and there's a path to the exit which is [4, 4]

console.log(
  canExit([
    [' ', ' ', 'W', 'W', 'S'],
    [' ', ' ', ' ', 'W', ' '],
    [' ', ' ', ' ', 'W', ' '],
    ['W', 'W', ' ', 'W', 'W'],
    [' ', ' ', ' ', ' ', 'E'],
  ])
); // -> false
