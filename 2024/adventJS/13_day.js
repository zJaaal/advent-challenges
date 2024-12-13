console.clear();
console.log('----------------------------------');

/*
The elves at the North Pole have created a special robot 🤖 that helps Santa Claus distribute gifts inside a large warehouse. The robot moves on a 2D plane and we start from the origin (0, 0).

We want to know if, after executing a series of movements, the robot returns to where it started.

The basic commands for the robot are:

L: Move to the left
R: Move to the right
U: Move up
D: Move down
But it also has certain modifiers for the movements:

*: The movement is performed with double the intensity (e.g., *R means RR)
!: The next movement is inverted (e.g., R!L means RR)
?: The next movement is made only if it hasn't been made before (e.g., R?R means R)
You must return:

true: if the robot returns to the exact starting point
[x, y]: if the robot does not return to the exact starting point, return the position where it stopped
*/

/** @param {string[]} moves
 * @returns {true|string[]} Return true if robot returns or position
 */
function isRobotBack(moves) {
  let x = 0;
  let y = 0;

  const moveCount = {
    L: 0,
    R: 0,
    U: 0,
    D: 0,
  };

  const inverted = {
    L: 'R',
    R: 'L',
    U: 'D',
    D: 'U',
  };

  const directions = {
    U: [0, 1],
    D: [0, -1],
    R: [1, 0],
    L: [-1, 0],
  };

  const operators = {
    '*': (move) => (
      (moveCount[move] += 2), directions[move].map((value) => value * 2)
    ),
    '!': (move) => (moveCount[inverted[move]]++, directions[inverted[move]]),
    '?': (move) =>
      !moveCount[move] ? (moveCount[move]++, directions[move]) : [0, 0],
  };

  moves.replace(/([*!?])?([LRUD])/g, (_, operator, move) => {
    const direction =
      operators?.[operator]?.(move) ?? (moveCount[move]++, directions[move]);

    x += direction[0];
    y += direction[1];

    return 'Yes I used a replace. I really dont care';
  });

  return x || y ? [x, y] : true;
}

console.log(isRobotBack('R')); // [1, 0]
console.log(isRobotBack('RL')); // true
console.log(isRobotBack('RLUD')); // true
console.log(isRobotBack('*RU')); // [2, 1]
console.log(isRobotBack('R*U')); // [1, 2]
console.log(isRobotBack('LLL!R')); // [-4, 0]
console.log(isRobotBack('R?R')); // [1, 0]
console.log(isRobotBack('U?D')); // true
console.log(isRobotBack('R!L')); // [2,0]
console.log(isRobotBack('U!D')); // [0,2]
console.log(isRobotBack('R?L')); // true
console.log(isRobotBack('U?U')); // [0,1]
console.log(isRobotBack('*U?U')); // [0,2]
console.log(isRobotBack('R!U?U')); // [1,0]
console.log(isRobotBack('U?D?U')); // true
