import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
Each line represents a single equation.
The test value appears before the colon on each line;
it is your job to determine whether the remaining numbers
can be combined with operators to produce the test value.

Operators are always evaluated left-to-right,
not according to precedence rules.
Furthermore, numbers in the equations cannot be rearranged.
Glancing into the jungle, you can see elephants holding
two different types of operators: add (+) and multiply (*).

Now add a new operation (||) is concatenation of strings.
*/

function evaluate(numbers, goal) {
  if (numbers.length === 1) return numbers[0] == goal;

  const firstValue = numbers[0] + numbers[1];
  const secondValue = numbers[0] * numbers[1];
  const thirdValue = numbers[0].toString() + numbers[1].toString();

  const firstTry = evaluate([firstValue, ...numbers.slice(2)], goal);
  const secondTry = evaluate([secondValue, ...numbers.slice(2)], goal);
  const thirdTry = evaluate([Number(thirdValue), ...numbers.slice(2)], goal);

  return firstTry || secondTry || thirdTry;
}

function solution(input) {
  const equations = input.split('\n');

  return equations.reduce((acc, equation) => {
    const [goal, numbers] = equation.split(': ');

    const result = evaluate(numbers.split(' ').map(Number), goal);

    acc = result ? acc + Number(goal) : acc;

    return acc;
  }, 0);
}

// console.log(solution(input));
// console.log(solution(testInput));
