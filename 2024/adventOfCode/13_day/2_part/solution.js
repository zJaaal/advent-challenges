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

// Found out these are literal vectors
function getQuantityOfPushes({ a, b, prize }) {
  // Create 2 equations using the vectors and the point to achieve and align the values of one of the values to eliminate it
  // V1xa + V2xb = Px -> 3a + b = 10 Ex.
  // V1ya + V2yb = Py -> 1a + 2b = 1 Ex.

  // We align the value of a to get rid of it
  // V1y(V1xa + V2xb) = Pxa
  // V1x(V1ya + V2yb) = Pya

  const alignA = {
    a: {
      x: a.x * a.y,
      y: b.x * a.y,
      equal: prize.x * a.y,
    },
    b: {
      x: a.y * a.x,
      y: b.y * a.x,
      equal: prize.y * a.x,
    },
  };

  // Difference of the equations
  //(V1yV1xa - V1xV1ya) + (V1yV2xb - V1xV2yb) = Pxa - Pya
  // 0 + (V1yV2xb - V1xV2yb) = Pxa - Pya
  // b(V1yV2x - V1xV2y) = Pxa - Pya
  // b = (Pxa - Pya) / (V1yV2x - V1xV2y)
  const bResult =
    ((alignA.b.equal - alignA.a.equal) / (alignA.a.y - alignA.b.y)) * -1n;

  // This comes from the first equation
  const aResult = ((b.x * bResult - prize.x) / a.x) * -1n;

  // Comprobate the equations, if they satisfy then return the results, otherwise return 0
  const equation1 = a.x * aResult + b.x * bResult;
  const equation2 = a.y * aResult + b.y * bResult;

  // here we check less things, because in this case we can do N moves and also they are all full integers with no decimals
  return equation1 == prize.x && equation2 == prize.y
    ? [aResult, bResult]
    : [0n, 0n];
}

function solution(input) {
  const games = input.split('\n\n').map((game) => {
    const [a, b, prize] = game.split('\n');

    return {
      a: {
        token: 'a',
        x: BigInt(a.match(/\d+/g)[0]),
        y: BigInt(a.match(/\d+/g)[1]),
      },
      b: {
        token: 'b',
        x: BigInt(b.match(/\d+/g)[0]),
        y: BigInt(b.match(/\d+/g)[1]),
      },
      prize: {
        x: BigInt(prize.match(/\d+/g)[0]) + 10000000000000n,
        y: BigInt(prize.match(/\d+/g)[1]) + 10000000000000n,
      },
    };
  });

  const resultsPerGame = games
    .map((game) => {
      const [aResult, bResult] = getQuantityOfPushes(game);

      // Calculate the cost in tokens
      const aCost = aResult * BigInt(COST.a);
      const bCost = bResult * BigInt(COST.b);

      // Sum the costs
      return aCost + bCost;
    })

    .reduce((acc, curr) => acc + curr, 0n);

  return resultsPerGame.toString();
}

// console.log(solution(input), '\n83102355665474');
// console.log(solution(testInput), '\n875318608908');
