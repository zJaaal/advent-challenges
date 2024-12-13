import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
 The claw machines here are a little unusual.
 Instead of a joystick or directional buttons to control the claw, these machines have two buttons labeled A and B.
 Worse, you can't just put in a token and play; it costs 3 tokens to push the A button and 1 token to push the B button.

 With a little experimentation,
 you figure out that each machine's buttons are configured to move the claw a specific amount to the right (along the X axis)
 and a specific amount forward (along the Y axis) each time that button is pressed.

 Each machine contains one prize; to win the prize, the claw must be positioned exactly above the prize on both the X and Y axes.

 You wonder: what is the smallest number of tokens you would have to spend to win as many prizes as possible?
 You assemble a list of every machine's button behavior and prize location (your puzzle input).
*/

const COST = {
  a: 3,
  b: 1,
};

let possibleResult = Number.MAX_SAFE_INTEGER;
let memo = {};

function simulatePush(game, aCount, bCount) {
  const key = `${game.prize.x}-${game.prize.y}-${aCount}-${bCount}`;

  if (memo[key]) return memo[key];

  const finalCost = aCount * COST.a + bCount * COST.b;
  if (
    finalCost >= possibleResult ||
    possibleResult != Number.MAX_SAFE_INTEGER ||
    game.prize.x < 0 ||
    game.prize.y < 0
  ) {
    memo[key] = Number.MAX_SAFE_INTEGER;

    return Number.MAX_SAFE_INTEGER;
  }

  if (!game.prize.x && !game.prize.y) {
    possibleResult = Math.min(possibleResult, finalCost);

    return possibleResult;
  }

  if (aCount > 100 || bCount > 100) {
    memo[key] = Number.MAX_SAFE_INTEGER;
    return Number.MAX_SAFE_INTEGER;
  }

  // Simulate pushing A
  const pushA = simulatePush(
    {
      ...game,
      prize: {
        x: game.prize.x - game.a.x,
        y: game.prize.y - game.a.y,
      },
    },
    aCount + 1,
    bCount
  );

  const pushB = simulatePush(
    {
      ...game,
      prize: {
        x: game.prize.x - game.b.x,
        y: game.prize.y - game.b.y,
      },
    },
    aCount,
    bCount + 1
  );

  const result = Math.min(pushA, pushB);

  memo[key] = result;

  return result;
}

function solution(input) {
  const games = input.split('\n\n').map((game) => {
    const [a, b, prize] = game.split('\n');

    return {
      a: {
        token: 'a',
        x: a.match(/\d+/g)[0],
        y: a.match(/\d+/g)[1],
      },
      b: {
        token: 'b',
        x: b.match(/\d+/g)[0],
        y: b.match(/\d+/g)[1],
      },
      prize: {
        x: prize.match(/\d+/g)[0],
        y: prize.match(/\d+/g)[1],
      },
    };
  });

  const resultsPerGame = games
    .map((game) => {
      simulatePush(game, 0, 0);

      const gamePossibleResult = possibleResult;

      // console.log(gamePossibleResult);

      possibleResult = Number.MAX_SAFE_INTEGER;

      memo = {};

      return gamePossibleResult;
    })
    .filter((result) => result != Number.MAX_SAFE_INTEGER)
    .reduce((acc, curr) => acc + curr, 0);

  return resultsPerGame;
}

console.log(solution(input), '\n33209');
// console.log(solution(testInput), '\n480');
