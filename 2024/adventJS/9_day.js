console.clear();
console.log('----------------------------------');

/*
The elves are playing with a magical train 🚂 that carries gifts. This train moves on a board represented by an array of strings.

The train consists of an engine (@), followed by its carriages (o), and must collect magical fruits (*) which serve as fuel. The movement of the train follows these rules:

You will receive two parameters board and mov.

board is an array of strings that represents the board:

@ is the train's engine.
o are the train's carriages.
* is a magical fruit.
· are empty spaces.
mov is a string that indicates the next movement of the train from the train's head @:

'L': left
'R': right
'U': up
'D': down.
With this information, you must return a string:

'crash': If the train crashes into the edges of the board or itself.
'eat': If the train collects a magical fruit (*).
'none': If it moves without crashing or collecting any magical fruit.

*/
/**
 * @param {string[]} board - Represent the train situation
 * @param {'U' | 'D' | 'R' | 'L' } mov - Movement direction
 * @returns {'none' | 'crash' | 'eat'}
 */
function moveTrain(board, mov) {
  const DIRECTIONS = {
    U: [-1, 0],
    D: [1, 0],
    L: [0, -1],
    R: [0, 1],
  };

  const DESTINATION = {
    '*': 'eat',
    o: 'crash',
    undefined: 'crash',
    '·': 'none',
  };

  const engineRow = board.findIndex((row) => row.includes('@'));
  const engineCol = board[engineRow].indexOf('@');

  // delta y and delta x
  const [dy, dx] = DIRECTIONS[mov];

  return DESTINATION[board[engineRow + dy]?.[engineCol + dx]];
}
const board = ['·····', '*····', '@····', 'o····', 'o····'];

console.log(moveTrain(board, 'U'));
// ➞ 'eat'
// Because the train moves up and finds a magical fruit

console.log(moveTrain(board, 'D'));
// ➞ 'crash'
// The train moves down and the head crashes into itself

console.log(moveTrain(board, 'L'));
// ➞ 'crash'
// The train moves to the left and crashes into the wall

console.log(moveTrain(board, 'R'));
// ➞ 'none'
// The train moves to the right and there is empty space on the right
