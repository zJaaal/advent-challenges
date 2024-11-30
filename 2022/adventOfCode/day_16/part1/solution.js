import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
This approach lets you release the most pressure possible in 30 minutes with this valve layout,

1651.

Work out the steps to release the most pressure in 30 minutes.
What is the most pressure you can release?
 */

//Works for test but not for real input
function solution(input) {
  let valvesGraph = {};
  let start = {};

  let inputArray = input.split('\n');

  inputArray.forEach((valve, i) => {
    let [info, tunnels] = valve.split(';');

    let valveName = info.match(/[A-Z]{2}/)[0];
    let flowRate = info.match(/\d+/)[0];

    let paths = tunnels.match(/[A-Z]{2}/g);

    valvesGraph[valveName] = {
      flowRate,
      paths,
      distance: Infinity,
      name: valveName,
    };

    if (!i) start = valvesGraph[valveName];
  });

  let nodes = [
    start.name,
    ...Object.keys(valvesGraph)
      .sort((x, y) => valvesGraph[y].flowRate - valvesGraph[x].flowRate)
      .filter((x) => valvesGraph[x].flowRate > 0),
  ];

  // console.log(nodes);

  let nodePaths = findPathsToNodes(valvesGraph, nodes);

  // console.log(nodePaths);
  let shortestPaths = findShortestPath(nodes, nodePaths);

  console.log(shortestPaths);

  let permutations = [];

  //The permutations goes to 15! which is even more than an array can handle
  //Should simulate all the possible best solutions as in my last algorithm
  genPermutations(nodes.slice(1), nodes.length - 1, start.name, permutations);

  let memoizeFindPoints = memo(findTotalPoints);

  let finalResult = [];

  // // // memoizeFindPoints('AA', 'HH', shortestPaths, start.name);
  // // console.log(memoizeFindPoints('HH', 'CC', shortestPaths, start.name));
  // // // memoizeFindPoints('DD', 'JJ', shortestPaths, start.name);
  // // // memoizeFindPoints('EE', 'CC', shortestPaths, start.name);
  // // console.log(memoizeFindPoints('HH', 'EE', shortestPaths, start.name));

  // console.log(permutations.length);
  permutations.forEach((set) => {
    let minutes = 30;
    let result = 0;
    let setArray = set.split(' ');
    for (let i = 1; i < setArray.length; i++) {
      let value = memoizeFindPoints(
        setArray[i - 1],
        setArray[i],
        shortestPaths,
        start.name
      );
      // console.log(setArray[i - 1], setArray[i], value);
      minutes -= value + 1;
      if (minutes < 0) break;
      result += valvesGraph[setArray[i]].flowRate * minutes;
    }
    finalResult.push([result, set]);
  });

  return finalResult.sort((x, y) => y[0] - x[0]).shift()[0];
}

function findPathsToNodes(graph, nodes) {
  let nodesDistances = {};
  nodes.forEach((node) => {
    graph[node].distance = 0;

    let queue = [graph[node]];

    let visitedNodes = new Set([node]);

    while (visitedNodes.size < nodes.length) {
      let next = queue.shift();

      for (let i = 0; i < next.paths.length; i++) {
        let currentNode = next.paths[i];
        if (visitedNodes.has(currentNode)) continue;
        graph[currentNode].distance = next.distance + 1;
        if (nodes.includes(currentNode)) {
          nodesDistances[node] = {
            ...nodesDistances[node],
            [currentNode]: graph[currentNode].distance,
          };
          visitedNodes.add(currentNode);
        }
        queue.push(graph[currentNode]);
      }
    }
  });

  return nodesDistances;
}

function findShortestPath(nodes, paths) {
  // console.log(paths);
  let queue = [nodes[0]];
  let visitedNodes = new Set();

  let shortestPath = {
    [nodes[0]]: {
      totalCost: 0,
      prev: nodes[0],
    },
  };

  // console.log(nodes);

  while (visitedNodes.size < nodes.length) {
    let node = queue.shift();
    let next = paths[node];
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i] == node) continue;

      if (typeof shortestPath[nodes[i]] == 'undefined') {
        shortestPath[nodes[i]] = {
          totalCost: next[nodes[i]],
          prev: node,
        };
      } else if (shortestPath[nodes[i]].totalCost > next[nodes[i]]) {
        //With this validation I break the circular references
        if (
          typeof shortestPath[node] != 'undefined' &&
          shortestPath[node].prev != nodes[i]
        ) {
          shortestPath[nodes[i]] = {
            totalCost: next[nodes[i]],
            prev: node,
          };
        } else continue;
      }
      if (!visitedNodes.has(nodes[i])) {
        queue.push(nodes[i]);
        // console.log(node);
      }
    }
    visitedNodes.add(node);
  }

  return shortestPath;
}

function findTotalPoints(nodeFrom, nodeTo, shortestPaths, startNode) {
  let currentFromNode = nodeFrom;
  let currentToNode = nodeTo;
  let encounter = '';

  let nodeFromPath = [];
  let nodeToPath = [];

  let fromResult = 0;
  let toResult = 0;
  let encounterResult = 0;

  while (currentFromNode != startNode || currentToNode != startNode) {
    fromResult += shortestPaths[currentFromNode].totalCost;
    currentFromNode = shortestPaths[currentFromNode].prev;
    if (nodeFromPath.at(-1) != startNode) nodeFromPath.push(currentFromNode);

    toResult += shortestPaths[currentToNode].totalCost;
    currentToNode = shortestPaths[currentToNode].prev;
    if (nodeToPath.at(-1) != startNode) nodeToPath.push(currentToNode);
  }

  if (
    nodeFromPath.find((x) => x == nodeTo) ||
    nodeToPath.find((x) => x == nodeFrom)
  ) {
    return Math.abs(fromResult - toResult);
  } else {
    for (let i = 0; i < nodeFromPath.length; i++) {
      let possibleEncounter = nodeToPath.findLastIndex(
        (x) => x == nodeFromPath[i]
      );
      if (possibleEncounter >= 0) {
        encounter = nodeToPath[possibleEncounter];
        break;
      }
    }
    let currentEncounter = encounter;
    while (currentEncounter != startNode) {
      encounterResult += shortestPaths[currentEncounter].totalCost;
      currentEncounter = shortestPaths[currentEncounter].prev;
    }
  }

  return (
    Math.abs(fromResult - encounterResult) +
    Math.abs(toResult - encounterResult)
  );
}

const genPermutations = (a, size, start, result) => {
  if (size == 1 && !result.includes(start + ' ' + a.join(' '))) {
    result.push(start + ' ' + a.join(' '));
    return;
  }

  for (let i = 0; i < size; i++) {
    genPermutations(a, size - 1, start, result);

    if (size % 2 == 1) {
      let temp = a[0];
      a[0] = a[size - 1];
      a[size - 1] = temp;
    }

    if (size % 2 == 0) {
      let temp = a[i];
      a[i] = a[size - 1];
      a[size - 1] = temp;
    }
  }
};

const memo = (fun) => {
  let cache = new Map();

  return (...args) => {
    let [keyOne, keyTwo] = args;

    if (cache.has(keyOne + keyTwo)) return cache.get(keyOne + keyTwo);
    else {
      let result = fun(...args);
      cache.set(keyOne + keyTwo, result);
      return result;
    }
  };
};

// console.log(solution(input));
console.log(solution(testInput));
