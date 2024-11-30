console.clear();
import input from '../input.js';
// The first column is what your opponent is going to play:
// A for Rock, B for Paper, and C for Scissors.

// The second column, you reason, must be what you should play in response:
// X for Rock = 1, Y for Paper = 2, and Z for Scissors = 3.
// +
//Lost = 0, Draw = 3, Win = 6

const lost = 0;
const draw = 3;
const win = 6;
const rock = 1;
const paper = 2;
const scissors = 3;

const decisions = {
  //Rock
  A: (decision) => {
    //Paper
    if (decision == 'Y') return win + paper;
    //Rock
    if (decision == 'X') return draw + rock;
    //Scissors
    if (decision == 'Z') return lost + scissors;
  },
  //Paper
  B: (decision) => {
    //Scissors
    if (decision == 'Z') return win + scissors;
    //Paper
    if (decision == 'Y') return draw + paper;
    //Rock
    if (decision == 'X') return lost + rock;
  },
  //Scissors
  C: (decision) => {
    //Rock
    if (decision == 'X') return win + rock;
    //Scissors
    if (decision == 'Z') return draw + scissors;
    //Paper
    if (decision == 'Y') return lost + paper;
  },
};

function solution(input) {
  let result = 0;
  input.split('\n').forEach((game) => {
    result += decisions[game[0]](game[2]);
  });
  return result;
}

console.log(solution(input));
