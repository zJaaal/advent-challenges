console.clear();
import input from '../input.js';
// X means you need to lose,
// Y means you need to end the round in a draw,
// and Z means you need to win. Good luck!"

const lost = 0;
const draw = 3;
const win = 6;
const rock = 1;
const paper = 2;
const scissors = 3;

const decisions = {
  //Rock
  A: (decision) => {
    // Win
    if (decision == 'Z') return win + paper;
    // Draw
    if (decision == 'Y') return draw + rock;
    // Lose
    if (decision == 'X') return lost + scissors;
  },
  //Paper
  B: (decision) => {
    // Win
    if (decision == 'Z') return win + scissors;
    //Draw
    if (decision == 'Y') return draw + paper;
    //Lost
    if (decision == 'X') return lost + rock;
  },
  //Scissors
  C: (decision) => {
    //Win
    if (decision == 'Z') return win + rock;
    //Draw
    if (decision == 'Y') return draw + scissors;
    //Lose
    if (decision == 'X') return lost + paper;
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
